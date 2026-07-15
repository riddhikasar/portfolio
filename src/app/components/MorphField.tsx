import React, { useEffect, useMemo, useRef } from "react";

type Scene = {
  src: string;
  durationMs?: number; // morph time (default 6000)
  holdMs?: number;     // pause (default 2000)
};

type Fit = "contain" | "cover";

type Props = {
  scenes: Scene[];
  dark?: boolean;

  className?: string;
  style?: React.CSSProperties;

  /** Put this on your text div (optional). Soft (no visible box). */
  avoidRef?: React.RefObject<HTMLElement>;
  avoidPadding?: number; // px

  /** Solid background colors */
  bgLight?: string; // default "#1EB81B"
  bgDark?: string;  // default "#FFE53A"

  /** Grid */
  cell?: number;   // desired spacing (stretched to hit edges)
  pixel?: number;  // square size

  /** Filled pixels */
  filledAlpha?: number;

  /** Pixel color (if you want black like your screenshot, keep default) */
  fillColorLight?: string; // default "#000000"
  fillColorDark?: string;  // default "#000000"

  /** Mix */
  shapeRatio?: number;     // portion of particles used for the shape
  disperseRatio?: number;  // alpha multiplier for background scatter pixels

  /** Sampling */
  whiteCutoff?: number; // default 250
  fit?: Fit;

  /** Motion */
  spring?: number;
  damping?: number;
  maxSpeed?: number;

  /** Mouse disperse */
  mouseRadius?: number;
  mouseDisperseStrength?: number;

  /** Mouse can skip pause */
  mouseTrigger?: boolean;
  mouseTriggerCooldownMs?: number;

  /** Directional morph */
  sweepBand?: number; // 0..1, larger = softer sweep. default 0.28
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function loadImage(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode().catch(() => {});
  return img;
}

function drawFitAnchored(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  fit: Fit,
) {
  const imgAR = img.width / img.height;
  const boxAR = w / h;

  let drawW = w, drawH = h;

  if (fit === "contain") {
    if (imgAR > boxAR) {
      drawW = w;
      drawH = w / imgAR;
    } else {
      drawH = h;
      drawW = h * imgAR;
    }
  } else {
    // cover
    if (imgAR > boxAR) {
      drawH = h;
      drawW = h * imgAR;
    } else {
      drawW = w;
      drawH = w / imgAR;
    }
  }

  // centered
  const dx = (w - drawW) * 0.5;
  const dy = (h - drawH) * 0.5;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

/** Grid always hits edges: x in [0..W-pixel], y in [0..H-pixel] */
function buildGrid(W: number, H: number, desiredCell: number, pixel: number) {
  const cols = Math.max(2, Math.round((W - pixel) / desiredCell) + 1);
  const rows = Math.max(2, Math.round((H - pixel) / desiredCell) + 1);

  const endX = Math.max(0, W - pixel);
  const endY = Math.max(0, H - pixel);

  const stepX = endX / (cols - 1);
  const stepY = endY / (rows - 1);

  const xs = new Float32Array(cols);
  const ys = new Float32Array(rows);
  for (let i = 0; i < cols; i++) xs[i] = i * stepX;
  for (let j = 0; j < rows; j++) ys[j] = j * stepY;

  return { cols, rows, xs, ys };
}

type Targets = { tx: Float32Array; ty: Float32Array };

function shuffledCellIndices(total: number) {
  const arr = new Uint32Array(total);
  for (let i = 0; i < total; i++) arr[i] = i;
  for (let i = total - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

function buildFilledTargets(N: number, grid: { cols: number; rows: number; xs: Float32Array; ys: Float32Array }) {
  const total = grid.cols * grid.rows;
  const idxs = shuffledCellIndices(total);

  const tx = new Float32Array(N);
  const ty = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const c = idxs[i % total]!;
    const cx = c % grid.cols;
    const cy = (c / grid.cols) | 0;
    tx[i] = grid.xs[cx];
    ty[i] = grid.ys[cy];
  }
  return { tx, ty };
}

function buildScatterTargets(N: number, grid: { cols: number; rows: number; xs: Float32Array; ys: Float32Array }) {
  const total = grid.cols * grid.rows;
  const idxs = shuffledCellIndices(total);

  const tx = new Float32Array(N);
  const ty = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const c = idxs[(i * 7) % total]!;
    const cx = c % grid.cols;
    const cy = (c / grid.cols) | 0;
    tx[i] = grid.xs[cx];
    ty[i] = grid.ys[cy];
  }
  return { tx, ty };
}

function buildTargetsFromImage(
  img: HTMLImageElement,
  grid: { cols: number; rows: number; xs: Float32Array; ys: Float32Array },
  Nshape: number,
  whiteCutoff: number,
  fit: Fit,
) {
  const off = document.createElement("canvas");
  off.width = grid.cols;
  off.height = grid.rows;
  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) return buildFilledTargets(Nshape, grid);

  drawFitAnchored(octx, img, grid.cols, grid.rows, fit);
  const data = octx.getImageData(0, 0, grid.cols, grid.rows).data;

  const candidates: number[] = [];
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      const idx = (y * grid.cols + x) * 4;
      if (data[idx + 3] < 10) continue;

      const rr = data[idx];
      const gg = data[idx + 1];
      const bb = data[idx + 2];
      if (rr >= whiteCutoff && gg >= whiteCutoff && bb >= whiteCutoff) continue;

      candidates.push(y * grid.cols + x);
    }
  }

  if (candidates.length < Math.min(180, (grid.cols * grid.rows) / 25)) {
    return buildFilledTargets(Nshape, grid);
  }

  candidates.sort((a, b) => a - b);

  const tx = new Float32Array(Nshape);
  const ty = new Float32Array(Nshape);
  for (let i = 0; i < Nshape; i++) {
    const c = candidates[i % candidates.length]!;
    const cx = c % grid.cols;
    const cy = (c / grid.cols) | 0;
    tx[i] = grid.xs[cx];
    ty[i] = grid.ys[cy];
  }
  return { tx, ty };
}

