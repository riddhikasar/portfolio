import { motion, AnimatePresence } from "motion/react";
import svgPathsLight from "@/imports/About/svg-cqkvrzc2ix";
import svgPathsDark from "@/imports/AboutDark/svg-aj4z7obxpi";

export function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const fill = dark ? "white" : "black";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="flex size-[24px] shrink-0 cursor-pointer items-center justify-center"
      whileHover={{ scale: 1.12 }}
      whileTap={{ rotate: 18, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -24, scale: 0.75 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 24, scale: 0.75 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <svg className="block size-[24px]" fill="none" viewBox="0 0 24 24" aria-hidden>
            <mask
              id="theme-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
              style={{ maskType: "alpha" }}
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#theme-mask)">
              <path
                d={dark ? svgPathsDark.p1f0d78c0 : svgPathsLight.p6fa1bf0}
                fill={fill}
              />
            </g>
          </svg>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
