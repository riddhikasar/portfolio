import { type ReactNode } from "react";
import { motion } from "motion/react";

// Images
import imgHero from "@/assets/link/link_hero.png";
import imgDig from "@/assets/link/dig.png";
import imgPrototype from "@/assets/link/prototype.png";
import imgEx1 from "@/assets/link/ex_1.png";
import imgEx2 from "@/assets/link/ex_2.png";
import imgEx3 from "@/assets/link/ex_3.png";
import imgEx4 from "@/assets/link/ex_4.png";
import imgPlants from "@/assets/link/plants.png";
import imgTouch from "@/assets/link/touch.png";
import imgFire from "@/assets/link/fire.png";
import imgIce from "@/assets/link/ice.png";
import imgTest from "@/assets/link/test.png";
import imgFuture from "@/assets/link/future.png";
import imgPoster from "@/assets/link/poster.png";

// Videos
import touchMp4 from "@/assets/link/touch.mp4";
import fireMp4 from "@/assets/link/fire.mp4";
import iceMp4 from "@/assets/link/ice.mp4";

// Main Icons
import iconTeam from "@/assets/icons/team.svg";
import iconRole from "@/assets/icons/role.svg";
import iconTime from "@/assets/icons/time.svg";

// Concept Icons
import iconC1 from "@/assets/link/c_1.svg";
import iconC2 from "@/assets/link/c_2.svg";
import iconC3 from "@/assets/link/c_3.svg";

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

