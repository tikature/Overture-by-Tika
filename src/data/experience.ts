export type ExperienceType = "work" | "organization";

export interface ExperienceEntry {
  type: ExperienceType;
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  stack: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    type: "work",
    role: "Computer Lab Assistant — Operating System",
    org: "Laboratorium Informatika, Telkom University",
    period: "Feb 2026 – Jul 2026",
    bullets: [
      "Led hands-on Operating Systems lab sessions for 50 students, covering process scheduling, memory management and file systems",
      "Mentored students through Linux-based programming assignments and helped struggling students pass lab assessments",
      "First-line technical support during practicums, troubleshooting environment and system issues to keep sessions running without downtime",
      "Evaluated and graded lab reports with individual feedback on code quality and OS concepts",
    ],
    stack: ["Linux", "VirtualBox"],
  },
  {
    type: "work",
    role: "Computer Lab Assistant — Web Design and Programming",
    org: "Laboratorium Informatika, Telkom University",
    period: "Sep 2025 – Jan 2026",
    bullets: [
      "Guided 90 students across 2 classes in applying core web development technologies",
      "Supported the delivery of 10 Web Design and Programming practicum sessions",
      "Assisted students with debugging and troubleshooting during lab sessions",
      "Prepared weekly lab materials, assignments and project assessments together with the lecturer",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    type: "work",
    role: "Web Developer Intern / Strategic Partnerships",
    org: "Oemah Website (CV Oemah Teknologi Indonesia)",
    location: "Purwokerto",
    period: "Jun 2025 – Jul 2025 (Intern) · Dec 2025 – Jun 2026 (Strategic Partnerships)",
    bullets: [
      "Managed a team of web developers to deliver customized web-based solutions for clients",
      "Managed workflows to complete projects on time and to quality standards",
      "Coordinated with clients to validate requirements and implement feedback",
      "Completed one web system project for a training and consulting client within 1 month",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    type: "work",
    role: "Cryptography and Information Security Intern",
    org: "Dinas Komunikasi dan Informatika Provinsi Kalimantan Selatan",
    location: "Banjarbaru",
    period: "Jan 2021 – Mar 2021",
    bullets: [
      "Led backend development of a security audit system for provincial government IT infrastructure using Laravel (PHP)",
      "Designed the frontend and backend architecture with role-based access control (RBAC)",
      "Assisted in data center maintenance: UTP cable structuring, server management and routine server health checks",
    ],
    stack: ["Laravel", "PHP"],
  },
  {
    type: "organization",
    role: "Member Empowerment Department",
    org: "HMSE (Software Engineering Student Association), Telkom University",
    period: "Jun 2023 – Jun 2024",
    bullets: [
      "Developed and ran member empowerment programs to grow soft and hard skills of SE students",
      "Event Committee Chairperson: LDK & Makrab SE 3.0 (90 participants, 40 committee members) and Software Engineering Iftar 2024 (100 participants, 50 committee members)",
      "Event Division Member: PELOSE (Software Engineering Sports Week) 2023 (300 students) and National Hybrid Seminar 2023 (300 participants)",
    ],
    stack: [],
  },
  {
    type: "organization",
    role: "External and Social Affairs Department",
    org: "HMSE, Telkom University",
    period: "Feb 2023 – Jun 2023",
    bullets: [
      "Liaison officer for PERMIKOMNAS Central Java Region VII",
      "Master of Ceremony for inter-association comparative study events",
    ],
    stack: [],
  },
];

export function getExperiencesByType(type: ExperienceType): ExperienceEntry[] {
  return experiences.filter((e) => e.type === type);
}