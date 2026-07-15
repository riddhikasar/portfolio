import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { getTheme } from "@/app/lib/theme";
import {
  projectsForTab,
  tabBitText,
  projectRoutes,
  type WorkTab,
  type ProjectSlug,
} from "@/app/lib/projects";
import { FilterBar } from "@/app/components/portfolio/FilterBar";
import { BitText } from "@/app/components/portfolio/BitIcon";
import { ProjectCard } from "@/app/components/portfolio/ProjectCards";

const projectTitles: Record<ProjectSlug, string> = {
  noonchi: "Noonchi",
  relevo: "Relevo",
  liquid: "Liquid",
  water: "Water",
  maps: "Maps",
  trod: "Trod",
  "relevo-robotics": "Relevo Robotics",
  "liquid-robotics": "Liquid Robotics",
  link: "Link",
  epicure: "Epicure",
  bionics: "Bionics",
  cycle: "Cycle",
};

function parseTab(value: string | null): WorkTab {
  if (value === "digital" || value === "robotics" || value === "physical" || value === "all") {
    return value;
  }
  return "all";
}

export function WorkPage({ dark }: { dark: boolean }) {
  const theme = getTheme(dark);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = parseTab(searchParams.get("tab"));
  const setTab = (tab: WorkTab) => setSearchParams(tab === "all" ? {} : { tab });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: "-50px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleProjects = projectsForTab(activeTab);
  const bitLines = tabBitText[activeTab];

  return (
    <div className="pb-[48px] transition-colors duration-300" style={{ color: theme.fg }}>
      <div className="relative px-[clamp(20px,2.9vw,42px)] pt-[clamp(16px,1.67vw,24px)]">
        <motion.h1
          className="font-['Instrument_Sans'] font-normal leading-[1.1] max-w-[1052px]"
          style={{
            fontSize: "clamp(32px,4.44vw,64px)",
            letterSpacing: "-3.2px",
            fontVariationSettings: '"wdth" 100',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Designing Physical-Digital Interfaces for
          <br />
          Human-Robot Interactions
        </motion.h1>

        <motion.div
          className="absolute right-[clamp(20px,2.9vw,42px)] top-[clamp(72px,8vw,110px)] hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <BitText dark={dark} lines={["Hello, World"]} />
        </motion.div>
      </div>

      <div ref={sentinelRef} className="h-0" aria-hidden />

      <div
        className="sticky z-40 mt-[clamp(36px,5vw,72px)] px-[clamp(20px,2.9vw,42px)] py-[clamp(10px,1.11vw,16px)]"
        style={{ top: 50 }}
      >
        <FilterBar dark={dark} activeTab={activeTab} setTab={setTab} isStuck={isStuck} />
      </div>

      <div className="mt-[clamp(24px,2.92vw,42px)] px-[clamp(20px,2.9vw,42px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-1 gap-x-[24px] gap-y-[42px] md:grid-cols-2"
          >
            {visibleProjects.map((slug) => (
              <Link
                key={slug}
                to={projectRoutes[slug]}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                style={{ "--tw-ring-offset-color": dark ? "#000" : "#fff" } as React.CSSProperties}
                aria-label={`Open ${projectTitles[slug]} project`}
              >
                <ProjectCard slug={slug} dark={dark} />
              </Link>
            ))}

            {visibleProjects.length % 2 !== 0 && (
              <motion.div
                className="hidden items-center justify-center md:flex"
                style={{ aspectRatio: "666/393" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <BitText dark={dark} lines={bitLines} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={`mt-[48px] flex justify-center ${visibleProjects.length % 2 !== 0 ? "md:hidden" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <BitText dark={dark} lines={bitLines} />
        </motion.div>
      </div>
    </div>
  );
}