export default function MorphPixelFrame({
  scenes,
  dark = false,

  className,
  style,

  avoidRef,
  avoidPadding = 30,

  bgLight = "#1EB81B",
  bgDark = "#FFE53A",

  cell = 5,
  pixel = 2,

  filledAlpha = 0.95,
  fillColorLight = "#000000",
  fillColorDark = "#000000",

  shapeRatio = 0.62,
  disperseRatio = 0.55,

  whiteCutoff = 250,
  fit = "contain",

  spring = 0.020,
  damping = 0.90,
  maxSpeed = 2.6,

  mouseRadius = 280,
  mouseDisperseStrength = 3.2,

  mouseTrigger = true,
  mouseTriggerCooldownMs = 900,

  sweepBand = 0.28,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pointer = useRef({
    x: -99999,
    y: -99999,
    inside: false,
    lastMoveT: 0,
    lastX: -99999,
    lastY: -99999,
  });

  const sources = useMemo(() => scenes.map((s) => s.src), [scenes]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    let disposed = false;
    let raf = 0;

    let W = 1, H = 1;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    // stages: 0 = FILLED, 1..S = scenes, then loop back to 0
    let stageIndex = 0;
    let holding = false;
    let stageStart = performance.now();
    let lastTriggerAt = 0;

    let N = 2600;
    let Nshape = 1600;

    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);

    let grid: ReturnType<typeof buildGrid> | null = null;

    let filledTargets: Targets | null = null;
    let scatterTargets: Targets | null = null;
    let perSceneShapeTargets: Targets[] = [];

    const [pr, pg, pb] = hexToRgb(dark ? fillColorDark : fillColorLight);

    const updatePointer = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      const px = clientX - r.left;
      const py = clientY - r.top;

      const now = performance.now();
      pointer.current.lastMoveT = now;
      pointer.current.lastX = pointer.current.x;
      pointer.current.lastY = pointer.current.y;

      pointer.current.x = px;
      pointer.current.y = py;
      pointer.current.inside = px >= 0 && py >= 0 && px <= r.width && py <= r.height;
    };

    const onMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const px = pointer.current.x;
      const py = pointer.current.y;
      pointer.current.inside = px >= 0 && py >= 0 && px <= r.width && py <= r.height;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const rebuild = async () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      grid = buildGrid(W, H, cell, pixel);

      const totalCells = grid.cols * grid.rows;
      N = Math.max(2600, Math.min(7800, Math.floor(totalCells * 0.50)));
      Nshape = Math.floor(N * clamp01(shapeRatio));

      x = new Float32Array(N);
      y = new Float32Array(N);
      vx = new Float32Array(N);
      vy = new Float32Array(N);

      filledTargets = buildFilledTargets(N, grid);
      scatterTargets = buildScatterTargets(N - Nshape, grid);

      // IMPORTANT: start as fully filled (so it doesn’t “grow from center”)
      for (let i = 0; i < N; i++) {
        x[i] = filledTargets.tx[i];
        y[i] = filledTargets.ty[i];
        vx[i] = 0;
        vy[i] = 0;
      }

      const imgs = await Promise.all(sources.map(loadImage));
      if (disposed) return;

      perSceneShapeTargets = imgs.map((img) =>
        buildTargetsFromImage(img, grid!, Nshape, whiteCutoff, fit),
      );

      stageIndex = 0;
      holding = true;         // hold the filled state briefly then transition
      stageStart = performance.now();
    };

    const getTiming = (si: number) => {
      if (si === 0) return { dur: 2600, hold: 600 };
      const meta = scenes[si - 1];
      return { dur: meta?.durationMs ?? 6000, hold: meta?.holdMs ?? 2000 };
    };

    const tick = (tNow: number) => {
      if (disposed) return;
      if (!grid || !filledTargets || !scatterTargets || perSceneShapeTargets.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const stageCount = perSceneShapeTargets.length + 1;

      const { dur, hold } = getTiming(stageIndex);
      let p = (tNow - stageStart) / dur;

      if (!holding && p >= 1) {
        holding = true;
        stageStart = tNow;
        p = 1;
      }

      // allow mouse to advance during hold
      if (mouseTrigger && holding && pointer.current.inside) {
        const dt = Math.max(1, tNow - pointer.current.lastMoveT);
        const dxm = pointer.current.x - pointer.current.lastX;
        const dym = pointer.current.y - pointer.current.lastY;
        const speed = Math.hypot(dxm, dym) / dt;
        if (speed > 0.35 && tNow - lastTriggerAt > mouseTriggerCooldownMs) {
          holding = false;
          stageIndex = (stageIndex + 1) % stageCount;
          stageStart = tNow;
          lastTriggerAt = tNow;
          raf = requestAnimationFrame(tick);
          return;
        }
      }

      if (holding && (tNow - stageStart) >= hold) {
        holding = false;
        stageIndex = (stageIndex + 1) % stageCount;
        stageStart = tNow;
        p = 0;
      }

      const globalEngage = smoothstep(clamp01(p));
      const nextStage = (stageIndex + 1) % stageCount;

      // soft ellipse around text (no visible box)
      let avoidEllipse: { cx: number; cy: number; rx: number; ry: number } | null = null;
      if (avoidRef?.current) {
        const wr = wrap.getBoundingClientRect();
        const tr = avoidRef.current.getBoundingClientRect();
        const x0 = tr.left - wr.left - avoidPadding;
        const y0 = tr.top - wr.top - avoidPadding;
        const x1 = tr.right - wr.left + avoidPadding;
        const y1 = tr.bottom - wr.top + avoidPadding;

        avoidEllipse = {
          cx: (x0 + x1) * 0.5,
          cy: (y0 + y1) * 0.5,
          rx: Math.max(10, (x1 - x0) * 0.55),
          ry: Math.max(10, (y1 - y0) * 0.65),
        };
      }

      // clear
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W * dpr, H * dpr);

      const pxD = pixel * dpr;

      const inside = pointer.current.inside;
      const mx = pointer.current.x;
      const my = pointer.current.y;
      const mr = mouseRadius;
      const mr2 = mr * mr;

      // Determine what the "shape" target set is for the NEXT stage
      const shapeTargetsNext = nextStage === 0 ? null : perSceneShapeTargets[nextStage - 1];

      for (let i = 0; i < N; i++) {
        // Compute the target for this particle
        let tx: number;
        let ty: number;

        if (nextStage === 0) {
          tx = filledTargets.tx[i];
          ty = filledTargets.ty[i];
        } else {
          if (i < Nshape) {
            tx = shapeTargetsNext!.tx[i];
            ty = shapeTargetsNext!.ty[i];
          } else {
            const j = i - Nshape;
            tx = scatterTargets.tx[j];
            ty = scatterTargets.ty[j];
          }
        }

        // Directional sweep (BOTTOM-RIGHT -> LEFT):
        // phase = 0 at bottom-right, 1 near top-left
        const phaseX = (W - tx) / Math.max(1, W);
        const phaseY = (H - ty) / Math.max(1, H);
        const phase = clamp01(0.82 * phaseX + 0.18 * phaseY);

        // local engage is delayed based on phase
        const band = Math.max(0.05, Math.min(0.7, sweepBand));
        const local = clamp01((globalEngage - phase) / band);
        const localEngage = smoothstep(local);

        const k = spring * (0.15 + 0.85 * localEngage);

        // spring towards target (directional)
        vx[i] += (tx - x[i]) * k;
        vy[i] += (ty - y[i]) * k;

        // mouse disperse
        let m = 0;
        if (inside) {
          const dx = x[i] - mx;
          const dy = y[i] - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < mr2) {
            const d = Math.sqrt(d2) + 0.0001;
            m = 1 - d / mr;
            const push = (m * m) * mouseDisperseStrength * 0.22;
            vx[i] += (dx / d) * push;
            vy[i] += (dy / d) * push;
          }
        }

        // soften around text ellipse (no box edge)
        let soft = 0;
        if (avoidEllipse) {
          const nx = (x[i] - avoidEllipse.cx) / avoidEllipse.rx;
          const ny = (y[i] - avoidEllipse.cy) / avoidEllipse.ry;
          const q = nx * nx + ny * ny;
          if (q < 1) {
            soft = 1 - q;
            const len = Math.sqrt(nx * nx + ny * ny) + 1e-6;
            vx[i] += (nx / len) * soft * 0.45;
            vy[i] += (ny / len) * soft * 0.45;
          }
        }

        // cap speed
        const sp = Math.hypot(vx[i], vy[i]);
        if (sp > maxSpeed) {
          const s = maxSpeed / (sp + 1e-6);
          vx[i] *= s;
          vy[i] *= s;
        }

        // integrate
        vx[i] *= damping;
        vy[i] *= damping;
        x[i] += vx[i];
        y[i] += vy[i];

        // clamp bounds
        if (x[i] < 0) { x[i] = 0; vx[i] *= -0.25; }
        if (x[i] > W - pixel) { x[i] = W - pixel; vx[i] *= -0.25; }
        if (y[i] < 0) { y[i] = 0; vy[i] *= -0.25; }
        if (y[i] > H - pixel) { y[i] = H - pixel; vy[i] *= -0.25; }

        const baseA = i < Nshape ? filledAlpha : filledAlpha * disperseRatio;
        const textFade = 1 - soft * 0.85;

        // also fade slightly until the sweep reaches the particle (so the wipe is visible)
        const sweepFade = 0.25 + 0.75 * localEngage;

        const a = clamp01((baseA + m * 0.18) * textFade * sweepFade);

        ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`;
        ctx.fillRect(x[i] * dpr, y[i] * dpr, pxD, pxD);
      }

      raf = requestAnimationFrame(tick);
    };

    rebuild().then(() => {
      raf = requestAnimationFrame(tick);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [
    sources,
    scenes,
    dark,
    avoidRef,
    avoidPadding,
    bgLight,
    bgDark,
    cell,
    pixel,
    filledAlpha,
    fillColorLight,
    fillColorDark,
    shapeRatio,
    disperseRatio,
    whiteCutoff,
    fit,
    spring,
    damping,
    maxSpeed,
    mouseRadius,
    mouseDisperseStrength,
    mouseTrigger,
    mouseTriggerCooldownMs,
    sweepBand,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        height: "100%",
        backgroundColor: dark ? bgDark : bgLight,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}