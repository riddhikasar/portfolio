import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";

import noonchiLogo from "@/assets/home/noonchi_logo.png";
import imgHero from "@/assets/noonchi-cs/noonchi_hero.avif";
import imgCodesign from "@/assets/noonchi-cs/codesign.avif";
import imgWatch from "@/assets/noonchi-cs/watch_screens.avif";
import imgS1 from "@/assets/noonchi-cs/screen_1.avif";
import imgS2 from "@/assets/noonchi-cs/screen_2.avif";
import imgS3 from "@/assets/noonchi-cs/screen_3.avif";
import imgS4 from "@/assets/noonchi-cs/screen_4.avif";
import imgS5 from "@/assets/noonchi-cs/screen_5.avif";
import imgS6 from "@/assets/noonchi-cs/screen_6.avif";
import imgS7 from "@/assets/noonchi-cs/screen_7.avif";
import nudgesMp4 from "@/assets/noonchi/nudges.mp4";
import iconW1 from "@/assets/noonchi/w_1.svg";
import iconW2 from "@/assets/noonchi/w_2.svg";
import iconW3 from "@/assets/noonchi/w_3.svg";
import iconC1 from "@/assets/noonchi/c_1.svg";
import iconC2 from "@/assets/noonchi/c_2.svg";
import iconC3 from "@/assets/noonchi/c_3.svg";
import {
  CONTENT_TOP, EASE_OUT, GAP, LINK_CLASS, MENU_SIZE, NAV_TOP, NAV_X, RADIUS, SANS, HAIRLINE, SURFACE, TEXT_GREY, TEXT_OPACITY,
  TopNav, useStageScale, type SitePage,
} from "../site/site";

// ─────────────────────────────────────────────────────────────────────────────
// Case study layout (design px, scaled like Home and Play): the top menu, a sticky
// table of contents in the left margin, and a content column that starts where the
// menu ends — the same line the first card sits on at Home.
// ─────────────────────────────────────────────────────────────────────────────
const CARD_BG = SURFACE;
const PURPLE = "#4F36D7";
const RED = "#EA181B";
const TEXT_W = 960; // max width of body text
const SECTION_GAP = 160; // between sections

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "context", label: "Context" },
  { id: "challenge", label: "Challenge" },
  { id: "co-design", label: "Co-design" },
  { id: "how-it-works", label: "How it works" },
  { id: "the-app", label: "The app" },
  { id: "final-solution", label: "Final solution" },
  { id: "learnings", label: "Learnings" },
] as const;

const TYPE = {
  title: { fontSize: 72, lineHeight: 1.1, letterSpacing: -3.6, fontWeight: 500 },
  heading: { fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 },
  cardTitle: { fontSize: 24, lineHeight: 1.2, letterSpacing: -0.8, fontWeight: 500 },
  body: { fontSize: 20, lineHeight: 1.5, letterSpacing: -0.2, fontWeight: 400 },
  label: { fontSize: 18, lineHeight: 1.2, letterSpacing: -0.4, fontWeight: 400 },
} as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: EASE_OUT },
};

export default function NoonchiCaseStudy({ navigate, onPrevProject, onNextProject }: {
  navigate: (p: SitePage) => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
}) {
  const { scale, stageW } = useStageScale();

  // Content starts where the menu ends (measured, as on Home)
  const navRef = useRef<HTMLElement>(null);
  const [navEnd, setNavEnd] = useState(NAV_X + 270);
  useEffect(() => {
    const measure = () => { if (navRef.current) setNavEnd(NAV_X + navRef.current.offsetWidth); };
    measure();
    document.fonts?.ready.then(measure);
  }, []);
  const contentX = navEnd;
  const contentW = stageW - contentX - NAV_X;

  // The scaled content's real height sets the page's scroll height
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerH, setInnerH] = useState(4000);
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setInnerH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Which section is being read
  const [active, setActive] = useState<string>("intro");
  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (CONTENT_TOP - 20) * scale;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const headerH = NAV_TOP * 2 + MENU_SIZE * 1.1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-white" style={{ fontFamily: SANS, color: "black", minHeight: "100vh" }}>
        {/* Fixed header: menu, fading out over content that scrolls under it */}
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="work" navRef={navRef} onSelect={navigate} />
          </div>
        </div>

        {/* Table of contents, fixed in the left margin */}
        <div className="fixed top-0 left-0 z-20 origin-top-left" style={{ transform: `scale(${scale})` }}>
          <nav aria-label="Sections" className="absolute flex flex-col" style={{ left: NAV_X, top: CONTENT_TOP + 10, gap: 14, width: contentX - NAV_X - GAP }}>
            {SECTIONS.map(s => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => jumpTo(s.id)}
                  aria-current={on ? "location" : undefined}
                  className={`relative text-left whitespace-nowrap cursor-pointer ${on ? "opacity-100" : "opacity-20"} ${LINK_CLASS}`}
                  style={{ ...TYPE.label, transition: "opacity 0.3s ease-out" }}
                >
                  <motion.span
                    aria-hidden
                    className="absolute rounded-full bg-black"
                    style={{ left: -14, top: "50%", width: 5, height: 5, marginTop: -2.5 }}
                    initial={false}
                    animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="relative" style={{ height: innerH * scale }}>
          <div
            ref={innerRef}
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: stageW, paddingTop: CONTENT_TOP, paddingLeft: contentX, paddingRight: NAV_X, transform: `scale(${scale})` }}
          >
            <Intro />
            <Context />
            <Challenge />
            <CoDesign />
            <HowItWorks />
            <TheApp width={contentW} />
            <FinalSolution />
            <Learnings />
            <Footer onPrev={onPrevProject} onNext={onNextProject} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────
