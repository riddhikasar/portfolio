import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import imgRiver from "@/assets/home/playground.avif";
import img4546 from "@/assets/play/img_4546.avif";
import img2676 from "@/assets/play/img_2676.avif";
import img2012 from "@/assets/play/img_2012.avif";
import img6213 from "@/assets/play/img_6213.avif";
import img6206 from "@/assets/play/img_6206.avif";
import img3171 from "@/assets/play/img_3171.avif";
import img8969 from "@/assets/play/img_8969.avif";
import img2358 from "@/assets/play/img_2358.avif";
import img4763 from "@/assets/play/img_4763.avif";
import art1074 from "@/assets/art/art_1074.avif";
import artMoon from "@/assets/art/art_moon.avif";
import artKrishna from "@/assets/art/art_krishna.avif";
import art4725 from "@/assets/art/art_4725.avif";
import art0179 from "@/assets/art/art_0179.avif";
import art0409 from "@/assets/art/art_0409.avif";
import art_izumi from "@/assets/art/art_izumi.avif";
import { POEMS, type Poem } from "./poems";
import {
  CONTENT_TOP, EASE_OUT, GAP, LINK_CLASS, MONO, NAV_TOP, NAV_X, RADIUS, SANS, SERIF,
  TopNav, useStageScale, type SitePage,
} from "../site/site";

// ─────────────────────────────────────────────────────────────────────────────
// Content. Sizes are the Figma frame sizes (only their proportions are used);
// crops and title positions are relative to each frame.
// ─────────────────────────────────────────────────────────────────────────────
type Kind = "photo" | "poem" | "art";
type Crop = { w: number; h: number; l: number; t: number }; // % of the frame
type Item = {
  id: string;
  kind: "photo" | "art";
  src: string;
  alt: string;
  w: number;
  h: number;
  crop?: Crop;
  // x is the title's centre, or its left edge when align is "left" (to line up with something in the image)
  title?: { text: string; color: string; x: number; y: number; align?: "left" };
};

const ITEMS: Record<string, Item> = {
  // ── Photos
  river: { id: "river", kind: "photo", src: imgRiver, alt: "Frozen river under a bridge's shadow", w: 689.2, h: 371.75,
    crop: { w: 100.04, h: 100, l: -0.02, t: 0 },
    title: { text: "The Softness of Winter", color: "#573d3c", x: 0.8469, y: 0.8835 } },
  trees: { id: "trees", kind: "photo", src: img4546, alt: "Bare trees in a snowy park", w: 689.1, h: 453.9,
    crop: { w: 100, h: 100.05, l: 0, t: -0.03 },
    title: { text: "Morally grey", color: "#3a3a3a", x: 0.4194, y: 0.603 } },
  relief: { id: "relief", kind: "photo", src: img2676, alt: "Ancient marble relief in a dark gallery", w: 689, h: 353.93,
    title: { text: "A time machine", color: "#5c5548", x: 0.5039, y: 0.8427 } },
  painting: { id: "painting", kind: "photo", src: img2012, alt: "Gilded frame beside a museum placard", w: 688.67, h: 516.5,
    // left edge lines up with the placard text ("Vincent van Gogh")
    title: { text: "Excellence", color: "#4d3f3c", x: 0.7797, y: 0.6432, align: "left" } },
  sunflowers: { id: "sunflowers", kind: "photo", src: img6213, alt: "Sunflowers against a blue sky", w: 467.29, h: 722.82,
    crop: { w: 182.44, h: 157.2, l: -24.45, t: -21.4 },
    title: { text: "Sunlight", color: "#fbf388", x: 0.5082, y: 0.0234 } },
  path: { id: "path", kind: "photo", src: img6206, alt: "A leafy path into autumn woods", w: 463.35, h: 723.07,
    crop: { w: 117.11, h: 100.06, l: -8.68, t: -0.03 },
    // left edge lines up with the small white sign on the gate
    title: { text: "The road not taken", color: "#fff7e1", x: 0.3161, y: 0.4843, align: "left" } },
  statue: { id: "statue", kind: "photo", src: img3171, alt: "Marble statue of two figures", w: 420, h: 772.04,
    crop: { w: 111.24, h: 100.42, l: -6.74, t: -0.21 },
    title: { text: "Sisters", color: "#adaaa9", x: 0.5043, y: 0.8884 } },
  tower: { id: "tower", kind: "photo", src: img8969, alt: "Glass tower framed by an old stone arch", w: 510.79, h: 771.77,
    title: { text: "The past and the future", color: "#22180f", x: 0.5159, y: 0.1137 } },
  rotunda: { id: "rotunda", kind: "photo", src: img2358, alt: "Domed rotunda with a chandelier", w: 510.6, h: 679.55,
    title: { text: "Awe", color: "#c7ecff", x: 0.4851, y: 0.9403 } },
  train: { id: "train", kind: "photo", src: img4763, alt: "Person sitting outside a train station", w: 419.83, h: 458.88,
    title: { text: "The last train", color: "#a5a5a5", x: 0.7614, y: 0.6664 } },

  // ── Art
  magnanimous: { id: "magnanimous", kind: "art", src: art1074, alt: "Digital painting of a robed celestial figure", w: 472, h: 630,
    title: { text: "Magnanimous", color: "#ffffec", x: 0.5, y: 0.935 } },
  moon: { id: "moon", kind: "art", src: artMoon, alt: "Digital painting of a white-haired figure in black", w: 472, h: 629,
    title: { text: "the moon is beautiful, isn’t it?", color: "#fcfcfc", x: 0.4995, y: 0.938 } },
  serenity: { id: "serenity", kind: "art", src: artKrishna, alt: "Digital painting of Krishna holding a rose", w: 399, h: 532,
    title: { text: "Serenity", color: "#5099a1", x: 0.757, y: 0.021 } },
  traitor: { id: "traitor", kind: "art", src: art4725, alt: "Two figures facing each other across a glowing sea", w: 842, h: 383,
    title: { text: "traitor", color: "#fdf7e7", x: 0.511, y: 0.042 } },
  sketch: { id: "sketch", kind: "art", src: art0179, alt: "Pencil sketch of a girl resting her chin on her hand", w: 473, h: 520,
    // left edge sits just after the signature mark
    title: { text: "A sketch", color: "#56534c", x: 0.258, y: 0.933, align: "left" } },
  izumi: { id: "izumi", kind: "art", src: art_izumi, alt: "Digital portrait of a dark-haired young man", w: 399, h: 399,
    title: { text: "Izumi Miyamura", color: "#6f6970", x: 0.0326, y: 0.6992, align: "left" } },
  pines: { id: "pines", kind: "art", src: art0409, alt: "Ink drawing of a swordsman with flowing hair", w: 356, h: 659,
    title: { text: "wind blowing against a forest of pine trees", color: "#0f0c06", x: 0.503, y: 0.965 } },
};

