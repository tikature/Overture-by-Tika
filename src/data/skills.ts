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
      { name: "HTML & CSS", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "React / Next.js", level: "Proficient" },
      { name: "TypeScript", level: "Proficient" },
      { name: "Tailwind CSS", level: "Proficient" },
      { name: "Vue.js", level: "Familiar" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Laravel / PHP", level: "Advanced" },
      { name: "Node.js", level: "Proficient" },
    ],
  },
  {
    name: "Mobile",
    skills: [{ name: "Flutter / Dart", level: "Proficient" }],
  },
  {
    name: "Quality & Data",
    skills: [
      { name: "Software QA", level: "Proficient" },
      { name: "Python", level: "Proficient" },
      { name: "Data Analysis", level: "Familiar" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Troubleshooting & Technical Support", level: "Advanced" },
      { name: "Git", level: "Proficient" },
      { name: "Figma / UX Design", level: "Proficient" },
      { name: "Linux & VirtualBox", level: "Proficient" },
      { name: "Maze", level: "Familiar" },
    ],
  },
];

export const techEnsembleChips = [
  "React JS",
  "Vue JS",
  "Tailwind CSS",
  "Next JS",
  "TypeScript",
  "Node JS",
  "Laravel",
  "PHP",
  "Flutter",
  "Python",
];