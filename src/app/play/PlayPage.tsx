import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  kind: Kind;
  src: string;
  alt: string;
  w: number;
  h: number;
  crop?: Crop;
  // x is the title's centre, or its left edge when align is "left" (to line up with something in the photo)
  title?: { text: string; color: string; x: number; y: number; align?: "left" };
};

const ITEMS: Record<string, Item> = {
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
};

// Layout from the Figma frame: a wide left column, and rows of pairs on the right
const LEFT_COLUMN = ["river", "trees", "relief", "painting"];
const RIGHT_ROWS = [["sunflowers", "path"], ["statue", "tower"], ["rotunda", "train"]];
const LEFT_SHARE = 689 / (689 + 963); // left column's share of the content width in Figma
const BOTTOM_MARGIN = 120;

type Placed = Item & { x: number; y: number; width: number; height: number };

function layout(stageW: number) {
  const contentW = stageW - 2 * NAV_X;
  const leftW = (contentW - GAP) * LEFT_SHARE;
  const rightX = NAV_X + leftW + GAP;
  const rightW = contentW - GAP - leftW;
  const placed: Placed[] = [];

  let y = CONTENT_TOP;
  for (const id of LEFT_COLUMN) {
    const it = ITEMS[id];
    const height = leftW * (it.h / it.w);
    placed.push({ ...it, x: NAV_X, y, width: leftW, height });
    y += height + GAP;
  }
  let bottom = y - GAP;

  y = CONTENT_TOP;
  for (const row of RIGHT_ROWS) {
    const [a, b] = row.map(id => ITEMS[id]);
    const aW = (rightW - GAP) * (a.w / (a.w + b.w));
    const bW = rightW - GAP - aW;
    const aH = aW * (a.h / a.w);
    const bH = bW * (b.h / b.w);
    placed.push({ ...a, x: rightX, y, width: aW, height: aH });
    placed.push({ ...b, x: rightX + aW + GAP, y, width: bW, height: bH });
    y += Math.max(aH, bH) + GAP;
  }
  bottom = Math.max(bottom, y - GAP);

  return { placed, height: bottom + BOTTOM_MARGIN };
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
  const { placed, height } = layout(stageW);
  const visible = placed.filter(p => filter === "all" || p.kind === filter);
  const headerH = NAV_TOP * 2 + 24;

  // Viewer order follows the page: top to bottom, then left to right
  const sequence = [...visible].sort((a, b) => a.y - b.y || a.x - b.x);
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = openId ? sequence.findIndex(p => p.id === openId) : -1;
  const lastCard = useRef<HTMLElement | null>(null);

  const open = (id: string, el: HTMLElement) => { lastCard.current = el; setOpenId(id); };
  const close = useCallback(() => { setOpenId(null); lastCard.current?.focus(); }, []);
  const step = useCallback((dir: 1 | -1) => {
    if (openIndex < 0) return;
    setOpenId(sequence[(openIndex + dir + sequence.length) % sequence.length].id);
  }, [openIndex, sequence]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-white" style={{ fontFamily: SANS, minHeight: "100vh" }}>
        {/* Fixed header: menu + filters, fading out over the photos as they scroll under */}
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          style={{ height: headerH * scale, background: "linear-gradient(#ffffff 65%, rgba(255,255,255,0))" }}
        >
          <div className="absolute top-0 left-0 origin-top-left pointer-events-auto" style={{ width: stageW, transform: `scale(${scale})` }}>
            <TopNav current="play" onSelect={page => page !== "play" && navigate(page)} />
            <Filters value={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Photo wall */}
        <div className="relative" style={{ height: height * scale }}>
          <div className="absolute top-0 left-0 origin-top-left" style={{ width: stageW, height, transform: `scale(${scale})` }}>
            <AnimatePresence>
              {visible.map((item, i) => <PhotoCard key={item.id} item={item} order={i} onOpen={open} />)}
            </AnimatePresence>
            {visible.length === 0 && (
              <motion.p
                key={filter}
                className="absolute"
                style={{ left: NAV_X, top: CONTENT_TOP, fontSize: 20, lineHeight: 1.1, letterSpacing: -1, color: "black", opacity: 0.4 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                Nothing here yet — check back soon.
              </motion.p>
            )}
          </div>
        </div>
      </div>
      <Lightbox item={openIndex >= 0 ? sequence[openIndex] : null} scale={scale} onClose={close} onStep={step} />
    </MotionConfig>
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
          className={`absolute whitespace-nowrap ${title.align === "left" ? "" : "text-center"}`}
          style={{
            left: `${title.x * 100}%`,
            top: `${title.y * 100}%`,
            transform: title.align === "left" ? undefined : "translateX(-50%)",
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: 18,
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
function Lightbox({ item, scale, onClose, onStep }: {
  item: Placed | null;
  scale: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = item !== null;

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
      {item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={item.title?.text ?? item.alt}
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
            </AnimatePresence>
          </div>

          {/* Close — sits where the filters are */}
          <div className="absolute" style={{ right: edge, top: NAV_TOP * scale }}>
            <button
              ref={closeRef}
              onClick={onClose}
              className={`cursor-pointer ${LINK_CLASS}`}
              style={{ fontSize: 20 * scale, lineHeight: 1.1, letterSpacing: -1 * scale, color: "black" }}
            >
              Close
            </button>
          </div>

          {/* Previous / next */}
          {([-1, 1] as const).map(dir => (
            <motion.button
              key={dir}
              onClick={() => onStep(dir)}
              aria-label={dir < 0 ? "Previous photo" : "Next photo"}
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