// Columns of rows; each row's items sit side by side. Column shares come from Figma.
type Column = { share: number; rows: string[][] };
const PHOTO_COLUMNS: Column[] = [
  { share: 689, rows: [["river"], ["trees"], ["relief"], ["painting"]] },
  { share: 963, rows: [["sunflowers", "path"], ["statue", "tower"], ["rotunda", "train"]] },
];
const ART_COLUMNS: Column[] = [
  { share: 472, rows: [["magnanimous"], ["moon"]] },
  { share: 399, rows: [["serenity"], ["izumi"]] },
  { share: 842, rows: [["traitor"], ["sketch", "pines"]] },
];
const BOTTOM_MARGIN = 120;

// "All" keeps photos and art at the same sizes as their own pages:
// Photos, with one poem filling the space under the left column → a row of poems → Art
const ALL_FILLER_POEM = "cotton candy skies";
const ALL_POEM_ROW = ["[...]", "Some Proof", "I wish I may, I wish I might..."];
const poemByTitle = (t: string) => POEMS.find(p => p.title === t)!;

// Poem card metrics (design px)
const POEM_PAD = 24;
const POEM_SIZE = 20;
const POEM_LINE = 1.3; // line height, as a multiple of font size
const POEM_STANZA_GAP = 1.2; // em

// Font scale so a poem's longest line fits its card without wrapping
function poemFit(poem: Poem, cardW: number) {
  const lines = poem.stanzas.flatMap(st => st.split("\n"));
  const widest = Math.max(
    textWidth(poem.title, `800 ${POEM_SIZE}px ${SERIF}`),
    ...lines.map(l => textWidth(l, `500 ${POEM_SIZE}px ${SERIF}`)),
  );
  return Math.min(1, (cardW - 2 * POEM_PAD) / widest);
}

function poemHeight(poem: Poem, fit: number) {
  const size = POEM_SIZE * fit;
  const lines = poem.stanzas.reduce((t, st) => t + st.split("\n").length, 0);
  return 2 * POEM_PAD + size * POEM_LINE * (1 + lines) + size * POEM_STANZA_GAP * poem.stanzas.length;
}

