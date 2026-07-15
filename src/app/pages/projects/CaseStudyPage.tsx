import type { ProjectSlug } from "@/app/lib/projects";
import { motion } from "motion/react";
import { Link } from "react-router";
import { getTheme } from "@/app/lib/theme";
import { ProjectCard } from "@/app/components/portfolio/ProjectCards";

type CaseStudy = {
  title: string;
  summary: string;
  meta: string[];
  sections: { heading: string; body: string }[];
};

export const caseStudies: Partial<Record<ProjectSlug, CaseStudy>> = {
  relevo: {
    title: "Relevo Clinical Dashboard",
    summary:
      "I designed the Relevo Clinical Dashboard — a doctor and physiotherapist facing interface that turns patient recovery data into measurable progress and care decisions.",
    meta: ["Team: 3", "Role: Product Design", "Time: 4 months"],
    sections: [
      {
        heading: "Context",
        body: "Rehabilitation does not end when the patient leaves the clinic. Doctors and physiotherapists need a way to understand whether patients are improving, struggling, or missing critical recovery milestones.",
      },
      {
        heading: "Design Challenge",
        body: "The challenge was not just displaying sensor data. It was turning movement, pain, and progress signals into a dashboard that clinicians could quickly read and act on.",
      },
      {
        heading: "Outcome",
        body: "The Relevo Dashboard gives doctors and physiotherapists a clear view of patient progress, exercise history, appointments, and predicted recovery patterns.",
      },
    ],
  },
  liquid: {
    title: "Liquid Data",
    summary:
      "I designed and developed the product experience and interfaces for Liquid Data — an AI powered intelligent machine that transforms memories into delicious drinks and cocktails.",
    meta: ["Team: 6", "Role: UX/UI Design + Dev", "Time: 4 months"],
    sections: [
      {
        heading: "Context",
        body: "Most data visualizations make information feel fixed and distant. Liquid Data explores how data can become tangible — dynamic, spatial, and alive.",
      },
      {
        heading: "Design Challenge",
        body: "How do you build a conversational AI that processes memory without claiming to understand it?",
      },
      {
        heading: "Outcome",
        body: "The project transformed complex information into a more intuitive visual experience, making patterns easier to feel, compare, and interpret.",
      },
    ],
  },
  water: {
    title: "Water",
    summary: "A data-rich interface for reading environmental conditions through a precise visual system.",
    meta: ["Role: Data interface design", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Environmental data can become visually overwhelming before it becomes useful. This interface structures information around focused scans, clear contrast, and legible visualizations.",
      },
    ],
  },
  trod: {
    title: "Trod",
    summary: "A robotics concept focused on grounded movement, physical presence, and approachable intelligence.",
    meta: ["Role: Robotics design", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Robots need to communicate capability and intent before people ever touch a control. Trod uses proportion, posture, and a restrained interface language to make the system feel useful and understandable.",
      },
    ],
  },
  "relevo-robotics": {
    title: "Relevo Robotics",
    summary: "A robotics workflow that connects physical operations with a clear digital command surface.",
    meta: ["Role: Human-robot interaction", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Operators need to understand machine state, risk, and next action without slowing down the work. This project pairs physical robotics imagery with a calm control layer.",
      },
    ],
  },
  "liquid-robotics": {
    title: "Liquid Robotics",
    summary: "A robotics exploration with a soft visual language and stronger system legibility.",
    meta: ["Role: Robotics UX", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Technical robotics work can feel cold and opaque when the interface and physical story are disconnected. Liquid Robotics shares a consistent visual rhythm across contexts.",
      },
    ],
  },
  link: {
    title: "Link",
    summary: "A connected robotics concept about coordination, signals, and human-readable feedback.",
    meta: ["Role: Interaction design", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Connected systems need clear signals so people can understand what is paired, active, or waiting.",
      },
    ],
  },
  epicure: {
    title: "Epicure",
    summary: "A physical-digital food experience shaped around ritual, materiality, and intelligent assistance.",
    meta: ["Role: Physical product design", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Smart food tools can feel either too technical or too decorative. Epicure balances product presence with interface clarity.",
      },
    ],
  },
  bionics: {
    title: "Bionics",
    summary: "A bio-inspired physical system exploring movement, structure, and responsive design.",
    meta: ["Role: Physical systems", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Bio-inspired work needs to make the logic of nature legible without flattening its complexity.",
      },
    ],
  },
  cycle: {
    title: "Cycle",
    summary: "A physical systems project centered on circular behavior, material flow, and everyday interaction.",
    meta: ["Role: Product design", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Sustainable systems only work when their loops are visible enough for people to participate.",
      },
    ],
  },
  maps: {
    title: "Maps",
    summary: "A map-based experience for moving through place, context, and decision-making.",
    meta: ["Role: Spatial UX", "Time: 4 months"],
    sections: [
      {
        heading: "Overview",
        body: "Map interfaces often bury human intent behind layers of navigation chrome. This project uses cleaner spatial layers with stronger contrast and direct affordances.",
      },
    ],
  },
};

export function CaseStudyPage({ slug, dark }: { slug: ProjectSlug; dark: boolean }) {
  const theme = getTheme(dark);
  const study = caseStudies[slug];

  if (!study) {
    return (
      <div className="px-[clamp(20px,2.9vw,42px)] py-20" style={{ color: theme.fg }}>
        <p>Project not found.</p>
        <Link to="/" className="underline">
          Back to Work
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-[72px]" style={{ color: theme.fg }}>
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,8.3vw,120px)] pt-[clamp(32px,4vw,64px)]">
        <Link
          to="/"
          className="font-['Source_Code_Pro'] mb-10 inline-block text-[14px] underline"
          style={{ textUnderlinePosition: "from-font" }}
        >
          ← Back to Work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 overflow-hidden"
          style={{ aspectRatio: "666 / 393" }}
        >
          <ProjectCard slug={slug} dark={dark} />
        </motion.div>

        <motion.h1
          className="font-['Instrument_Sans'] font-medium leading-[1.1] tracking-[-3.6px]"
          style={{ fontSize: "clamp(40px,5vw,72px)", fontVariationSettings: '"wdth" 100' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {study.title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[1200px] font-['Instrument_Sans'] text-[clamp(18px,1.67vw,24px)] leading-normal"
          style={{ fontVariationSettings: '"wdth" 100' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {study.summary}
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-[24px]">
          {study.meta.map((item) => (
            <p
              key={item}
              className="font-['Source_Code_Pro'] text-[clamp(14px,1.25vw,18px)] font-medium"
              style={{ color: dark ? "rgba(255,255,255,0.55)" : "#8a8a8d" }}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="mt-[clamp(48px,6vw,96px)] space-y-[clamp(40px,5vw,72px)]">
          {study.sections.map((section, index) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
            >
              <h2
                className="mb-6 font-['Instrument_Sans'] font-medium leading-[1.1] tracking-[-2px]"
                style={{ fontSize: "clamp(32px,4vw,56px)", fontVariationSettings: '"wdth" 100' }}
              >
                {section.heading}
              </h2>
              <p
                className="max-w-[1200px] font-['Instrument_Sans'] text-[clamp(18px,1.67vw,24px)] leading-normal"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                {section.body}
              </p>
            </motion.section>
          ))}
        </div>

        <p
          className="mt-[72px] text-center font-['Source_Code_Pro'] text-[14px] tracking-[-0.07px]"
          style={{ color: dark ? "rgba(255,255,255,0.55)" : "#8a8a8d" }}
        >
          © Riddhi Kasar 2026
        </p>
      </div>
    </article>
  );
}
