export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa?: string;
  details?: string[];
}

export const education: Education[] = [
  {
    institution: "Telkom University",
    degree: "Bachelor of Software Engineering (S.Kom)",
    location: "Purwokerto, Indonesia",
    period: "Sep 2022 – Aug 2026",
    gpa: "3.90/4.00",
    details: [
      "Focus: quality assurance, programming and web development, UI/UX, computer networking",
      "Member of Software Engineering Student Association (HMSE); secretary of Modern Dance Student Unit",
    ],
  },
  {
    institution: "SMK Telkom Banjarbaru",
    degree: "Software Engineering major",
    location: "Banjarbaru, Indonesia",
    period: "Jul 2019 – Jun 2022",
    gpa: "Average score 88",
    details: [
      "Web-focused software engineering and computer networking fundamentals",
      "Student Council (OSIS) member; secretary of the dance club",
    ],
  },
];