function Section({ id, label, heading, children, media }: {
  id: string;
  label: string;
  heading: ReactNode;
  children?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section id={id} style={{ marginTop: SECTION_GAP }}>
      <motion.div {...reveal} style={{ maxWidth: TEXT_W }}>
        <p className="m-0" style={{ ...TYPE.label, opacity: TEXT_OPACITY }}>{label}</p>
        <h2 className="m-0" style={{ ...TYPE.heading, marginTop: 16 }}>{heading}</h2>
        {children && <div style={{ ...TYPE.body, marginTop: 24, opacity: TEXT_OPACITY }}>{children}</div>}
      </motion.div>
      {media && <div style={{ marginTop: GAP }}>{media}</div>}
    </section>
  );
}

function Card({ children, padding = 0, style }: { children: ReactNode; padding?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      {...reveal}
      className="relative overflow-hidden"
      style={{ background: CARD_BG, borderRadius: RADIUS, padding, ...style }}
    >
      {children}
    </motion.div>
  );
}

const Strong = ({ children, color }: { children: ReactNode; color?: string }) => (
  <span style={{ fontWeight: 600, color, opacity: color ? 1 : undefined }}>{children}</span>
);

// ─────────────────────────────────────────────────────────────────────────────
// Sections
// ─────────────────────────────────────────────────────────────────────────────
function Intro() {
  const meta = [
    { k: "Team", v: "2" },
    { k: "Role", v: "Co-founder, Design + Dev" },
    { k: "Time", v: "1 year" },
  ];
  return (
    <section id="intro">
      <div className="flex items-start justify-between" style={{ gap: GAP }}>
        <motion.div {...reveal} style={{ maxWidth: TEXT_W }}>
          <div className="flex items-center" style={{ gap: 20 }}>
            <img src={noonchiLogo} alt="" width={58} height={45} style={{ width: 58, height: 45 }} draggable={false} />
            <h1 className="m-0" style={TYPE.title}>Noonchi</h1>
          </div>
          <p className="m-0" style={{ ...TYPE.body, marginTop: 28, opacity: TEXT_OPACITY }}>
            I co-founded, designed, and built Noonchi — an intelligent app + wearable system that bridges the
            communication gap between autistic and non-autistic individuals in the workplace.
          </p>
        </motion.div>

        <motion.dl {...reveal} className="m-0 grid shrink-0" style={{ gridTemplateColumns: "auto auto", columnGap: 32, rowGap: 12, marginTop: 14 }}>
          {meta.map(m => (
            <div key={m.k} className="contents">
              <dt style={{ ...TYPE.label, opacity: TEXT_OPACITY }}>{m.k}</dt>
              <dd className="m-0" style={TYPE.label}>{m.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div style={{ marginTop: 64 }}>
        <Card padding={56}>
          <img
            src={imgHero}
            alt="Noonchi desktop app home screen"
            className="block w-full h-auto"
            style={{ borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
            draggable={false}
          />
        </Card>
      </div>
    </section>
  );
}

function Context() {
  return (
    <Section
      id="context"
      label="Context"
      heading="Workplace communication is often indirect"
      media={
        // The video file is letterboxed; crop to its content area (as the previous page did)
        // White card with a hairline, like the watch image; a slight zoom hides the clip's edge line
        <Card style={{ aspectRatio: "1200 / 601.61", background: "#ffffff", border: HAIRLINE }}>
          <video className="absolute inset-0 size-full object-cover" style={{ transform: "scale(1.012)" }} src={nudgesMp4} autoPlay loop muted playsInline preload="auto" aria-label="Noonchi nudges demo" />
        </Card>
      }
    >
      People are constantly expected to decode tone, subtext, and underlying meaning.{" "}
      <Strong color={RED}>
        For autistic and neurodivergent individuals who depend on direct communication, that makes conversation itself
        non-inclusive.
      </Strong>{" "}
      <Strong>Noonchi challenges this norm and bridges the gap.</Strong>
    </Section>
  );
}

function Challenge() {
  return (
    <Section id="challenge" label="Design challenge" heading="Make social cues clearer, without anyone feeling watched">
      The real challenge was not making people communicate better. It was designing a system that could make social cues
      clearer without making anyone feel watched, corrected, or exposed.
      <motion.p
        {...reveal}
        className="m-0"
        style={{ ...TYPE.heading, fontSize: 32, letterSpacing: -1.4, color: PURPLE, opacity: 1, marginTop: 40 }}
      >
        “What if communication support did not sit on one person, but lived in the shared space between people?”
      </motion.p>
    </Section>
  );
}

function CoDesign() {
  return (
    <Section
      id="co-design"
      label="Co-design"
      heading="Built, tested, and iterated with 50+ users"
      media={
        <>
          <Card>
            <img src={imgCodesign} alt="Co-design sessions with users" className="block w-full h-auto" draggable={false} />
          </Card>
          <motion.figure {...reveal} className="m-0 text-center" style={{ marginTop: 120 }}>
            <blockquote className="m-0" style={{ ...TYPE.title, color: PURPLE }}>“I wish I had this my whole life…”</blockquote>
            <figcaption style={{ ...TYPE.label, opacity: TEXT_OPACITY, marginTop: 20 }}>Noonchi beta user</figcaption>
          </motion.figure>
        </>
      }
    >
      A question this multi-faceted couldn’t be answered alone, so we hosted co-design sessions and built Noonchi{" "}
      <Strong>with</Strong> our users — from both the autistic and non-autistic communities.
    </Section>
  );
}

function HowItWorks() {
  const layers = [
    { icon: iconW1, bg: "#FFE53A", title: "Real-time nudges", body: "Noonchi pairs with your smartwatch to nudge you in the moment, when you need it." },
    { icon: iconW2, bg: PURPLE, title: "Post-meeting reflections", body: "The Noonchi app shows what went well in your meetings and what needs work." },
    { icon: iconW3, bg: "transparent", title: "Guiding framework", body: "Practice, learn, and grow with frameworks designed for your specific needs." },
  ];
  return (
    <Section
      id="how-it-works"
      label="How Noonchi works"
      heading="Three layers working together"
      media={
        <>
          <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: GAP }}>
            {layers.map(l => (
              <Card key={l.title} padding={40}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 88, height: 88, background: l.bg, border: l.bg === "transparent" ? `1px solid ${TEXT_GREY}` : undefined }}
                >
                  <img src={l.icon} alt="" aria-hidden style={{ width: 48, height: 48 }} />
                </div>
                <h3 className="m-0" style={{ ...TYPE.cardTitle, marginTop: 32 }}>{l.title}</h3>
                <p className="m-0" style={{ ...TYPE.body, fontSize: 18, marginTop: 12, opacity: TEXT_OPACITY }}>{l.body}</p>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: GAP }}>
            {/* The watch image has a white background, so this card is white with a hairline border */}
            <Card padding={64} style={{ background: "#ffffff", border: HAIRLINE }}>
              <img src={imgWatch} alt="Noonchi nudges on Apple Watch" className="block w-full h-auto" draggable={false} />
            </Card>
          </div>
        </>
      }
    >
      A physical wearable system, a digital desktop application, and a guiding framework.
    </Section>
  );
}

// Big card beside two stacked cards (as on neelsaswade.com), then pairs
const SCREEN_RATIO = 2400 / 1558;
function Screen({ src, n, style }: { src: string; n: number; style?: React.CSSProperties }) {
  return (
    <motion.img
      {...reveal}
      src={src}
      alt={`Noonchi app screen ${n}`}
      loading="lazy"
      draggable={false}
      className="block"
      style={{ borderRadius: RADIUS, border: HAIRLINE, ...style }}
    />
  );
}

function TheApp({ width }: { width: number }) {
  // Two stacked screens (plus the gap between them) match the big screen's height
  const s = (width - GAP - GAP * SCREEN_RATIO) / 3; // width of each stacked screen
  const b = width - GAP - s; // width of the big screen
  const pairW = (width - GAP) / 2;
  return (
    <Section
      id="the-app"
      label="The app"
      heading="A calm space to reflect after every meeting"
      media={
        <div className="flex flex-col" style={{ gap: GAP }}>
          <div className="flex" style={{ gap: GAP }}>
            <Screen src={imgS1} n={1} style={{ width: b, height: b / SCREEN_RATIO }} />
            <div className="flex flex-col" style={{ gap: GAP }}>
              <Screen src={imgS2} n={2} style={{ width: s, height: s / SCREEN_RATIO }} />
              <Screen src={imgS3} n={3} style={{ width: s, height: s / SCREEN_RATIO }} />
            </div>
          </div>
          <div className="flex" style={{ gap: GAP }}>
            <Screen src={imgS4} n={4} style={{ width: pairW, height: pairW / SCREEN_RATIO }} />
            <Screen src={imgS5} n={5} style={{ width: pairW, height: pairW / SCREEN_RATIO }} />
          </div>
          <div className="flex" style={{ gap: GAP }}>
            <div className="flex flex-col" style={{ gap: GAP }}>
              <Screen src={imgS6} n={6} style={{ width: s, height: s / SCREEN_RATIO }} />
              <Screen src={imgS7} n={7} style={{ width: s, height: s / SCREEN_RATIO }} />
            </div>
            <Card style={{ width: b, height: b / SCREEN_RATIO }} padding={0}>
              <div className="flex h-full items-center justify-center text-center" style={{ padding: 64 }}>
                <p className="m-0" style={{ ...TYPE.heading, fontSize: 32, letterSpacing: -1.4, color: PURPLE, maxWidth: 560 }}>
                  Reflections, nudges, practice, and a journal — all in one place.
                </p>
              </div>
            </Card>
          </div>
        </div>
      }
    >
      The desktop app turns each meeting into gentle, private feedback: what went right, where tone and intent may have
      diverged, and what to practice next.
    </Section>
  );
}

function Vimeo({ id, title, ratio, autoplay }: { id: string; title: string; ratio: number; autoplay?: boolean }) {
  const params = `badge=0&autopause=0&player_id=0&app_id=58479${autoplay ? "&autoplay=1&muted=1&loop=1" : ""}`;
  return (
    <Card style={{ paddingTop: `${ratio * 100}%` }}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?${params}`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full"
        style={{ border: 0 }}
      />
    </Card>
  );
}

function FinalSolution() {
  return (
    <Section
      id="final-solution"
      label="Final solution"
      heading="See it in action"
      media={
        <div className="flex flex-col" style={{ gap: GAP }}>
          <Vimeo id="1210330290" title="Noonchi" ratio={0.5625} />
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: GAP }}>
            <Vimeo id="1210330585" title="Noonchi app demo" ratio={0.6281} autoplay />
            <Vimeo id="1210330584" title="Noonchi watch demo" ratio={0.6281} autoplay />
          </div>
        </div>
      }
    />
  );
}

function Learnings() {
  const items = [
    { icon: iconC1, text: "Designing for accessibility and trust" },
    { icon: iconC2, text: "Involving users in the design process" },
    { icon: iconC3, text: "Acting on the gathered data, meaningfully" },
  ];
  return (
    <Section
      id="learnings"
      label="Concepts applied"
      heading="What carried through every decision"
      media={
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: GAP }}>
          {items.map(i => (
            <Card key={i.text} padding={40}>
              <div className="flex items-center justify-center rounded-full bg-white" style={{ width: 88, height: 88, border: `1px solid ${TEXT_GREY}` }}>
                <img src={i.icon} alt="" aria-hidden style={{ width: 48, height: 48 }} />
              </div>
              <p className="m-0" style={{ ...TYPE.cardTitle, marginTop: 32 }}>{i.text}</p>
            </Card>
          ))}
        </div>
      }
    />
  );
}

function Footer({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  const link = (label: string, onClick?: () => void) => (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`cursor-pointer disabled:cursor-default disabled:opacity-20 ${LINK_CLASS}`}
      style={{ fontSize: MENU_SIZE, lineHeight: 1.1, letterSpacing: -MENU_SIZE * 0.05 }}
    >
      {label}
    </button>
  );
  return (
    <footer style={{ marginTop: SECTION_GAP, paddingBottom: 64 }}>
      <div className="flex items-center justify-between" style={{ borderTop: HAIRLINE, paddingTop: 32 }}>
        {link("← Previous project", onPrev)}
        {link("Next project →", onNext)}
      </div>
      <p className="m-0 text-center" style={{ ...TYPE.label, fontSize: 14, opacity: TEXT_OPACITY, marginTop: 64 }}>© Riddhi Kasar 2026</p>
    </footer>
  );
}