type Placed = Item & { x: number; y: number; width: number; height: number };
type PlacedPoem = { poem: Poem; x: number; y: number; width: number; height: number; fit: number };
type ViewEntry = { key: string } & ({ kind: "image"; item: Placed } | { kind: "poem"; poem: Poem });

function layoutColumns(columns: Column[], top: number, contentW: number) {
  const total = columns.reduce((t, c) => t + c.share, 0);
  const usable = contentW - GAP * (columns.length - 1);
  const placed: Placed[] = [];
  const columnEnds: { x: number; width: number; bottom: number }[] = [];
  let x = NAV_X;
  let bottom = top;

  for (const col of columns) {
    const colW = usable * (col.share / total);
    let y = top;
    for (const row of col.rows) {
      // Items in a row split the width in their Figma proportions and keep their own heights
      const items = row.map(id => ITEMS[id]);
      const rowUsable = colW - GAP * (items.length - 1);
      const widthSum = items.reduce((t, it) => t + it.w, 0);
      let ix = x;
      let rowH = 0;
      for (const it of items) {
        const w = rowUsable * (it.w / widthSum);
        const h = w * (it.h / it.w);
        placed.push({ ...it, x: ix, y, width: w, height: h });
        ix += w + GAP;
        rowH = Math.max(rowH, h);
      }
      y += rowH + GAP;
    }
    bottom = Math.max(bottom, y - GAP);
    columnEnds.push({ x, width: colW, bottom: y - GAP });
    x += colW + GAP;
  }
  return { placed, bottom, columns: columnEnds };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
type Filter = "all" | Kind;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "poem", label: "Poems" },
  { id: "art", label: "Art" },
];

