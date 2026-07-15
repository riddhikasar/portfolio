import { motion } from "motion/react";
import { Link } from "react-router";
import { getTheme } from "@/app/lib/theme";
import imgLogo from "@/imports/projects/noonchi/logo.png";
import imgHero from "@/imports/projects/noonchi/hero.png";
import imgGallery1 from "@/imports/projects/noonchi/gallery-1.png";
import imgGallery2 from "@/imports/projects/noonchi/gallery-2.png";
import imgGallery3 from "@/imports/projects/noonchi/gallery-3.png";
import noonchiDemo from "@/assets/noonchi/noonchi_demo.mp4";
import noonchiWatchDemo from "@/assets/noonchi/noonchi_watch_demo.mp4";
import noonchiNudges from "@/assets/noonchi/nudges.mp4";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={`mx-auto w-full max-w-[1200px] px-[clamp(20px,8.3vw,120px)] ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-['Instrument_Sans'] font-medium leading-[1.1] tracking-[-3.6px]"
      style={{ fontSize: "clamp(40px,5vw,72px)", fontVariationSettings: '"wdth" 100' }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`font-['Instrument_Sans'] text-[clamp(18px,1.67vw,24px)] leading-normal ${className}`}
      style={{ fontVariationSettings: '"wdth" 100' }}
    >
      {children}
    </div>
  );
}

function MetaRow({ dark }: { dark: boolean }) {
  const muted = dark ? "rgba(255,255,255,0.55)" : "#8a8a8d";
  const items = ["Team: 2", "Role: Founder, Design + Dev", "Time: 1yr"];
  return (
    <div className="flex flex-wrap gap-[24px]">
      {items.map((item) => (
        <p
          key={item}
          className="font-['Source_Code_Pro'] text-[clamp(14px,1.25vw,18px)] font-medium whitespace-nowrap"
          style={{ color: muted }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function FeatureColumn({
  title,
  description,
  accent,
  bordered,
}: {
  title: string;
  description: string;
  accent?: string;
  bordered?: boolean;
}) {
  return (
    <div className="flex max-w-[324px] flex-col items-center gap-[18px] text-center">
      <div
        className="flex size-[110px] items-center justify-center rounded-full p-[24px] md:size-[132px]"
        style={{
          backgroundColor: accent,
          border: bordered ? "2px solid black" : undefined,
        }}
      >
        <div className="size-[62px] rounded-full bg-white/20" />
      </div>
      <div className="font-['Instrument_Sans'] text-[clamp(18px,1.67vw,24px)] font-medium leading-normal">
        <p className="mb-2">{title}</p>
        <p className="text-[clamp(16px,1.25vw,18px)] font-normal">{description}</p>
      </div>
    </div>
  );
}

export function NoonchiPage({ dark }: { dark: boolean }) {
  const theme = getTheme(dark);

  return (
    <article className="pb-[72px] transition-colors duration-300" style={{ color: theme.fg, backgroundColor: theme.bg }}>
      <div className="relative overflow-hidden">
        <img alt="" className="h-[clamp(280px,54.6vw,787px)] w-full object-cover" src={imgHero} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
      </div>

      <Section className="pt-[clamp(32px,4vw,82px)]">
        <Link
          to="/"
          className="font-['Source_Code_Pro'] mb-8 inline-block text-[14px] underline"
          style={{ textUnderlinePosition: "from-font" }}
        >
          ← Back to Work
        </Link>

        <div className="mb-6 flex items-center gap-[24px]">
          <img alt="Noonchi logo" className="h-[54px] w-[69px] object-cover" src={imgLogo} />
          <h1
            className="font-['Instrument_Sans'] font-medium leading-[1.1] tracking-[-3.6px]"
            style={{ fontSize: "clamp(48px,5vw,72px)", fontVariationSettings: '"wdth" 100' }}
          >
            Noonchi
          </h1>
        </div>

        <Body className="mb-8 max-w-[1200px]">
          I co-founded, built, and tested Noonchi — an <strong>intelligent app</strong> + <strong>wearable system</strong> to help autistic and non-autistic individuals make implicit social cues more explicit for clearer workplace communication.
        </Body>

        <MetaRow dark={dark} />
      </Section>

      <Section className="mt-[clamp(48px,5vw,72px)] space-y-8">
        <H2>Context</H2>
        <Body>
          <p className="mb-4">
            Workplace <strong>communication is often indirect</strong>. Individuals are expected to decode tone, subtext, and underlying meanings constantly.
          </p>
          <p className="mb-4" style={{ color: "#ea181b" }}>
            <strong>
              However, for autistic and neurotypical individuals who depend on direct communication, this makes conversations itself extremely non-inclusive.
            </strong>
          </p>
          <p>
            <strong>Noonchi challenges this norm</strong> and <strong>bridges this communication gap.</strong>
          </p>
        </Body>
      </Section>

      <Section className="mt-[clamp(48px,5vw,72px)] space-y-8">
        <H2>Design Challenge</H2>
        <Body>
          <p className="mb-4">The real challenge here was not making people communicate “better.”</p>
          <p className="mb-4">
            It was <strong>designing a system that could make social cues clearer without making anyone feel watched, corrected, or exposed.</strong>
          </p>
          <p style={{ color: "#4f36d7" }}>
            <strong>We wanted to know: “What if communication support did not sit on one person, but lived in the shared space between people?”</strong>
          </p>
        </Body>
      </Section>

      <Section className="mt-[clamp(48px,5vw,72px)] space-y-8">
        <H2>Co-Designing the Solution</H2>
        <Body>
          <p className="mb-4">
            There was no way we could answer such a multi-faceted question alone. That’s why we hosted <strong>co-design sessions to build Noonchi with our users.</strong>
          </p>
          <p>
            We built, tested, and iterated Noonchi with <strong>50+ users</strong> — both from the autistic and non-autistic community.
          </p>
        </Body>
      </Section>

      <Section className="mt-[clamp(48px,5vw,96px)] text-center">
        <p
          className="font-['Instrument_Sans'] font-medium leading-[1.1] tracking-[-3.6px]"
          style={{ color: "#4f36d7", fontSize: "clamp(36px,5vw,72px)", fontVariationSettings: '"wdth" 100' }}
        >
          “I wish I had this my whole life...”
        </p>
        <p className="mt-3 font-['Instrument_Sans'] text-[clamp(18px,1.67vw,24px)]">— Noonchi beta user</p>
      </Section>

      <Section className="mt-[clamp(48px,5vw,96px)] space-y-8">
        <H2>Final Solution</H2>
        <div className="grid gap-6">
          <video autoPlay loop muted playsInline className="w-full rounded-[12px] shadow-lg" src={noonchiDemo} />
          <video autoPlay loop muted playsInline className="w-full rounded-[12px] shadow-lg" src={noonchiWatchDemo} />
          <video autoPlay loop muted playsInline className="w-full rounded-[12px] shadow-lg" src={noonchiNudges} />
        </div>
      </Section>

      <Section className="mt-[clamp(48px,5vw,96px)] space-y-10 text-center">
        <H2>How Noonchi Works</H2>
        <Body>
          Noonchi has three layers — a physical wearable system, a digital desktop application, and a guiding framework.
        </Body>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          <FeatureColumn
            title="Real-time Nudges"
            description="Noonchi pairs with your smart watch to nudge you when you need it in the present moment"
            accent="#ffe53a"
          />
          <FeatureColumn
            title="Post-meeting Reflections"
            description="Noonchi app shows you what went right in your meetings and what needs work"
            accent="#4f36d7"
          />
          <FeatureColumn
            title="Guiding Framework"
            description="Practice, learn, and grow with custom frameworks designed for your specific needs"
            bordered
          />
        </div>
      </Section>

      <section
        className="mx-auto mt-[clamp(64px,8vw,120px)] max-w-[1440px] px-[clamp(20px,8.3vw,120px)] py-[clamp(48px,8.3vw,120px)]"
        style={{
          backgroundImage: "linear-gradient(127.936deg, rgb(255,255,255) 13.959%, rgb(248,250,252) 33.334%, rgb(113,101,178) 231.64%)",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-[72px]">
          <img alt="Noonchi interface overview" className="w-full rounded-[12px] object-cover shadow-lg" src={imgGallery1} />
          <img alt="Noonchi reflections screen" className="w-full rounded-[12px] object-cover shadow-lg" src={imgGallery2} />
          <img alt="Noonchi watch flow" className="w-full rounded-[12px] object-cover shadow-lg" src={imgGallery3} />
        </div>
      </section>

      <Section className="mt-[clamp(64px,8vw,120px)] space-y-10 text-center">
        <H2>Concepts Applied</H2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <FeatureColumn title="Designing for accessibility and trust" description="" bordered />
          <FeatureColumn title="Involving users in design process" description="" bordered />
          <FeatureColumn title="Acting on the gathered data, meaningfully" description="" bordered />
        </div>
      </Section>

      <p
        className="mt-[72px] text-center font-['Source_Code_Pro'] text-[14px] tracking-[-0.07px]"
        style={{ color: dark ? "rgba(255,255,255,0.55)" : "#8a8a8d" }}
      >
        © Riddhi Kasar 2026
      </p>
    </article>
  );
}
