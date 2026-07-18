import { type ReactNode } from "react";
import { motion } from "motion/react";
import Arrow from "./components/Arrow";

// Images
import imgHero from "@/assets/relevo/relevorobotics_hero.png";
import imgDig from "@/assets/relevo/dig.png";
import imgMat from "@/assets/relevo/materials.png";
import imgE1 from "@/assets/relevo/electronics_1.png";
import imgE2 from "@/assets/relevo/electronics_2.png";
import imgDash from "@/assets/relevo/dashboard.png";

// Videos
import Fem1Mp4 from "@/assets/relevo/fem_1.mp4";
import Fem2Mp4 from "@/assets/relevo/fem_2.mp4";
import D1Mp4 from "@/assets/relevo/demo_1.mp4";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/relevo/c_1_r.svg";
import iconC2 from "@/assets/relevo/c_2_r.svg";
import iconC3 from "@/assets/relevo/c_3_r.svg";

const PX = "px-5 sm:px-10 lg:px-[120px]";
const META = "#8A8A8D";

type Page = "relevo";

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
      viewport={{ once: true, amount: 0.06 }}
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

  // Blue accent that stays readable on black
  const BLUE = dark ? "#6AA2FE" : "#26488A";

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
            Relevo Robotics
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I designed and prototyped Relevo Robotics  - a soft robotic wearable device that supports knee recovery after surgery through assisted movement, comfort, and sensor-based feedback.          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 3" />
            <MetaItem icon={iconRole} text="Role: Mechanism + Form Design" />
            <MetaItem icon={iconTime} text="Time: 4 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          <span className="block">
            Out of the{" "}
            <span className="font-semibold">800,000 people that undergo knee surgeries</span> each year in the U.S.,{" "}
            <span className="font-semibold" style={{ color: "#EA181B" }}>
              more than 70% never fully recover.
            </span>
          </span>

          <span className="block mt-8">
            Knee rehabilitation is painful, repetitive, and often happens outside the clinic. Patients are expected to recover at home,
            but many{" "}
            <span className="font-semibold">
              do not have enough guidance, comfort, or confidence to complete rehab properly.
            </span>
          </span>

          <span className="block mt-8 font-semibold">
            Relevo changes that.
          </span>
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="design-challenge" title="Design Challenge">
        <div className="leading-relaxed">
            The challenge I came across was not simply making a robotic brace move. That was the easy part.
          <span className="block mt-2">
            It was making this robotic assistive device <span className="font-semibold">feel safe, be comfortable, and trustworthy on a healing body.</span>
          </span>
          
          <span className="block mt-4 font-semibold">
            I wanted to create a system that makes rehabilitation feel completely “at home”.
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
            By combining mechanism and form design, I invented this novel triangle form that allowed for a compact portable cushion which also lifted up to 50 lbs.          </p>
        </motion.div>
      </Section>

      <Section dividerColor={dividerColor} title="How It Works">
          <div className="leading-relaxed">
            Relevo is equipped with 3 components —{" "}
            <span className="font-semibold">The Brace, The Cushion, and The Dashboard</span>{" "}
            to help in pain relief, muscle strengthening, and tracking the patients’ overall recovery rate for real-time feedback.
          </div>

          {/* diagram/overview image */}
          <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
            <img
              src={imgDig}
              alt="How it works overview"
              className="w-full h-auto block object-cover"
            />
          </div>

          {/* The Brace */}
          <div className="mt-[92px]">
            <div className="leading-relaxed font-semibold">The Brace</div>

            {/* video */}
            <div className="mt-[42px] w-full overflow-hidden bg-black">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1210845922?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="Relevo Brace"
                  allowFullScreen
                />
            </div>

            <div className="mt-[42px] leading-relaxed">
              The brace allows for <span className="font-semibold">micro-movement</span> and massage in the knees to reduce swelling and
              increase comfort during exercises. It is equipped with EMG sensors that gather data on the muscle strength and movement.
            </div>
          </div>

          {/* The Cushion */}
          <div className="mt-[92px]">
            <div className="leading-relaxed font-semibold">The Cushion</div>

            {/* video */}
            <div className="mt-[42px] w-full overflow-hidden bg-black">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1210845923?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="Relevo Cushion"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-[42px] leading-relaxed">
              The cushion facilitates <span className="font-semibold">macro-movement</span> needed for rehabilitation. The angle can be set
              as per progress of the patient. It is equipped with a Flex sensor that tracks the angle and bend of the knee.
            </div>
          </div>

          {/* The Dashboard */}
          <div className="mt-[92px]">
            <div className="leading-relaxed font-semibold">The Dashboard</div>

            <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
              <img
                src={imgDash}
                alt="Dashboard"
                className="w-full h-auto block object-cover"
              />
            </div>

            <div className="mt-[42px] leading-relaxed">
              A doctor-facing dashboard gathers the data from the brace and the cushion that physiotherapists can use to{" "}
              <span className="font-semibold">track patient progress</span>, schedule appointments when needed, and view predictions.
              <span className="block mt-4">
                The entire product design project can be viewed here:{" "}
                <motion.button
                 type="button"
                 onClick={() => setPage("relevo")}
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
                 Relevo Clinical Dashboard <Arrow size="1em" style={{ display: "inline-block", verticalAlign: "text-bottom", marginLeft: 4, marginRight: 0 }} />
                </motion.button>
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section dividerColor={dividerColor} title="Process Overview">
        <div className="mt-[92px] leading-relaxed">
          <span className="font-semibold">Motion capture and FEM study</span> to understand movement and material properties
          <div className="mt-[42px] grid grid-cols-1 md:grid-cols-2 gap-[42px]">
            {/* FEM 1 (592x384) */}
            <div className="w-full overflow-hidden bg-black">
              <div className="relative w-full aspect-[592/384]">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={Fem1Mp4} type="video/mp4" />
                </video>
              </div>
            </div>

            {/* FEM 2 (586x384) */}
            <div className="w-full overflow-hidden bg-black">
              <div className="relative w-full aspect-[586/384]">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={Fem2Mp4} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[92px] leading-relaxed">
          <span className="font-semibold">Material Selection</span>
          <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
            <img
              src={imgMat}
              alt="Materials"
              className="w-full h-auto block object-cover"
            />
          </div>
        </div>

        <div className="mt-[92px] leading-relaxed">
          <span className="font-semibold">Electronics</span>
          <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
            <img
              src={imgE1}
              alt="Electronics"
              className="w-full h-auto block object-cover"
            />
          </div>

          <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
            <img
              src={imgE2}
              alt="Electronics"
              className="w-full h-auto block object-cover"
            />
          </div>
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="final-solution" title="Final Solution">
        <div className="mt-[42px] w-full overflow-hidden bg-black">
              <div className="relative w-full aspect-[1200/736]">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={D1Mp4} type="video/mp4" />
                </video>
              </div>
            </div>

        <div className="mt-[92px] w-full overflow-hidden bg-black">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1071643923?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0"
                  frameBorder={0}
                  allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="Relevo"
                  allowFullScreen
                />
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
                alt="Concept 1"
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Soft Robotics
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
              Biomechanics
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
              Materials
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