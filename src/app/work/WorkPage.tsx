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
import nudgesMp4 from "@/assets/noonchi/nudges.mp4";
import noonchiLogo from "@/assets/work/n_logo.png";
import noonchiReflections from "@/assets/work/n_dash.avif";
import noonchiWatchSide from "@/assets/work/n_watchside.png";
import noonchiRef from "@/assets/work/n_ref3.avif";
import noonchiHome from "@/assets/work/n_home.avif";
import noonchiNudges from "@/assets/work/n_nudge2.avif";
import noonchiWatchFaces from "@/assets/work/n_watchfaces.avif";
import noonchiCo1 from "@/assets/work/n_co1.avif";
import noonchiCo2 from "@/assets/work/n_co2.avif";
import noonchiCo3 from "@/assets/work/n_co3.avif";
import noonchiCo4 from "@/assets/work/n_co4.avif";
import iconWatch from "@/assets/work/i_watch.svg";
import iconComputer from "@/assets/work/i_computer.svg";
import iconContacts from "@/assets/work/i_contacts.svg";
import relevoHeroImg from "@/assets/work/r_hero.avif";
import relevoLogo from "@/assets/work/r_logo.png";
import relevoContext from "@/assets/work/r_context.avif";
import relevoComponents from "@/assets/work/r_components.avif";
import relevoDashboard from "@/assets/work/r_dashboard.avif";
import relevoDash1 from "@/assets/work/r_dash1.avif";
import relevoDash2 from "@/assets/work/r_dash2.avif";
import relevoDash3 from "@/assets/work/r_dash3.avif";
import relevoMaterials from "@/assets/work/r_materials.avif";
import relevoElectronics from "@/assets/work/r_electronics.avif";
import relevoDrawing from "@/assets/work/r_drawing.avif";
import relevoIA from "@/assets/work/r_ia.avif";
import relevoLofi from "@/assets/work/r_lofi.avif";
import relevoColors from "@/assets/work/r_colors.avif";
import fem1Mp4 from "@/assets/relevo/fem_1.mp4";
import fem2Mp4 from "@/assets/relevo/fem_2.mp4";
import relevoClipMp4 from "@/assets/relevo/demo_1.mp4";
import relevoHero from "@/assets/home/relevo.avif";
import trodCard from "@/assets/home/trod.avif";
import {
  CARD_HOVER, CONTENT_TOP, EASE_OUT, CAPTION_GREY, FADED_GREY, GAP, HOVER_SPRING, scrollToY, SiteFooter, SURFACE, TEXT_GREY, useAtBottom, LINK_CLASS, MENU_SIZE, NAV_TOP, NAV_X, RADIUS, SANS,
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
const CARD_GAP = 64; // between cards
const TEXT_PAD = 14; // text sits CARD_GAP + 14 from cards
const CAPTION_SPACE = 28; // card to its caption, and a part's name to its card
const SECTION_GAP = GAP * 6;
const BOTTOM_MARGIN = GAP * 4;
const MEDIA_BG = SURFACE;

const TITLE = { fontSize: 42, lineHeight: 1.1, letterSpacing: -2.1, fontWeight: 500 } as const;
const BODY = { fontSize: 24, lineHeight: "normal", letterSpacing: -0.24, color: TEXT_GREY } as const;
const MENU = { fontSize: MENU_SIZE, lineHeight: 1.1, letterSpacing: -MENU_SIZE * 0.05 } as const;
const HEADING = { fontSize: 32, lineHeight: 1.1, letterSpacing: -1.6, fontWeight: 500 } as const; // section headings (Home's card title)
const SMALL = { fontSize: 20, lineHeight: "normal", letterSpacing: -0.2, color: TEXT_GREY } as const; // short labels (Home's description)
const SUBMENU = { fontSize: 20, lineHeight: 1.1, letterSpacing: -1 } as const;

const STAR_H = 39;
const TITLE_H = TITLE.fontSize * TITLE.lineHeight;

// Entrance shared by every block: rise into place as it scrolls in (same curve as Home's cards)
const REVEAL = {
  initial: { opacity: 0, y: 56 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 1, ease: EASE_OUT },
} as const;

// Text also comes into focus from a slight blur (never used on images, which must stay sharp)
const TEXT_REVEAL = {
  ...REVEAL,
  initial: { opacity: 0, y: 40, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────
function Body({ children }: { children: ReactNode }) {
  return (
    <motion.div {...TEXT_REVEAL} className="flex flex-col" style={{ ...BODY, gap: "1em", paddingBlock: TEXT_PAD }}>
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
type GridImage = { src: string; alt: string; w: number; h: number; img?: CSSProperties; video?: boolean };
const GRID_GAP = 16;
function Grid({ rows }: { rows: GridImage[][] }) {
  let n = 0;
  return (
    <div className="flex flex-col" style={{ gap: GRID_GAP }}>
      {rows.map((row, r) => (
        <div key={r} className="flex" style={{ gap: GRID_GAP }}>
          {row.map(im => (
            <div key={im.src} style={{ flex: `${im.w / im.h} 1 0`, minWidth: 0 }}>
              {im.video
                ? <Clip w={im.w} h={im.h} src={im.src} title={im.alt} />
                : <Media w={im.w} h={im.h} src={im.src} alt={im.alt} img={im.img} delay={0.08 * n++} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// One large image beside two stacked ones, all the same total height (Figma's screen mosaics)
function Mosaic({ main, side }: { main: GridImage; side: [GridImage, GridImage] }) {
  const sideAspect = side[0].w / side[0].h;
  return (
    <div className="flex" style={{ gap: GRID_GAP }}>
      <div style={{ flex: `${main.w / main.h} 1 0`, minWidth: 0 }}>
        <Media w={main.w} h={main.h} src={main.src} alt={main.alt} />
      </div>
      <div className="flex flex-col" style={{ flex: `${sideAspect / 2} 1 0`, minWidth: 0, gap: GRID_GAP }}>
        {side.map((im, i) => (
          <motion.div
            key={im.src}
            {...REVEAL}
            transition={{ ...REVEAL.transition, delay: 0.08 * (i + 1) }}
            className="relative flex-1 overflow-hidden"
            style={{ borderRadius: RADIUS, background: MEDIA_BG }}
          >
            <img src={im.src} alt={im.alt} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Our own short clip with the browser's playback controls: plays muted and looping while in view,
// pauses when scrolled away
function Clip({ w, h, src, title, fit = "cover", bare }: { w: number; h: number; src: string; title: string; fit?: "cover" | "contain"; bare?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);
  const video = (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      loop
      title={title}
      aria-label={title}
      controls
      playsInline
      muted
      preload="metadata"
      className="absolute inset-0 w-full h-full"
      style={{ objectFit: fit }}
    />
  );
  if (bare) return video;
  return (
    <motion.div {...REVEAL} className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: `${w} / ${h}`, borderRadius: RADIUS }}>
      {video}
    </motion.div>
  );
}

// Section heading inside a project (Context, Challenge, ...); `id` is what the side submenu scrolls to
function Heading({ id, children }: { id: string; children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = children.split(" ");
  return (
    <h3 ref={ref} id={id} style={{ ...HEADING, marginTop: GAP * 2, marginBottom: 24 - CARD_GAP - TEXT_PAD }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ padding: "0 0.12em 4px", margin: "0 -0.12em -4px" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: inView ? "0%" : "110%" }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.05 + i * 0.05 }}
          >
            {w}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </h3>
  );
}

// One item in a Solution/Process list (an image and its caption, a part with its video and text):
// tight inside, with extra room before the next item so each reads as its own card
const GROUP_SPACE = 56; // added to CARD_GAP between items
function Group({ children }: { children: ReactNode }) {
  return <div className="flex flex-col" style={{ gap: CARD_GAP, marginTop: GROUP_SPACE }}>{children}</div>;
}

// Smaller heading for a part within a section (The Brace, The Cushion, ...)
function Sub({ children }: { children: ReactNode }) {
  return (
    <motion.p {...TEXT_REVEAL} style={{ ...BODY, color: "#000", fontWeight: 600, marginBottom: CAPTION_SPACE - CARD_GAP }}>
      {children}
    </motion.p>
  );
}

// Caption under an image or video: centred, smaller and lighter than body text, set close to what it
// describes. Bold words stay in the caption grey.
function Caption({ children }: { children: ReactNode }) {
  return (
    <motion.p
      {...TEXT_REVEAL}
      transition={{ ...TEXT_REVEAL.transition, delay: 0.15 }}
      className="text-center [&_b]:![color:inherit]"
      style={{ fontSize: 20, lineHeight: "normal", letterSpacing: -0.2, fontWeight: 500, color: CAPTION_GREY, marginTop: CAPTION_SPACE - CARD_GAP }}
    >
      {children}
    </motion.p>
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
function Callout({ title, children, href }: { title: ReactNode; children?: ReactNode; href?: string }) {
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
        {children && <motion.p style={BODY} {...rise(0.45)}>{children}</motion.p>}
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
          target={href.startsWith("mailto:") ? undefined : "_blank"}
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

// Vimeo embed with Vimeo's own controls. By default it waits for the visitor to press play; with
// `autoplay` it starts muted and looping once scrolled into view and pauses when scrolled away.
function Vimeo({ id, title, aspect, autoplay }: { id: string; title: string; aspect: string; autoplay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!autoplay) return;
    if (inView && !started) setStarted(true); // first time: load with autoplay
    else if (started) frame.current?.contentWindow?.postMessage(JSON.stringify({ method: inView ? "play" : "pause" }), "*");
  }, [autoplay, inView, started]);
  const params = autoplay ? (started ? "&autoplay=1&muted=1&loop=1" : "") : "";
  return (
    <motion.div ref={ref} {...REVEAL} className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: aspect, borderRadius: RADIUS }}>
      <iframe
        ref={frame}
        key={params}
        src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479${params}`}
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
type Project = {
  id: string;
  label: string;
  title: string;
  team?: ReactNode; // shown at the right end of the title row
  subs?: { id: string; label: string }[]; // sections listed under the project in the side menu
  content: ReactNode;
};

// Noonchi's three layers: icon in its brand colour, name, one line
const NOONCHI_LAYERS = [
  { icon: iconWatch, bg: "#ffe53a", title: "Real-time Nudges", text: "Noonchi pairs with your smart watch to nudge you when you need it in the present moment" },
  { icon: iconComputer, bg: "#4f36d7", title: "Post-meeting Reflections", text: "Noonchi app shows you what went right in your meetings and what needs work" },
  { icon: iconContacts, bg: undefined, title: "Guiding Framework", text: "Practice, learn, and grow with custom frameworks designed for your specific needs" },
];

// Relevo's three components, labelled around the diagram (positions from Figma, % of the card)
const RELEVO_PARTS = [
  { title: "01. The Brace", text: "Micromotion + Sensors", style: { left: "3.22%", top: "calc(50% - 90px)" } },
  { title: "02. The Cushion", text: "Macro-motion + Sensors", style: { left: "3.22%", top: "calc(50% + 66px)" } },
  { title: "03. The Dashboard", text: "Measurement + Tracking", style: { left: "78.67%", top: "calc(50% - 1px)" } },
];

// Digital Interfaces
const DIGITAL: Project[] = [
  {
    id: "noonchi",
    label: "Noonchi",
    title: "Noonchi",
    team: <><B>Team:</B> 2 Design Engineers</>,
    subs: [
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "co-design", label: "Co-Design" },
      { id: "demo", label: "Demo" },
    ],
    content: (
      <>
        <Media h={672}>
          <div className="absolute overflow-hidden" style={{ left: "7.15%", top: "5.2%", width: "85.78%", height: "89.53%", borderRadius: 12 }}>
            <Clip w={1200} h={602} src={nudgesMp4} title="Noonchi nudges" bare />
          </div>
          <img src={noonchiLogo} alt="Noonchi logo" className="absolute pointer-events-none select-none" style={{ right: 23, top: 22, width: 32, height: 25 }} />
        </Media>
        <Body>
          <p>
            Workplace communication is often indirect. Individuals are expected to decode tone, subtext, and underlying
            meanings constantly. However, for autistic and neurotypical individuals who depend on direct communication, this
            makes conversations itself extremely non-inclusive.
          </p>
          <p>
            That’s why I co-founded and built Noonchi - an <B>intelligent app</B> + <B>wearable system</B> to help both
            autistic and non-autistic individuals make implicit social cues more explicit for clearer workplace
            communication.
          </p>
        </Body>

        <Heading id="noonchi-challenge">Challenge</Heading>
        <Body>
          <p>
            The real challenge here was not making people communicate “better.” It was <B>designing a system that could make
            social cues clearer without making anyone feel watched, corrected, or exposed.</B>
          </p>
        </Body>
        <Callout title="We wanted to know:">
          <B>“What if communication support did not sit on one person, but lived in the shared space between people?”</B>
        </Callout>
        <Media h={672}>
          <div className="absolute overflow-hidden" style={{ left: "7.29%", right: "7.29%", top: "8.93%", aspectRatio: "1512 / 1216", borderRadius: RADIUS, boxShadow: "0px 6px 24px 0px rgba(0,0,0,0.15)" }}>
            <img src={noonchiReflections} alt="Noonchi reflections screen" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
          </div>
          <img src={noonchiWatchSide} alt="Noonchi nudge on a smart watch" loading="lazy" decoding="async" className="absolute pointer-events-none select-none" style={{ left: "79.56%", top: "25.3%", width: "17.51%", height: "57.89%", objectFit: "contain" }} />
        </Media>

        <Heading id="noonchi-solution">Solution</Heading>
        <Body>
          <p>
            Noonchi is designed to give real-time feedback called ‘nudges’ along with detailed reflections to help users pick
            up social cues, and also learn from the experience. Noonchi does this with three layers - a physical wearable
            system, a digital desktop application, and a guiding framework.
          </p>
        </Body>
        <Group>
          <Media h={436}>
            <div className="absolute inset-0 flex items-start justify-center" style={{ paddingTop: 64, gap: 52 }}>
              {NOONCHI_LAYERS.map(l => (
                <div key={l.title} className="flex flex-col items-center text-center" style={{ width: 296, gap: 18 }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 110, height: 110, background: l.bg ?? "transparent", border: l.bg ? undefined : "2px solid #000" }}
                  >
                    <img src={l.icon} alt="" width={62} height={62} />
                  </div>
                  <p style={{ ...BODY, color: "#000", fontWeight: 600 }}>{l.title}</p>
                  <p style={SMALL}>{l.text}</p>
                </div>
              ))}
            </div>
          </Media>
        </Group>
        <Group>
          <Vimeo id="1210330585" title="Noonchi app demo" autoplay aspect="382 / 240" />
          <Caption>Set your desired nudges, see post meeting reflections, and practice tones on the desktop app</Caption>
        </Group>
        <Group>
          <Mosaic
            main={{ src: noonchiRef, alt: "Noonchi stand-up evaluation with reflections and transcript", w: 3024, h: 1964 }}
            side={[
              { src: noonchiHome, alt: "Noonchi home screen", w: 1512, h: 982 },
              { src: noonchiNudges, alt: "Noonchi nudge settings", w: 3024, h: 1964 },
            ]}
          />
          <Caption>Designed to be literal, clear, and accessible to all neurotypes</Caption>
        </Group>
        <Group>
          <Vimeo id="1210330584" title="Noonchi watch demo" autoplay aspect="382 / 240" />
          <Caption>
            Get a real-time nudge every time you feel you need a reminder of your tone, or if you missed a context cue, or other
            specified things you have set on Noonchi.
          </Caption>
        </Group>
        <Group>
          <Media w={2712} h={1042} src={noonchiWatchFaces} alt="Noonchi watch faces and nudges" />
          <Caption>
            Built with intentionality - the fruit icon is not seen in regular workplace setting, helping users know that it’s a
            Noonchi notification without any cognitive load or mixup with just a quick glance.
          </Caption>
        </Group>

        <Heading id="noonchi-co-design">Co-Design</Heading>
        <Body>
          <p>
            There was no way we could solve such a multi-faceted user group on our own. That’s why we hosted <B>co-design
            sessions to build Noonchi with our users.</B>
          </p>
        </Body>
        <Callout title="Built with 50+ users">
          We built, tested, and iterated Noonchi with 50+ users - both from the autistic and non-autistic community.
        </Callout>
        <Grid
          rows={[[
            { src: noonchiCo1, alt: "Co-design session around a table", w: 1600, h: 1200, img: { transform: "scaleX(-1)" } },
            { src: noonchiCo2, alt: "Co-design session with a screen", w: 4032, h: 3024 },
            { src: noonchiCo3, alt: "Participants discussing in a co-design session", w: 4032, h: 3024 },
            { src: noonchiCo4, alt: "Co-design session participants writing", w: 4032, h: 3024 },
          ]]}
        />
        <Callout title="“I wish I had this my whole life”">Noonchi beta user</Callout>

        <Heading id="noonchi-demo">Demo</Heading>
        <Body>
          <p>See Noonchi in action</p>
        </Body>
        <Vimeo id="1210330290" title="Noonchi demo" aspect="16 / 9" />
        <Callout title="Interested in testing, collaborating, or investing in Noonchi?" href="mailto:riddhikasar02@gmail.com">
          Send me an email! We are currently on a fast sprint to take Noonchi out of beta.
        </Callout>
      </>
    ),
  },
  {
    id: "relevo",
    label: "Relevo",
    title: "Relevo",
    team: <><B>Team:</B> 1 Researcher, 1 Mechanical Engineer, <B>1 Design Engineer</B></>,
    subs: [
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "process", label: "Process" },
      { id: "demo", label: "Demo" },
    ],
    content: (
      <>
        <Media h={672} src={relevoHeroImg} alt="Relevo soft-robotic knee wearable beside its clinical dashboard" img={{ objectPosition: "50% 40%" }}>
          <img src={relevoLogo} alt="Relevo logo" className="absolute pointer-events-none select-none" style={{ right: 47, top: 27, width: 35, height: 54 }} />
        </Media>
        <Body>
          <p>
            Out of the <B>800,000 people that undergo knee surgeries</B> each year in the U.S, <B>more than 70% never fully
            recover.</B> Knee rehabilitation is painful, repetitive, and often happens outside the clinic. Patients are
            expected to recover at home, but many <B>do not have enough guidance, comfort, or confidence to complete rehab
            properly.</B>
          </p>
        </Body>
        <Media h={872} src={relevoContext} alt="Relevo dashboard on a desktop and a tablet"
          img={{ inset: "5.05% 6.65%", width: "86.78%", height: "89.91%", objectFit: "contain" }} />
        <Body>
          <p>
            Moreover, rehabilitation does not end when the patient leaves the clinic. Doctors and physiotherapists need a way
            to <B>understand whether patients are improving, struggling, or missing critical recovery milestones.</B>
          </p>
          <p>
            That’s why we built Relevo - a <B>soft robotic wearable device + a clinical dashboard</B> that supports knee
            recovery after surgery through assisted movement, comfort, and sensor-based feedback, while providing{" "}
            <B>physiotherapists patient recovery data</B> for <B>measurable progress</B> and care decisions.
          </p>
          <p>I prototyped physical form and built the entire physician-facing digital interface.</p>
        </Body>

        <Heading id="relevo-challenge">Challenge</Heading>
        <Body>
          <p>
            The real challenge here was making this robotic assistive device <B>feel safe, be comfortable, and
            trustworthy</B> on a healing body. And turning the movement, pain, and progress data into a dashboard that{" "}
            <B>clinicians could quickly read and act on.</B>
          </p>
        </Body>
        <Callout title="We wanted to create a system that makes rehabilitation feel completely “at home”." />

        <Heading id="relevo-solution">Solution</Heading>
        <Body>
          <p>
            Relevo is equipped with 3 components - <B>The Brace, The Cushion, and The Dashboard</B> to help in pain relief,
            muscle strengthening, and tracking the patients’ overall recovery rate for real-time feedback.
          </p>
        </Body>
        <Group>
          <Media h={357}>
            <Crop src={relevoComponents} alt="Diagram of the brace and cushion on a leg, and the dashboard"
              box={{ left: "19.16%", right: "23.95%", top: 0, bottom: 0 }}
              img={{ left: "0.06%", top: "-28.41%", width: "99.96%", height: "142.41%" }} />
            {RELEVO_PARTS.map(part => (
              <div key={part.title} className="absolute flex flex-col" style={{ ...part.style, transform: "translateY(-50%)", gap: 4 }}>
                <p style={{ ...BODY, color: "#000", fontWeight: 600 }}>{part.title}</p>
                <p style={SMALL}>{part.text}</p>
              </div>
            ))}
          </Media>
        </Group>
        <Callout title="A novel triangle form that lifts up to 50 lbs">
          By combining mechanism and form design, I invented this novel triangle form that allowed for a compact portable
          cushion which also lifted up to 50 lbs.
        </Callout>

        <Group>
          <Sub>The Brace</Sub>
          <Vimeo id="1210845922" title="Relevo brace" autoplay aspect="16 / 9" />
          <Body>
            <p>
              The brace allows for <B>micro-movement</B> and massage in the knees to reduce swelling and increase comfort during
              exercises. It is equipped with EMG sensors that gather data on the muscle strength and movement.
            </p>
          </Body>
        </Group>
        <Group>
          <Sub>The Cushion</Sub>
          <Vimeo id="1210845923" title="Relevo cushion" autoplay aspect="16 / 9" />
          <Body>
            <p>
              The cushion facilitates <B>macro-movement</B> needed for rehabilitation. The angle can be set as per progress of
              the patient. It is equipped with a Flex sensor that tracks the angle and bend of the knee.
            </p>
          </Body>
        </Group>
        <Group>
          <Sub>The Dashboard</Sub>
          <Media w={1920} h={1080} src={relevoDashboard} alt="Relevo dashboard on a tablet in a clinician's hands" />
          <Body>
            <p>
              A doctor-facing dashboard gathers the data from the brace and the cushion that the physiotherapists can use to{" "}
              <B>track patient progress</B>, schedule appointments when needed, and view predictions.
            </p>
          </Body>
          <Mosaic
            main={{ src: relevoDash1, alt: "Relevo dashboard for a patient", w: 2960, h: 2290 }}
            side={[
              { src: relevoDash2, alt: "Relevo dashboard with the patient switcher open", w: 2960, h: 2290 },
              { src: relevoDash3, alt: "Relevo dashboard flagging a patient who needs attention", w: 2960, h: 2290 },
            ]}
          />
          <Caption>
            The dashboard became the <B>decision layer</B> of the Relevo system, allowing doctors to <B>make informed decisions
            faster and with more accuracy.</B>
          </Caption>
        </Group>

        <Heading id="relevo-process">Process</Heading>
        <Body>
          <p>
            The robotics process involved motion study, material science, hardware and electronics integration, and extensive
            prototyping.
          </p>
        </Body>
        <Group>
          <Grid
            rows={[[
              { src: fem1Mp4, alt: "Motion capture of the knee", w: 1920, h: 1080, video: true },
              { src: fem2Mp4, alt: "FEM study of the cushion", w: 1920, h: 1268, video: true },
            ]]}
          />
          <Caption><B>Motion capture</B> and <B>FEM study</B> to understand movement and material properties</Caption>
        </Group>
        <Group>
          <Media w={2524} h={326} src={relevoMaterials} alt="Material samples and cushion prototypes" />
          <Caption>Material selection</Caption>
        </Group>
        <Group>
          <Media w={1668} h={1096} src={relevoElectronics} alt="Annotated Relevo cushion showing the brace cover and PVC structure" />
          <Media w={838} h={624}>
            <Crop src={relevoDrawing} alt="Exploded technical drawing of Relevo's electronics"
              box={{ inset: 0 }}
              img={{ left: "-16.04%", top: "-8.45%", width: "148.34%", height: "139.54%" }} />
          </Media>
          <Caption>Electronics integration</Caption>
        </Group>
        <Body>
          <p>
            For the clinical dashboard, the process involved talking to physicians, understanding the critical elements, and
            making the system as intuitive and easy to understand as possible. The primary thing I focused on was
            eliminating a learning curve.
          </p>
        </Body>
        <Group>
          <Media w={3156} h={2010} src={relevoIA} alt="Information architecture of the Relevo dashboard" />
          <Caption><B>Information architecture</B> to map out the elements and pages</Caption>
        </Group>
        <Group>
          <Media w={1748} h={848} src={relevoLofi} alt="Low fidelity wireframes and early dashboard screens" />
          <Caption><B>Low fidelity prototypes</B> to understand the user flow and layout</Caption>
        </Group>
        <Group>
          {/* already sits on the card grey, so no multiply blend (that would darken it) */}
          <Media h={420} src={relevoColors} alt="Relevo colour palette"
            img={{ inset: 48, width: "calc(100% - 96px)", height: "calc(100% - 96px)", objectFit: "contain" }} />
          <Caption>Color analysis</Caption>
        </Group>
        <Group>
          <Clip w={1920} h={1080} src={relevoClipMp4} title="Relevo dashboard walkthrough" />
        </Group>

        <Heading id="relevo-demo">Demo</Heading>
        <Body>
          <p>See Relevo in action</p>
        </Body>
        <Vimeo id="1071643923" title="Relevo demo" aspect="16 / 9" />
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
        <Caption>The algorithm and the interaction</Caption>
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
  const [activeSub, setActiveSub] = useState<string>();
  const [scrolled, setScrolled] = useState(false);
  const atBottom = useAtBottom();
  const anchor = (projectId: string, subId: string) => document.getElementById(`${projectId}-${subId}`);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
      const line = window.innerHeight * 0.4;
      let current = projects[0];
      for (const p of projects) {
        const el = sectionRefs.current[p.id];
        if (el && el.getBoundingClientRect().top <= line) current = p;
      }
      let sub: string | undefined;
      for (const s of current?.subs ?? []) {
        const el = anchor(current.id, s.id);
        if (el && el.getBoundingClientRect().top <= line) sub = s.id;
      }
      setActive(current?.id);
      setActiveSub(sub);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [projects]);

  const scrollTo = (id: string, subId?: string) => {
    const el = subId ? anchor(id, subId) : sectionRefs.current[id];
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY - CONTENT_TOP * scale);
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
          <ProjectIndex
            projects={projects}
            active={active}
            activeSub={activeSub}
            openSubs={active && (projects.findIndex(p => p.id === active) > 0 || activeSub) ? active : undefined}
            onSelect={scrollTo}
          />
        </div>
        <ToTop show={scrolled} scale={scale} />
        <SiteFooter show={atBottom} scale={scale} />

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
                    <div className="flex items-end justify-between" style={{ gap: GAP }}>
                      <ProjectTitle id={`work-${p.id}`} text={p.title} active={p.id === active} />
                      {p.team && (
                        <motion.p {...TEXT_REVEAL} className="text-right" style={{ ...BODY, paddingBottom: 6 }}>{p.team}</motion.p>
                      )}
                    </div>
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
// slides between entries. Under the open project its sections unfold (Context, Challenge, ...), the
// one being read in semibold. Lines up with the first image.
function ProjectIndex({ projects, active, activeSub, openSubs, onSelect }: {
  projects: Project[];
  active?: string;
  activeSub?: string;
  openSubs?: string;
  onSelect: (id: string, subId?: string) => void;
}) {
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
        const open = p.id === openSubs && !!p.subs;
        return (
          <div key={p.id} className="flex flex-col items-start">
            <button
              onClick={() => onSelect(p.id)}
              aria-current={on ? "true" : undefined}
              aria-expanded={p.subs ? open : undefined}
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
              <motion.span animate={{ x: on ? STAR + 10 : 0 }} whileHover={{ x: (on ? STAR + 10 : 0) + 4 }} transition={HOVER_SPRING}>
                {p.label}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="subs"
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <div className="flex flex-col items-start" style={{ paddingTop: 14, paddingLeft: STAR + 10, gap: 12 }}>
                    {p.subs!.map((sub, i) => {
                      const current = sub.id === activeSub;
                      return (
                        <motion.button
                          key={sub.id}
                          onClick={() => onSelect(p.id, sub.id)}
                          aria-current={current ? "true" : undefined}
                          // 80% / 20%: the site's text and faded greys
                          className={`text-left cursor-pointer whitespace-nowrap ${current ? "opacity-80" : "opacity-20"} ${LINK_CLASS}`}
                          style={{ ...SUBMENU, fontWeight: current ? 600 : 400, transition: "opacity 0.3s ease-out" }}
                          initial={{ x: -8 }}
                          animate={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.04 * i }}
                        >
                          {sub.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.nav>
  );
}

// Bottom-right once the page has scrolled; arrow lifts on hover. Sits as far from the bottom as the menu is from the top.
function ToTop({ show, scale }: { show: boolean; scale: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="top"
          className="fixed z-20"
          style={{ right: NAV_X * scale, bottom: NAV_TOP * scale }} // right corner, same margin as the menu has at the top
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <button
            onClick={() => scrollToY(0)}
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
