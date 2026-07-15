import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { getTheme } from "@/app/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const theme = getTheme(dark);
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const isWork = location.pathname === "/" || location.pathname.startsWith("/work");

  return (
    <header className="flex items-center justify-between gap-6 px-[clamp(16px,2.9vw,42px)] py-[12px]">
      <motion.div whileHover={{ opacity: 0.65 }} transition={{ duration: 0.15 }}>
        <Link
          to="/"
          className="font-['Source_Code_Pro'] text-[clamp(13px,1.25vw,18px)] font-normal uppercase leading-[1.45] tracking-[-0.09px]"
          style={{ color: theme.fg }}
        >
          Riddhi Kasar
        </Link>
      </motion.div>

      <nav className="flex shrink-0 items-center gap-[clamp(12px,1.67vw,24px)]">
        <motion.div whileHover={{ opacity: 0.65 }} transition={{ duration: 0.15 }}>
          <Link
            to="/about"
            className="font-['Source_Code_Pro'] text-[clamp(11px,0.97vw,14px)] font-normal leading-[1.45] tracking-[-0.07px]"
            style={{
              color: theme.fg,
              textDecoration: isAbout ? "underline" : "none",
              textUnderlinePosition: "from-font",
            }}
          >
            About
          </Link>
        </motion.div>
        <motion.div whileHover={{ opacity: 0.65 }} transition={{ duration: 0.15 }}>
          <Link
            to="/"
            className="font-['Source_Code_Pro'] text-[clamp(11px,0.97vw,14px)] font-normal leading-[1.45] tracking-[-0.07px]"
            style={{
              color: theme.fg,
              textDecoration: isWork ? "underline" : "none",
              textUnderlinePosition: "from-font",
            }}
          >
            Work
          </Link>
        </motion.div>
        <ThemeToggle dark={dark} onToggle={onToggleDark} />
      </nav>
    </header>
  );
}
