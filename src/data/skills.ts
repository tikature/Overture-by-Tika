export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "Advanced" | "Proficient" | "Familiar";
  icon?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: "Advanced" },
      { name: "Vue.js", level: "Proficient" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Laravel / PHP", level: "Proficient" },
      { name: "Node.js", level: "Familiar" },
    ],
  },
  {
    name: "Mobile",
    skills: [{ name: "Flutter", level: "Proficient" }],
  },
  {
    name: "AI / ML & Data",
    skills: [
      { name: "ML Integration", level: "Familiar" },
      { name: "Data Analysis (Python)", level: "Familiar" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "Figma / UX", level: "Familiar" },
    ],
  },
];

export const techEnsembleChips = [
  "React JS",
  "Vue JS",
  "Tailwind CSS",
  "Next JS",
  "TypeScript",
  "Laravel",
  "PHP",
  "Flutter",
  "Python",
];