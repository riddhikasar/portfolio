import { useEffect, useRef } from "react";

const mouse = { x: -9999, y: -9999 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true },
  );
}

export function BitIcon({ dark }: { dark: boolean }) {
  const color = dark ? "#ffea00" : "#1eb81b";
  const eyeColor = dark ? "black" : "white";
  const boxRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ex = 0;
    let ey = 0;
    let raf = 0;

    const tick = () => {
      const box = boxRef.current;
      const eye = eyeRef.current;
      if (box && eye) {
        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const max = 1.5;
        const tx = d > 0 && d < 9999 ? (dx / d) * max * Math.min(1, d / 160) : 0;
        const ty = d > 0 && d < 9999 ? (dy / d) * max * Math.min(1, d / 160) : 0;
        ex += (tx - ex) * 0.1;
        ey += (ty - ey) * 0.1;
        eye.style.transform = `translate(${ex.toFixed(2)}px,${ey.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={boxRef}
      className="inline-grid shrink-0"
      style={{ gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}
    >
      <div style={{ backgroundColor: color, width: 14, height: 14, gridColumn: 1, gridRow: 1 }} />
      <div
        ref={eyeRef}
        style={{
          gridColumn: 1,
          gridRow: 1,
          marginLeft: 3.5,
          marginTop: 5,
          width: 7,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 2, height: 4, backgroundColor: eyeColor }} />
        <div style={{ width: 2, height: 4, backgroundColor: eyeColor }} />
      </div>
    </div>
  );
}

export function BitText({ dark, lines }: { dark: boolean; lines: string[] }) {
  const color = dark ? "#ffea00" : "#1eb81b";
  return (
    <div className="flex items-center gap-[12px]">
      <BitIcon dark={dark} />
      <div className="font-['Source_Code_Pro'] text-[10px] font-normal whitespace-nowrap" style={{ color }}>
        {lines.map((line, i) => (
          <p key={line} className={i < lines.length - 1 ? "mb-0 leading-normal" : "leading-normal"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
