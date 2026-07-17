import { type ReactNode } from "react";
import { motion } from "motion/react";

// Images
import imgBook from "@/assets/water/books.png";
import imgData from "@/assets/water/data.png";
import imgGraph from "@/assets/water/graph.png";
import imgS1 from "@/assets/water/screen_1.png";
import imgS2 from "@/assets/water/screen_2.png";
import imgS3 from "@/assets/water/screen_3.png";
import imgS4 from "@/assets/water/screen_4.png";
import imgS5 from "@/assets/water/screen_5.png";
import imgS6 from "@/assets/water/screen_6.png";
import imgS7 from "@/assets/water/screen_7.png";
import imgI1 from "@/assets/water/idea_1.png";
import imgI2 from "@/assets/water/idea_2.png";
import imgI3 from "@/assets/water/idea_3.png";
import imgI4 from "@/assets/water/idea_4.png";
import imgI5 from "@/assets/water/idea_5.png";

// Videos
import thumbnail from "@/assets/water/thumbnail.mp4";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/water/c_1.svg";
import iconC2 from "@/assets/water/c_2.svg";
import iconC3 from "@/assets/water/c_3.svg";

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

export default function WaterPage({
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

  // Purple accent that stays readable on black
  const PURPLE = dark ? "#ECBBFF" : "#8315EA";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="sacred-water"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mt-[42px] w-full overflow-hidden bg-black">
          <div className="relative w-full aspect-[1200/650]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src={thumbnail} type="video/mp4" />
            </video>
          </div>
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
            Sacred Water - Data Visualization
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I built the visual design for Sacred Water - a data visualization website that studies water data, it’s usage, symbolism, and meaning over different rituals, cultures, religion, and geography - proving that while we are separated by ideas, we are all connected by water in its true meaning.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 2" />
            <MetaItem icon={iconRole} text="Role: Research, Design" />
            <MetaItem icon={iconTime} text="Time: 3 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="Context">
        <div className="leading-relaxed">
          Water is often visualized as quantity: levels, flow, access, contamination. But people also relate to <span className="font-semibold">water through memory, ritual, place, and survival.</span>
          <span className="block mt-2">
            We wanted to explore a key question:
          </span>
        </div>

        {/* Testimony INSIDE the same section (consistent spacing) */}
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
              color: PURPLE,
            }}
          >
            How does the symbolic and practical use of water in religion create a unifying yet diverse narrative of humanity’s spiritual connection to this universal and essential resource?
          </p>
        </motion.div>
      </Section>

      <Section dividerColor={dividerColor} id="design-challenge" title="Final Solution">
        <div className="leading-relaxed">
          Final visualization screens
        </div>
      </Section>

        <motion.section
        className="w-full"
        style={{
          background: dark
            ? "linear-gradient(180deg, #000000 100%, #7165B2 10%)"
            : "linear-gradient(180deg, #000000 100%, #7165B2 10%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="pt-[92px] pb-[64px]">
          {/* symmetric padding so the column centers */}
          <div className="px-5 sm:px-10 lg:px-[192px]">
            <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-[42px]">
              {[imgS1, imgS2, imgS3, imgS4, imgS5, imgS6, imgS7].map((src, i) => (
                <div
                  key={i}
                  className="w-full rounded-[4px] overflow-hidden bg-white shadow-[0_14px_40px_rgba(0,0,0,0.16)]"
                >
                  <img
                    src={src}
                    alt={`Noonchi screen ${i + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <Section dividerColor={dividerColor} title="Process Overview">
        <div className="leading-relaxed font-semibold">
          01: Gathering the Data
        </div>
          <div className="mt-2 leading-relaxed">
            The data gathering process included <span className="font-semibold">web-scrapping and many visits to multiple libraries.</span> We also reached out to the research librarians at the <span className="font-semibold">Harvard Divinity School</span> to gain their perspectives on our topic.
          </div>
          <div className="mt-2 leading-relaxed">
            Finally, after many searches, we narrowed down on three books to be used as our primary sources of information.
          </div>

          <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
            <img
              src={imgBook}
              alt="Books"
              className="w-full h-auto block object-cover"
            />
          </div>

          <div className="mt-[92px] leading-relaxed font-semibold">
            02: Computing the Data
            </div>
              <div className="mt-2 leading-relaxed">
                We used the GPT 4.0 model on Perplexity to <span className="font-semibold">analyze the texts and manually built an exhaustive dataset featuring the different uses and themes of water across a set category of religions.</span>
              </div>
              <div className="mt-2 leading-relaxed">
                Our choice for the religions defined in a category was based on existing research on 10 most-practiced religions across the world.
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgData}
                  alt="Data"
                  className="w-full h-auto block object-cover"
                />
              </div>

          <div className="mt-[92px] leading-relaxed font-semibold">
            03: Exploring the Data
            </div>
              <div className="mt-2 leading-relaxed">
                We used Excel, P5 and Figma to explore the data we had built. We wanted to understand what the data was telling us, what were some interesting trends observed, and how was water being perceived across the different religions.
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgGraph}
                  alt="Graph"
                  className="w-full h-auto block object-cover"
                />
              </div>

          <div className="mt-[92px] leading-relaxed font-semibold">
            04: Visualizing the Data
            </div>
              <div className="mt-2 leading-relaxed">
                Here we explored how we wanted to tell the story we had. <span className="font-semibold">What did we want the viewers to feel? What did we want the viewers to know and take away from this visualization?</span>
              </div>
              <div className="mt-2 leading-relaxed">
                A few of the ideations are depicted below.
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgI1}
                  alt="Idea 1"
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgI2}
                  alt="Idea 2"
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgI3}
                  alt="Idea 3"
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgI4}
                  alt="Idea 4"
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
                <img
                  src={imgI5}
                  alt="Idea 5"
                  className="w-full h-auto block object-cover"
                />
              </div>

              <div className="mt-[92px] leading-relaxed">
                Keeping to the theme of <span className="font-semibold">scriptures,</span> we decided on a design that gives a sense of a <span className="font-semibold">“stack of ritual texts”</span> that can be easily sorted for different views.
              </div>
              <div className="mt-4 leading-relaxed">
                The title <span className="font-semibold">‘And We Made From Water, Every Living Thing’</span> comes from a quote from a religious text, to highlight the relevance of water in religion.
              </div>
              <div className="mt-4 leading-relaxed">
                What is water depicted as? Viewed as? And represented as? <span className="font-semibold">Although we seek to answer these questions from this project, the true answers lie within the viewer, and their relation with water.</span>
                </div>

        <div className="mt-[92px] leading-relaxed">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1071647312?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder={0}
              allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="Sacred Water"
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
                alt=""
                aria-hidden
                className="h-[62px] w-[62px] object-contain"
              />
            </div>

            <div className="mt-5 font-['Space_Grotesk'] text-center font-normal text-[16px] leading-snug max-w-[260px]">
              Qualitative Research
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
              Data Gathering
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
              Data Storytelling
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