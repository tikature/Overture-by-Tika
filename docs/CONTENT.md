# CONTENT — single source for all copy & data

Rules: Turn this into typed data in `src/data/*` (and the EN/ID message files). Never put HTML or class names in data. Never invent facts. Anything not stated here stays hidden or uses the stated fallback. Sources: `private/cv.pdf` and `private/linkedin.pdf` (already summarized below; do not copy anything else from them).

PRIVACY (hard rule): never write the phone number, home address, date of birth or any ID number from the CV into code, content, metadata, JSON-LD or commits. Public contact = email, GitHub, LinkedIn, Instagram, TikTok only.

## site.ts

- brand: "Overture by Atika"
- fullName: "Dewi Atika Muthi"
- displayName: "Tika"
- title: "Fullstack Developer • Software Engineer"
- roles (typing): "Digital Stages", "Frontend Experiences", "Component Architecture", "Web Choreography"
- tagline: "Orchestrating Software Engineer"
- description: "Fullstack Developer & Software Engineer crafting modern, robust, and high-performance web applications. Blending the theatrical majesty and meticulous aesthetic of the grand opera house with rigorous engineering, scalable component architecture, and fluid web choreography."
- email: detikaa10@gmail.com
- github: https://github.com/tikature
- linkedin: https://www.linkedin.com/in/dewi-atika-muthi/
- instagram: https://instagram.com/tikature
- tiktok: https://www.tiktok.com/@sze1ch
- location: "Purwokerto, Central Java, Indonesia"
- resume: "/resume/Dewi-Atika-Muthi-CV.pdf"
- availability: "Open to opportunities"
- siteUrl: from `NEXT_PUBLIC_SITE_URL`
- footerNote: "Composed in Dark Burgundy, Vintage Burgundy, and Refined Cream"

## About

- eyebrow: "PROSCENIUM & VISION" · title: "The Story Behind _the Stage_" (render the accent word in JSX, store as `{ before, accent }`)
- lead: "Years of conducting complex frontend architectures as a dramatic theatrical overture. Every layout is a stage, every interaction a cue, and every release an ovation."
- bio: "Software Engineering graduate of Telkom University Purwokerto (GPA 3.90/4.00) who builds end-to-end web applications and mobile apps. I work across JavaScript, React, Next.js, Node.js, Laravel and Flutter, with a background in software quality assurance, IT security and technical mentoring."
- currently: "Open to full-time opportunities as a Software Engineer."
- stats (real numbers; animate count-up; shape `{ value, suffix, label }`):
  - "Years on Stage" — 5+ (first professional role: Jan 2021)
  - "Productions Staged" — 5 (number of projects in Productions)
  - "Apprentices Mentored" — 140+ (50+ OS lab + 90+ web lab students)
  - "Laurels Earned" — 17 (certificates and licenses)
- principles:
  1. "Directing the Interaction" — "Treating user journeys as scripted scenes where visual hierarchy, fluid micro-interactions, and flawless speed deliver undeniable drama."
  2. "Stagecraft & Precision" — "Behind the velvet curtains lies rigorous engineering: maintainable component architecture, strict type safety, and impeccable performance standards."
- caption under arch illustration: "OPÉRA GARNIER • STAGECRAFT & MASTERY"

## Technical Ensemble chips

React JS, Vue JS, Tailwind CSS, Next JS, TypeScript, Node JS, Laravel, PHP, Flutter, Python

## Productions (projects.ts)

GitHub is the source of truth; curated data only enriches existing repos. Unmatched curated entries are ignored.

1. **Act I: Validly** — slug `thevalidly` — category web — "Multi-tenant certificate generation and verification platform."
   - description: "End-to-end web platform for digital certificate generation with QR code verification, designed to scale into a B2S SaaS..."
   - stack: Laravel (add other stack only if confirmed in the public repo/README)
   - highlights: ...
   - liveUrl: https://thevalidly.com
2. **Act II: AyoPilih** — slug `AyoPilih` — category web — "Multi-tenant SaaS e-voting platform for Indonesian schools and organizations."
   - liveUrl: https://ayopilih.site
3. **Act V: Overture by Atika** — slug `Overture-by-Tika` — category web — "An opera-orchestra themed portfolio."
   - stack: Next.js, React, TypeScript, Tailwind CSS, Motion
   - repoUrl: add only if a public repo named like the project exists under github.com/tikature

