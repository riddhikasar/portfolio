import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { getTheme } from "@/app/lib/theme";
import type { WorkTab } from "@/app/lib/projects";
import imgAboutBg from "@/imports/About/d3e490f18a3fd716fe71a9632991d885c72ea5bb.png";
import { BitText } from "@/app/components/portfolio/BitIcon";

function SpecPill({
  label,
  tab,
  dark,
}: {
  label: string;
  tab: WorkTab;
  dark: boolean;
}) {
  const theme = getTheme(dark);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={`/?tab=${tab}`}
        className="flex items-center justify-center rounded-[24px] px-[18px] py-[12px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: theme.border,
          color: hovered ? "#000000" : theme.fg,
          backgroundColor: hovered ? theme.activePill : "transparent",
          transition: "background-color 0.18s ease, color 0.18s ease",
        }}
      >
        <span className="font-['Source_Code_Pro'] text-[clamp(14px,1.25vw,18px)] font-semibold whitespace-nowrap">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}

function ContactPill({
  children,
  dark,
  href,
  onClick,
  minWidth,
}: {
  children: React.ReactNode;
  dark: boolean;
  href?: string;
  onClick?: () => void;
  minWidth?: number;
}) {
  const theme = getTheme(dark);
  const [hovered, setHovered] = useState(false);
  const style: React.CSSProperties = {
    border: theme.border,
    color: hovered ? "#000000" : theme.fg,
    backgroundColor: hovered ? theme.activePill : "transparent",
    fontFamily: "'Source Code Pro', monospace",
    fontWeight: 500,
    fontSize: 16,
    minWidth,
    transition: "background-color 0.18s ease, color 0.18s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 24,
    cursor: "pointer",
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

export function AboutPage({ dark }: { dark: boolean }) {
  const theme = getTheme(dark);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText("riddhikasar02@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      window.location.href = "mailto:riddhikasar02@gmail.com";
    });
  }

  return (
    <div className="pb-[48px] transition-colors duration-300" style={{ color: theme.fg }}>
      <motion.div
        className="px-[clamp(20px,2.9vw,42px)] pt-[42px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1
          className="font-['Instrument_Sans'] font-normal leading-[1.1]"
          style={{
            fontSize: "clamp(32px,4.44vw,64px)",
            letterSpacing: "-3.2px",
            fontVariationSettings: '"wdth" 100',
          }}
        >
          {`I'm Riddhi - a Design Engineer from `}
          <motion.a
            href="https://mde.harvard.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ textUnderlinePosition: "from-font" }}
            whileHover={{ opacity: 0.65 }}
          >
            Harvard
          </motion.a>
          {" ↗"}
        </h1>
      </motion.div>

      <motion.div
        className="relative mt-[clamp(32px,3.9vw,56px)] px-[clamp(20px,2.9vw,42px)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex flex-wrap items-center gap-[12px]" style={{ rowGap: 12 }}>
          <span
            className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
            style={{ fontSize: "clamp(20px,2.92vw,42px)", fontVariationSettings: '"wdth" 100' }}
          >
            And I specialize in building
          </span>
          <SpecPill label="Digital Interfaces" tab="digital" dark={dark} />
          <span
            className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
            style={{ fontSize: "clamp(20px,2.92vw,42px)", fontVariationSettings: '"wdth" 100' }}
          >
            for
          </span>
          <SpecPill label="Robotics" tab="robotics" dark={dark} />
          <span
            className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
            style={{ fontSize: "clamp(20px,2.92vw,42px)", fontVariationSettings: '"wdth" 100' }}
          >
            and
          </span>
          <SpecPill label="Physical Systems" tab="physical" dark={dark} />
        </div>
        <p
          className="mt-[4px] font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
          style={{ fontSize: "clamp(20px,2.92vw,42px)", fontVariationSettings: '"wdth" 100' }}
        >
          shaping how <strong>humans</strong> and <strong>robots interact, communicate, and collaborate.</strong>
        </p>

        <div className="absolute right-[clamp(20px,2.9vw,42px)] top-[clamp(120px,14vw,200px)] hidden md:block">
          <BitText dark={dark} lines={["Hello, World"]} />
        </div>
      </motion.div>

      <motion.div
        className="relative mx-[clamp(20px,2.9vw,42px)] mt-[clamp(48px,5vw,72px)] overflow-hidden px-[clamp(24px,9.05vw,123px)] py-[clamp(48px,6.1vw,88px)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <img
            alt=""
            className="absolute max-w-none"
            style={{ height: "221.85%", left: 0, top: "-67.7%", width: "139.8%" }}
            src={imgAboutBg}
          />
        </div>
        <div
          className="relative font-['Source_Code_Pro'] font-normal tracking-[-1.2px]"
          style={{ fontSize: "clamp(14px,1.67vw,24px)" }}
        >
          <p className="mb-0">
            I believe that <strong>true depth comes from applying everything we know to everything we make.</strong>
          </p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">The best artist is also an anatomist.</p>
          <p className="mb-0">The best marketer is also a neuroscientist.</p>
          <p className="mb-0">The best chef is also a chemist.</p>
          <p className="font-semibold">And the best designer is also an engineer.</p>
        </div>
      </motion.div>

      <motion.div
        className="mt-[clamp(48px,5vw,72px)] px-[clamp(20px,2.9vw,42px)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <p
          className="font-['Instrument_Sans'] font-normal tracking-[-2.1px]"
          style={{ fontSize: "clamp(18px,2.92vw,42px)", fontVariationSettings: '"wdth" 100' }}
        >
          Say hello or talk future projects:{" "}
          <motion.a
            href="mailto:riddhikasar02@gmail.com"
            className="underline"
            style={{ textUnderlinePosition: "from-font" }}
            whileHover={{ opacity: 0.65 }}
          >
            riddhikasar02@gmail.com
          </motion.a>
          {" ↗︎"}
        </p>
      </motion.div>

      <motion.div
        className="mt-[40px] flex flex-wrap justify-center gap-[18px] px-[clamp(20px,2.9vw,42px)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <ContactPill dark={dark} onClick={copyEmail} minWidth={140}>
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="w-full text-center"
            >
              {copied ? "Copied!" : "Copy Email"}
            </motion.span>
          </AnimatePresence>
        </ContactPill>
        <ContactPill dark={dark} href="https://www.linkedin.com/in/riddhikasar/">
          LinkedIn
        </ContactPill>
        <ContactPill dark={dark} href="https://www.instagram.com/pear.logic/">
          Instagram
        </ContactPill>
      </motion.div>

      <motion.div
        className="mt-[48px] flex justify-center md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <BitText dark={dark} lines={["Hello, World"]} />
      </motion.div>

      <motion.div
        className="flex justify-center py-[48px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <BitText dark={dark} lines={["End of file. Awaiting human connection."]} />
      </motion.div>
    </div>
  );
}
