import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { ArrowUpRight } from "lucide-react";

import introBg from "@/assets/home/intro_bg.avif";
import noonchiScreen from "@/assets/home/noonchi_screen.avif";
import noonchiLogo from "@/assets/home/noonchi_logo.png";
import relevoImg from "@/assets/home/relevo.avif";
import relevoLogo from "@/assets/home/relevo_logo.png";
import trodImg from "@/assets/home/trod.avif";
import playgroundImg from "@/assets/home/playground.avif";
import lineContact from "@/assets/home/line_contact.svg";
import star from "@/assets/home/star.svg";
import {
  CARD_HOVER, DESIGN_H, EASE_OUT, FADED_GREY, FLIP, GAP, HELLO_SHADE, HELLO_TEXT_SHADOW, HOVER_SPRING, LINK_CLASS, NAV_X, pageHandoff, SANS, SiteFooter, SURFACE, TEXT_OPACITY, ToTop, TopNav, useStageScale, type SitePage,
} from "../site/site";

// ─────────────────────────────────────────────────────────────────────────────
// Layout is authored on the 1920×1080 Figma frame and scaled to the viewport,
// so every number below is a design pixel.
// ─────────────────────────────────────────────────────────────────────────────
const PAD_X = 120;
const CARD_TOP = 242;
const CARD_H = 667;
const HEADING_TOP = 164;
const SMALL_W = 539;
const WIDE_W = 1395;


type NavTarget = SitePage | "play-all" | "noonchi" | "relevo" | "trod";

// ── Light / dark palette (page chrome only — cards keep their own artwork) ──
const LIGHT = { bg: "#ffffff", ink: "#000000", dotIdle: FADED_GREY, trackDot: "rgba(0,0,0,0.28)", starFilter: "invert(0)" };
const DARK = { bg: "#0b0b0c", ink: "#ffffff", dotIdle: "#3a3a3d", trackDot: "rgba(255,255,255,0.3)", starFilter: "invert(1)" };
type Palette = typeof LIGHT;
const PaletteContext = createContext<Palette>(LIGHT);
const usePalette = () => useContext(PaletteContext);
const COLOR_TRANSITION = { duration: 0.45, ease: "easeInOut" } as const;