(Stitch placeholder acts … are NOT real projects.)
      Case-study sections (per project; hide any block with no data): "The Premiere" (overview) · "The Score" (problem) · "The Performance" (solution & key features) · "The Ensemble" (stack & role) · "Curtain Call" (outcome/links).

### Auto-discovery from GitHub
Additional projects are automatically discovered from the GitHub user's public repositories (see `docs/GITHUB-PROJECTS.md`). Only repos with a valid HTTPS `homepage`, not forked/archived/private, and not excluded via `GITHUB_EXCLUDE` are considered. Curated entries in `src/data/projects.ts` always take precedence; unmatched repos become “auto cards” with generated act numbers, guessed categories, and no case-study page.

## Repertoire

**Education**

- Telkom University, Purwokerto, Indonesia — Bachelor of Software Engineering (S.Kom) — Sep 2022 – Aug 2026 — GPA 3.90/4.00
  - Focus: quality assurance, programming and web development, UI/UX, computer networking
  - Member of Software Engineering Student Association (HMSE); secretary of Modern Dance Student Unit
- SMK Telkom Banjarbaru, Indonesia — Software Engineering major — Jul 2019 – Jun 2022 — Average score 88
  - Web-focused software engineering and computer networking fundamentals
  - Student Council (OSIS) member; secretary of the dance club

**Skills** (levels are proposed from the CV; edit freely. Show a text label next to each bar: Advanced / Proficient / Familiar)

- Frontend: React / Next.js (Proficient), TypeScript (Proficient), Tailwind CSS (Proficient), Vue.js (Familiar), HTML & CSS (Advanced), JavaScript (Advanced)
- Backend: Laravel / PHP (Advanced), Node.js (Proficient)
- Mobile: Flutter / Dart (Proficient)
- Quality & Data: Software QA — manual and exploratory testing (Proficient), Python (Proficient), Data analysis (Familiar)
- Tools: Git (Proficient), Figma / UX design (Proficient), Maze (Familiar), Linux & VirtualBox (Proficient), Troubleshooting & technical support (Advanced)

## Experience (The Journey)

Timeline of `{ type: "work" | "organization", role, org, period, bullets[], stack[] }`, newest first. Show a small toggle or tags "Work" / "Organizations".

**Work**

1. Computer Lab Assistant — Operating System · Laboratorium Informatika, Telkom University · Feb 2026 – Jul 2026
   - Led hands-on Operating Systems lab sessions for 50+ students, covering process scheduling, memory management and file systems
   - Mentored students through Linux-based programming assignments and helped struggling students pass lab assessments
   - First-line technical support during practicums, troubleshooting environment and system issues to keep sessions running without downtime
   - Evaluated and graded lab reports with individual feedback on code quality and OS concepts
   - stack: Linux, VirtualBox
2. Computer Lab Assistant — Web Design and Programming · Laboratorium Informatika, Telkom University · Sep 2025 – Jan 2026
   - Guided 90+ students across 2 classes in applying core web development technologies
   - Supported the delivery of 10+ Web Design and Programming practicum sessions
   - Assisted students with debugging and troubleshooting during lab sessions
   - Prepared weekly lab materials, assignments and project assessments together with the lecturer
   - stack: HTML, CSS, JavaScript
3. Oemah Website (CV Oemah Teknologi Indonesia) — Web Developer Intern (Jun 2025 – Jul 2025) and Strategic Partnerships (Dec 2025 – Jun 2026) · Purwokerto
   - Managed a team of web developers to deliver customized web-based solutions for clients
   - Managed workflows to complete projects on time and to quality standards
   - Coordinated with clients to validate requirements and implement feedback
   - Completed one web system project for a training and consulting client within 1 month
   - stack: HTML, CSS, JavaScript
4. Cryptography and Information Security Intern — Dinas Komunikasi dan Informatika Provinsi Kalimantan Selatan · Banjarbaru · Jan 2021 – Mar 2021
   - Led backend development of a security audit system for provincial government IT infrastructure using Laravel (PHP)
   - Designed the frontend and backend architecture with role-based access control (RBAC)
   - Assisted in data center maintenance: UTP cable structuring, server management and routine server health checks
   - stack: Laravel, PHP

**Organizations**

