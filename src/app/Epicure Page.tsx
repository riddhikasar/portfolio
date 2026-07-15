import { type ReactNode } from "react";
import { motion } from "motion/react";

// Images
import imgHero from "@/assets/epicure/epicure_hero.png";
import imgMain from "@/assets/epicure/epicure_main.png";
import imgS1 from "@/assets/epicure/sketch_1.png";
import imgS2 from "@/assets/epicure/sketch_2.png";
import imgS3 from "@/assets/epicure/sketch_3.png";
import imgF1 from "@/assets/epicure/final_1.png";
import imgF2 from "@/assets/epicure/final_2.png";
import imgF3 from "@/assets/epicure/final_3.png";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/epicure/c_1.svg";
import iconC2 from "@/assets/epicure/c_2.svg";
import iconC3 from "@/assets/epicure/c_3.svg";

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

export default function EpicurePage({
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

  // Green accent that stays readable on black
  const GREEN = dark ? "#A2C19D" : "#365431";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="epicure"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={imgHero}
            alt="Epicure hero"
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
            Epicure Robotics
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I designed India’s first robotic cooking machine - shaping the product from concept sketches to production-ready specifications.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 3" />
            <MetaItem icon={iconRole} text="Role: Industrial Design Lead" />
            <MetaItem icon={iconTime} text="Time: 3 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          <span className="font-semibold">Epicure Robotics</span> is a food tech robotics startup aiming to make robotic kitchens for their automated restaurants.
          <span className="block mt-2">
            At the company, I was responsible for <span className="font-semibold">designing and developing</span> innovative, functional designs for automated cooking machines, while <span className="font-semibold">overseeing the entire product design and development process.</span>
          </span>
        </div>

        {/* IMPACT */}
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
              color: GREEN,
            }}
          >
            This groundbreaking robotic kitchen design that I proposed secured <span className="font-semibold">INR 1.4M</span> in funding and other preliminary investments for Epicure Robotics
          </p>
        </motion.div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgMain}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} title="Process Overview">
        <div className="leading-relaxed">
          The product design and development process followed design iterations based on feedback from stakeholders, end-users, and manufacturing partners to optimize product performance, usability, and aesthetics.
        </div>

        <div className="mt-4 leading-relaxed">
          A <span className="font-semibold">1:1 scale prototype</span> was built for testing the robotic kitchen. A thorough set of requirements was formulated and a detailed map of procedure was designed. The following images show the key steps of the prototype.
        </div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgS1}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgS2}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgS3}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="final-solution" title="Final Solution">
        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgF1}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgF2}
            alt="Robotic kitchen design"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgF3}
            alt="Robotic kitchen design"
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
              Embodiment Design
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
              Design for Manufacturing
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
              Automation Design
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