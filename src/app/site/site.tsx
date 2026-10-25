import { useEffect, useState } from "react";
import { motion } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout system for the redesigned pages. Pages are authored on the
// 1920×1080 Figma frame and scaled to the viewport, so numbers are design px.
// ─────────────────────────────────────────────────────────────────────────────
export const DESIGN_W = 1920;
export const DESIGN_H = 1080;
export const MIN_STAGE_W = 1600; // narrowest stage (in design px) before we scale down by width

export const NAV_X = 64; // page side margin; Figma: 120
export const NAV_TOP = 32;
export const CONTENT_TOP = 164; // where the first row of content starts below the menu
export const GAP = 42; // space between cards; Figma: 32
export const RADIUS = 18;

// Figma uses Proxima Nova, which isn't licensed for web use; Figtree is the closest free match
export const SANS = "'Figtree', system-ui, sans-serif";
export const MONO = "'Source Code Pro', ui-monospace, monospace";
export const SERIF = "'EB Garamond', Georgia, serif";
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export type SitePage = "home" | "work" | "play" | "about";

// Every link brightens and lifts slightly
export const LINK_CLASS =
  "relative outline-none transition-[opacity,transform] duration-300 ease-out hover:opacity-100 hover:-translate-y-px " +
  "focus-visible:opacity-100 focus-visible:-translate-y-px focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4";

// ── Stage scaling ────────────────────────────────────────────────────────────
export function useStageScale() {
  const compute = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.min(h / DESIGN_H, w / MIN_STAGE_W);
    return { scale, stageW: w / scale, viewportH: h };
  };
  const [state, setState] = useState(compute);
  useEffect(() => {
    const onResize = () => setState(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return state;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP NAV — identical on every redesigned page
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS: { page: SitePage; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "work", label: "Work" },
  { page: "play", label: "Play" },
  { page: "about", label: "About" },
];

export function TopNav({ current, onSelect, navRef, ink = "#000000" }: {
  current: SitePage;
  onSelect: (page: SitePage) => void;
  navRef?: React.Ref<HTMLElement>;
  ink?: string;
}) {
  return (
    <motion.nav
      ref={navRef}
      className="absolute z-20 flex items-center"
      style={{ left: NAV_X, top: NAV_TOP, gap: 18 }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
    >
      {NAV_ITEMS.map(item => {
        const isCurrent = item.page === current;
        return (
          <button
            key={item.page}
            onClick={() => onSelect(item.page)}
            aria-current={isCurrent ? "page" : undefined}
            className={`text-center whitespace-nowrap cursor-pointer ${isCurrent ? "opacity-100" : "opacity-20"} ${LINK_CLASS}`}
            style={{
              fontSize: 20,
              lineHeight: 1.1,
              letterSpacing: -1,
              fontWeight: isCurrent ? 600 : 400,
              color: ink,
              transition: "color 0.45s ease-in-out, opacity 0.3s ease-out",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </motion.nav>
  );
}
