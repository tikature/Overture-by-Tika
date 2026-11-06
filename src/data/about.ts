export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface AboutData {
  eyebrow: string;
  title: { before: string; accent: string };
  lead: string;
  bio: string;
  currently: string;
  stats: AboutStat[];
  principles: Principle[];
  archCaption: string;
}

export const aboutData: AboutData = {
  eyebrow: "PROSCENIUM & VISION",
  title: { before: "The Story Behind ", accent: "the Stage" },
  lead: "Years of conducting complex frontend architectures as a dramatic theatrical overture. Every layout is a stage, every interaction a cue, and every release an ovation.",
  bio: "Software Engineering graduate of Telkom University Purwokerto (GPA 3.90/4.00) who builds end-to-end web applications and mobile apps. I work across JavaScript, React, Next.js, Node.js, Laravel and Flutter, with a background in software quality assurance, IT security and technical mentoring.",
  currently: "Open to full-time opportunities as a Software Engineer.",
  stats: [
    { value: 5, suffix: "+", label: "Years on Stage" },
    { value: 5, suffix: "", label: "Productions Staged" },
    { value: 140, suffix: "+", label: "Apprentices Mentored" },
    { value: 17, suffix: "", label: "Laurels Earned" },
  ],
  principles: [
    {
      title: "Directing the Interaction",
      description:
        "Treating user journeys as scripted scenes where visual hierarchy, fluid micro-interactions, and flawless speed deliver undeniable drama.",
    },
    {
      title: "Stagecraft & Precision",
      description:
        "Behind the velvet curtains lies rigorous engineering: maintainable component architecture, strict type safety, and impeccable performance standards.",
    },
  ],
  archCaption: "OPÉRA GARNIER • STAGECRAFT & MASTERY",
};