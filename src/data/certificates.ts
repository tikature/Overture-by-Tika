export interface Certificate {
  issuer: string;
  title: string;
  description: string;
  year?: string;
  credentialId?: string;
  url?: string;
}

export const certificates: Certificate[] = [
  {
    issuer: "IBM",
    title: "Data Analyst Professional Certificate",
    description: "IBM Data Analyst Professional Certificate",
    year: "TODO",
  },
  {
    issuer: "Microsoft",
    title: "AI & ML Engineering Professional Certificate",
    description: "Microsoft AI & ML Engineering Professional Certificate",
    year: "TODO",
  },
  {
    issuer: "Google",
    title: "UX Design Professional Certificate",
    description: "Google UX Design Professional Certificate",
    year: "TODO",
  },
  {
    issuer: "Google",
    title: "IT Automation with Python Professional Certificate",
    description: "Google IT Automation with Python Professional Certificate",
    year: "TODO",
  },
];
