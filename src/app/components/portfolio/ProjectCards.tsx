import { motion } from "motion/react";
import type { ProjectSlug } from "@/app/lib/projects";

function CardShell({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) {
  return (
    <motion.div
      className="relative w-full cursor-pointer overflow-hidden"
      style={{ aspectRatio: "666 / 393", backgroundImage: bg }}
      whileHover={{ scale: 1.025, boxShadow: "0 24px 48px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ── Digital cards (from Figma imports) ───────────────────────────────────────
import imgNoonchiApp from "@/imports/Digital/95541eb455ddb851528450af55faa4d4171c438b.png";
import imgNoonchiSide from "@/imports/Digital/2d6b895460842cff88be9c53ba0f79cb671c5be7.png";
import imgNoonchiLogo from "@/imports/Digital/3b8cbca68b3fccfa31ce929ebdb3add685f8eef3.png";
import imgRelevoDigApp from "@/imports/Digital/23033312e74893e586ea01ee31603f520037a260.png";
import imgRelevoScreen from "@/imports/Digital/2fd3a4a732b8b4478554c643e6ffdb7a8fded584.png";
import imgRelevoLogo from "@/imports/Digital/5558c1d085944c3a8172952a801891fe992da936.png";
import imgLiquidLogo from "@/imports/Digital/f317022bec5fbc61710ad0040ccbf4ace9d028d2.png";
import imgLiquidApp from "@/imports/Digital/0e1436329e782397790ffcdf9556c18974fbf160.png";
import imgLiquidBg from "@/imports/Digital/6ffd2bea351db4d1378131a147b4573d450ab954.png";
import imgWaterApp from "@/imports/Digital/18dc8c2798aa5dfebf0002cb92040771bb35fcc0.png";
import imgMapsMap from "@/imports/Digital/a586e92abf5d7b0642b96d918416d3a07dcc99a2.png";
import imgMapsLogoLight from "@/imports/Digital/af25c20df7b9655ec85d4cfb50d58f1907b51796.png";
import imgMapsLogoDark from "@/imports/DigitalDark/5470a47c59c6861b8f01cc1d0184a5108b121c40.png";

// ── Robotics cards ────────────────────────────────────────────────────────────
import imgTrod from "@/imports/Robotics/b49354f34237149f4fd713da17529c1bd743f93e.png";
import imgRelevoRobotUI from "@/imports/Robotics/a20880aa23805f18442876681045c484e17db83e.png";
import imgLiquidRobotics from "@/imports/Robotics/6835d9192181d7dd8a87e877b2e7b8a783cf2300.png";
import imgLinkProject from "@/imports/Robotics/fc63c53c6094c64f1ac35857ffd577e132d43d0c.png";
import imgEpicure from "@/imports/Robotics/ea92281c344e428c85fcf87dd8c0a79b38f87f2f.png";
import imgEpicureLogo from "@/imports/Robotics/de57e8ad56a4d30cd884d9cff7ff3a002553d824.png";

// ── Physical cards ────────────────────────────────────────────────────────────
import imgBionics from "@/imports/Physical/cec9d44c3fc214ade5f2eea2821814cd5eed6366.png";
import imgBionicsLogo1 from "@/imports/Physical/b5f0fe29241d80b0667073327a0e71c2bd26a79d.png";
import imgBionicsLogo2 from "@/imports/Physical/4493bfe082bbf440ecfbd0432bdf48d36e887db9.png";
import imgCycle from "@/imports/Physical/50d9203f801a8f5beb81a75fb9e26198590407ab.png";
import imgCycleLogo1 from "@/imports/Physical/cbfef8486e0ed3d7c6ae8526bb8de3ae5538f983.png";
import imgCycleLogo2 from "@/imports/Physical/8cfc5c16b26600c4b3f5fcbf3d18641a74279cd6.png";

const digitalGradients = {
  light: {
    noonchi: "linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(113,101,178) 214.64%)",
    relevo: "linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(124,173,253) 214.64%)",
    liquid: "linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(255,187,225) 214.64%)",
    water: "linear-gradient(160.189deg,rgb(255,255,255) 32.374%,rgb(131,21,234) 146.77%)",
    maps: "linear-gradient(171.114deg,rgb(248,250,252) 31.228%,rgb(30,215,96) 248.56%)",
  },
  dark: {
    noonchi: "linear-gradient(155.694deg,rgb(0,0,0) 21.458%,rgb(113,101,178) 92.497%)",
    relevo: "linear-gradient(164.475deg,rgb(0,0,0) 14.682%,rgb(124,173,253) 108.9%)",
    liquid: "linear-gradient(167.499deg,rgb(0,0,0) 13.163%,rgb(255,187,225) 154.09%)",
    water: "linear-gradient(168.161deg,rgb(0,0,0) 10.253%,rgb(131,21,234) 129.5%)",
    maps: "linear-gradient(181.242deg,rgb(0,0,0) 4.4572%,rgb(30,215,96) 214.91%)",
  },
};

export function ProjectCard({ slug, dark }: { slug: ProjectSlug; dark: boolean }) {
  const mode = dark ? "dark" : "light";
  const g = digitalGradients[mode];

  switch (slug) {
    case "noonchi":
      return (
        <CardShell bg={g.noonchi}>
          <div className="absolute rounded-[4px] pointer-events-none" style={{ left: "8.26%", top: "12.21%", width: "83.48%", height: "124.94%" }}>
            <img alt="Noonchi app" className="absolute inset-0 h-full w-full rounded-[4px] object-cover" src={imgNoonchiApp} />
            <div className="absolute inset-0 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.4)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <div className="absolute shadow-[-4px_0px_6px_0px_rgba(0,0,0,0.25)]" style={{ left: "76.88%", top: "31.81%", width: "21.32%", height: "57.51%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgNoonchiSide} />
          </div>
          <div className="absolute overflow-hidden" style={{ left: "93.39%", top: "3.05%", width: "4.80%", height: "7.63%" }}>
            <img alt="" className="absolute max-w-none pointer-events-none" style={{ height: "100.17%", left: "-19.57%", top: "-0.08%", width: "119.57%" }} src={imgNoonchiLogo} />
          </div>
        </CardShell>
      );
    case "relevo":
      return (
        <CardShell bg={g.relevo}>
          <div className="absolute rounded-[4px] pointer-events-none" style={{ left: "8.26%", top: "12.21%", width: "83.48%", height: "100.76%" }}>
            <img alt="Relevo app" className="absolute inset-0 h-full w-full rounded-[4px] object-cover" src={imgRelevoDigApp} />
            <div className="absolute inset-0 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.4)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <div className="absolute overflow-hidden" style={{ left: "71.77%", top: "21.88%", width: "33.33%", height: "75.06%" }}>
            <img alt="" className="absolute max-w-none pointer-events-none" style={{ height: "100%", left: "-51.06%", top: "0", width: "189.01%" }} src={imgRelevoScreen} />
          </div>
          <div className="absolute" style={{ left: "94.89%", top: "3.05%", width: "3.30%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgRelevoLogo} />
          </div>
        </CardShell>
      );
    case "liquid":
      return (
        <CardShell bg={g.liquid}>
          <div className="absolute" style={{ left: "-42.04%", top: "3.56%", width: "98.50%", height: "93.89%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgLiquidBg} />
          </div>
          <div className="absolute rounded-[4px] pointer-events-none" style={{ left: "27.33%", top: "12.21%", width: "63.06%", height: "78.63%" }}>
            <img alt="Liquid app" className="absolute inset-0 h-full w-full rounded-[4px] object-cover" src={imgLiquidApp} />
            <div className="absolute inset-0 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.4)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <div className="absolute" style={{ left: "93.39%", top: "3.05%", width: "4.80%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgLiquidLogo} />
          </div>
        </CardShell>
      );
    case "water":
      return (
        <CardShell bg={g.water}>
          <div className="absolute rounded-[4px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]" style={{ left: "50%", top: "12.21%", width: "87.69%", height: "83.72%", transform: "translateX(-50%)" }}>
            <img alt="Water app" className="absolute inset-0 h-full w-full rounded-[4px] object-cover" src={imgWaterApp} />
          </div>
        </CardShell>
      );
    case "maps":
      return (
        <CardShell bg={g.maps}>
          <div className="absolute flex items-center justify-center" style={{ left: "-70.57%", top: "-127.74%", width: "217.42%", height: "361.96%" }}>
            <div style={{ transform: "rotate(8.74deg)", width: "87.96%", height: "87.44%", position: "relative" }}>
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgMapsMap} />
            </div>
          </div>
          <div className="absolute" style={{ left: "78.53%", top: "3.05%", width: "19.67%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={dark ? imgMapsLogoDark : imgMapsLogoLight} />
          </div>
        </CardShell>
      );
    case "trod":
      return (
        <CardShell bg="linear-gradient(160.189deg,rgb(255,255,255) 32.374%,rgb(76,118,177) 146.77%)">
          <div className="absolute" style={{ left: "-5.26%", top: "0", width: "110.51%", height: "100%" }}>
            <img alt="Trod robot" className="absolute inset-0 h-full w-full object-cover" src={imgTrod} />
          </div>
        </CardShell>
      );
    case "relevo-robotics":
      return (
        <CardShell bg="linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(124,173,253) 214.64%)">
          <div className="absolute overflow-hidden" style={{ left: "-4.5%", right: "-47.9%", top: "calc(50% + 4.20%)", transform: "translateY(-50%)", aspectRatio: "2560/1574" }}>
            <img alt="Relevo robot UI" className="absolute inset-0 h-full w-full object-cover" src={imgRelevoRobotUI} />
          </div>
          <div className="absolute" style={{ left: "94.89%", top: "3.05%", width: "3.30%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgRelevoLogo} />
          </div>
        </CardShell>
      );
    case "liquid-robotics":
      return (
        <CardShell bg="linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(255,187,225) 214.64%)">
          <div className="absolute" style={{ left: "-12.16%", top: "-7.89%", width: "138.89%", height: "133.08%" }}>
            <img alt="Liquid robotics" className="absolute inset-0 h-full w-full object-cover" src={imgLiquidRobotics} />
          </div>
          <div className="absolute" style={{ left: "93.39%", top: "3.05%", width: "4.80%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgLiquidLogo} />
          </div>
        </CardShell>
      );
    case "link":
      return (
        <CardShell bg="linear-gradient(171.114deg,rgb(248,250,252) 31.228%,rgb(30,215,96) 248.56%)">
          <div className="absolute" style={{ left: "-5.26%", top: "0", width: "110.36%", height: "100%" }}>
            <img alt="Link project" className="absolute inset-0 h-full w-full object-cover" src={imgLinkProject} />
          </div>
        </CardShell>
      );
    case "epicure":
      return (
        <CardShell bg="linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(195,195,192) 214.64%)">
          <div className="absolute" style={{ left: "-5.41%", top: "0", width: "110.66%", height: "100%" }}>
            <img alt="Epicure" className="absolute inset-0 h-full w-full object-bottom" src={imgEpicure} />
          </div>
          <div className="absolute" style={{ left: "93.39%", top: "3.05%", width: "4.80%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgEpicureLogo} />
          </div>
        </CardShell>
      );
    case "bionics":
      return (
        <CardShell bg="linear-gradient(164.503deg,rgb(248,250,252) 17.183%,rgb(183,254,189) 214.64%)">
          <div className="absolute overflow-hidden" style={{ left: "-12.01%", top: "-9.16%", width: "123.87%", height: "118.58%" }}>
            <img alt="Bionics" className="absolute max-w-none pointer-events-none" style={{ height: "102.57%", left: "0.06%", top: "-1.26%", width: "99.98%" }} src={imgBionics} />
          </div>
          <div className="absolute" style={{ left: "88.89%", top: "3.05%", width: "3.45%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgBionicsLogo1} />
          </div>
          <div className="absolute overflow-hidden" style={{ left: "94.14%", top: "3.05%", width: "4.05%", height: "8.14%" }}>
            <img alt="" className="absolute max-w-none pointer-events-none" style={{ height: "146.35%", left: "-52.12%", top: "-21.2%", width: "208.61%" }} src={imgBionicsLogo2} />
          </div>
        </CardShell>
      );
    case "cycle":
      return (
        <CardShell bg="linear-gradient(160.189deg,rgb(255,255,255) 32.374%,rgb(255,111,80) 146.77%)">
          <div className="absolute rounded-[1px]" style={{ left: "calc(50% + 2.40%)", top: "0", width: "104.80%", height: "100%", transform: "translateX(-50%)" }}>
            <img alt="Cycle" className="absolute inset-0 h-full w-full rounded-[1px] object-cover" src={imgCycle} />
          </div>
          <div className="absolute" style={{ left: "85.28%", top: "3.05%", width: "6.16%", height: "8.14%" }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={imgCycleLogo1} />
          </div>
          <div className="absolute overflow-hidden" style={{ left: "93.24%", top: "3.05%", width: "4.95%", height: "8.14%" }}>
            <img alt="" className="absolute max-w-none pointer-events-none" style={{ height: "400.65%", left: "-8.63%", top: "-11.79%", width: "279.23%" }} src={imgCycleLogo2} />
          </div>
        </CardShell>
      );
    default:
      return null;
  }
}
