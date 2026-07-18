import { useState } from "react";
import { motion } from "motion/react";
import type { WorkTab } from "@/app/lib/projects";
import { getTheme } from "@/app/lib/theme";
import Arrow from "@/app/components/Arrow";

function Pill({
  label,
  active,
  dark,
  isStuck,
  onClick,
}: {
  label: string;
  active: boolean;
  dark: boolean;
  isStuck: boolean;
  onClick: () => void;
}) {
  const theme = getTheme(dark);
  const [hovered, setHovered] = useState(false);
  const filled = active || hovered;
  const frostedBg = dark ? "rgba(20,20,20,0.55)" : "rgba(255,255,255,0.55)";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex shrink-0 cursor-pointer items-center justify-center rounded-[24px] px-[clamp(12px,1.25vw,18px)] py-[clamp(8px,0.83vw,12px)]"
      style={{
        backgroundColor: filled ? theme.activePill : isStuck ? frostedBg : "transparent",
        border: theme.border,
        color: filled ? "#000000" : theme.fg,
        fontFamily: "'Source Code Pro', monospace",
        fontWeight: active ? 700 : 500,
        fontSize: "clamp(12px,1.11vw,16px)",
        backdropFilter: !filled && isStuck ? "blur(12px)" : "none",
        WebkitBackdropFilter: !filled && isStuck ? "blur(12px)" : "none",
        transition: "background-color 0.2s ease, color 0.18s ease",
      }}
      whileTap={{ scale: 0.96 }}
    >
      {label}
    </motion.button>
  );
}

export function FilterBar({
  dark,
  activeTab,
  setTab,
  isStuck,
}: {
  dark: boolean;
  activeTab: WorkTab;
  setTab: (tab: WorkTab) => void;
  isStuck: boolean;
}) {
  const theme = getTheme(dark);

  return (
    <div className="grid w-full grid-cols-1 items-center gap-3 lg:grid-cols-[auto_1fr_auto] lg:gap-[18px]">
      <Pill label="All" active={activeTab === "all"} dark={dark} isStuck={isStuck} onClick={() => setTab("all")} />

      <div className="flex flex-wrap items-center justify-start gap-[12px] lg:justify-center lg:gap-[18px]">
        <Pill
          label="Digital Interfaces"
          active={activeTab === "digital"}
          dark={dark}
          isStuck={isStuck}
          onClick={() => setTab("digital")}
        />
        <Pill
          label="Robotics"
          active={activeTab === "robotics"}
          dark={dark}
          isStuck={isStuck}
          onClick={() => setTab("robotics")}
        />
        <Pill
          label="Physical Systems"
          active={activeTab === "physical"}
          dark={dark}
          isStuck={isStuck}
          onClick={() => setTab("physical")}
        />
      </div>

      <motion.a
        href="https://scholar.google.com/citations?user=paNfxVcAAAAJ&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center gap-[4px] justify-self-start lg:justify-self-end"
        style={{ color: theme.fg }}
        whileHover={{ opacity: 0.65 }}
      >
        <span
          className="font-['Source_Code_Pro'] text-[clamp(12px,1.11vw,16px)] font-medium underline"
          style={{ textUnderlinePosition: "from-font" }}
        >
          Publications
        </span>
        <Arrow style={{ width: "clamp(16px,1.6vw,24px)", height: "auto", display: "inline-block" }} />
      </motion.a>
    </div>
  );
}
