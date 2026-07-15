export type WorkTab = "all" | "digital" | "robotics" | "physical";

export type ProjectSlug =
  | "noonchi"
  | "relevo"
  | "liquid"
  | "water"
  | "maps"
  | "trod"
  | "relevo-robotics"
  | "liquid-robotics"
  | "link"
  | "epicure"
  | "bionics"
  | "cycle";

export const projectRoutes: Record<ProjectSlug, string> = {
  noonchi: "/work/noonchi",
  relevo: "/work/relevo",
  liquid: "/work/liquid",
  water: "/work/water",
  maps: "/work/maps",
  trod: "/work/trod",
  "relevo-robotics": "/work/relevo-robotics",
  "liquid-robotics": "/work/liquid-robotics",
  link: "/work/link",
  epicure: "/work/epicure",
  bionics: "/work/bionics",
  cycle: "/work/cycle",
};

export const tabBitText: Record<WorkTab, string[]> = {
  all: ["Everything, always,", "all at once."],
  digital: ["I dream in pixels when", "you're not looking."],
  robotics: ["Is this the future you", "calculated?"],
  physical: ["Nature is just code.", "Function is not enough."],
};

export const digitalProjects: ProjectSlug[] = ["noonchi", "liquid", "relevo", "water"];
export const roboticsProjects: ProjectSlug[] = ["trod", "relevo-robotics", "liquid-robotics", "link", "epicure"];
export const physicalProjects: ProjectSlug[] = ["epicure", "bionics", "cycle", "relevo-robotics"];

export const allProjects: ProjectSlug[] = [
  "noonchi",
  "trod",
  "bionics",
  "relevo",
  "relevo-robotics",
  "liquid",
  "liquid-robotics",
  "link",
  "water",
  "epicure",
  "maps",
  "cycle",
];

export function projectsForTab(tab: WorkTab): ProjectSlug[] {
  if (tab === "digital") return digitalProjects;
  if (tab === "robotics") return roboticsProjects;
  if (tab === "physical") return physicalProjects;
  return allProjects;
}
