import svgPaths from "./svg-aj4z7obxpi";
import imgFrame2147237587 from "./d3e490f18a3fd716fe71a9632991d885c72ea5bb.png";

function Frame() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-[3.5px] mt-[5px] relative row-1 w-[7px]">
      <div className="bg-black h-[4px] relative shrink-0 w-[2px]" />
      <div className="bg-black h-[4px] relative shrink-0 w-[2px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#ffea00] col-1 ml-0 mt-0 relative row-1 size-[14px]" />
      <Frame />
    </div>
  );
}

function Bit() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[calc(50%+580px)] top-[362px] w-[98px]" data-name="bit_1">
      <Group />
      <p className="[word-break:break-word] font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffea00] text-[10px] whitespace-nowrap">Hello, World</p>
    </div>
  );
}

function LightMode() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="light_mode">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="light_mode">
          <mask height="24" id="mask0_1_451" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_451)">
            <path d={svgPaths.p1f0d78c0} fill="var(--fill-0, white)" id="light_mode_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Nav() {
  return (
    <nav className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0" data-name="nav">
      <a className="[word-break:break-word] flex flex-col font-['Source_Code_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[-0.07px] whitespace-nowrap" href="https://www.figma.com/design/xzeCxls6QtXnIMyId5wJ7P?node-id=457-3" target="_blank">
        <p className="[text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[1.45] underline">About</p>
      </a>
      <a className="[word-break:break-word] flex flex-col font-['Source_Code_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[-0.07px] whitespace-nowrap" href="https://www.figma.com/design/xzeCxls6QtXnIMyId5wJ7P?node-id=284-2" target="_blank">
        <p className="cursor-pointer leading-[1.45]">Work</p>
      </a>
      <LightMode />
    </nav>
  );
}

function Header() {
  return (
    <header className="absolute content-stretch flex items-center justify-between left-0 px-[42px] py-[12px] right-0 top-0" data-name="header">
      <a className="[word-break:break-word] block font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] text-white tracking-[-0.09px] uppercase whitespace-nowrap" href="https://www.figma.com/design/xzeCxls6QtXnIMyId5wJ7P?node-id=284-2" target="_blank">
        <p className="cursor-pointer leading-[1.45]">Riddhi Kasar</p>
      </a>
      <Nav />
    </header>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] text-white tracking-[-2.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal] text-[42px]">An</span>
        <span className="leading-[normal] text-[42px]">d I specialize in building</span>
      </p>
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="digital">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">Digital Interfaces</p>
      </div>
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[42px] text-white tracking-[-2.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        for
      </p>
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="robotics">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">Robotics</p>
      </div>
      <p className="[word-break:break-word] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[42px] text-white tracking-[-2.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        and
      </p>
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="physical">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">Physical Systems</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[116px] items-start left-[42px] top-[204px] w-[1356px]">
      <Frame3 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-full relative text-[0px] text-white tracking-[-2.1px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal] text-[42px]">{`shaping how `}</span>
        <span className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[42px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`humans `}</span>
        <span className="leading-[normal] text-[42px]">and</span>
        <span className="font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[42px]" style={{ fontVariationSettings: '"wdth" 100' }}>{` robots interact, communicate, and collaborate.`}</span>
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[42px] px-[123px] py-[88px] top-[400px] w-[1356px]">
      <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[221.85%] left-0 max-w-none top-[-67.7%] w-[139.8%]" src={imgFrame2147237587} />
      </div>
      <div className="[word-break:break-word] font-['Souliyo_Unicode:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-1.2px] whitespace-nowrap">
        <p className="mb-0 text-[24px] whitespace-pre">
          <span className="font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal]">{`I believe that `}</span>
          <span className="font-['Source_Code_Pro:SemiBold',sans-serif] font-semibold leading-[normal]">true depth comes from applying everything we know to everything we make.</span>
        </p>
        <p className="leading-[normal] mb-0 text-[24px] whitespace-pre">​</p>
        <p className="font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal] mb-0 text-[24px] whitespace-pre">The best artist is also an anatomist.</p>
        <p className="font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal] mb-0 text-[24px] whitespace-pre">The best marketer is also a neuroscientist.</p>
        <p className="font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal] mb-0 text-[24px] whitespace-pre">The best chef is also a chemist.</p>
        <p className="font-['Source_Code_Pro:SemiBold',sans-serif] font-semibold leading-[normal] text-[24px] whitespace-pre">And the best designer is also an engineer.</p>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[18px] items-center left-1/2 top-[929px]" data-name="menu">
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="digital">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">Copy Email</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="physical">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">LinkedIn</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[18px] py-[12px] relative rounded-[24px] shrink-0" data-name="robotics">
        <div aria-hidden className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
        <p className="[word-break:break-word] font-['Source_Code_Pro:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap">Instagram</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-[5px] mt-[2px] relative row-1 w-[7px]">
      <div className="bg-black h-[4px] relative shrink-0 w-[2px]" />
      <div className="bg-black h-[4px] relative shrink-0 w-[2px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#ffea00] col-1 ml-0 mt-0 relative row-1 size-[14px]" />
      <Frame1 />
    </div>
  );
}

function Bit1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-1/2 top-[calc(50%+501.5px)] w-[256px]" data-name="bit_5">
      <Group1 />
      <p className="[word-break:break-word] font-['Source_Code_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffea00] text-[10px] whitespace-nowrap">End of file. Awaiting human connection.</p>
    </div>
  );
}

export default function AboutDark() {
  return (
    <div className="bg-black relative size-full" data-name="about_dark">
      <Bit />
      <p className="[word-break:break-word] absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] left-[42px] text-[64px] text-white top-[calc(50%-458.5px)] tracking-[-3.2px] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[1.1]">{`I’m Riddhi - a Design Engineer from  `}</span>
        <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[1.1] underline" href="https://mde.harvard.edu/" style={{ fontVariationSettings: '"wdth" 100' }} target="_blank">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline" href="https://mde.harvard.edu/" style={{ fontVariationSettings: '"wdth" 100' }} target="_blank">
            Harvard
          </span>
        </a>
        <span className="leading-[1.1]"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden focusable={false}><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="3.2" strokeLinecap="butt" strokeLinejoin="miter"/><polyline points="8.5,4 20,4 20,15.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="butt" strokeLinejoin="miter"/></svg></span>
      </p>
      <Header />
      <Frame4 />
      <Frame2 />
      <p className="[word-break:break-word] absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[0] left-[calc(25%-318px)] text-[42px] text-white top-[836px] tracking-[-2.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Say hello or talk future projects: `}</span>
        <a className="[text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[normal] underline" href="mailto:iddhikasar02@gmail.com" target="_blank">
          <span className="[text-underline-position:from-font] decoration-from-font decoration-solid underline" href="mailto:iddhikasar02@gmail.com" target="_blank">
            riddhikasar02@gmail.com
          </span>
        </a>
        <span className="leading-[normal]"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden focusable={false}><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="3.2" strokeLinecap="butt" strokeLinejoin="miter"/><polyline points="8.5,4 20,4 20,15.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="butt" strokeLinejoin="miter"/></svg></span>
      </p>
      <Menu />
      <Bit1 />
    </div>
  );
}