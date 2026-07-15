import { type ReactNode } from "react";
import { motion } from "motion/react";

// Images
import imgHero from "@/assets/trod/trod_hero.png";
import imgHardware from "@/assets/trod/hardware.png";
import imgAlgo from "@/assets/trod/algo.png";
import imgTable from "@/assets/trod/table.png";

// Videos
import demoMp4 from "@/assets/trod/trod_demo.mp4";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/trod/c_1.svg";
import iconC2 from "@/assets/trod/c_2.svg";
import iconC3 from "@/assets/trod/c_3.svg";

// Tech Stack Logos Icons
import iconT1 from "@/assets/trod/t_1.svg";
import iconT2 from "@/assets/trod/t_2.svg";
import iconT3 from "@/assets/trod/t_3.svg";
import iconT4 from "@/assets/trod/t_4.svg";

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

export default function TRODPage({
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

  // Blue accent that stays readable on black
  const BLUE = dark ? "#9BD1EA" : "#064866";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="trod"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={imgHero}
            alt="TROD hero"
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
            TROD - Tactile Robotic Obstacle Detector
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I built the algorithm logic and tested TROD - an EMG-controlled navigation robot that translates forearm muscle signals into movement, with haptic and audio feedback for obstacles.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 3" />
            <MetaItem icon={iconRole} text="Role: Algorithm Design + Mechatronics" />
            <MetaItem icon={iconTime} text="Time: 2 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          TROD is a muscle-controlled navigation robot designed to demonstrate how human muscle signals can intuitively guide movement through real-time environmental feedback.
        <span className="block mt-2">
          While currently implemented in a robotic form, the same sensing and control logic can be translated to <span className="font-semibold">prosthetic applications</span>, enabling users to navigate and respond to obstacles naturally through their own muscle inputs and sensory feedback, restoring a sense of awareness, control, and agency.
        </span>
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="design-challenge" title="Design Challenge">
        <div className="leading-relaxed">
          The challenge was not making the robot move.
        <span className="block mt-2 font-semibold">
          It was designing a closed-loop interaction between body signal, robot response, and user feedback.
        </span>
        </div>

        {/* OUTCOME */}
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
              color: BLUE,
            }}
          >
            Through repeated iterations, I was able to design an algorithm that improved navigation time from 2:20 minutes to 0:40 seconds.
          </p>
        </motion.div>
      </Section>

      <Section dividerColor={dividerColor} title="Process Overview">
        {/* 01 */}
        <div className="leading-relaxed font-semibold">01: Hardware + Techstack</div>

        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgHardware}
            alt="Hardware + tech stack"
            className="w-full h-auto block object-cover"
          />
        </div>

        {/* Tech logos + captions */}
        <div className="mt-[42px] grid grid-cols-2 md:grid-cols-4 gap-x-[42px] gap-y-[32px] items-start">
          {[
            { src: iconT1, label: "BIOPAC" },
            { src: iconT2, label: "Arduino IDE" },
            { src: iconT3, label: "C++" },
            { src: iconT4, label: "Matlab" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center text-center">
              <img
                src={t.src}
                alt=""
                aria-hidden
                className="h-[84px] w-auto object-contain"
              />
              <div className="mt-4 font-['Space_Grotesk'] font-medium text-[18px]">
                {t.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-[42px] leading-relaxed">
          The software stack combined embedded C/C++ on Arduino with real-time EMG signal processing,
          threshold-based muscle activation detection, and ultrasonic sensor logic.{" "}
          <span className="font-semibold">
            Kalman filtering, localization, trajectory correction, and feedback timing
          </span>{" "}
          were explored to improve human-in-the-loop navigation control.
        </div>

        {/* 02 */}
        <div className="mt-[92px] leading-relaxed font-semibold">02: Algorithm Logic</div>

        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgAlgo}
            alt="Algorithm logic diagram"
            className="w-full h-auto block object-contain"
          />
        </div>

        {/* Iteration summary */}
        <div className="mt-[42px] leading-relaxed">
          Through <span className="font-semibold">11+ control iterations</span>, TROD reduced navigation time
          from <span className="font-semibold">2:20 min</span> to <span className="font-semibold">0:40 min</span>.{" "}
          A <span className="font-semibold">71% improvement</span> by moving from noisy raw EMG thresholds to calibrated,
          windowed EMG signal logic with obstacle-aware motion and feedback timing.
        </div>

        {/* Table image */}
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgTable}
            alt="Iteration table"
            className="w-full h-auto block object-contain"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="final-demo" title="Final Demo">
        <div className="mt-[42px] w-full overflow-hidden bg-black">
          <div className="relative w-full aspect-[1174/659]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              preload="auto"
              loop
              playsInline
              controls
            >
              <source src={demoMp4} type="video/mp4" />
            </video>
          </div>
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
              EMG Control
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
              Human-Robot Interaction and Mechatronics
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
              Cloded-Loop Feedback System
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