1. HMSE (Software Engineering Student Association), Telkom University — Member Empowerment Department · Jun 2023 – Jun 2024
   - Developed and ran member empowerment programs to grow soft and hard skills of SE students
   - Event Committee Chairperson: LDK & Makrab SE 3.0 (90+ participants, 40+ committee members) and Software Engineering Iftar 2024 (100+ participants, 50+ committee members)
   - Event Division Member: PELOSE (Software Engineering Sports Week) 2023 (300+ students) and National Hybrid Seminar 2023 (300+ participants)
2. HMSE, Telkom University — External and Social Affairs Department · Feb 2023 – Jun 2023
   - Liaison officer for PERMIKOMNAS Central Java Region VII
   - Master of Ceremony for inter-association comparative study events

## Laurels (certificates)

Show 6 featured as cards, then a compact "More credentials" list for the rest, and a link "View all on LinkedIn" (https://www.linkedin.com/in/dewi-atika-muthi/details/certifications/). Description: one generic line from the title, nothing invented. Show credential ID in small text. No verification URLs are known, so hide the "Verify" button.

Featured:

1. Junior Web Developer — Badan Nasional Sertifikasi Profesi (BNSP) · Jun 2022 · ID 62090 2513 0026604 2022
2. Microsoft AI & ML Engineering Professional Certificate — Microsoft · Aug 2026 · ID 281127AISLAD
3. Google Advanced Data Analytics Professional Certificate — Google · Aug 2026 · ID 9333K6W2212W
4. IBM Project Manager Professional Certificate — IBM · Aug 2026 · ID USWY4NEG2PS
5. Microsoft Enterprise AI Governance, Ethics & Security Specialization — Microsoft · Aug 2026 · ID ALHKLWKZRACO
6. Google UX Design Professional Certificate — Google · Aug 2026 · ID HSQOTLHFROTO

More credentials:

- Membangun Aplikasi Gen AI dengan Microsoft Azure — Dicoding Indonesia · Sep 2026 · JMZVLDOROXNS
- Microsoft 365 and Agent Administration Professional Certificate — Microsoft · Sep 2026 · BOMINRJOJKVA
- Microsoft Junior QA/Software Tester Professional Certificate — Microsoft · Sep 2026 · LITEZ2Z22153
- Microsoft Purpose Driven Leadership Professional Certificate — Microsoft · Sep 2026 · 3253152 CD54
- Google Project Management: Professional Certificate — Google · Sep 2026 · VDTOVITESLAV
- Generative AI for Executives and Business Leaders Specialization — IBM · Aug 2026 · BVSWXF58Y53
- Microsoft Go-To-Market Strategy Professional Certificate — Microsoft · Aug 2026 · FWPSARLTEDSA
- IBM Data Analyst Professional Certificate — IBM · Aug 2026 · LUAN1877PNV2F
- Microsoft UX Design Professional Certificate — Microsoft · Aug 2025 · BEAUVTZNW4MX
- Google IT Automation with Python — Google · Aug 2026 · LRPW46150590
- Google Data Analytics Professional Certificate — Google · Aug 2026 · R7QSJAGHEUKN

## Reviews

testimonials: [] — hide the section and its nav link while empty.

## Contact

- eyebrow "BACKSTAGE INQUIRIES & COMMISSION" · title "Send a Dispatch _to the Maestro_"
- sub: "Commission a premier digital stage, propose a principal engineering engagement, or discuss an artistic collaboration."
- labels/placeholders: "Your Name / Title", "Your Correspondence Email", "Production Scope / Subject", "The Overture / Message"; submit "Send Dispatch ✉"
- success: "Your dispatch has reached the stage. I will reply soon." · error: "The dispatch could not be delivered. Please email me directly."
- location line: "Purwokerto, Central Java, Indonesia"

## SEO

- title default: "Overture by Atika — Fullstack Developer & Software Engineer"
- description: "Portfolio of Dewi Atika Muthi — frontend and full-stack engineer building web and mobile apps with Next.js, React, TypeScript, Laravel and Flutter."
- keywords: frontend developer, software engineer, Next.js, React, TypeScript, Flutter, Laravel, portfolio, Indonesia
- JSON-LD Person: name, jobTitle, url, email, sameAs [github, linkedin, instagram, tiktok], alumniOf Telkom University, address locality "Purwokerto" (no phone, no street address)
