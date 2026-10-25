import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig, useInView } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import star from "@/assets/work/star.svg";
import trodHero from "@/assets/work/trod_hero.avif";
import trodFlow from "@/assets/work/trod_flow.avif";
import epicureHero from "@/assets/work/epicure_hero.avif";
import epicureIcon from "@/assets/work/epicure_icon.avif";
import epicureScreens from "@/assets/work/epicure_screens.avif";
import epicureSketches from "@/assets/work/epicure_sketches.avif";
import epicurePrototype from "@/assets/work/epicure_prototype.avif";
import epicureRenders from "@/assets/work/epicure_renders.avif";
import epicureFinal from "@/assets/work/epicure_final.avif";
import liquidHardware from "@/assets/work/liquid_hardware.avif";
import liquidFigure from "@/assets/work/liquid_figure.avif";
import liquidInteraction from "@/assets/work/liquid_interaction.avif";
import liquidMachine from "@/assets/work/liquid_machine.avif";
import noonchiHero from "@/assets/noonchi-cs/noonchi_hero.avif";
import relevoHero from "@/assets/home/relevo.avif";
import trodCard from "@/assets/home/trod.avif";
import {
  CARD_HOVER, CONTENT_TOP, EASE_OUT, FADED_GREY, GAP, HOVER_SPRING, SURFACE, TEXT_GREY, LINK_CLASS, MENU_SIZE, NAV_TOP, NAV_X, RADIUS, SANS,
  TopNav, useStageScale, type SitePage,
} from "../site/site";

export type WorkTab = "digital" | "robotics";

// ─────────────────────────────────────────────────────────────────────────────
// Layout and type, in design px, in the Home page's style: cards are Home's wide card (1395 wide,
// 120 from the edge), headings are Home's project headings (42, star 18 before, 32 above the card),
// text is Home's description style (tight leading, slight negative tracking, 80% black) at 24, in
// two weights: regular and semibold.
// ─────────────────────────────────────────────────────────────────────────────
const PAD_X = 120; // Home's card inset from the screen edge
const INDEX_W = 220;
const CARD_W = 1395; // Home's wide card
const COLUMN_X = 1920 - PAD_X - CARD_W; // 405, as in Figma
const HEADING_TO_CARD = 32; // Home: heading row ends at 210, card starts at 242
const CARD_GAP = 56; // between cards (a little more than Home's GAP, for a vertical page)
const TEXT_PAD = 14; // text sits CARD_GAP + 14 from cards
const SECTION_GAP = GAP * 6;
const BOTTOM_MARGIN = GAP * 4;
const MEDIA_BG = SURFACE;

const TITLE = { fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 } as const;
const BODY = { fontSize: 24, lineHeight: "normal", letterSpacing: -0.24, color: TEXT_GREY } as const;
const MENU = { fontSize: MENU_SIZE, lineHeight: 1.1, letterSpacing: -MENU_SIZE * 0.05 } as const;

const STAR_H = 39;
const TITLE_H = TITLE.fontSize * TITLE.lineHeight;

// Entrance shared by every block: rise into place as it scrolls in (same curve as Home's cards)
const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.8, ease: EASE_OUT },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────
function Body({ children }: { children: ReactNode }) {
  return (
    <motion.div {...REVEAL} className="flex flex-col" style={{ ...BODY, gap: "1em", paddingBlock: TEXT_PAD }}>
      {children}
    </motion.div>
  );
}

const Intro = ({ children }: { children: ReactNode }) => <p>{children}</p>;
const B = ({ children }: { children: ReactNode }) => <b style={{ fontWeight: 600, color: "#000" }}>{children}</b>;