export default function PlayPage({ navigate }: { navigate: (p: SitePage) => void }) {
  const { scale, stageW } = useStageScale();
  const [filter, setFilter] = useState<Filter>("photo");
  const headerH = NAV_TOP * 2 + 24;
  const contentW = stageW - 2 * NAV_X;

  useFontsReady(); // poem sizes are measured from the real font

  let placed: Placed[] = [];
  let filler: PlacedPoem | null = null;
  let poemRow: { top: number; poems: Poem[] } | null = null;
  const [rowH, setRowH] = useState(0);
  let bottom = CONTENT_TOP;

  if (filter === "photo" || filter === "art") {
    const r = layoutColumns(filter === "photo" ? PHOTO_COLUMNS : ART_COLUMNS, CONTENT_TOP, contentW);
    placed = r.placed; bottom = r.bottom;
  } else if (filter === "poem") {
    poemRow = { top: CONTENT_TOP, poems: POEMS };
    bottom = CONTENT_TOP + rowH;
  } else {
    const photos = layoutColumns(PHOTO_COLUMNS, CONTENT_TOP, contentW);
    // The shortest photo column gets a poem that runs down to the bottom of the block
    const col = photos.columns.reduce((a, c) => (c.bottom < a.bottom ? c : a));
    const poem = poemByTitle(ALL_FILLER_POEM);
    const fit = poemFit(poem, col.width);
    const y = col.bottom + GAP;
    filler = { poem, x: col.x, y, width: col.width, height: Math.max(poemHeight(poem, fit), photos.bottom - y), fit };
    const blockBottom = Math.max(photos.bottom, y + filler.height);

    poemRow = { top: blockBottom + GAP, poems: ALL_POEM_ROW.map(poemByTitle) };
    const art = layoutColumns(ART_COLUMNS, poemRow.top + rowH + GAP, contentW);
    placed = [...photos.placed, ...art.placed];
    bottom = art.bottom;
  }
  const height = bottom + BOTTOM_MARGIN;

  // Viewer order follows the page: top to bottom, then left to right
  const entries: (ViewEntry & { x: number; y: number })[] = [
    ...placed.map(it => ({ key: it.id, kind: "image" as const, item: it, x: it.x, y: it.y })),
    ...(filler ? [{ key: filler.poem.title, kind: "poem" as const, poem: filler.poem, x: filler.x, y: filler.y }] : []),
    ...(poemRow ? poemRow.poems.map((poem, i) => ({ key: poem.title, kind: "poem" as const, poem, x: NAV_X + i, y: poemRow!.top })) : []),
  ];
  const sequence = entries.sort((a, b) => a.y - b.y || a.x - b.x);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openIndex = openKey ? sequence.findIndex(e => e.key === openKey) : -1;
  const lastCard = useRef<HTMLElement | null>(null);

  const open = (key: string, el: HTMLElement) => { lastCard.current = el; setOpenKey(key); };
  const close = useCallback(() => { setOpenKey(null); lastCard.current?.focus(); }, []);
  const step = useCallback((dir: 1 | -1) => {
    if (openIndex < 0) return;
    setOpenKey(sequence[(openIndex + dir + sequence.length) % sequence.length].key);
  }, [openIndex, sequence]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-white" style={{ fontFamily: SANS, minHeight: "100vh" }}>
        {/* Fixed header: menu + filters, fading out over the content as it scrolls under */}
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="play" onSelect={page => page !== "play" && navigate(page)} />
            <Filters value={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Wall */}
        <div className="relative" style={{ height: height * scale }}>
          <div className="absolute top-0 left-0 origin-top-left" style={{ width: stageW, height, transform: `scale(${scale})` }}>
            <AnimatePresence>
              {placed.map((item, i) => <PhotoCard key={item.id} item={item} order={i} onOpen={open} />)}
            </AnimatePresence>
            {filler && (
              <PoemCard
                key={`filler-${filler.poem.title}`}
                poem={filler.poem}
                fit={filler.fit}
                inView
                onOpen={open}
                style={{ position: "absolute", left: filler.x, top: filler.y, width: filler.width, height: filler.height }}
              />
            )}
            {poemRow && (
              <Poems key={filter} poems={poemRow.poems} top={poemRow.top} width={contentW} onHeight={setRowH} onOpen={open} />
            )}
          </div>
        </div>
      </div>
      <Lightbox entry={openIndex >= 0 ? sequence[openIndex] : null} scale={scale} onClose={close} onStep={step} />
    </MotionConfig>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POEMS — cards fill the content width with the same gaps as the photo wall
// ─────────────────────────────────────────────────────────────────────────────
function Poems({ poems, top, width, onHeight, onOpen }: {
  poems: Poem[];
  top: number;
  width: number;
  onHeight: (h: number) => void;
  onOpen: (key: string, el: HTMLElement) => void;
}) {
  // Lines never wrap. Cards take their text's width and grow to fill the row; if the row's natural
  // width is wider than the page, the whole row scales down to fit.
  const measureRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [natural, setNatural] = useState(width);
  useLayoutEffect(() => {
    const measure = () => { if (measureRef.current) setNatural(measureRef.current.offsetWidth); };
    measure();
    document.fonts?.ready.then(measure);
  }, [poems]);
  const fit = Math.min(1, width / natural);

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const report = () => onHeight(el.offsetHeight * fit);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeight, fit]);

  const cards = (live: boolean) => poems.map((poem, i) => (
    <PoemCard
      key={poem.title}
      poem={poem}
      animate={live}
      inView={live}
      delay={i * 0.08}
      onOpen={live ? onOpen : undefined}
      style={{ flex: "1 0 auto" }}
    />
  ));

  return (
    <>
      {/* Invisible copy at natural width, used for measuring */}
      <div ref={measureRef} aria-hidden className="absolute flex invisible pointer-events-none" style={{ left: 0, top: 0, width: "max-content", gap: GAP }}>
        {cards(false)}
      </div>
      <div
        ref={rowRef}
        className="absolute flex items-start origin-top-left"
        style={{ left: NAV_X, top, width: width / fit, gap: GAP, transform: fit < 1 ? `scale(${fit})` : undefined }}
      >
        {cards(true)}
      </div>
    </>
  );
}

