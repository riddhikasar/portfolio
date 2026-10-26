import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, MotionConfig, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import introBg from "@/assets/home/intro_bg.avif";
import star from "@/assets/work/star.svg";
import { ContactLinks } from "../home/HomePage";
import {
  CONTENT_TOP, EASE_OUT, GAP, MENU_SIZE, NAV_TOP, RADIUS, SANS, SiteFooter, SURFACE, TEXT_GREY,
  TopNav, useAtBottom, useStageScale, type SitePage,
} from "../site/site";

// ─────────────────────────────────────────────────────────────────────────────
// Layout and type, in design px, matching Home and Work: Home's intro card (539 wide, 120 from the
// edge, text at 113/185), cards GAP apart, 42 headings with the star, 24 body in two weights.
// The photo card stretches to the height of the text card; its text stays where it is on Home.
// ─────────────────────────────────────────────────────────────────────────────
const PAD_X = 120;
const PHOTO_W = 539;
const TEXT_X = PAD_X + PHOTO_W + GAP;
const BOTTOM_MARGIN = GAP * 4;

const HEADING = { fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 } as const;
const BODY = { fontSize: 24, lineHeight: "normal", letterSpacing: -0.24, color: TEXT_GREY } as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});

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
      className="group inline-flex items-baseline underline underline-offset-4 decoration-1 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
      style={{ color: "#000", fontWeight: 600, gap: 2 }}
    >
      {children}
      <ArrowUpRight size="0.8em" strokeWidth={2} className="self-center transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
    </a>
  );
}

// Star + heading, words rising out of a mask (as on Home and Work)
function Heading({ children, delay = 0 }: { children: string; delay?: number }) {
  // watched on the heading itself: the words start below their mask, so they never count as "in view"
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = children.split(" ");
  return (
    <h2 ref={ref} className="flex items-start" style={HEADING}>
      <motion.img
        src={star}
        alt=""
        width={38}
        height={39}
        draggable={false}
        className="shrink-0"
        style={{ marginRight: 18, marginTop: (HEADING.fontSize * HEADING.lineHeight - 39) / 2 }}
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
  return (
    <motion.div {...TEXT_REVEAL} className="flex flex-col" style={{ ...BODY, gap: "1em", marginTop: 32, paddingLeft: 38 + 18 }}>
      {children}
    </motion.div>
  );
}

const B = ({ children }: { children: ReactNode }) => <b style={{ fontWeight: 600, color: "#000" }}>{children}</b>;

export default function AboutPage({ navigate }: { navigate: (p: SitePage | "work-robotics-liquid") => void }) {
  const { scale, stageW } = useStageScale();
  const headerH = NAV_TOP * 2 + MENU_SIZE * 1.1;
  const atBottom = useAtBottom();
  const textW = Math.min(stageW - PAD_X - TEXT_X, 1920 - PAD_X - TEXT_X);

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
      <div className="relative bg-white" style={{ fontFamily: SANS, minHeight: "100vh", color: "#000" }}>
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="about" onSelect={page => page !== "about" && navigate(page)} />
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ height: height * scale }}>
          <div
            ref={stageRef}
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: stageW, transform: `scale(${scale})`, paddingTop: CONTENT_TOP + 78, paddingBottom: BOTTOM_MARGIN }}
          >
            <div className="flex items-stretch" style={{ marginLeft: PAD_X, gap: GAP }}>
              {/* Photo card: Home's hello card, as tall as the text beside it */}
              <motion.div
                className="relative shrink-0 overflow-hidden"
                style={{ width: PHOTO_W, borderRadius: RADIUS }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
              >
                <img src={introBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" draggable={false} />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.15)" }} />
                <div className="absolute flex flex-col items-start text-white" style={{ left: 113, top: 185, gap: 32 }}>
                  <h1 className="whitespace-nowrap" style={{ fontSize: 72, lineHeight: 1.1, letterSpacing: -3.6, fontWeight: 500 }}>
                    <motion.span className="block" {...rise(0.35)}>
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
                    <motion.span className="block" {...rise(0.45)}>I’m Riddhi</motion.span>
                  </h1>
                  <motion.p className="whitespace-nowrap" style={{ fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 }} {...rise(0.6)}>
                    A Design Engineer
                  </motion.p>
                  <motion.div {...rise(0.75)}>
                    <ContactLinks />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text card */}
              <motion.div
                className="flex flex-col"
                style={{ width: textW, borderRadius: RADIUS, background: SURFACE, padding: "56px 72px 72px 40px" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
              >
                <Heading delay={0.4}>I design and ship interfaces that redefine how humans talk, interact, and collaborate with intelligent systems.</Heading>
                <Body>
                  <p>
                    I was drawn to Product Design because I wanted to create experiences that feel magical. But to bring them to
                    reality, I had to learn how to build things! So that led me to do my Masters in Design Engineering from{" "}
                    <A href="https://mde.harvard.edu/">Harvard</A>. And ever since then, I have been designing and shipping
                    products for start-ups with crazy technologies - making them trustworthy, joyful, and magical.
                  </p>
                  <p>
                    I was previously at <B>Siemens</B> making AR/VR experiences, worked at the <B>Indian Institute of Science
                    (IISc)</B> building future tech, and collaborated with <B>Harvard</B> and <B>MIT</B> labs to build
                    bioelectronics, study agentic AI behavior, and create{" "}
                    <A onClick={() => navigate("work-robotics-liquid")}>generative AI public exhibits</A>.
                  </p>
                  <p>
                    Read some of my <A href="https://orcid.org/0009-0003-3207-176X">publications</A> here.
                  </p>
                </Body>

                <div style={{ marginTop: GAP * 2 }}>
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
                    After all, we are limited not by what is possible, but by what we believe can be possible. The technology
                    often already exists if only you know where to look. That’s why I think <B>true depth comes from applying
                    everything you know to everything you do.</B> The more worlds we understand, the more possibilities we see.
                  </p>
                  <p>And if there is no possibility, then we can always innovate and invent.</p>
                  <p>I am driven by this idea of innovation and I am fueled by unfiltered awe.</p>
                  <p>I mean, any good designer or engineer can solve a problem if they think hard enough.</p>
                  <p>But what if we combine it? And work to bring this experience to life?</p>
                  <p>
                    What I seek to do is go beyond solving the problems of the world, and <B>create some magic along the way.</B>
                  </p>
                  <p style={{ color: "#000" }}>- Riddhi</p>
                </Body>
              </motion.div>
            </div>
          </div>
        </div>
        <SiteFooter show={atBottom} scale={scale} />
      </div>
    </MotionConfig>
  );
}
