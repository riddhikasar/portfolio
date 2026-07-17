import { type ReactNode } from "react";
import { motion } from "motion/react";

// Images
import imgHero from "@/assets/liquid/liquidrobotics_hero.png";
import imgAlgo from "@/assets/liquid/algo.png";
import imgInteraction from "@/assets/liquid/interaction.png";
import imgHardware from "@/assets/liquid/hardware.png";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/liquid/c_1_r.svg";
import iconC2 from "@/assets/liquid/c_2_r.svg";
import iconC3 from "@/assets/liquid/c_3_r.svg";

const PX = "px-5 sm:px-10 lg:px-[120px]";
const META = "#8A8A8D";

const SCROLL_OFFSET_PX = 88;
const HERO_MAX_H = "calc(100svh - 140px)";

function MetaItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} alt="" aria-hidden className="h-4 w-4" />
      <span className="font-['Source_Code_Pro'] text-sm" style={{ color: META }}>
        {text}
      </span>
    </div>
  );
}

function Section({
  id,
  title,
  children,
  dividerColor,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  dividerColor: string;
}) {
  return (
    <motion.section
      id={id}
      className={`${PX} py-14 sm:py-20`}
      style={{
        borderTop: `0.15px solid ${dividerColor}`,
        scrollMarginTop: SCROLL_OFFSET_PX,
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full">
        <h2 className="font-['Instrument_Sans'] font-medium tracking-[-0.05em] text-[clamp(32px,4vw,56px)]">
          {title}
        </h2>
        <div className="mt-6 font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default function LiquidPage({
  dark,
  onBackToWork,
  onPrevProject,
  onNextProject,
}: {
  dark: boolean;
  onBackToWork?: () => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
}) {
  const fg = dark ? "white" : "black";

  // Section lines: black in light mode, white in dark mode
  const dividerColor = dark ? "#FFFFFF" : "#000000";

  // Pink accent that stays readable on black
  const PINK = dark ? "#FFBBE1" : "#FC2872";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="liquid"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={imgHero}
            alt="Liquid hero"
            className="block w-full h-auto object-contain"
            style={{ maxHeight: HERO_MAX_H }}
            draggable={false}
          />
        </div>
      </motion.section>

      {/* TITLE / SUMMARY */}
      <motion.header
        className={`${PX} py-12 sm:py-16`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-full">
          <h1 className="font-['Instrument_Sans'] font-medium leading-[1] tracking-[-0.05em] text-[clamp(40px,5vw,72px)]">
            Liquid Data Robotics
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I designed the embodied experience for Liquid Data Robotics - an AI powered intelligent machine that transforms memories into delicious drinks and cocktails.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 6" />
            <MetaItem icon={iconRole} text="Role: Research, Design" />
            <MetaItem icon={iconTime} text="Time: 4 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          Most data visualizations make information feel fixed and distant. Liquid Data explores{" "}
          <span className="font-semibold">how data can become tangible</span> — dynamic, spatial, and alive.

          <span className="block mt-2">
            This project is a part of the <span className="font-semibold underline" style={{ textUnderlinePosition: "from-font" }}>Liquid Data ↗︎</span> product design case study.
          </span>
          <span className="mt-2">
            You can also visit the live website I developed for a virtual Liquid Data experience here:
          </span>
          <a
              href="https://liquid-data.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ textUnderlinePosition: "from-font" }}
            >
              liquid-data.lovable.app ↗︎
            </a>
        </div>
        
        {/* ACM LINK */}
        <motion.div
          className="mt-[92px] text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p
            className="m-0 font-['Instrument_Sans'] font-medium"
            style={{
              fontSize: "clamp(28px,5vw,72px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: PINK,
            }}
          >
            Liquid Data also has a publication in{" "}
            <a
              href="https://dl.acm.org/doi/10.1145/3772363.3798477"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ textUnderlinePosition: "from-font" }}
            >
              ACM CHI '26 ↗︎
            </a>
          </p>
        </motion.div>

      </Section>

      <Section dividerColor={dividerColor} id="final-solution" title="Final Solution">
        <div className="w-full overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <iframe
              src="https://player.vimeo.com/video/1210329078?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1"
              className="absolute inset-0 w-full h-full"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Liquid Robotics"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      <Section dividerColor={dividerColor} title="How It Works">
        {/* 01 */}
        <div className="leading-relaxed font-semibold">01: Algorithm</div>
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgAlgo}
            alt="Algorithm logic diagram"
            className="w-full h-auto block object-cover"
          />
        </div>

        {/* 02 */}
        <div className="leading-relaxed font-semibold block mt-[72px]">02: Interaction</div>
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgInteraction}
            alt="Interaction diagram"
            className="w-full h-auto block object-cover"
          />
        </div>

        {/* 03 */}
        <div className="leading-relaxed font-semibold block mt-[72px]">03: Hardware Integration</div>
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgHardware}
            alt="Hardware integration diagram"
            className="w-full h-auto block object-cover"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="concepts-applied" title="Concepts Applied">
        <div className="mt-[42px] grid grid-cols-1 md:grid-cols-3 gap-[42px]">
          {/* 1 */}
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 110,
                height: 110,
                backgroundColor: "white",
                border: "1px solid #000000",
              }}
            >
              <img
                src={iconC1}
                alt=""
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Hardware Integration
            </div>
          </div>

          {/* 2 */}
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 110,
                height: 110,
                backgroundColor: "white",
                border: "1px solid #000000",
              }}
            >
              <img
                src={iconC2}
                alt=""
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Human-Food Interaction
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 110,
                height: 110,
                backgroundColor: "white",
                border: "1px solid #000000",
              }}
            >
              <img
                src={iconC3}
                alt=""
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[280px]">
              Emotional AI
            </div>
          </div>
        </div>
      </Section>

      {/* NEXT / PREV / BACK */}
      <div className={`${PX} py-12 flex items-center justify-between gap-4`}>
        <button
          type="button"
          onClick={onPrevProject}
          disabled={!onPrevProject}
          className="group font-['Source_Code_Pro'] text-lg underline disabled:no-underline"
          style={{ color: onPrevProject ? (dark ? "white" : "black") : "#8A8A8D", textUnderlinePosition: "from-font" }}
        >
          <span className="inline-block transition-transform duration-150 group-hover:-translate-x-1">
            ←
          </span>{" "}
          Prev Project
        </button>

        <button
          type="button"
          onClick={onNextProject}
          disabled={!onNextProject}
          className="group font-['Source_Code_Pro'] text-lg underline disabled:no-underline"
          style={{ color: onNextProject ? (dark ? "white" : "black") : "#8A8A8D", textUnderlinePosition: "from-font" }}
        >
          Next Project{" "}
          <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* FOOTER (no extra line) */}
      <footer className={`${PX} py-10 text-center`}>
        <div className="w-full font-['Source_Code_Pro'] text-sm" style={{ color: META }}>
          © Riddhi Kasar 2026
        </div>
      </footer>
    </main>
  );
}