type Slide = { width: number; left: number };
const SLIDE_WIDTHS = [SMALL_W, WIDE_W, WIDE_W, WIDE_W, WIDE_W, SMALL_W];
const SLIDES: Slide[] = SLIDE_WIDTHS.reduce<Slide[]>((acc, width, i) => {
  const left = i === 0 ? PAD_X : acc[i - 1].left + acc[i - 1].width + GAP;
  acc.push({ width, left });
  return acc;
}, []);
const TRACK_END = SLIDES[SLIDES.length - 1].left + SMALL_W + PAD_X;

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage({ navigate, dark }: {
  navigate: (p: NavTarget) => void;
  dark: boolean;
}) {
  const palette = dark ? DARK : LIGHT;
  const { scale, stageW, viewportH } = useStageScale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);

  // Right edge of the nav (design px) — the first card rests aligned under it
  const navRef = useRef<HTMLElement>(null);
  const [navEnd, setNavEnd] = useState(NAV_X + 236);
  useEffect(() => {
    const measure = () => { if (navRef.current) setNavEnd(NAV_X + navRef.current.offsetWidth); };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  // First card rests aligned under the end of the nav, the last mirrors it on the right,
  // and every card in between rests centred
  const offsetFor = useCallback((i: number) => {
    const sl = SLIDES[i];
    if (i === 0) return -(sl.left - navEnd);
    if (i === SLIDES.length - 1) return -(sl.left + sl.width - (stageW - navEnd));
    return -(sl.left + sl.width / 2 - stageW / 2);
  }, [stageW, navEnd]);

  // ── Smooth scroll engine ───────────────────────────────────────────────────
  // Input moves a target; the track eases toward it every frame, then the
  // target settles on a slide once input goes quiet.
  const target = useRef(0);
  const anchor = useRef(0); // slide the current gesture started from
  const gestureActive = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const clamp = useCallback(
    (v: number) => Math.max(offsetFor(SLIDES.length - 1), Math.min(offsetFor(0), v)),
    [offsetFor],
  );
  const nearestIndex = useCallback((pos: number) => {
    let best = 0;
    SLIDES.forEach((_, i) => {
      if (Math.abs(offsetFor(i) - pos) < Math.abs(offsetFor(best) - pos)) best = i;
    });
    return best;
  }, [offsetFor]);

  const go = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(SLIDES.length - 1, i));
    target.current = offsetFor(idx);
    anchor.current = idx;
  }, [offsetFor]);

  // Snap to a slide, leaning in the direction the user was heading
  const settle = useCallback(() => {
    gestureActive.current = false;
    const from = anchor.current;
    const travelled = target.current - offsetFor(from);
    let idx = nearestIndex(target.current);
    if (idx === from && Math.abs(travelled) > 60) idx = from + (travelled < 0 ? 1 : -1);
    go(idx);
  }, [go, nearestIndex, offsetFor]);

  const nudge = useCallback((deltaDesign: number) => {
    if (!gestureActive.current) {
      gestureActive.current = true;
      anchor.current = nearestIndex(target.current);
    }
    target.current = clamp(target.current - deltaDesign);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(settle, 140);
  }, [clamp, nearestIndex, settle]);

  // Keep the active slide aligned when the window is resized (and start in place, no glide-in)
  const placed = useRef(false);
  useEffect(() => {
    go(anchor.current);
    if (!placed.current) { x.set(target.current); placed.current = true; }
  }, [go, x]);

  useAnimationFrame((_, delta) => {
    const k = reduceMotion ? 1 : 1 - Math.exp(-delta / 130);
    const cur = x.get();
    const next = cur + (target.current - cur) * k;
    if (Math.abs(target.current - next) < 0.05) { if (cur !== target.current) x.set(target.current); }
    else x.set(next);
  });

  useMotionValueEvent(x, "change", v => {
    const idx = nearestIndex(v);
    setActive(a => (a === idx ? a : idx));
  });

  const step = useCallback((dir: 1 | -1) => go(anchor.current + dir), [go]);

  // ── Wheel / trackpad ───────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
      nudge((delta * 1.2) / scale);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nudge, scale]);

  // ── Keyboard ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const onControl = e.target instanceof Element && e.target.closest("button, a, [role='link']");
      if (onControl && (e.key === " " || e.key === "Enter")) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); step(1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); step(-1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, step]);

  // ── Touch drag ─────────────────────────────────────────────────────────────
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    lastTouch.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) { lastTouch.current = null; return; } // pinch-zoom
    if (!lastTouch.current) return;
    const t = e.touches[0];
    const dx = lastTouch.current.x - t.clientX;
    const dy = lastTouch.current.y - t.clientY;
    lastTouch.current = { x: t.clientX, y: t.clientY };
    nudge((Math.abs(dx) > Math.abs(dy) ? dx : dy) * 1.5 / scale);
  };
  const onTouchEnd = () => { lastTouch.current = null; };

  // Track positions (design px travelled) at which each slide is at rest
  const stops = SLIDES.map((_, i) => -offsetFor(i));

  // Lock page scroll while the home page is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const onFocusCapture = (e: React.FocusEvent) => {
    const slideEl = (e.target as HTMLElement).closest<HTMLElement>("[data-slide]");
    if (slideEl) go(Number(slideEl.dataset.slide));
    requestAnimationFrame(() => {
      if (rootRef.current) { rootRef.current.scrollLeft = 0; rootRef.current.scrollTop = 0; }
    });
  };

  const stageH = DESIGN_H * scale;

  return (
    <PaletteContext.Provider value={palette}>
    <MotionConfig reducedMotion="user">
    <motion.div
      ref={rootRef}
      className="fixed inset-0 overflow-hidden"
      style={{ fontFamily: SANS, touchAction: "pinch-zoom" }}
      onFocusCapture={onFocusCapture}
      initial={false}
      animate={{ backgroundColor: palette.bg }}
      transition={COLOR_TRANSITION}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="absolute left-0 origin-top-left"
        style={{
          width: stageW,
          height: DESIGN_H,
          top: Math.max(0, (viewportH - stageH) / 2),
          transform: `scale(${scale})`,
        }}
      >
        <TopNav
          current="home"
          navRef={navRef}
          ink={palette.ink}
          onSelect={page => (page === "home" ? go(0) : navigate(page))}
        />

        {/* Sliding track */}
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ x, width: TRACK_END }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured work"
        >
          <IntroCard slide={SLIDES[0]} onOpen={() => navigate("about")} />

          <ProjectSlide
            index={1}
            slide={SLIDES[1]}
            active={active}
            x={x}
            fillFrom={stops[0]}
            fillTo={stops[1]}
            heading="I design and ship interfaces"
            onOpen={() => navigate("noonchi")}
            title="Noonchi"
            logo={{ src: noonchiLogo, w: 32, h: 25 }}
            description="Co-founding and building Noonchi - an intelligent app + wearable system to help autistic individuals make implicit social cues more explicit for clearer communication."
            tone="light"
            stripBg="rgba(248,250,252,0.8)"
            media={
              <div
                className="absolute rounded-[12px] overflow-hidden"
                style={{ left: 183, top: 72, width: 1029, height: 669, boxShadow: "0px 6px 24px 0px rgba(0,0,0,0.15)" }}
              >
                <img src={noonchiScreen} alt="Noonchi app interface" className="absolute inset-0 size-full object-cover" draggable={false} />
              </div>
            }
          />

          <ProjectSlide
            index={2}
            slide={SLIDES[2]}
            active={active}
            x={x}
            fillFrom={stops[1]}
            fillTo={stops[2]}
            heading="That shape how humans interact with intelligent systems"
            onOpen={() => navigate("relevo")}
            title="Relevo"
            logo={{ src: relevoLogo, w: 17, h: 25 }}
            description="Building a physician-facing clinical dashboard and a soft-robotic wearable device for assisting in post knee surgery recovery."
            tone="dark"
            stripBg="rgba(255,255,255,0.01)"
            media={
              <img
                src={relevoImg}
                alt="Relevo wearable and clinical dashboard"
                className="absolute object-cover"
                style={{ left: 0, top: -148, width: WIDE_W, height: 858 }}
                draggable={false}
              />
            }
            parallax
          />

          <ProjectSlide
            index={3}
            slide={SLIDES[3]}
            active={active}
            x={x}
            fillFrom={stops[2]}
            fillTo={stops[3]}
            heading="I also build robots"
            onOpen={() => navigate("trod")}
            title="TROD"
            description="Building a tactile robotic obstacle detector for EMG-controlled navigation and prosthetic applications."
            tone="light"
            stripBg="rgba(248,250,252,0.6)"
            stripBlur={24}
            media={
              <img
                src={trodImg}
                alt="TROD robot"
                className="absolute object-cover"
                style={{ left: -27, top: -23, width: 1422, height: 760 }}
                draggable={false}
              />
            }
            parallax
          />

          <ProjectSlide
            index={4}
            slide={SLIDES[4]}
            active={active}
            x={x}
            fillFrom={stops[3]}
            fillTo={stops[4]}
            heading="And take photos of, write about, and draw things that catch my eye"
            showLine={false}
            onOpen={() => navigate("play-all")}
            media={
              <img
                src={playgroundImg}
                alt="Frozen river at golden hour"
                className="absolute object-cover"
                style={{ left: 0, top: -42, width: WIDE_W, height: 752 }}
                draggable={false}
              />
            }
            parallax
          />

          <OutroCard slide={SLIDES[5]} onOpen={() => navigate("about")} />
        </motion.div>

        <Dots count={SLIDES.length} active={active} onSelect={go} />
      </div>
    </motion.div>
    {/* Home scrolls sideways, so its end is the last slide */}
    <SiteFooter show={active === SLIDES.length - 1} scale={scale} />
    <ToTop show={active > 0} scale={scale} onClick={() => go(0)} />
    </MotionConfig>
    </PaletteContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT LINKS (shared by intro + outro)
