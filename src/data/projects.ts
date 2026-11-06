export type ProjectCategory = "web" | "mobile" | "ai";

export interface Project {
  slug: string;
  act: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  role: string;
  problem: string;
  solution: string;
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  preview?: string;
}

export const projects: Project[] = [
  {
    slug: "validly",
    act: "Act I",
    title: "Validly",
    tagline: "Multi-tenant certificate generation and verification platform",
    description:
      "End-to-end web platform for digital certificate generation with QR code verification, designed to scale into a B2B Software-as-a-Service product. Built as my undergraduate thesis for the client CV. Oemah Website Purwokerto.",
    category: "web",
    stack: ["Laravel"],
    role: "Full-Stack Developer",
    problem:
      "Organizations need a scalable, multi-tenant platform to generate and verify digital certificates with QR codes, replacing manual paper-based processes.",
    solution:
      "Built a Laravel-based web platform with multi-tenancy, QR code generation and verification, and a B2B SaaS architecture ready for commercialization.",
    highlights: [
      "Officially registered computer-program copyright (Reg. No. 001273151, Directorate General of Intellectual Property, Ministry of Law of the Republic of Indonesia, June 2026)",
      "QR-based certificate verification",
      "Multi-tenant architecture ready for commercialization as B2B SaaS",
    ],
    liveUrl: "https://thevalidly.com",
    repoUrl: undefined,
    featured: true,
  },
  {
    slug: "ayopilih",
    act: "Act II",
    title: "AyoPilih",
    tagline: "Multi-tenant SaaS e-voting platform",
    description:
      "Multi-tenant SaaS e-voting platform for Indonesian schools and organizations.",
    category: "web",
    stack: [],
    role: "Full-Stack Developer",
    problem: "",
    solution: "",
    highlights: [],
    liveUrl: "https://ayopilih.site",
    repoUrl: "https://github.com/tikature/AyoPilih",
    featured: true,
  },
  {
    slug: "go-attendance",
    act: "Act III",
    title: "Go Attendance",
    tagline: "Flutter teacher attendance app with GPS geofencing",
    description:
      "Flutter teacher attendance app with GPS geofencing and face detection.",
    category: "mobile",
    stack: ["Flutter"],
    role: "Mobile Developer",
    problem: "",
    solution: "",
    highlights: [],
    liveUrl: undefined,
    repoUrl: undefined,
    featured: true,
  },
  {
    slug: "pemira-telu",
    act: "Act IV",
    title: "Pemira-Telu",
    tagline: "Digital student election system",
    description:
      "Digital student election system with a Flutter mobile app and a Next.js admin dashboard.",
    category: "web",
    stack: ["Flutter", "Next.js"],
    role: "Full-Stack Developer",
    problem: "",
    solution: "",
    highlights: [],
    liveUrl: undefined,
    repoUrl: undefined,
    featured: true,
  },
  {
    slug: "overture",
    act: "Act V",
    title: "Overture by Atika",
    tagline: "An opera-orchestra themed portfolio",
    description:
      "This portfolio: an opera-orchestra themed stage for code.",
    category: "web",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    role: "Frontend Developer",
    problem:
      "Create a theatrical, memorable portfolio that showcases engineering skills through an opera house metaphor.",
    solution:
      "Built with Next.js 15 App Router, Tailwind v4, Framer Motion, and custom design tokens. Features ambient stage atmosphere, floating card suits, typing effects, and accessible animations respecting prefers-reduced-motion.",
    highlights: [
      "Custom Tailwind v4 theme with design tokens from Stitch export",
      "Ambient stage with glows, embers, and 16 floating suits",
      "Typing effect with CLS prevention",
      "Responsive: 360px–1440px+, Lighthouse targets ≥90",
    ],
    liveUrl: undefined,
    repoUrl: undefined,
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAllProjects(): Project[] {
  return projects.filter((p) => p.featured);
}