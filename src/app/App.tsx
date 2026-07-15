import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import NoonchiPage from "./NoonchiPage";
import LiquidPage from "./LiquidPage";
import RelevoPage from "./RelevoPage";
import WaterPage from "./WaterPage";
import TRODPage from "./TRODPage";
import LiquidRoboticsPage from "./LiquidRoboticsPage";
import RelevoRoboticsPage from "./RelevoRoboticsPage";
import LinkPage from "./LinkPage";
import EpicurePage from "./Epicure Page";

// ── Project thumbnails ─────────────────────────────────────────────
import thumbNoonchi from "@/assets/thumbnails/noonchi_thumbnail.png";
import thumbLiquidData from "@/assets/thumbnails/liquid_thumbnail.png";
import thumbRelevo from "@/assets/thumbnails/relevo_thumbnail.png";
import thumbSacredWater from "@/assets/thumbnails/water_thumbnail.png";
import thumbTrod from "@/assets/thumbnails/trod_thumbnail.png";
import thumbLiquidRobotics from "@/assets/thumbnails/liquidrobotics_thumbnail.png";
import thumbRelevoRobotics from "@/assets/thumbnails/relevorobotics_thumbnail.png";
import thumbLink from "@/assets/thumbnails/link_thumbnail.png";
import thumbEpicure from "@/assets/thumbnails/epicure_thumbnail.png";

// ── About images ──────────────────────────────────────────────────────────────
import MorphField from "./components/MorphField";

import sky from "@/assets/aboutMorph/sky.png";
import bird from "@/assets/aboutMorph/bird.png";
import flower from "@/assets/aboutMorph/flower.png";
import deer from "@/assets/aboutMorph/deer.png";
import forest from "@/assets/aboutMorph/mountain.png";
import waves from "@/assets/aboutMorph/waves.png";

