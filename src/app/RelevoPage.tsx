import { type ReactNode } from "react";
import { motion } from "motion/react";
import Arrow from "./components/Arrow";

// Images
import imgHero from "@/assets/relevo/relevo_hero.png";
import imgMain from "@/assets/relevo/relevo_main.png";
import imgIA from "@/assets/relevo/ia.png";
import imgWire from "@/assets/relevo/wireframe.png";

import imgS1 from "@/assets/relevo/screen_1.png";
import imgS2 from "@/assets/relevo/screen_2.png";
import imgS3 from "@/assets/relevo/screen_3.png";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/relevo/c_1.svg";
import iconC2 from "@/assets/relevo/c_2.svg";
import iconC3 from "@/assets/relevo/c_3.svg";

const PX = "px-5 sm:px-10 lg:px-[120px]";
const META = "#8A8A8D";

const SCROLL_OFFSET_PX = 88;
const HERO_MAX_H = "calc(100svh - 140px)";

type Page = "relevo-robotics";

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

export default function RelevoPage({
  dark,
  onBackToWork,
  onPrevProject,
  onNextProject,
  setPage,
}: {
  dark: boolean;
  onBackToWork?: () => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
  setPage: (page: Page) => void;
}) {
  const fg = dark ? "white" : "black";

  // Section lines: black in light mode, white in dark mode
  const dividerColor = dark ? "#FFFFFF" : "#000000";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="relevo"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={imgHero}
            alt="Relevo hero"
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
            Relevo - Clinical Dashboard
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I designed Relevo's clinical dashboard - a doctor and physiotherapist facing interface that turns patient recovery data into measurable progress and care decisions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 3" />
            <MetaItem icon={iconRole} text="Role: Product Design" />
            <MetaItem icon={iconTime} text="Time: 4 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          Rehabilitation does not end when the patient leaves the clinic. Doctors and physiotherapists need a way to <span className="font-semibold">understand whether patients are improving, struggling, or missing critical recovery milestones.</span>
          <span className="block mt-4">
            This project is a part of <motion.button
              type="button"
              onClick={() => setPage("relevo-robotics")}
              className="font-semibold underline"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                color: "inherit",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlinePosition: "from-font",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              }}
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.15 }}
            >
              Relevo Robotics <Arrow size="1em" style={{ display: "inline-block", verticalAlign: "text-bottom", marginLeft: 4, marginRight: 0 }} />
            </motion.button> the soft-robotic wearable for post-surgery knee rehabilitation.
          </span>
        </div>

        <div
          className="mt-[72px] w-full overflow-hidden rounded-[8px]"
          style={{ backgroundColor: dark ? "#000" : "#fff" }}
        >
          <img
            src={imgMain}
            alt="Relevo main"
            className="w-full h-auto block object-cover"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="design-challenge" title="Design Challenge">
        <div className="leading-relaxed">
            The challenge was not just displaying sensor data.
          <span className="block mt-2 font-semibold">
            It was turning movement, pain, and progress signals into a dashboard that clinicians could quickly read and act on.
          </span>
        </div>
      </Section>

      <Section dividerColor={dividerColor} title="Process Overview">
        <div className="leading-relaxed">
          01: <span className="font-semibold">Information architecture</span> to map out the elements and pages
        </div>

        <div className="mt-[42px] w-full overflow-hidden" style={{ backgroundColor: dark ? "#000" : "#fff" }}>
          <img
            src={imgIA}
            alt="Information architecture"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] leading-relaxed">
          02: <span className="font-semibold">Low fidelity prototypes</span> to understand the user flow and layout
        </div>

        <div className="mt-[42px] w-full overflow-hidden" style={{ backgroundColor: dark ? "#000" : "#fff" }}>
          <img
            src={imgWire}
            alt="Low fidelity prototypes"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[92px] leading-relaxed">
          03: <span className="font-semibold">Color analysis</span>
        </div>

        <div className="mt-[32px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[32px]">
          {[
            {
              name: "Relevo Blue",
              hex: "#2A4E98",
              desc: ["Familiar and", "Trustful"],
              color: "#2A4E98",
            },
            {
              name: "Relevo Yellow",
              hex: "#FFE380",
              desc: ["Positive and", "Encouraging"],
              color: "#FFE380",
            },
            {
              name: "Relevo Dark",
              hex: "#070D20",
              desc: ["Grounded and", "Solid"],
              color: "#070D20",
            },
            {
              name: "Relevo Light",
              hex: "#F5F5F5",
              desc: ["Clean and", "Professional"],
              color: "#F5F5F5",
              border: "1px solid rgba(0,0,0,0.08)", // so light circle is visible on white
            },
          ].map((c) => (
            <div key={c.hex} className="flex flex-col items-center text-center">
              <div
                className="rounded-full"
                style={{
                  width: 132,
                  height: 132,
                  backgroundColor: c.color,
                  border: c.border,
                }}
              />

              <div className="mt-6 font-['Space_Grotesk']">
                <div className="font-medium text-[24px] leading-tight">
                  {c.name}
                </div>
                <div className="font-medium text-[24px] leading-tight">
                  {c.hex}
                </div>

                <div className="mt-4 font-normal text-[20px] leading-snug">
                  {c.desc[0]}
                  <br />
                  {c.desc[1]}
                </div>
              </div>
            </div>
          ))}
        </div>

      </Section>

      <Section dividerColor={dividerColor} id="final-solution" title="Final Solution">
        <div className="leading-relaxed">
          The Relevo Dashboard gives doctors and physiotherapists a clear view of <span className="font-semibold">patient progress, exercise history, appointments, and predicted recovery patterns.</span>
        <span className="block mt-4">
          The dashboard became the decision layer of the Relevo system, allowing doctors to <span className="font-semibold" >make informed decisions faster and with more accuracy.</span>
        </span>
        </div>
      </Section>

      <motion.section
        className="w-full"
        style={{
          background: dark
            ? "linear-gradient(180deg, #000000 0%, #6AA2FE 100%)"
            : "linear-gradient(180deg, #FFFFFF 0%, #6AA2FE 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="pt-[42px] pb-[64px]">
          {/* symmetric padding so the column centers */}
          <div className="px-5 sm:px-10 lg:px-[192px]">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-[42px]">
              {[imgS1, imgS2, imgS3].map((src, i) => (
                <div
                  key={i}
                  className="w-full rounded-[4px] overflow-hidden"
                  style={{
                    backgroundColor: dark ? "#111" : "#fff",
                    boxShadow: dark
                      ? "0 14px 40px rgba(255,255,255,0.07)"
                      : "0 14px 40px rgba(0,0,0,0.16)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Relevo screen ${i + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

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
                alt="Concept 1"
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Clinical UX
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
                alt="Concept 2"
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Health Data Visualization
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
                alt="Concept 3"
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[280px]">
              Information Architecture
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