// ─────────────────────────────────────────────────────────────────────────────
export function ContactLinks() {
  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/riddhikasar/" },
    { label: "Email", href: "mailto:riddhikasar02@gmail.com" },
    { label: "CV", href: undefined }, // TODO: add CV link
  ];
  return (
    <div className="flex flex-col items-start" style={{ gap: 4, width: 313 }}>
      <img src={lineContact} alt="" width={313} height={0.5} className="block" draggable={false} />
      <div className="flex items-center" style={{ gap: 12 }}>
        {links.map(l => !l.href ? (
          <span
            key={l.label}
            onClick={e => e.stopPropagation()}
            aria-disabled
            className="whitespace-nowrap text-white opacity-80"
            style={{ fontSize: 18, lineHeight: 1.1, letterSpacing: -0.9 }}
          >
            {l.label}
          </span>
        ) : (
          <a
            key={l.label}
            href={l.href}
            target={l.href?.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            onClick={e => e.stopPropagation()} // don't also open the card
            className={`group whitespace-nowrap text-white opacity-80 ${LINK_CLASS}`}
            style={{ fontSize: 18, lineHeight: 1.1, letterSpacing: -0.9 }}
          >
            {l.label}
            {/* Contact links also draw an underline from the left */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 bg-current origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              style={{ bottom: -3, height: 1 }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO / OUTRO CARDS
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCard({ slide, index, tilt, onOpen, children }: {
  slide: Slide;
  index: number;
  tilt: number; // degrees to rotate on hover
  onOpen: () => void;
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  // Arriving from About's card (hello card only): finish its flip
  const [flipIn] = useState(() => {
    if (index !== 0 || !pageHandoff.flipToHome) return false;
    pageHandoff.flipToHome = false;
    return true;
  });
  // Clicking flips the card edge-on, then About opens and its card turns the rest of the way
  const [flipping, setFlipping] = useState(false);
  const flip = () => {
    if (flipping) return;
    pageHandoff.flipToAbout = true;
    setFlipping(true);
    window.setTimeout(onOpen, FLIP.duration * 1000); // open About once the card is edge-on
  };
  return (
    <motion.div
      data-slide={index}
      className="absolute rounded-[18px] overflow-hidden cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ left: slide.left, top: CARD_TOP, width: SMALL_W, height: CARD_H, transformPerspective: FLIP.perspective, zIndex: flipping ? 5 : undefined }}
      role="link"
      tabIndex={0}
      aria-label="About Riddhi"
      onClick={flip}
      onKeyDown={e => { if (e.key === "Enter" && e.target === e.currentTarget) flip(); }}
      initial={flipIn ? { opacity: 1, rotateY: -90, scale: 1.04 } : { opacity: 0, scale: 0.97 }}
      animate={
        flipping ? { opacity: 1, rotateY: 90, scale: 1.04, rotate: 0, y: 0, boxShadow: "0px 30px 60px rgba(0,0,0,0.2)", transition: { duration: FLIP.duration, ease: FLIP.ease } }
        : entered ? { opacity: 1, scale: 1, rotateY: 0 }
        : { opacity: 1, scale: 1, rotateY: 0, transition: { duration: flipIn ? 0.55 : 0.9, ease: EASE_OUT } }
      }
      onAnimationComplete={() => { if (!flipping) setEntered(true); }}
      transition={HOVER_SPRING}
      whileHover={flipping ? undefined : { ...CARD_HOVER, rotate: tilt }}
      whileTap={flipping ? undefined : { scale: 0.99, transition: { duration: 0.1 } }}
    >
      <img src={introBg} alt="" className="absolute inset-0 size-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ background: HELLO_SHADE }} />
      {children}
    </motion.div>
  );
}

// Hello card text rises in, unless the card is flipping back from About (then it's already there)
const rise = (delay: number, instant = false) => ({
  initial: instant ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
} as const);

function IntroCard({ slide, onOpen }: { slide: Slide; onOpen: () => void }) {
  const [instant] = useState(() => pageHandoff.flipToHome); // read before the card clears it
  return (
    <PhotoCard slide={slide} index={0} tilt={-2} onOpen={onOpen}>
      <div className="absolute flex flex-col items-start text-white" style={{ left: 113, top: 185, gap: 32, textShadow: HELLO_TEXT_SHADOW }}>
        <h1 style={{ fontSize: 72, lineHeight: 1.1, letterSpacing: -3.6, fontWeight: 500 }} className="whitespace-nowrap">
          <motion.span className="block" {...rise(0.35, instant)}>
            Hello!
            <motion.span
              className="inline-block"
              style={{ originX: 0.7, originY: 0.7 }}
              animate={{ rotate: [0, 18, -8, 18, 0] }}
              transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
              whileHover={{ rotate: [0, 18, -8, 18, 0], transition: { duration: 1 } }}
            >
              👋
            </motion.span>
          </motion.span>
          <motion.span className="block" {...rise(0.45, instant)}>I’m Riddhi</motion.span>
        </h1>
        <motion.p
          className="whitespace-nowrap"
          style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 }}
          {...rise(0.6, instant)}
        >
          A Design Engineer
        </motion.p>
        <motion.div {...rise(0.75, instant)}>
          <ContactLinks />
        </motion.div>
      </div>
    </PhotoCard>
  );
}

function OutroCard({ slide, onOpen }: { slide: Slide; onOpen: () => void }) {
  return (
    <PhotoCard slide={slide} index={SLIDES.length - 1} tilt={2} onOpen={onOpen}>
      <div className="absolute flex flex-col items-start text-white" style={{ left: 68, top: 141, gap: 32, textShadow: HELLO_TEXT_SHADOW }}>
        <p style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500, width: 347 }}>
          True depth comes from applying everything you know to everything you do.
        </p>
        <p className="whitespace-nowrap" style={{ fontSize: 62, lineHeight: 1.1, letterSpacing: -3.1, fontWeight: 500 }}>
          Create Magic{" "}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </p>
        <ContactLinks />
      </div>
    </PhotoCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT SLIDE
// ─────────────────────────────────────────────────────────────────────────────
function ProjectSlide({
  index, slide, active, x, fillFrom, fillTo, heading, showLine = true, onOpen,
  title, logo, description, tone = "light", stripBg, stripBlur = 12, media, parallax,
}: {
  index: number;
  slide: Slide;
  active: number;
  x: MotionValue<number>;
  fillFrom: number;
  fillTo: number;
  heading: string;
  showLine?: boolean;
  onOpen?: () => void;
  title?: string;
  logo?: { src: string; w: number; h: number };
  description?: string;
  tone?: "light" | "dark";
  stripBg?: string;
  stripBlur?: number;
  media: React.ReactNode;
  parallax?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [entered, setEntered] = useState(false);
  const revealed = index <= Math.max(active, 0) + 1;
  const isActive = index === active;
  const fg = tone === "dark" ? "white" : "black";
  const palette = usePalette();

  // Media drifts slightly against the track for depth
  const restX = -fillTo;
  const mediaX = useTransform(x, v => Math.max(-60, Math.min(60, (v - restX) * -0.06)));

  // Line fills as you arrive from the previous slide and stays filled
  const fill = useTransform(x, v => Math.min(1, Math.max(0, (-v - fillFrom) / (fillTo - fillFrom))));

  const headingWords = heading.split(" ");

  return (
    <>
      {/* Heading row: star · words · journey line running to the card edge */}
      <div className="absolute flex items-center" style={{ left: slide.left, top: HEADING_TOP, width: slide.width, height: 46 }}>
        <motion.img
          src={star}
          alt=""
          width={38}
          height={39}
          className="shrink-0"
          style={{ marginRight: 18, filter: palette.starFilter, transition: "filter 0.45s ease-in-out" }}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0, rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
          draggable={false}
        />
        <motion.h2
          className="whitespace-nowrap shrink-0"
          style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500, color: palette.ink, transition: "color 0.45s ease-in-out" }}
        >
          {headingWords.map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              // Padding lets glyphs that overhang their box (tight tracking) show; negative margin keeps spacing unchanged
              style={{ padding: "0 0.12em 4px", margin: "0 -0.12em -4px" }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: revealed ? "0%" : "110%" }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 + i * 0.04 }}
              >
                {w}
                {i < headingWords.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        {showLine && <JourneyLine fill={fill} revealed={revealed} />}
      </div>

      {/* Card */}
      <motion.div
        className={`absolute rounded-[18px] overflow-hidden bg-[#f8fafc] outline-none ${onOpen ? "group cursor-pointer" : ""}`}
        style={{ left: slide.left, top: CARD_TOP, width: slide.width, height: CARD_H }}
        data-slide={index}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={onOpen}
        role={onOpen ? "link" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onKeyDown={e => { if (onOpen && e.key === "Enter") onOpen(); }}
        aria-label={title ? `Open ${title} case study` : onOpen ? heading : undefined}
        initial={{ opacity: 0, y: 40 }}
        // Entrance timing applies only until the card has arrived, so leaving hover springs straight back
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.15 + index * 0.08 } }}
        onAnimationComplete={() => setEntered(true)}
        transition={HOVER_SPRING}
        whileHover={onOpen ? CARD_HOVER : undefined}
        whileTap={onOpen ? { scale: 0.99, transition: { duration: 0.1 } } : undefined}
      >
        <motion.div
          className="absolute inset-0"
          style={{ x: parallax ? mediaX : 0 }}
          animate={{ scale: parallax ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {media}
        </motion.div>

        {title && (
          <>
            {/* Frosted strip — mask feathers the top edge (a parent `filter` would disable the backdrop blur) */}
            <div
              className="absolute"
              style={{
                left: -24,
                top: 482,
                width: slide.width + 48,
                height: 207,
                background: stripBg,
                backdropFilter: `blur(${stripBlur}px)`,
                WebkitBackdropFilter: `blur(${stripBlur}px)`,
                maskImage: "linear-gradient(to bottom, transparent 0, black 28px)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 28px)",
              }}
            />

            <div className="absolute flex flex-col items-start" style={{ left: 72, top: 542, width: 790, gap: 13 }}>
              <div className="flex items-center" style={{ gap: 12 }}>
                {logo && (
                  <img src={logo.src} alt="" width={logo.w} height={logo.h} className="object-cover shrink-0" style={{ width: logo.w, height: logo.h }} draggable={false} />
                )}
                <p className="relative whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-y-px" style={{ fontSize: 32, lineHeight: 1.1, letterSpacing: -1.6, fontWeight: 500, color: fg }}>
                  {title}
                </p>
                {onOpen && (
                  <motion.span
                    className="flex"
                    style={{ color: fg }}
                    initial={false}
                    animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -8, y: hover ? 0 : 8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    aria-hidden
                  >
                    <ArrowUpRight size={28} strokeWidth={1.75} />
                  </motion.span>
                )}
              </div>
              <p style={{ fontSize: 20, lineHeight: "normal", letterSpacing: -0.2, opacity: TEXT_OPACITY, color: fg }}>{description}</p>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOURNEY LINE — faint dotted track; a solid line fills over it with scroll
// ─────────────────────────────────────────────────────────────────────────────
function JourneyLine({ fill, revealed }: { fill: MotionValue<number>; revealed: boolean }) {
  const { ink, trackDot } = usePalette();
  // Dots only remain ahead of the solid line
  const dotsClip = useTransform(fill, f => `inset(0 0 0 ${f * 100}%)`);
  return (
    <motion.div
      aria-hidden
      className="relative flex-1 min-w-0 flex items-center"
      style={{ marginLeft: 28, marginTop: 4, height: 3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: revealed ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }}
    >
      {/* Dotted track */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: dotsClip,
          backgroundImage: `radial-gradient(circle, ${trackDot} 0.8px, transparent 1.1px)`,
          backgroundSize: "6px 3px",
          backgroundRepeat: "repeat-x",
        }}
      />
      {/* Solid progress */}
      <motion.div className="absolute left-0 right-0" style={{ height: 0.75, opacity: 0.35, scaleX: fill, originX: 0, backgroundColor: ink }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION DOTS
// ─────────────────────────────────────────────────────────────────────────────
const DOT_LABELS = ["Hello", "Noonchi", "Relevo", "TROD", "Play", "Create Magic"];

function Dots({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) {
  const { ink, dotIdle } = usePalette();
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div
      className="absolute z-20 flex items-center -translate-x-1/2"
      style={{ left: "50%", top: 1036, height: 20 }}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active;
        const isHovered = i === hovered;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-label={`Go to ${DOT_LABELS[i]}`}
            aria-current={isActive ? "true" : undefined}
            className="relative flex items-center justify-center cursor-pointer outline-none"
            style={{ height: 20, padding: "0 5px" }}
          >
            <motion.span
              className="block rounded-full"
              style={{ height: 8 }}
              initial={false}
              animate={{
                width: isActive ? 24 : 8,
                scale: isHovered ? 1.5 : 1,
                backgroundColor: isActive || isHovered ? ink : dotIdle,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="pointer-events-none absolute left-1/2 whitespace-nowrap"
                  style={{ bottom: "100%", marginBottom: 10, x: "-50%", fontSize: 20, lineHeight: 1.1, letterSpacing: -1, color: ink }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  {DOT_LABELS[i]}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