// Rounded frame with the Figma frame's proportions. The image covers it unless `img` places it.
// Images are never scaled by an animation, so they stay pixel-sharp.
function Media({ w = 1399, h, src, alt, bg = MEDIA_BG, img, delay = 0, children }: {
  w?: number;
  delay?: number;
  h: number;
  src?: string;
  alt?: string;
  bg?: string;
  img?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <motion.div
      {...REVEAL}
      transition={{ ...REVEAL.transition, delay }}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${w} / ${h}`, borderRadius: RADIUS, background: bg }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute max-w-none pointer-events-none select-none"
          style={{ inset: 0, width: "100%", height: "100%", objectFit: "cover", ...img }}
        />
      )}
      {children}
    </motion.div>
  );
}

// A diagram on a white background, set on the same grey card as the photos: multiply blends its
// white into the card, and it sits inside a margin so lines never touch the edge
function Diagram({ h, src, alt }: { h: number; src: string; alt: string }) {
  return (
    <Media h={h}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute pointer-events-none select-none"
        style={{ inset: 32, width: "calc(100% - 64px)", height: "calc(100% - 64px)", objectFit: "contain", mixBlendMode: "multiply" }}
      />
    </Media>
  );
}

// Images grouped tightly: rows of images at their natural proportions. Each image's share of a row
// follows its aspect ratio, so every image in a row is the same height and nothing is cropped.
type GridImage = { src: string; alt: string; w: number; h: number };
const GRID_GAP = 16;
function Grid({ rows }: { rows: GridImage[][] }) {
  let n = 0;
  return (
    <div className="flex flex-col" style={{ gap: GRID_GAP }}>
      {rows.map((row, r) => (
        <div key={r} className="flex" style={{ gap: GRID_GAP }}>
          {row.map(im => (
            <div key={im.src} style={{ flex: `${im.w / im.h} 1 0`, minWidth: 0 }}>
              <Media w={im.w} h={im.h} src={im.src} alt={im.alt} delay={0.08 * n++} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// The image inside an absolutely placed window (Figma's crop boxes, in % of the frame)
function Crop({ src, alt = "", box, img }: { src: string; alt?: string; box: CSSProperties; img: CSSProperties }) {
  return (
    <div className="absolute overflow-hidden" style={box}>
      <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className="absolute max-w-none pointer-events-none select-none" style={img} />
    </div>
  );
}

// Callout for a key point: a soft grey block with the star, a semibold headline and a line of
// detail. With `href` the whole block is a link and lifts like Home's cards.
function Callout({ title, children, href }: { title: string; children: ReactNode; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // the block grows in, the star spins into place, then the headline and the line follow
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });
  const inner = (
    <>
      <motion.img
        src={star}
        alt=""
        width={30}
        height={31}
        draggable={false}
        className="shrink-0"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.25 }}
      />
      <div className="flex flex-col" style={{ gap: 6 }}>
        <motion.p className="flex items-center" style={{ ...BODY, color: "#000", fontWeight: 600, gap: 8 }} {...rise(0.35)}>
          {title}
          {href && (
            <motion.span className="flex" variants={{ hover: { x: 3, y: -3 } }} transition={HOVER_SPRING} aria-hidden>
              <ArrowUpRight size={24} strokeWidth={2} />
            </motion.span>
          )}
        </motion.p>
        <motion.p style={BODY} {...rise(0.45)}>{children}</motion.p>
      </div>
    </>
  );
  const box = { borderRadius: RADIUS, background: MEDIA_BG, padding: "40px 48px", gap: 32 };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    >
      {href ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={box}
          whileHover="hover"
          variants={{ hover: CARD_HOVER }}
          whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
          transition={HOVER_SPRING}
        >
          {inner}
        </motion.a>
      ) : (
        <div className="flex items-center" style={box}>{inner}</div>
      )}
    </motion.div>
  );
}

// Vimeo embed, paused until the visitor presses play (Vimeo's own controls)
function Vimeo({ id, title, aspect }: { id: string; title: string; aspect: string }) {
  return (
    <motion.div {...REVEAL} className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: aspect, borderRadius: RADIUS }}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`}
        title={title}
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────
type Project = { id: string; label: string; title: string; content: ReactNode };

// Digital Interfaces: same template as Robotics. Each project opens with its image and the Home
// card's description; add sections below in the same way as the Robotics projects.
const DIGITAL: Project[] = [
  {
    id: "noonchi",
    label: "Noonchi",
    title: "Noonchi",
    content: (
      <>
        <Media w={2400} h={1214} src={noonchiHero} alt="Noonchi app home screen" />
        <Body>
          <Intro>
            Co-founding and building Noonchi - an intelligent app + wearable system to help autistic individuals make
            implicit social cues more explicit for clearer communication.
          </Intro>
        </Body>
      </>
    ),
  },
  {
    id: "relevo",
    label: "Relevo",
    title: "Relevo",
    content: (
      <>
        <Media h={745} src={relevoHero} alt="Relevo soft-robotic knee wearable beside its clinical dashboard" />
        <Body>
          <Intro>
            Building a physician-facing clinical dashboard and a soft-robotic wearable device for assisting in post knee
            surgery recovery.
          </Intro>
        </Body>
      </>
    ),
  },
];

const ROBOTICS: Project[] = [
  {
    id: "trod",
    label: "TROD",
    title: "TROD - Tactile Robotic Obstacle Detector",
    content: (
      <>
        <Media h={596} src={trodHero} alt="TROD robot with ultrasonic sensors and an EMG band" />
        <Body>
          <Intro>
            I built the hardware and algorithm for TROD - an EMG-controlled navigation robot that translates forearm muscle
            signals into movement, with haptic and audio feedback for obstacles.
          </Intro>
        </Body>
        <Diagram h={413} src={trodFlow} alt="TROD control flow, from muscle signal to motor output" />
        <Callout title="Navigation time down from 140s to 40s">Through 11+ iterations, I was able to reduce navigation time from 140s to 40s.</Callout>
        <Body>
          <p>
            The software stack combined embedded C/C++ on Arduino with real-time EMG signal processing, threshold-based muscle
            activation detection, and ultrasonic sensor logic. <B>Kalman filtering</B>, <B>localization</B>,{" "}
            <B>trajectory correction</B>, and <B>feedback timing</B> were explored to improve human-in-the-loop navigation
            control.
          </p>
        </Body>
        <Vimeo id="1210330111" title="TROD - Tactile Robotics for Obstacle Detection" aspect="1040 / 584" />
        <Body>
          <p>
            TROD is a muscle-controlled navigation robot designed to demonstrate how human muscle signals can intuitively
            guide movement through real-time environmental feedback.
          </p>
          <p>
            While currently implemented in a robotic form, the same sensing and control logic can be translated to{" "}
            <B>prosthetic applications</B>, enabling users to navigate and respond to obstacles naturally through their own
            muscle inputs and sensory feedback, restoring a sense of awareness, control, and agency.
          </p>
        </Body>
      </>
    ),
  },
  {
    id: "epicure",
    label: "Epicure Robotics",
    title: "Epicure Robotics - The Robotic Cooking Machine",
    content: (
      <>
        <Media h={745} src={epicureHero} alt="Render of the Epicure robotic cooking machine" img={{ objectPosition: "bottom" }}>
          <img
            src={epicureIcon}
            alt="Epicure Robotics logo"
            className="absolute pointer-events-none select-none"
            style={{ right: 28, top: 18, width: 42, height: 42 }}
          />
        </Media>
        <Body>
          <Intro>
            I designed India’s first robotic cooking machine, shaping the product from concept sketches to production-ready
            specifications.
          </Intro>
          <p>
            <B>Epicure Robotics</B> is a food tech robotics startup aiming to make robotic kitchens for their automated
            restaurants.
          </p>
          <p>
            At the company, I was responsible for <B>designing and developing</B> innovative, functional designs for
            automated cooking machines, while <B>overseeing the entire product design and development process.</B>
          </p>
        </Body>
        <Grid
          rows={[
            [{ src: epicureSketches, alt: "Concept sketches and CAD model of the machine", w: 2490, h: 692 }],
            [
              { src: epicurePrototype, alt: "Prototype shelving and aluminium frame in the workshop", w: 2490, h: 1114 },
              { src: epicureScreens, alt: "The machine's ordering screens greeting customers by name", w: 2490, h: 1002 },
            ],
          ]}
        />
        <Body>
          <p>
            The product design and development process followed design iterations based on feedback from stakeholders,
            end-users, and manufacturing partners to optimize product performance, usability, and aesthetics.
          </p>
          <p>
            A <B>1:1 scale prototype</B> was built for testing the robotic kitchen. A thorough set of requirements was
            formulated and a detailed map of procedure was designed. The following images show the key steps of the
            prototype.
          </p>
        </Body>
        <Callout title="Secured INR 1.4M in funding">
          This groundbreaking robotic kitchen design that I proposed secured INR 1.4M in funding and other preliminary
          investments for Epicure Robotics.
        </Callout>
        <Media h={743} src={epicureRenders} alt="Renders of the machine beside the full kitchen unit"
          img={{ top: "-0.54%", height: "100.54%" }} />
        <Media h={559}>
          <Crop src={epicureFinal} alt="Final render of the robotic kitchen"
            box={{ left: 0, right: 0, top: "-5.72%", height: "111.45%" }}
            img={{ left: "-4%", top: "-0.03%", width: "109.83%", height: "100.06%" }} />
        </Media>
      </>
    ),
  },
  {
    id: "liquid",
    label: "Liquid Data",
    title: "Liquid Data",
    content: (
      <>
        <Media h={745}>
          <Crop src={liquidHardware} alt="Liquid Data machine with its bottles and tubing"
            box={{ left: "-2.22%", top: "-9.13%", width: "118.73%", height: "122.42%" }}
            img={{ left: 0, top: 0, width: "100%", height: "102.8%" }} />
        </Media>
        <Body>
          <Intro>
            I built the embodied experience for Liquid Data Robotics - an AI powered intelligent machine that transforms
            memories into delicious drinks and cocktails.
          </Intro>
        </Body>
        <Callout title="Published at ACM CHI ‘26" href="https://dl.acm.org/doi/10.1145/3772363.3798477">
          Liquid Data has a publication in ACM CHI ‘26. Read the paper in the ACM Digital Library.
        </Callout>
        <Vimeo id="1210329078" title="Mnemonic Mixology - Liquid Data Robotics" aspect="16 / 9" />
        <Body>
          <p>
            Most data visualizations make information feel fixed and distant. Liquid Data explores{" "}
            <B>how data can become tangible</B> - dynamic, spatial, and alive.
          </p>
        </Body>
        <Diagram h={363} src={liquidFigure} alt="How a memory is turned into a drink recipe" />
        <Diagram h={260} src={liquidInteraction} alt="Steps of the interaction with the machine" />
        <motion.p {...REVEAL} style={{ ...BODY, marginTop: 16 - CARD_GAP }}>
          The algorithm and the interaction
        </motion.p>
        <Media h={1081}>
          <Crop src={liquidMachine} alt="Liquid Data machine pouring a drink"
            box={{ inset: 0 }}
            img={{ left: "-22.74%", top: 0, width: "137.32%", height: "100%" }} />
        </Media>
        <Callout title="Try Liquid Data live" href="https://liquid-data.lovable.app/">
          I also vibe-coded a website for this interaction for a virtual experience: liquid-data.lovable.app
        </Callout>
        <Vimeo id="1210329599" title="Liquid Data website demo" aspect="100 / 54.46" />
      </>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkPage({ tab, onTab, navigate }: {
  tab: WorkTab;
  onTab: (tab: WorkTab) => void;
  navigate: (p: SitePage | "noonchi") => void;
}) {
  const { scale, stageW } = useStageScale();
  const headerH = NAV_TOP * 2 + MENU_SIZE * 1.1;
  const columnW = Math.min(stageW - PAD_X - COLUMN_X, CARD_W);
  const projects = tab === "robotics" ? ROBOTICS : DIGITAL;

  // The stage is scaled with a transform, so its height is measured and set on the outer box
  const stageRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(1080);
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Index follows the project in view
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [active, setActive] = useState(projects[0]?.id);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
      let current = projects[0]?.id;
      for (const p of projects) {
        const el = sectionRefs.current[p.id];
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = p.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [projects]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - CONTENT_TOP * scale, behavior: "smooth" });
  };

  // Arriving with #section in the URL (Home's Relevo card) scrolls to that project once laid out
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !projects.some(p => p.id === id)) return;
    const t = window.setTimeout(() => scrollTo(id), 350);
    return () => window.clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  const switchTab = (next: WorkTab) => {
    if (next === tab) return;
    window.scrollTo({ top: 0 });
    onTab(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-white" style={{ fontFamily: SANS, minHeight: "100vh", color: "#000" }}>
        {/* Fixed header: menu + tab switch, fading out over the content as it scrolls under */}
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="work" onSelect={page => page !== "work" && navigate(page)} />
            <TabSwitch value={tab} onChange={switchTab} />
          </div>
        </div>

        {/* Fixed project index and back-to-top */}
        <div className="fixed top-0 left-0 z-20 origin-top-left pointer-events-none" style={{ width: stageW, transform: `scale(${scale})` }}>
          <ProjectIndex projects={projects} active={active} onSelect={scrollTo} />
        </div>
        <ToTop show={scrolled} scale={scale} />

        {/* Projects */}
        <div className="relative overflow-hidden" style={{ height: height * scale }}>
          <div
            ref={stageRef}
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: stageW, transform: `scale(${scale})`, paddingTop: CONTENT_TOP, paddingBottom: BOTTOM_MARGIN }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex flex-col"
                style={{ marginLeft: COLUMN_X, width: columnW, gap: SECTION_GAP }}
              >
                {projects.map(p => (
                  <section key={p.id} ref={el => { sectionRefs.current[p.id] = el; }} aria-labelledby={`work-${p.id}`}>
                    <ProjectTitle id={`work-${p.id}`} text={p.title} active={p.id === active} />
                    <div className="flex flex-col" style={{ gap: CARD_GAP, marginTop: HEADING_TO_CARD }}>{p.content}</div>
                  </section>
                ))}
                <NextCard {...NEXT[tab]} onOpen={() => switchTab(tab === "digital" ? "robotics" : "digital")} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

// End of each tab: a card for the other tab, spaced like the next project and set off by a hairline. Same card as Home's
// project cards: image, frosted strip, logo-star + title + line, arrow on hover, lift on hover.
const NEXT: Record<WorkTab, { label: string; title: string; description: string; image: string; alt: string; tone: "light" | "dark" }> = {
  digital: {
    label: "Next - Robotics",
    title: "Robotics",
    description: "TROD, Epicure Robotics and Liquid Data",
    image: trodCard,
    alt: "TROD robot",
    tone: "light",
  },
  robotics: {
    label: "Next - Digital Interfaces",
    title: "Digital Interfaces",
    description: "Noonchi and Relevo",
    image: relevoHero,
    alt: "Relevo wearable and clinical dashboard",
    tone: "dark",
  },
};

function NextCard({ label, title, description, image, alt, tone, onOpen }: (typeof NEXT)[WorkTab] & { onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const fg = tone === "dark" ? "#ffffff" : "#000000";
  return (
    <motion.div {...REVEAL} className="flex flex-col" style={{ gap: HEADING_TO_CARD, marginTop: -SECTION_GAP / 2 }}>
      {/* Hairline dividing the projects from what's next: half the project gap above and below it,
          drawn like the line above the contact links on Home's hello card */}
      <div aria-hidden style={{ height: 0.5, background: FADED_GREY, marginBottom: SECTION_GAP / 2 - HEADING_TO_CARD }} />
      <p style={BODY}>{label}</p>
      <motion.button
        onClick={onOpen}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={label}
        className="relative w-full overflow-hidden text-left cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ height: 667, borderRadius: RADIUS, background: MEDIA_BG }}
        whileHover={CARD_HOVER}
        whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
        transition={HOVER_SPRING}
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
        {/* Frosted strip, feathered at the top: the same strip as Home's card for each image
            (Relevo: barely tinted, 12px blur; TROD: 60% tint, 24px blur) */}
        <div
          className="absolute"
          style={{
            left: -24,
            right: -24,
            bottom: 0,
            height: 185,
            background: tone === "dark" ? "rgba(255,255,255,0.01)" : "rgba(248,250,252,0.6)",
            backdropFilter: `blur(${tone === "dark" ? 12 : 24}px)`,
            WebkitBackdropFilter: `blur(${tone === "dark" ? 12 : 24}px)`,
            maskImage: "linear-gradient(to bottom, transparent 0, black 28px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 28px)",
          }}
        />
        <div className="absolute flex flex-col items-start" style={{ left: 72, bottom: 64, gap: 13 }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <img src={star} alt="" width={30} height={31} draggable={false} style={{ filter: tone === "dark" ? "invert(1)" : undefined }} />
            <span style={{ fontSize: 32, lineHeight: 1.1, letterSpacing: -1.6, fontWeight: 500, color: fg }}>{title}</span>
            <motion.span
              className="flex"
              style={{ color: fg }}
              initial={false}
              animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -8, y: hover ? 0 : 8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              aria-hidden
            >
              <ArrowUpRight size={28} strokeWidth={1.75} />
            </motion.span>
          </div>
          <span style={{ fontSize: 20, lineHeight: "normal", letterSpacing: -0.2, color: fg, opacity: 0.8 }}>{description}</span>
        </div>
      </motion.button>
    </motion.div>
  );
}

// Star + title, like Home's heading row: the star spins in, the words rise out of a mask one by one,
// and the star turns a quarter while its project is the one being read
function ProjectTitle({ id, text, active }: { id: string; text: string; active: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} id={id} className="flex items-start" style={TITLE}>
      <motion.img
        src={star}
        alt=""
        width={38}
        height={STAR_H}
        draggable={false}
        className="shrink-0"
        // centred on the first line, so a title that wraps keeps its star at the top
        style={{ marginRight: 18, marginTop: (TITLE_H - STAR_H) / 2 }}
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0, rotate: !inView ? -90 : active ? 90 : 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
      <span>
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            // Padding lets glyphs that overhang their box (tight tracking) show; negative margin keeps spacing unchanged
            style={{ padding: "0 0.12em 4px", margin: "0 -0.12em -4px" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: inView ? "0%" : "110%" }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 + i * 0.04 }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </h2>
  );
}

// Digital Interfaces / Robotics, right-aligned with the menu (same style as Play's filters)
function TabSwitch({ value, onChange }: { value: WorkTab; onChange: (t: WorkTab) => void }) {
  const tabs: { id: WorkTab; label: string }[] = [
    { id: "digital", label: "Digital Interfaces" },
    { id: "robotics", label: "Robotics" },
  ];
  return (
    <motion.div
      className="absolute flex items-center"
      style={{ right: NAV_X, top: NAV_TOP, gap: 20 }}
      role="group"
      aria-label="Work type"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
    >
      {tabs.map(t => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-pressed={on}
            className={`whitespace-nowrap cursor-pointer ${on ? "opacity-100" : "opacity-20"} ${LINK_CLASS}`}
            style={{ ...MENU, fontWeight: on ? 600 : 400, color: "black", transition: "opacity 0.3s ease-out" }}
          >
            {t.label}
          </button>
        );
      })}
    </motion.div>
  );
}

// Left column: one entry per project. The one being read is semibold, with a small star that
// slides between entries. Lines up with the first image.
function ProjectIndex({ projects, active, onSelect }: { projects: Project[]; active?: string; onSelect: (id: string) => void }) {
  const STAR = 14;
  return (
    <motion.nav
      aria-label="Projects"
      className="absolute flex flex-col items-start pointer-events-auto"
      style={{ left: NAV_X, top: CONTENT_TOP + TITLE_H + HEADING_TO_CARD, width: INDEX_W, gap: 20 }} // menu margin; level with the first card
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
    >
      {projects.map(p => {
        const on = p.id === active;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            aria-current={on ? "true" : undefined}
            className={`relative flex items-center text-left cursor-pointer whitespace-nowrap ${on ? "opacity-100" : "opacity-20"} ${LINK_CLASS}`}
            style={{ ...MENU, fontWeight: on ? 600 : 400, transition: "opacity 0.3s ease-out" }}
          >
            {on && (
              <motion.img
                layoutId="work-index-star"
                src={star}
                alt=""
                width={STAR}
                height={STAR}
                className="absolute"
                style={{ left: 0 }}
                transition={HOVER_SPRING}
              />
            )}
            <motion.span animate={{ x: on ? STAR + 10 : 0 }} transition={HOVER_SPRING}>
              {p.label}
            </motion.span>
          </button>
        );
      })}
    </motion.nav>
  );
}

// Appears once the page has scrolled; arrow lifts on hover. Sits as far from the bottom as the menu is from the top.
function ToTop({ show, scale }: { show: boolean; scale: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="top"
          className="fixed z-20"
          style={{ left: NAV_X * scale, bottom: NAV_TOP * scale }} // same margin as the menu has at the top
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`group flex items-center cursor-pointer opacity-20 ${LINK_CLASS}`}
            style={{ ...MENU, fontSize: MENU_SIZE * scale, letterSpacing: MENU.letterSpacing * scale, fontWeight: 400, gap: 6 * scale }}
          >
            To the top
            <ArrowUp size={18 * scale} strokeWidth={2} className="transition-transform duration-300 ease-out group-hover:-translate-y-[3px]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
