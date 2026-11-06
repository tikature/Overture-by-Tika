export interface Certificate {
  issuer: string;
  title: string;
  description: string;
  year: string;
  credentialId: string;
  featured: boolean;
  url?: string;
}

export const certificates: Certificate[] = [
  {
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    title: "Junior Web Developer",
    description: "Junior Web Developer",
    year: "Jun 2022",
    credentialId: "62090 2513 0026604 2022",
    featured: true,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft AI & ML Engineering Professional Certificate",
    description: "Microsoft AI & ML Engineering Professional Certificate",
    year: "Aug 2026",
    credentialId: "281127AISLAD",
    featured: true,
  },
  {
    issuer: "Google",
    title: "Google Advanced Data Analytics Professional Certificate",
    description: "Google Advanced Data Analytics Professional Certificate",
    year: "Aug 2026",
    credentialId: "9333K6W2212W",
    featured: true,
  },
  {
    issuer: "IBM",
    title: "IBM Project Manager Professional Certificate",
    description: "IBM Project Manager Professional Certificate",
    year: "Aug 2026",
    credentialId: "USWY4NEG2PS",
    featured: true,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft Enterprise AI Governance, Ethics & Security Specialization",
    description: "Microsoft Enterprise AI Governance, Ethics & Security Specialization",
    year: "Aug 2026",
    credentialId: "ALHKLWKZRACO",
    featured: true,
  },
  {
    issuer: "Google",
    title: "Google UX Design Professional Certificate",
    description: "Google UX Design Professional Certificate",
    year: "Aug 2026",
    credentialId: "HSQOTLHFROTO",
    featured: true,
  },
  {
    issuer: "Dicoding Indonesia",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    description: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    year: "Sep 2026",
    credentialId: "JMZVLDOROXNS",
    featured: false,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft 365 and Agent Administration Professional Certificate",
    description: "Microsoft 365 and Agent Administration Professional Certificate",
    year: "Sep 2026",
    credentialId: "BOMINRJOJKVA",
    featured: false,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft Junior QA/Software Tester Professional Certificate",
    description: "Microsoft Junior QA/Software Tester Professional Certificate",
    year: "Sep 2026",
    credentialId: "LITEZ2Z22153",
    featured: false,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft Purpose Driven Leadership Professional Certificate",
    description: "Microsoft Purpose Driven Leadership Professional Certificate",
    year: "Sep 2026",
    credentialId: "3253152 CD54",
    featured: false,
  },
  {
    issuer: "Google",
    title: "Google Project Management: Professional Certificate",
    description: "Google Project Management: Professional Certificate",
    year: "Sep 2026",
    credentialId: "VDTOVITESLAV",
    featured: false,
  },
  {
    issuer: "IBM",
    title: "Generative AI for Executives and Business Leaders Specialization",
    description: "Generative AI for Executives and Business Leaders Specialization",
    year: "Aug 2026",
    credentialId: "BVSWXF58Y53",
    featured: false,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft Go-To-Market Strategy Professional Certificate",
    description: "Microsoft Go-To-Market Strategy Professional Certificate",
    year: "Aug 2026",
    credentialId: "FWPSARLTEDSA",
    featured: false,
  },
  {
    issuer: "IBM",
    title: "IBM Data Analyst Professional Certificate",
    description: "IBM Data Analyst Professional Certificate",
    year: "Aug 2026",
    credentialId: "LUAN1877PNV2F",
    featured: false,
  },
  {
    issuer: "Microsoft",
    title: "Microsoft UX Design Professional Certificate",
    description: "Microsoft UX Design Professional Certificate",
    year: "Aug 2025",
    credentialId: "BEAUVTZNW4MX",
    featured: false,
  },
  {
    issuer: "Google",
    title: "Google IT Automation with Python",
    description: "Google IT Automation with Python",
    year: "Aug 2026",
    credentialId: "LRPW46150590",
    featured: false,
  },
  {
    issuer: "Google",
    title: "Google Data Analytics Professional Certificate",
    description: "Google Data Analytics Professional Certificate",
    year: "Aug 2026",
    credentialId: "R7QSJAGHEUKN",
    featured: false,
  },
];

export const featuredCertificates = certificates.filter((c) => c.featured);
export const moreCertificates = certificates.filter((c) => !c.featured);
export const linkedInCertificationsUrl =
  "https://www.linkedin.com/in/dewi-atika-muthi/details/certifications/";