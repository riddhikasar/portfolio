import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, MotionConfig, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import introBg from "@/assets/home/intro_bg.avif";
import star from "@/assets/work/star.svg";
import { ContactLinks } from "../home/HomePage";
import {
  CONTENT_TOP, EASE_OUT, FLIP, GAP, HELLO_SHADE, HELLO_TEXT_SHADOW, HOVER_SPRING, NAV_X, pageHandoff, siteMetrics,
  RADIUS, SANS, SiteFooter, SURFACE, TEXT_GREY, ToTop, TopNav, useAtBottom, useScrolled, useStageScale, type SitePage,
} from "../site/site";

// ─────────────────────────────────────────────────────────────────────────────
// Layout and type, in design px. Cards start CONTENT_TOP down like Play's cards and Work's titles.
// Together the two cards are as wide as Work's image cards (1395), centred, GAP apart. The photo
// card keeps Home's width and stretches to the text card's height; its text stays where it is on
// Home. Headings are Home's (42, with the star); body is Work's (24, two weights).
// ─────────────────────────────────────────────────────────────────────────────
const ROW_W = 1395; // Work's card width
const PHOTO_W = 539;
const BOTTOM_MARGIN = GAP * 4;

const HEADING = { fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 } as const;
const BODY = { fontSize: 24, lineHeight: "normal", letterSpacing: -0.24, color: TEXT_GREY } as const;
const HEADING_TO_TEXT = 48;
const PARAGRAPH_GAP = "1.5em";
const SECTION_SPACE = GAP * 3; // last paragraph to the next heading

// Phones and tablets: one column, real CSS px
const COMPACT = {
  heading: { fontSize: 26, lineHeight: 1.15, letterSpacing: -1, fontWeight: 500 },
  body: { fontSize: 17, lineHeight: 1.45, letterSpacing: -0.1, color: TEXT_GREY },
  star: 22, starGap: 12, headingToText: 20, paragraphGap: "1em", sectionSpace: 56, maxW: 640,
} as const;
const Compact = createContext(false);

// Hello card text rises in, unless the card is flipping over from Home (then it's already there)
const rise = (delay: number, instant = false) => ({
  initial: instant ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
} as const);

const TEXT_REVEAL = {
  initial: { opacity: 0, y: 40, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 1, ease: EASE_OUT },
} as const;

// Underlined link in body text; the arrow nudges out on hover
function A({ href, onClick, children }: { href?: string; onClick?: () => void; children: ReactNode }) {
  return (
    <a
      href={href ?? "#"}
      onClick={onClick ? e => { e.preventDefault(); onClick(); } : undefined}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      // inline (not inline-flex) so a long link wraps with the sentence instead of jumping to a new line
      className="group underline underline-offset-4 decoration-1 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
      style={{ color: "#000", fontWeight: 600 }}
    >
      {children}
      <ArrowUpRight size="0.8em" strokeWidth={2} className="inline-block align-baseline ml-0.5 transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </a>
  );
}

// Star + heading, words rising out of a mask (as on Home and Work)
function Heading({ children, delay = 0 }: { children: string; delay?: number }) {
  // watched on the heading itself: the words start below their mask, so they never count as "in view"
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = children.split(" ");
  const compact = useContext(Compact);
  const h = compact ? COMPACT.heading : HEADING;
  const starW = compact ? COMPACT.star : 38;
  return (
    <h2 ref={ref} className="flex items-start" style={h}>
      <motion.img
        src={star}
        alt=""
        width={starW}
        height={starW * 39 / 38}
        draggable={false}
        className="shrink-0"
        style={{ marginRight: compact ? COMPACT.starGap : 18, marginTop: (h.fontSize * h.lineHeight - starW * 39 / 38) / 2 }}
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      />
      <span>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom" style={{ padding: "0 0.12em 4px", margin: "0 -0.12em -4px" }}>
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: inView ? "0%" : "110%" }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + 0.1 + i * 0.03 }}
            >
              {w}{i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </h2>
  );
}