// ─────────────────────────────────────────────────────────────────────────────
type Page = "work" | "about" | "noonchi" | "liquid" | "relevo" | "water" | "trod" | "liquid-robotics" | "relevo-robotics" | "link" | "epicure";
type Tab = "all" | "digital" | "robotics";

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL MOUSE — module-level, zero re-render overhead
// ─────────────────────────────────────────────────────────────────────────────
const _mouse = { x: -9999, y: -9999 };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", e => { _mouse.x = e.clientX; _mouse.y = e.clientY; }, { passive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// BIT ICON — eyes follow mouse; dark mode eyes are black
// ─────────────────────────────────────────────────────────────────────────────
function BitIcon({ dark }: { dark: boolean }) {
  const color    = dark ? "#ffea00" : "#1eb81b";
  const eyeColor = dark ? "black" : "white";
  const boxRef   = useRef<HTMLDivElement>(null);
  const eyeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ex = 0, ey = 0, raf: number;
    const tick = () => {
      const box = boxRef.current, eye = eyeRef.current;
      if (box && eye) {
        const r  = box.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = _mouse.x - cx,        dy = _mouse.y - cy;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const MAX = 1.5;
        const tx = d > 0 && d < 9999 ? (dx / d) * MAX * Math.min(1, d / 160) : 0;
        const ty = d > 0 && d < 9999 ? (dy / d) * MAX * Math.min(1, d / 160) : 0;
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
    <div ref={boxRef} style={{ display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", flexShrink: 0, position: "relative" }}>
      <div style={{ backgroundColor: color, width: 14, height: 14, gridColumn: 1, gridRow: 1 }} />
      <div ref={eyeRef} style={{ gridColumn: 1, gridRow: 1, marginLeft: 3.5, marginTop: 5, width: 7, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 2, height: 4, backgroundColor: eyeColor }} />
        <div style={{ width: 2, height: 4, backgroundColor: eyeColor }} />
      </div>
    </div>
  );
}

// Convenience wrapper: icon + text in a row
function BitText({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  const color = dark ? "#ffea00" : "#1eb81b";
  return (
    <div className="flex gap-[12px] items-center">
      <BitIcon dark={dark} />
      <div className="font-['Source_Code_Pro'] font-normal text-[10px] whitespace-nowrap" style={{ color }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD WRAPPER  (handles hover animation + consistent card shell)
// ─────────────────────────────────────────────────────────────────────────────
function CardWrapper({ children, bg, onClick }: { children: React.ReactNode; bg: string; onClick?: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="relative w-full overflow-hidden cursor-pointer"
      style={{ aspectRatio: "666 / 393", backgroundImage: bg }}
      whileHover={{ scale: 1.025, boxShadow: "0 24px 48px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARDS  – Digital
// Internal positions converted from px → % of 666×393 for fluid responsiveness
// ─────────────────────────────────────────────────────────────────────────────
function NoonchiCard({ dark, onClick }: { dark: boolean; onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbNoonchi}
        alt="Noonchi thumbnail"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function LiquidDigitalCard({ dark, onClick }: { dark: boolean; onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbLiquidData}
        alt="Liquid Data thumbnail"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function RelevoDigitalCard({ dark, onClick }: { dark: boolean; onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbRelevo}
        alt="Relevo thumbnail"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function WaterCard({ dark, onClick }: { dark: boolean; onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbSacredWater}
        alt="Sacred Water thumbnail"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARDS  – Robotics (match Digital card behavior)
// ─────────────────────────────────────────────────────────────────────────────

function TrodCard({ onClick }: { onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbTrod}
        alt="Trod robot"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function LiquidRoboticsCard({ onClick }: { onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbLiquidRobotics}
        alt="Liquid robotics"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function RelevoRoboticsCard({ onClick }: { onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbRelevoRobotics}
        alt="Relevo robot UI"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function LinkCard({ onClick }: { onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbLink}
        alt="Link project"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

function EpicureCard({ onClick }: { onClick?: () => void }) {
  return (
    <CardWrapper bg="transparent" onClick={onClick}>
      <img
        src={thumbEpicure}
        alt="Epicure"
        className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
      />
    </CardWrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header({ dark, page, setPage, setTab, toggleDark }: {
  dark: boolean;
  page: Page;
  setPage: (p: Page) => void;
  setTab: (t: Tab) => void;
  toggleDark: () => void;
}) {
  const fg = dark ? "white" : "black";

  return (
    <header className="flex items-center justify-between px-[clamp(16px,2.9vw,42px)] py-[12px] gap-[clamp(8px,2vw,24px)] transition-colors duration-300">
      <motion.button
        onClick={() => setPage("work")}
        className="font-['Source_Code_Pro'] font-normal uppercase leading-[1.45] cursor-pointer shrink-0 whitespace-nowrap"
        style={{ color: fg, fontSize: "clamp(13px,1.25vw,18px)", letterSpacing: "-0.09px" }}
        whileHover={{ opacity: 0.65 }}
        transition={{ duration: 0.15 }}
      >
        Riddhi Kasar
      </motion.button>

      <nav className="flex gap-[clamp(12px,1.67vw,24px)] items-center shrink-0">

        <motion.button
          onClick={() => { setPage("work"); setTab("all"); }}
          className="font-['Source_Code_Pro'] font-normal leading-[1.45] cursor-pointer whitespace-nowrap"
          style={{ color: fg, fontSize: "clamp(11px,0.97vw,14px)", letterSpacing: "-0.07px", textDecoration: page === "work" ? "underline" : "none", textUnderlinePosition: "from-font" }}
          whileHover={{ opacity: 0.65 }}
          transition={{ duration: 0.15 }}
        >
          Work
        </motion.button>

        <motion.button
          onClick={() => setPage("about")}
          className="font-['Source_Code_Pro'] font-normal leading-[1.45] cursor-pointer whitespace-nowrap"
          style={{ color: fg, fontSize: "clamp(11px,0.97vw,14px)", letterSpacing: "-0.07px", textDecoration: page === "about" ? "underline" : "none", textUnderlinePosition: "from-font" }}
          whileHover={{ opacity: 0.65 }}
          transition={{ duration: 0.15 }}
        >
          About
        </motion.button>

        <motion.button
          onClick={toggleDark}
          className="flex items-center justify-center cursor-pointer"
          style={{ width: "clamp(16px,1.39vw,24px)", height: "clamp(16px,1.39vw,24px)" }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ rotate: 20 }}
          transition={{ duration: 0.2 }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex" }}
            >
              {dark
                ? <Sun style={{ width: "clamp(13px,1.11vw,20px)", height: "clamp(13px,1.11vw,20px)" }} color="white" />
                : <Moon style={{ width: "clamp(13px,1.11vw,20px)", height: "clamp(13px,1.11vw,20px)" }} color="black" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER BAR
// ─────────────────────────────────────────────────────────────────────────────
function FilterBar({ dark, activeTab, setTab, isStuck }: {
  dark: boolean;
  activeTab: Tab;
  setTab: (t: Tab) => void;
  isStuck: boolean;
}) {
  const activeBg = dark ? "#ffea00" : "#1eb81b";
  const border = dark ? "0.8px solid white" : "0.8px solid black";
  const inactiveFg = dark ? "white" : "black";

  // Frosted background for inactive pills when stuck
  const frostedBg = dark
    ? "rgba(20,20,20,0.55)"
    : "rgba(255,255,255,0.55)";

  function Pill({ label, tab }: { label: string; tab: Tab }) {
    const isActive = activeTab === tab;
    const [hovered, setHovered] = useState(false);
    const filled = isActive || hovered;
    const bg = filled ? activeBg : isStuck ? frostedBg : "transparent";

    return (
      <motion.button
        onClick={() => setTab(tab)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="flex items-center justify-center rounded-[24px] cursor-pointer shrink-0"
        style={{
          padding: "clamp(8px,0.83vw,12px) clamp(12px,1.25vw,18px)",
          backgroundColor: bg,
          backdropFilter: !filled && isStuck ? "blur(12px)" : "none",
          WebkitBackdropFilter: !filled && isStuck ? "blur(12px)" : "none",
          border,
          color: filled ? "black" : inactiveFg,
          fontFamily: "'Source Code Pro', monospace",
          fontWeight: isActive ? 700 : 500,
          fontSize: "clamp(12px,1.11vw,16px)",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          transition: "background-color 0.2s ease, backdrop-filter 0.2s ease, color 0.18s ease",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        {label}
      </motion.button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-[12px] lg:flex-row lg:items-center lg:justify-between">
      {/* Left: pills */}
      <div className="flex flex-wrap items-center gap-[12px] lg:gap-[18px]">
        <Pill label="All" tab="all" />
        <Pill label="Digital Interfaces" tab="digital" />
        <Pill label="Robotic Prototypes" tab="robotics" />
      </div>

      {/* Right: publications */}
      <motion.a
        href="https://scholar.google.com/citations?user=paNfxVcAAAAJ&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[4px] cursor-pointer shrink-0"
        style={{ color: inactiveFg }}
        whileHover={{ opacity: 0.65 }}
        transition={{ duration: 0.15 }}
      >
        <span
          className="font-['Source_Code_Pro'] font-medium underline whitespace-nowrap"
          style={{ textUnderlinePosition: "from-font", fontSize: "clamp(12px,1.11vw,16px)" }}
        >
          Publications
        </span>
        <span
          className="font-['Instrument_Sans'] font-normal tracking-[-1px]"
          style={{ fontVariationSettings: '"wdth" 100', fontSize: "clamp(14px,1.39vw,20px)" }}
        >
          ↗︎
        </span>
      </motion.a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORK PAGE
// ─────────────────────────────────────────────────────────────────────────────
function WorkPage({ dark, activeTab, setTab, setPage }: {
  dark: boolean;
  activeTab: Tab;
  setTab: (t: Tab) => void;
  setPage: (p: Page) => void;
}) {
  const accentColor = dark ? "#ffea00" : "#1eb81b";
  const textColor = dark ? "white" : "black";

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-50px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Define cards per tab (with unique keys and sort names)
  const digitalCards = [
  { key: "noonchi", name: "Noonchi", el: <NoonchiCard dark={dark} onClick={() => setPage("noonchi")} /> },
  { key: "liquid", name: "Liquid Data", el: <LiquidDigitalCard dark={dark} onClick={() => setPage("liquid")} /> },
  { key: "relevo", name: "Relevo", el: <RelevoDigitalCard dark={dark} onClick={() => setPage("relevo")} /> },
  { key: "water", name: "Sacred Water", el: <WaterCard dark={dark} onClick={() => setPage("water")} /> },
];

const roboticsCards = [
  { key: "trod", name: "TROD", el: <TrodCard onClick={() => setPage("trod")} /> },
  { key: "liquid-rob", name: "Liquid Robotics", el: <LiquidRoboticsCard onClick={() => setPage("liquid-robotics")} /> },
  { key: "relevo-rob", name: "Relevo Robotics", el: <RelevoRoboticsCard onClick={() => setPage("relevo-robotics")} /> },
  { key: "link", name: "Link", el: <LinkCard onClick={() => setPage("link")} /> },
  { key: "epicure", name: "Epicure", el: <EpicureCard onClick={() => setPage("epicure")} /> },
];

const allCards = [
  { key: "noonchi", el: <NoonchiCard dark={dark} onClick={() => setPage("noonchi")} /> },
  { key: "trod", el: <TrodCard onClick={() => setPage("trod")} /> },
  { key: "liquid", el: <LiquidDigitalCard dark={dark} onClick={() => setPage("liquid")} /> },
  { key: "liquid-robotics", el: <LiquidRoboticsCard onClick={() => setPage("liquid-robotics")} /> },
  { key: "relevo", el: <RelevoDigitalCard dark={dark} onClick={() => setPage("relevo")} /> },
  { key: "relevo-robotics", el: <RelevoRoboticsCard onClick={() => setPage("relevo-robotics")} /> },
  { key: "water", el: <WaterCard dark={dark} onClick={() => setPage("water")} /> },
  { key: "epicure", el: <EpicureCard onClick={() => setPage("epicure")} /> },
  { key: "link", el: <LinkCard onClick={() => setPage("link")} /> },
];

const visibleCards =
  activeTab === "digital"  ? digitalCards :
  activeTab === "robotics" ? roboticsCards :
  allCards;

  // bit_2 text per tab
  const bit2Text: Record<Tab, React.ReactNode> = {
    all:      <><p className="leading-normal mb-0">Everything, always,</p><p className="leading-normal">all at once.</p></>,
    digital:  <><p className="leading-normal mb-0">I dream in pixels when</p><p className="leading-normal">{`you're not looking.`}</p></>,
    robotics: <><p className="leading-normal mb-0">Is this the future you</p><p className="leading-normal">calculated?</p></>,
  };

  return (
    <div className="transition-colors duration-300" style={{ color: textColor }}>
      {/* Hero section */}
      <div className="px-[clamp(20px,2.9vw,42px)] pt-[clamp(16px,1.67vw,24px)] relative">
        <h1
          className="font-['Instrument_Sans'] font-normal leading-[1.1] transition-colors duration-300"
          style={{
            fontSize: "clamp(32px, 4.44vw, 64px)",
            letterSpacing: "-3.2px",
            color: textColor,
            fontVariationSettings: '"wdth" 100',
          }}
        >
          Designing Digital Interfaces for Robotic and <br>
          </br> Intelligent Systems
        </h1>

      </div>

      {/* Sentinel: when this scrolls past the header, isStuck becomes true */}
      <div ref={sentinelRef} className="h-0" aria-hidden />

      {/* Filter bar — 72px gap before scroll, then 12px offset once it sticks */}
      <div
        className={`sticky z-40 px-[clamp(20px,2.9vw,42px)] pb-[42px] ${isStuck ? "pt-0" : "pt-[72px]"}`}
        style={{ top: isStuck ? 12 : 0 }}
      >
        <FilterBar dark={dark} activeTab={activeTab} setTab={setTab} isStuck={isStuck} />
      </div>

      {/* Project grid */}
      <div className="px-[clamp(20px,2.9vw,42px)] mt-0 pb-[clamp(32px,3.33vw,48px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[42px]"
          >
            {visibleCards.map(({ key, el }) => (
              <div key={key}>{el}</div>
            ))}

            {/* Odd cards (digital/robotics) → desktop: empty right slot; mobile: hidden here */}
            {visibleCards.length % 2 !== 0 && (
              <motion.div
                className="hidden md:flex items-center justify-center"
                style={{ aspectRatio: "666/393" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <BitText dark={dark}>{bit2Text[activeTab]}</BitText>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bit below grid:
            • Always shown on mobile (all tabs)
            • On desktop: only even-card tabs (physical / all) — odd tabs use the in-grid slot */}
        <motion.div
          className={`flex justify-center mt-[48px] ${visibleCards.length % 2 !== 0 ? "md:hidden" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <BitText dark={dark}>{bit2Text[activeTab]}</BitText>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Pill button for the specialization tags — navigates to the Work page tab on click
function SpecPill({ label, tab, border, fg, hoverBg, setPage, setTab }: {
  label: string;
  tab: Tab;
  border: string;
  fg: string;
  hoverBg: string;
  setPage: (p: Page) => void;
  setTab: (t: Tab) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={() => { setPage("work"); setTab(tab); }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center justify-center px-[18px] py-[12px] rounded-[24px] shrink-0 cursor-pointer"
      style={{
        border,
        color: hovered ? "black" : fg,
        backgroundColor: hovered ? hoverBg : "transparent",
        transition: "background-color 0.18s ease, color 0.18s ease",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
    >
      <span className="font-['Source_Code_Pro'] font-semibold text-[18px] whitespace-nowrap">{label}</span>
    </motion.button>
  );
}

// Generic pill for contact/social buttons
function ContactPill({ children, border, fg, hoverBg, onClick, href, minWidth }: {
  children: React.ReactNode;
  border: string;
  fg: string;
  hoverBg: string;
  onClick?: () => void;
  href?: string;
  minWidth?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedStyle: React.CSSProperties = {
    border,
    color: hovered ? "black" : fg,
    backgroundColor: hovered ? hoverBg : "transparent",
    fontFamily: "'Source Code Pro', monospace",
    fontWeight: 500,
    fontSize: 16,
    minWidth: minWidth,
    transition: "background-color 0.18s ease, color 0.18s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 24,
    cursor: "pointer",
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={sharedStyle}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={sharedStyle}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function AboutPage({ dark, setPage, setTab }: { dark: boolean; setPage: (p: Page) => void; setTab: (t: Tab) => void }) {
  const fg = dark ? "white" : "black";
  const border = dark ? "0.8px solid white" : "0.8px solid black";
  const accentColor = dark ? "#ffea00" : "#1eb81b";
  const [copied, setCopied] = useState(false);
  const philosophyTextRef = useRef<HTMLDivElement>(null);

  function copyEmail() {
    try {
      const el = document.createElement("textarea");
      el.value = "riddhikasar02@gmail.com";
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: open mailto
      window.location.href = "mailto:riddhikasar02@gmail.com";
    }
  }

  return (
    <div className="transition-colors duration-300" style={{ color: fg }}>
      {/* Hello World — top center, between header and title */}
      <motion.div
        className="flex justify-center pt-[18px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <BitText dark={dark}>Hello, World</BitText>
      </motion.div>

      {/* Hero title */}
      <div className="px-[42px] pt-[32px] relative">
        <motion.p
          className="font-['Instrument_Sans'] font-normal leading-[1.1] whitespace-pre-wrap"
          style={{
            fontSize: "clamp(32px, 4.44vw, 64px)",
            letterSpacing: "-3.2px",
            color: fg,
            fontVariationSettings: '"wdth" 100',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {`I'm Riddhi - a Design Engineer from  `}
          <motion.a
            href="https://mde.harvard.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: fg, textUnderlinePosition: "from-font" }}
            whileHover={{ opacity: 0.65 }}
            transition={{ duration: 0.15 }}
          >Harvard</motion.a>
          {" ↗"}
        </motion.p>

      </div>

      {/* Specialization text */}
      <motion.div
        className="px-[42px] mt-[56px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <div className="flex gap-[12px] items-center flex-wrap" style={{ rowGap: "12px" }}>
          <span
            className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
            style={{ fontSize: "clamp(20px, 2.92vw, 42px)", color: fg, fontVariationSettings: '"wdth" 100' }}
          >
            And I specialize in building
          </span>
          {([
            { label: "Digital Interfaces", tab: "digital" as Tab },
            { label: "for" },
            { label: "Robotic", tab: "robotics" as Tab },
            { label: "and intelligent systems," },
          ] as const).map((item, i) => {
            const isWord = !("tab" in item);
            return isWord ? (
              <span
                key={i}
                className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
                style={{ fontSize: "clamp(20px, 2.92vw, 42px)", color: fg, fontVariationSettings: '"wdth" 100' }}
              >{item.label}</span>
            ) : (
              <SpecPill
                key={i}
                label={item.label}
                tab={item.tab}
                border={border}
                fg={fg}
                hoverBg={accentColor}
                setPage={setPage}
                setTab={setTab}
              />
            );
          })}
        </div>
        <p
          className="mt-[4px] font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
          style={{ fontSize: "clamp(20px, 2.92vw, 42px)", color: fg, fontVariationSettings: '"wdth" 100' }}
        >
          shaping how humans and robots interact, communicate, and collaborate.
        </p>
      </motion.div>

      {/* Philosophy section */}
      <motion.div
        className="mx-[42px] mt-[72px] relative overflow-hidden"
        style={{
          // white in light mode, keep your dark mode as-is
          backgroundColor: dark ? "#000000" : "#FFFFFF",

          // keep your left/right padding
          paddingLeft: "clamp(24px, 9.05vw, 123px)",
          paddingRight: "clamp(24px, 9.05vw, 123px)",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
      >
        {/* PIXELS: fill the whole rectangle (touch all edges) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <MorphField
            dark={dark}
            avoidRef={philosophyTextRef}
            fit="contain"
            bgLight="#FFFFFF"
            bgDark="#000000"
            fillColorLight="#1EB81B"
            fillColorDark="#FFE53A"
            scenes={[
              { src: sky, durationMs: 6000, holdMs: 4000 },
              { src: bird, durationMs: 6000, holdMs: 4000 },
              { src: flower, durationMs: 6000, holdMs: 4000 },
              { src: deer, durationMs: 6000, holdMs: 4000 },
              { src: forest, durationMs: 6000, holdMs: 4000 },
              { src: waves, durationMs: 6000, holdMs: 4000 },
            ]}
          />
        </div>

        {/* TEXT: 42px gap from top edge and 42px gap from bottom edge */}
        <div
          ref={philosophyTextRef}
          className="relative z-10 py-[42px] text-center font-['Source_Code_Pro'] font-normal tracking-[-1.2px]"
          style={{
            fontSize: "clamp(14px, 1.67vw, 18px)",
            color: dark ? "#FFE53A" : "#1EB81B",
          }}
        >
          <p className="mb-0">
            I believe that{" "}
            true depth comes from applying everything we know <br /> to everything we make.
          </p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">The best artist is also an anatomist.</p>
          <p className="mb-0">The best marketer is also a neuroscientist.</p>
          <p className="mb-0">The best chef is also a chemist.</p>
          <p className="font-semibold">And the best designer is also an engineer.</p>
        </div>
      </motion.div>

      {/* Contact text */}
      <motion.div
        className="px-[42px] mt-[72px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <p
          className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
          style={{ fontSize: "clamp(18px, 2.92vw, 42px)", color: fg, fontVariationSettings: '"wdth" 100' }}
        >
          {"Say hello or talk future projects: "}
          <motion.a
            href="mailto:riddhikasar02@gmail.com"
            className="underline"
            style={{ color: fg, textUnderlinePosition: "from-font" }}
            whileHover={{ opacity: 0.65 }}
            transition={{ duration: 0.15 }}
          >
            riddhikasar02@gmail.com
          </motion.a>
          {" ↗︎ "}
        </p>
      </motion.div>

      {/* Social buttons */}
      <motion.div
        className="flex justify-center gap-[18px] mt-[40px] flex-wrap px-[42px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <ContactPill border={border} fg={fg} hoverBg={accentColor} onClick={copyEmail} minWidth={140}>
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.13 }}
              className="w-full text-center"
            >
              {copied ? "Copied!" : "Copy Email"}
            </motion.span>
          </AnimatePresence>
        </ContactPill>

        <ContactPill
          border={border} fg={fg} hoverBg={accentColor}
          href="https://www.linkedin.com/in/riddhikasar/"
        >
          LinkedIn
        </ContactPill>

        <ContactPill
          border={border} fg={fg} hoverBg={accentColor}
          href="https://www.instagram.com/pear.logic/"
        >
          Instagram
        </ContactPill>
      </motion.div>

      {/* bit_5 — centred footer */}
      <motion.div
        className="flex justify-center py-[48px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <BitText dark={dark}>End of file. Awaiting human connection.</BitText>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
// Project navigation order
const PROJECT_ORDER: Page[] = ["noonchi", "liquid", "relevo", "water", "trod", "liquid-robotics", "relevo-robotics", "link", "epicure"];

export default function App() {
  const [page, setPage] = useState<Page>("work");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [dark, setDark] = useState(false);

  const bgColor = dark ? "#000000" : "#ffffff";

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Get previous/next project handlers
  const currentProjectIndex = PROJECT_ORDER.indexOf(page);
  const hasPrevProject = currentProjectIndex > 0;
  const hasNextProject = currentProjectIndex < PROJECT_ORDER.length - 1;

  const handlePrevProject = hasPrevProject ? () => setPage(PROJECT_ORDER[currentProjectIndex - 1]) : undefined;
  const handleNextProject = hasNextProject ? () => setPage(PROJECT_ORDER[currentProjectIndex + 1]) : undefined;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header stays in normal document flow */}
      <div
        className="transition-colors duration-300"
        style={{ backgroundColor: dark ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)" }}
      >
        <Header
          dark={dark}
          page={page}
          setPage={setPage}
          setTab={setActiveTab}
          toggleDark={() => setDark(d => !d)}
        />
      </div>

      {/* Page content with fade transition */}
      <AnimatePresence mode="wait">
        {page === "work" ? (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <WorkPage dark={dark} activeTab={activeTab} setTab={setActiveTab} setPage={setPage} />
          </motion.div>
        ) : page === "noonchi" ? (
          <motion.div key="noonchi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <NoonchiPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "liquid" ? (
          <motion.div key="liquid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <LiquidPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "relevo" ? (
          <motion.div key="relevo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <RelevoPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "water" ? (
          <motion.div key="water" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <WaterPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "trod" ? (
          <motion.div key="trod" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <TRODPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "liquid-robotics" ? (
          <motion.div key="liquid-robotics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <LiquidRoboticsPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "relevo-robotics" ? (
          <motion.div key="relevo-robotics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <RelevoRoboticsPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "link" ? (
          <motion.div key="link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <LinkPage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : page === "epicure" ? (
          <motion.div key="epicure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <EpicurePage dark={dark} onPrevProject={handlePrevProject} onNextProject={handleNextProject} />
          </motion.div>
        ) : (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <AboutPage dark={dark} setPage={setPage} setTab={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
