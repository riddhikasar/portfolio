import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

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
export const MENU_SIZE = 22; // top menu and Play filters; Figma: 20

// Figma uses Proxima Nova, which isn't licensed for web use; Figtree is the closest free match
export const SANS = "'Figtree', system-ui, sans-serif";
export const MONO = "'Source Code Pro', ui-monospace, monospace";
export const SERIF = "'EB Garamond', Georgia, serif";
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// The site's only greys: readable secondary text, captions, faded/inactive things, and card backgrounds
export const TEXT_OPACITY = 0.8; // body and any secondary text (Home's descriptions)
export const FADED_OPACITY = 0.2; // inactive menu items, idle dots
export const TEXT_GREY = `rgba(0,0,0,${TEXT_OPACITY})`;
export const FADED_GREY = `rgba(0,0,0,${FADED_OPACITY})`;
export const CAPTION_GREY = "rgba(0,0,0,0.5)"; // captions under images and videos
export const SURFACE = "#f8fafc"; // every card, callout and poem background
export const HAIRLINE = "1px solid rgba(0,0,0,0.08)"; // thin borders and dividers

// Card hover shared by Home and Play: lift, grow slightly, soft shadow. HOVER_SPRING is also the
// card's resting transition, so it settles back immediately when the cursor leaves.
export const HOVER_SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
export const CARD_HOVER = { scale: 1.02, y: -6, boxShadow: "0px 18px 40px rgba(0,0,0,0.16)" };

export type SitePage = "home" | "work" | "play" | "about";

// Every link brightens and lifts slightly
export const LINK_CLASS =
  "relative outline-none transition-[opacity,transform] duration-300 ease-out hover:opacity-100 hover:-translate-y-0.5 " +
  "focus-visible:opacity-100 focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4";

// ── Scrolling ────────────────────────────────────────────────────────────────
// Smooth scroll that always lands (the browser's own smooth scroll gets cut short on long pages).
// Wheel, touch or keys cancel it straight away.
export function scrollToY(target: number) {
  const from = window.scrollY;
  const distance = Math.abs(target - from);
  if (distance < 2) return;
  const controls = animate(from, target, {
    duration: Math.min(1.4, 0.5 + distance / 6000),
    ease: [0.65, 0, 0.35, 1],
    onUpdate: v => window.scrollTo(0, v),
  });
  const cancel = () => { controls.stop(); off(); };
  const off = () => ["wheel", "touchstart", "keydown"].forEach(e => window.removeEventListener(e, cancel));
  ["wheel", "touchstart", "keydown"].forEach(e => window.addEventListener(e, cancel, { passive: true }));
  controls.then(off);
}

// True once the page is scrolled to (within `offset` px of) its end
export function useAtBottom(offset = 80) {
  const [atBottom, setAtBottom] = useState(false);
  useEffect(() => {
    // Ignore the first moments: pages measure and set their height just after mounting, and until
    // then a short page would read as "at the bottom"
    let ready = false;
    const check = () => ready && setAtBottom(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - offset);
    const t = window.setTimeout(() => { ready = true; check(); }, 500);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // pages set their height after measuring their content, so re-check when it changes
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    return () => { window.clearTimeout(t); window.removeEventListener("scroll", check); window.removeEventListener("resize", check); ro.disconnect(); };
  }, [offset]);
  return atBottom;
}

// ── Footer ───────────────────────────────────────────────────────────────────
// "© Riddhi Kasar 2026", bottom-left in the menu's margin, styled like "To the top" (menu size, faded grey). Pages show it once you reach the end.
export function SiteFooter({ show, scale }: { show: boolean; scale: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          key="footer"
          className="fixed z-20 whitespace-nowrap pointer-events-none"
          style={{
            left: NAV_X * scale, bottom: NAV_TOP * scale, color: FADED_GREY, fontWeight: 400,
            fontSize: MENU_SIZE * scale, lineHeight: 1.1, letterSpacing: -MENU_SIZE * 0.05 * scale,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          © Riddhi Kasar 2026
        </motion.p>
      )}
    </AnimatePresence>
  );
}

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
      style={{ left: NAV_X, top: NAV_TOP, gap: 20 }}
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
              fontSize: MENU_SIZE,
              lineHeight: 1.1,
              letterSpacing: -MENU_SIZE * 0.05,
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

// ── To the top ───────────────────────────────────────────────────────────────
// Bottom-right, as far from the bottom as the menu is from the top; arrow lifts on hover.
// Defaults to scrolling the page up; Home passes its own `onClick` (it scrolls sideways).
export function ToTop({ show, scale, onClick = () => scrollToY(0) }: { show: boolean; scale: number; onClick?: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="top"
          className="fixed z-20"
          style={{ right: NAV_X * scale, bottom: NAV_TOP * scale }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <button
            onClick={onClick}
            className={`group flex items-center cursor-pointer opacity-20 ${LINK_CLASS}`}
            style={{ fontSize: MENU_SIZE * scale, lineHeight: 1.1, letterSpacing: -MENU_SIZE * 0.05 * scale, fontWeight: 400, gap: 6 * scale, color: "#000" }}
          >
            To the top
            <ArrowUp size={18 * scale} strokeWidth={2} className="transition-transform duration-300 ease-out group-hover:-translate-y-[3px]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// True once the page has scrolled past `offset` px
export function useScrolled(offset = 400) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > offset);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [offset]);
  return scrolled;
}

// ── Hello card ───────────────────────────────────────────────────────────────
// Shade over the sky photo so the white text reads: darker behind the text at the top, clearing
// towards the grass. Used by Home's hello/magic cards and About's card.
export const HELLO_SHADE =
  "linear-gradient(180deg, rgba(0,20,45,0.42) 0%, rgba(0,20,45,0.34) 40%, rgba(0,20,45,0.12) 70%, rgba(0,0,0,0.05) 100%)";
export const HELLO_TEXT_SHADOW = "0 2px 18px rgba(0,15,35,0.35)";

// Home's hello/magic card flips over (to 90°) and hands off to About, whose card finishes the flip
export const FLIP = { duration: 0.42, ease: [0.55, 0, 0.75, 0.3], perspective: 1400 } as const;
export const pageHandoff = { flipToAbout: false, flipToHome: false }; // About's card flips back to Home the same way