function PoemCard({ poem, fit = 1, animate = true, inView = false, delay = 0, style, onOpen }: {
  poem: Poem;
  fit?: number;
  animate?: boolean;
  inView?: boolean;
  delay?: number;
  style?: React.CSSProperties;
  onOpen?: (key: string, el: HTMLElement) => void;
}) {
  const size = POEM_SIZE * fit;
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.article
      {...(onOpen && {
        role: "button",
        tabIndex: 0,
        "aria-label": `Read ${poem.title}`,
        onClick: (e: React.MouseEvent<HTMLElement>) => onOpen(poem.title, e.currentTarget),
        onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(poem.title, e.currentTarget); }
        },
        whileHover: { scale: 1.02, y: -6, boxShadow: "0px 18px 40px rgba(0,0,0,0.12)", transition: { type: "spring", stiffness: 260, damping: 24 } },
        whileTap: { scale: 0.99, transition: { duration: 0.1 } },
        className: "cursor-zoom-in outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
      })}
      style={{
        background: "#f3f3f3",
        borderRadius: RADIUS,
        padding: POEM_PAD,
        fontFamily: SERIF,
        fontSize: size,
        lineHeight: POEM_LINE,
        color: "black",
        whiteSpace: "pre",
        boxSizing: "border-box",
        ...style,
      }}
      initial={animate ? { opacity: 0, y: 40 } : false}
      animate={inView ? undefined : shown}
      whileInView={inView ? shown : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      <h3 className="m-0 underline" style={{ fontSize: size, fontWeight: 800, lineHeight: POEM_LINE, textUnderlinePosition: "from-font" }}>
        {poem.title}
      </h3>
      {poem.stanzas.map((stanza, j) => (
        <p key={j} className="m-0" style={{ marginTop: `${POEM_STANZA_GAP}em`, fontWeight: 500 }}>{stanza}</p>
      ))}
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTERS — mirror the menu on the right
// ─────────────────────────────────────────────────────────────────────────────
function Filters({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <motion.div
      className="absolute z-20 flex items-center"
      style={{ right: NAV_X, top: NAV_TOP, gap: 18 }}
      role="group"
      aria-label="Filter"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
    >
      {FILTERS.map(f => {
        const on = f.id === value;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            aria-pressed={on}
            className={`whitespace-nowrap cursor-pointer ${LINK_CLASS}`}
            style={{ fontFamily: MONO, fontSize: 20, lineHeight: 1.1, letterSpacing: -1, fontWeight: on ? 700 : 400, color: "black" }}
          >
            {f.label}
          </button>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO CARD
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCard({ item, order, onOpen }: {
  item: Placed;
  order: number;
  onOpen: (id: string, el: HTMLElement) => void;
}) {
  const crop = item.crop;
  const title = item.title;
  const label = `View ${title?.text ?? item.alt}`;

  // A title too long for its card shrinks to stay on one line (keeps 6% clear of each edge)
  useFontsReady();
  const naturalW = title ? textWidth(title.text, `500 18px ${SERIF}`) : 0;
  const titleFit = title ? Math.min(1, (item.width * 0.88) / naturalW) : 1;
  // ...and is nudged inward if its spot would push it past an edge (3% margin)
  let titleLeft = 0;
  if (title) {
    const w = naturalW * titleFit;
    const pad = item.width * 0.03;
    const want = title.align === "left" ? title.x * item.width : title.x * item.width - w / 2;
    titleLeft = Math.max(pad, Math.min(item.width - pad - w, want));
  }

  return (
    <motion.figure
      className="absolute m-0 overflow-hidden cursor-zoom-in outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ left: item.x, top: item.y, width: item.width, height: item.height, borderRadius: RADIUS }}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={e => onOpen(item.id, e.currentTarget)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(item.id, e.currentTarget); }
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -6,
        boxShadow: "0px 18px 40px rgba(0,0,0,0.16)",
        transition: { type: "spring", stiffness: 260, damping: 24 },
      }}
      whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: Math.min(order, 6) * 0.06 }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading={order < 4 ? "eager" : "lazy"}
        draggable={false}
        className={crop ? "absolute max-w-none" : "absolute inset-0 size-full object-cover"}
        style={crop ? { width: `${crop.w}%`, height: `${crop.h}%`, left: `${crop.l}%`, top: `${crop.t}%` } : undefined}
      />
      {title && (
        <figcaption
          className="absolute whitespace-nowrap"
          style={{
            left: titleLeft,
            top: `${title.y * 100}%`,
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: 18 * titleFit,
            lineHeight: "normal",
            color: title.color,
          }}
        >
          {title.text}
        </figcaption>
      )}
    </motion.figure>
  );
}

// Text width in px for a CSS font shorthand (cached)
const textWidths = new Map<string, number>();
let measureCtx: CanvasRenderingContext2D | null = null;
function textWidth(text: string, font: string) {
  const key = `${font}|${text}|${document.fonts?.status}`;
  let w = textWidths.get(key);
  if (w === undefined) {
    measureCtx ??= document.createElement("canvas").getContext("2d");
    if (!measureCtx) return 0;
    measureCtx.font = font;
    w = measureCtx.measureText(text).width;
    textWidths.set(key, w);
  }
  return w;
}

// Re-render once web fonts have loaded so text measurements use the real font
function useFontsReady() {
  const [, setReady] = useState(document.fonts?.status === "loaded");
  useEffect(() => { document.fonts?.ready.then(() => setReady(true)); }, []);
}

// Largest box with the card's aspect ratio that fits within 78% of the viewport
function fitFrame(item: Placed) {
  const ratio = item.w / item.h;
  const maxW = window.innerWidth * 0.78;
  const maxH = window.innerHeight * 0.78;
  const width = Math.min(maxW, maxH * ratio);
  return { width, height: width / ratio };
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX — full photo over a blurred view of the page
// ─────────────────────────────────────────────────────────────────────────────
// Font scale for a poem shown in the viewer: as large as fits 80% of the viewport, up to 1.4× the screen scale
function viewerPoemFit(poem: Poem, scale: number) {
  const lines = poem.stanzas.flatMap(st => st.split("\n"));
  const widest = Math.max(
    textWidth(poem.title, `800 ${POEM_SIZE}px ${SERIF}`),
    ...lines.map(l => textWidth(l, `500 ${POEM_SIZE}px ${SERIF}`)),
  );
  const tall = poemHeight(poem, 1) - 2 * POEM_PAD;
  const byW = (window.innerWidth * 0.7 - 2 * POEM_PAD) / widest;
  const byH = (window.innerHeight * 0.8 - 2 * POEM_PAD) / tall;
  return Math.min(1.4 * scale, byW, byH);
}

function Lightbox({ entry, scale, onClose, onStep }: {
  entry: ViewEntry | null;
  scale: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = entry !== null;
  const item = entry?.kind === "image" ? entry.item : null;

  // Keyboard, scroll lock and focus while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onStep]);

  const edge = NAV_X * scale;
  const arrowSize = 56 * scale;

  return createPortal(
    <AnimatePresence>
      {entry && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={item ? item.title?.text ?? item.alt : entry.kind === "poem" ? entry.poem.title : undefined}
          style={{ fontFamily: SANS }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {/* Blurred page behind */}
          <div
            className="absolute inset-0 cursor-zoom-out"
            style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(28px) saturate(1.1)", WebkitBackdropFilter: "blur(28px) saturate(1.1)" }}
            onClick={onClose}
          />

          {/* Photo + title */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 16 * scale }}>
            <AnimatePresence mode="wait">
              {entry.kind === "poem" ? (
                <motion.div
                  key={entry.key}
                  className="pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <PoemCard
                    poem={entry.poem}
                    fit={viewerPoemFit(entry.poem, scale)}
                    animate={false}
                    style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)", background: "#f6f6f6" }}
                  />
                </motion.div>
              ) : item && (
              <motion.figure
                key={item.id}
                className="m-0 flex flex-col items-center pointer-events-auto"
                style={{ gap: 16 * scale }}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {/* Same framing as the card: its aspect ratio and crop, just larger */}
                <div
                  className="relative overflow-hidden"
                  style={{ ...fitFrame(item), borderRadius: 12 * scale, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    className={item.crop ? "absolute max-w-none" : "absolute inset-0 size-full object-cover"}
                    style={item.crop
                      ? { width: `${item.crop.w}%`, height: `${item.crop.h}%`, left: `${item.crop.l}%`, top: `${item.crop.t}%` }
                      : undefined}
                  />
                </div>
                {item.title && (
                  <figcaption style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 20 * scale, color: "black", opacity: 0.75 }}>
                    {item.title.text}
                  </figcaption>
                )}
              </motion.figure>
              )}
            </AnimatePresence>
          </div>

          {/* Close — sits where the filters are */}
          <div className="absolute" style={{ right: edge, top: (NAV_TOP - 5) * scale }}>
            <motion.button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="flex items-center justify-center cursor-pointer outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
              style={{ width: 32 * scale, height: 32 * scale, color: "black" }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <X size={28 * scale} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Previous / next */}
          {([-1, 1] as const).map(dir => (
            <motion.button
              key={dir}
              onClick={() => onStep(dir)}
              aria-label={dir < 0 ? "Previous" : "Next"}
              className="absolute top-1/2 flex items-center justify-center rounded-full bg-white cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                [dir < 0 ? "left" : "right"]: edge,
                width: arrowSize,
                height: arrowSize,
                marginTop: -arrowSize / 2,
                boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {dir < 0
                ? <ChevronLeft size={22 * scale} strokeWidth={1.75} color="black" />
                : <ChevronRight size={22 * scale} strokeWidth={1.75} color="black" />}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
