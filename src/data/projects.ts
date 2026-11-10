export type ProjectCategory = "web" | "mobile" | "ai";

export interface Project {
  slug: string;
  act?: string;
  title: string;
  title_id?: string;
  tagline: string;
  tagline_id?: string;
  description: string;
  description_id?: string;
  category: ProjectCategory;
  stack: string[];
  role: string;
  role_id?: string;
  problem: string;
  problem_id?: string;
  solution: string;
  solution_id?: string;
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  preview?: string;
  order?: number;
}

export const projects: Project[] = [
  {
    slug: "thevalidly",
    order: 1,
    title: "Validly",
    tagline: "Multi-tenant certificate generation and verification platform",
    description:
      "End-to-end web platform for digital certificate generation with QR code verification, designed to scale into a B2B Software-as-a-Service product. Built as my undergraduate thesis for the client CV. Oemah Website Purwokerto.",
    description_id:
      "Platform web end-to-end untuk pembuatan sertifikat digital dengan verifikasi QR code, dirancang untuk menskalakan menjadi produk Software-as-a-Service B2B. Dibangun sebagai tugas akhir sarjana untuk klien CV. Oemah Website Purwokerto.",
    category: "web",
    stack: ["Laravel"],
    role: "Full-Stack Developer",
    problem:
      "Organizations need a scalable, multi-tenant platform to generate and verify digital certificates with QR codes, replacing manual paper-based processes.",
    problem_id:
      "Organisasi membutuhkan platform multi-tenant yang skalabel untuk membuat dan memverifikasi sertifikat digital dengan kode QR, menggantikan proses manual berbasis kertas.",
    solution:
      "Built a Laravel-based web platform with multi-tenancy, QR code generation and verification, and a B2B SaaS architecture ready for commercialization.",
    solution_id:
      "Membangun platform web berbasis Laravel dengan multi-tenancy, pembuatan dan verifikasi kode QR, serta arsitektur B2B SaaS yang siap dikomersialkan.",
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
    slug: "AyoPilih",
    order: 2,
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
    slug: "Overture-by-Tika",
    order: 3,
    title: "Overture by Atika",
    tagline: "An opera-orchestra themed portfolio",
    description:
      "This portfolio: an opera-orchestra themed stage for code.",
    category: "web",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    role: "Fullstack Developer",
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