// Body under a heading: indented to line up with the heading text, not the star
function Body({ children }: { children: ReactNode }) {
  const compact = useContext(Compact);
  const style = compact
    ? { ...COMPACT.body, gap: COMPACT.paragraphGap, marginTop: COMPACT.headingToText }
    : { ...BODY, gap: PARAGRAPH_GAP, marginTop: HEADING_TO_TEXT, paddingLeft: 38 + 18 };
  return (
    <motion.div {...TEXT_REVEAL} className="flex flex-col" style={style}>
      {children}
    </motion.div>
  );
}

const B = ({ children }: { children: ReactNode }) => <b style={{ fontWeight: 600, color: "#000" }}>{children}</b>;

export default function AboutPage({ navigate }: { navigate: (p: SitePage) => void }) {
  const { scale, stageW, compact } = useStageScale();
  const m = siteMetrics(compact);
  const headerH = m.navTop * 2 + m.menu * 1.1;
  const atBottom = useAtBottom();
  const scrolled = useScrolled();

  const rowW = compact ? Math.min(COMPACT.maxW, stageW - 2 * m.navX) : Math.min(ROW_W, stageW - 2 * NAV_X);
  const textW = compact ? rowW : rowW - PHOTO_W - GAP;
  // Compact: the hello card spans the column and everything on it scales with it
  const photoW = compact ? rowW : PHOTO_W;
  const k = photoW / PHOTO_W;

  // Clicking the hello card flips it edge-on, then Home opens and its card turns the rest of the way
  const [flipOut, setFlipOut] = useState(false);
  const flipHome = () => {
    if (flipOut) return;
    pageHandoff.flipToHome = true;
    setFlipOut(true);
    window.setTimeout(() => navigate("home"), FLIP.duration * 1000);
  };

  // Arriving from Home's card: finish its flip
  const [flipIn] = useState(() => { const f = pageHandoff.flipToAbout; pageHandoff.flipToAbout = false; return f; });

  const stageRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(1080);
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Compact.Provider value={compact}>
      <div className="relative bg-white" style={{ fontFamily: SANS, minHeight: "100vh", color: "#000" }}>
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="about" compact={compact} onSelect={page => page !== "about" && navigate(page)} />
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ height: height * scale }}>
          <div
            ref={stageRef}
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: stageW, transform: `scale(${scale})`, paddingTop: m.contentTop, paddingBottom: compact ? 96 : BOTTOM_MARGIN }}
          >
            <div className={`flex mx-auto ${compact ? "flex-col" : "items-stretch"}`} style={{ width: rowW, gap: m.gap }}>
              {/* Photo card: Home's hello card, as tall as the text beside it */}
              <motion.div
                className="relative shrink-0 overflow-hidden cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ width: photoW, height: compact ? 667 * k : undefined, borderRadius: m.radius, transformPerspective: FLIP.perspective, zIndex: flipOut ? 5 : undefined }}
                role="link"
                tabIndex={0}
                aria-label="Back to Home"
                onClick={flipHome}
                onKeyDown={e => { if (e.key === "Enter" && e.target === e.currentTarget) flipHome(); }}
                initial={flipIn ? { rotateY: -90, scale: 1.04 } : { opacity: 0, y: 40 }}
                animate={
                  flipOut ? { opacity: 1, y: 0, rotateY: 90, scale: 1.04, transition: { duration: FLIP.duration, ease: FLIP.ease } }
                  : flipIn ? { rotateY: 0, scale: 1 } : { opacity: 1, y: 0 }
                }
                transition={flipIn ? { duration: 0.55, ease: EASE_OUT } : { duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
                whileHover={flipOut ? undefined : { scale: 1.01, rotate: -0.6, transition: HOVER_SPRING }}
                whileTap={flipOut ? undefined : { scale: 0.99, transition: { duration: 0.1 } }}
              >
                <img src={introBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" draggable={false} />
                <div className="absolute inset-0" style={{ background: HELLO_SHADE }} />
                {/* Card contents in Home's design px; on phones the whole box scales with the card */}
                <div className="absolute top-0 left-0 origin-top-left" style={{ width: PHOTO_W, height: 667, transform: k !== 1 ? `scale(${k})` : undefined }}>
                <div className="absolute flex flex-col items-start text-white" style={{ left: 113, top: 185, gap: 32, textShadow: HELLO_TEXT_SHADOW }}>
                  <h1 className="whitespace-nowrap" style={{ fontSize: 72, lineHeight: 1.1, letterSpacing: -3.6, fontWeight: 500 }}>
                    <motion.span className="block" {...rise(0.35, flipIn)}>
                      Hello!
                      <motion.span
                        className="inline-block"
                        style={{ originX: 0.7, originY: 0.7 }}
                        animate={{ rotate: [0, 18, -8, 18, 0] }}
                        transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
                        whileHover={{ rotate: [0, 18, -8, 18, 0], transition: { duration: 1 } }}
                      >
                        👋
                      </motion.span>
                    </motion.span>
                    <motion.span className="block" {...rise(0.45, flipIn)}>I’m Riddhi</motion.span>
                  </h1>
                  <motion.p className="whitespace-nowrap" style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 }} {...rise(0.6, flipIn)}>
                    A Design Engineer
                  </motion.p>
                  <motion.div {...rise(0.75, flipIn)}>
                    <ContactLinks />
                  </motion.div>
                </div>
                </div>
              </motion.div>

              {/* Text card */}
              <motion.div
                className="flex flex-col"
                style={{ width: textW, borderRadius: m.radius, background: SURFACE, padding: compact ? "28px 22px 32px" : "56px 72px 72px 40px" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
              >
                <Heading delay={0.4}>I design and ship interfaces that redefine how humans talk, interact, and collaborate with intelligent systems.</Heading>
                <Body>
                  <p>
                    I studied Product Design with a specialization in Industrial Design at PES University in India, then pursued
                    my Master’s in Design Engineering at <A href="https://mde.harvard.edu/">Harvard</A>, alongside a minor in
                    Human-Robot Interaction at <B>MIT</B>.
                  </p>
                  <p>
                    I was previously at <B>Siemens</B> making AR/VR experiences, worked at the <B>Indian Institute of Science
                    (IISc)</B> building future tech, and collaborated with <B>Harvard</B> and <B>MIT</B> labs to build
                    bioelectronics, study agentic AI behavior, and create{" "}
                    <A href="https://aestheticsbeyonddata.com/beyond-data">generative AI public exhibits</A>.
                  </p>
                  <p>
                    Now I design and ship products for start-ups with crazy technologies - making them trustworthy,
                    joyful, and magical.
                  </p>
                  <p>
                    Read some of my <A href="https://orcid.org/0009-0003-3207-176X">publications</A> here.
                  </p>
                </Body>

                <div style={{ marginTop: compact ? COMPACT.sectionSpace : SECTION_SPACE }}>
                  <Heading>A manifesto</Heading>
                </div>
                <Body>
                  <p>
                    If you told people 151 years ago that they could talk to each other from across oceans, they would think it’s
                    magic. Today, we carry that magic in our pockets and barely think twice about it.
                  </p>
                  <p>
                    That’s what got me into product design. I wanted to build things that made people wonder, ‘how is that even
                    possible’. And that led me to design engineering, to combine that awe with technical skills and bring them
                    into reality.
                  </p>
                  <p>
                    After all, we are limited not by what is possible, but by what we <em>believe</em> can be possible. The technology
                    often already exists if only you know where to look. That’s why I think <B>true depth comes from applying
                    everything you know to everything you do.</B> The more worlds we understand, the more possibilities we see.
                  </p>
                  <p>And if there is no possibility, then we can always innovate and invent.</p>
                  <p>I am driven by this idea of innovation and I am fueled by unfiltered awe.</p>
                  <p>I mean, any good designer or engineer can solve a problem if they think hard enough.</p>
                  <p>But what if we combine it? And work to bring this experience to life?</p>
                  <p>
                    What I seek to do is not only solve the problems of the world, but to also <B>create some magic along the
                    way.</B>
                  </p>
                  <p style={{ color: "#000" }}>- Riddhi</p>
                </Body>
              </motion.div>
            </div>
          </div>
        </div>
        <SiteFooter show={atBottom} scale={scale} compact={compact} />
        <ToTop show={scrolled} scale={scale} compact={compact} />
      </div>
      </Compact.Provider>
    </MotionConfig>
  );
}