export default function LinkPage({
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
  const PURPLE = dark ? "#B9B0FF" : "#4F36D7";

  return (
    <main
      className="relative min-h-screen overflow-x-clip transition-colors duration-300"
      style={{ backgroundColor: dark ? "#000" : "#fff", color: fg }}
    >
      {/* HERO (32px gap under header, respects 120px margins) */}
      <motion.section
        id="link"
        className={`${PX} mt-[32px]`}
        style={{ scrollMarginTop: SCROLL_OFFSET_PX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center">
          <img
            src={imgHero}
            alt="Link hero"
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
            Link
          </h1>

          <p className="mt-4 w-full font-['Instrument_Sans'] text-[clamp(16px,1.6vw,20px)] leading-relaxed opacity-90">
            I co-founded and built LINK - a tangible interface that translates plant distress signals into real-time audio-visual feedback for agriculture and plant health support.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <MetaItem icon={iconTeam} text="Team: 2" />
            <MetaItem icon={iconRole} text="Role: Co-Founder, Research + Dev" />
            <MetaItem icon={iconTime} text="Time: 6 months" />
          </div>
        </div>
      </motion.header>

      {/* SECTIONS */}
      <Section dividerColor={dividerColor} title="How it Works">
        <div className="leading-relaxed">
          Plant Distress is any unfavorable condition that negatively impacts a plant's metabolism, growth, or development; triggered by either biotic (living) or abiotic (non-living) factors.
          <div className="mt-4">
            Distress leads to <span className="font-semibold">Ionic Changes</span> causing a <span className="font-semibold">Potential Difference</span> in the plant.
          </div>
          <div className="mt-4">
            LINK intervenes at the ionic level to pick up this potential difference, map, and then translate the signals.
          </div>
        </div>
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgDig}
            alt="Diagram"
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgPrototype}
            alt="Diagram"
            className="w-full h-auto block object-cover"
          />
        </div>
      </Section>

      <Section dividerColor={dividerColor} id="design-challenge" title="Trials and Experiments">
        {/* 4-step grid */}
        <div className="mt-[42px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[42px]">
          {[
            {
              img: imgEx1,
              title: "01: Stimuli Selection",
              body: "We used 3 stimuli – Touch, Fire, Ice.",
            },
            {
              img: imgEx2,
              title: "02: Stimuli Initiation",
              body: "Introducing the stimuli to the plant for 10s.",
            },
            {
              img: imgEx3,
              title: "03: Response",
              body: "The signal for each stimuli was recorded.",
            },
            {
              img: imgEx4,
              title: "04: Plant Stabilization",
              body: "After each trial, we gave 20s for the plant to rest.",
            },
          ].map((s) => (
            <div key={s.title} className="flex flex-col">
              <div className="w-full overflow-hidden bg-white dark:bg-black shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <img src={s.img} alt={s.title} className="w-full h-auto block object-cover" />
              </div>

              <div className="mt-4 font-['Space_Grotesk'] font-medium text-[18px] leading-snug">
                {s.title}
              </div>
              <div className="mt-2 font-['Space_Grotesk'] font-normal text-[16px] leading-snug opacity-90">
                {s.body}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className= "mt-[42px]">
            The experiment was done on 6 different plants.
          <span className= "block mt-2 font-semibold">
            Variables tested:
          </span>{" "}
            Plant Response Time, Distress Threshold, and Internal Stimuli interference.
          <span className="block mt-2 font-semibold">
            Total trial count = 1040.
          </span>
        </div>

        {/* Gallery label */}
        <div className="mt-[42px] leading-relaxed">
          <span className="font-semibold">Gallery of plants used:</span>{" "}
          Mint, Sundew, Venus Fly Trap, Oxalis, Mimosa Pudica, Basil
        </div>

        {/* Gallery image (single transparent PNG) */}
          <div className="mt-[42px] w-full">
            <div
              className="w-full overflow-hidden"
              style={{ backgroundColor: dark ? "#000" : "#fff" }}
            >
              <img
                src={imgPlants}
                alt="Gallery of plants used"
                className="w-full h-auto block object-contain"
              />
            </div>
          </div>
      </Section>

      <Section dividerColor={dividerColor} title="Dictionary">
        {(() => {
          const axisColor = dark ? "#FFFFFF" : "#000000";

          // Shared row height so left images and right videos always align
          const ROW_H = "clamp(140px, 14vw, 210px)";
          const GAP = "42px";

          const rows = [
            { label: "Touch", img: imgTouch, vid: touchMp4 },
            { label: "Fire", img: imgFire, vid: fireMp4 },
            { label: "Ice", img: imgIce, vid: iceMp4 },
          ];

          // Axis layout numbers (px)
          const AXIS_X = 44;      // x position of Y axis line (origin x)
          const PAD_LEFT = 72;    // where images start (creates gap from Y axis)
          const PAD_BOTTOM = 44;  // reserved space for x-label; x-axis sits at top of this band

          // Make x-axis-to-bottom-image gap match y-axis-to-images gap
          const PLOT_GAP = PAD_LEFT - AXIS_X;

          // Fixed label column width so ALL videos have identical width
          const LABEL_W = 84;

          return (
            <div className="mt-[42px] font-['Space_Grotesk']">
              {/* MOBILE/TABLET: image then video (same width), label below */}
              <div className="grid grid-cols-1 gap-[42px] lg:hidden">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-1 gap-4">
                    {/* image */}
                    <div className="w-full overflow-hidden" style={{ height: ROW_H }}>
                      <img
                        src={r.img}
                        alt={r.label}
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    {/* video (full width, same as image) */}
                    <div className="w-full overflow-hidden bg-black" style={{ height: ROW_H }}>
                      <video
                        className="w-full h-full object-cover block"
                        src={r.vid}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        preload="auto"
                      />
                    </div>

                    {/* label below */}
                    <div
                      className="font-medium text-[18px]"
                      style={{ color: axisColor }}
                    >
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP: exact 2-column aligned grid + axes */}
              <div className="hidden lg:grid grid-cols-[1.6fr_1fr] gap-x-[42px]">
                {/* LEFT column: images + axes */}
                <div
                  className="relative"
                  style={{
                    paddingLeft: PAD_LEFT,
                    paddingBottom: PAD_BOTTOM,
                  }}
                >
                  {/* Axes overlay */}
                  <div className="pointer-events-none absolute inset-0">
                    {/* SVG axes with outline arrowheads */}
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 1000 1000"
                      preserveAspectRatio="none"
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <defs>
                        <marker
                          id="arrow-outline-dict"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="5"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path
                            d="M1,1 L9,5 L1,9"
                            fill="none"
                            stroke={axisColor}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </marker>
                      </defs>

                      {/* y-axis: bottom -> top so arrow sits at TOP */}
                      <line
                        x1="44"
                        y1="940"
                        x2="44"
                        y2="60"
                        stroke={axisColor}
                        strokeWidth="1.2"
                        markerEnd="url(#arrow-outline-dict)"
                        opacity="0.75"
                      />

                      {/* x-axis: left -> right so arrow sits at RIGHT */}
                      <line
                        x1="44"
                        y1="940"
                        x2="970"
                        y2="940"
                        stroke={axisColor}
                        strokeWidth="1.2"
                        markerEnd="url(#arrow-outline-dict)"
                        opacity="0.75"
                      />
                    </svg>

                    {/* Y label (close to line) */}
                    <div
                      style={{
                        position: "absolute",
                        left: -44,
                        top: "50%",
                        transform: "translateY(-50%) rotate(180deg)",
                        writingMode: "vertical-rl",
                        opacity: 0.75,
                        fontSize: 16,
                        color: axisColor,
                      }}
                    >
                      Potential Difference (mV)
                    </div>

                    {/* X label (close to line) */}
                    <div
                      style={{
                        position: "absolute",
                        left: AXIS_X,
                        right: 0,
                        bottom: -26,
                        textAlign: "center",
                        opacity: 0.75,
                        fontSize: 16,
                        color: axisColor,
                      }}
                    >
                      Time (s)
                    </div>
                  </div>

                  {/* Images grid */}
                  <div
                    className="grid"
                    style={{
                      gridAutoRows: ROW_H,
                      rowGap: GAP,
                      paddingBottom: PLOT_GAP,
                    }}
                  >
                    {rows.map((r) => (
                      <div key={r.label} className="w-full h-full overflow-hidden">
                        <img
                          src={r.img}
                          alt={r.label}
                          className="w-full h-full object-cover block"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT column: videos grid (fixed label width => identical video widths) */}
                <div
                  className="grid"
                  style={{
                    gridAutoRows: ROW_H,
                    rowGap: GAP,
                    paddingBottom: PLOT_GAP,
                  }}
                >
                  {rows.map((r) => (
                    <div
                      key={r.label}
                      className="h-full grid items-center gap-6"
                      style={{ gridTemplateColumns: `1fr ${LABEL_W}px` }}
                    >
                      <div className="w-full h-full overflow-hidden bg-black">
                        <video
                          className="w-full h-full object-cover block"
                          src={r.vid}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          preload="auto"
                        />
                      </div>

                      <div
                        className="font-medium text-[20px]"
                        style={{ color: axisColor }}
                      >
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </Section>

      <Section dividerColor={dividerColor} title="The Future">
        <div className="mt-[42px] w-full overflow-hidden bg-white dark:bg-black">
          <img
            src={imgFuture}
            alt="Future"
            className="w-full h-auto block object-cover"
          />
        </div>

        {/* Prompt above poster (responsive indent, no “would     they” gap) */}
        <div className="mt-[92px] w-full font-['Space_Grotesk']">
          {/* Line 1 (normal sentence, no grid split) */}
          <div
            className="text-[18px] leading-snug text-left"
            style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}
          >
            If Plants could speak, what would they say?
          </div>

          {/* Line 2 (starts under “they” via responsive indent) */}
          <div
            className="mt-2 font-medium text-[18px] leading-snug text-left"
            style={{
              color: dark ? "#FFFFFF" : "#000000",
              // tune this once so “If…” starts under “they”
              paddingLeft: "clamp(16ch, 24vw, 30ch)",
            }}
          >
            If Plants could speak, would you listen?
          </div>
        </div>

        {/* Poster */}
        <div
          className="mt-[42px] w-full overflow-hidden"
          style={{ backgroundColor: dark ? "#000" : "#fff" }}
        >
          <img
            src={imgPoster}
            alt="Poster"
            className="w-full h-auto block object-contain"
          />
        </div>

        <div className="mt-[92px] w-full overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <iframe
              src="https://player.vimeo.com/video/1092600710?badge=0&autopause=0&player_id=0&app_id=58479"
              className="absolute inset-0 w-full h-full"
              frameBorder={0}
              allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="LINK"
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
              Ecology Design
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
              Bio-tech Interaction
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
              Signal Processing
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