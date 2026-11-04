# CONTENT — single source for all copy & data

Rules: Turn this into typed data in `src/data/*`. Items marked `TODO(user)` are placeholders — render the fallback text, never invent facts, and list every remaining TODO in your end-of-phase summary. Items marked `VERIFY` are seeded from earlier info and should be shown as-is but flagged in the summary.

## site.ts
- brand: "Overture by Atika"
- fullName: "Dewi Atika Muthi"
- displayName: "Tika"
- title: "Frontend Developer • Software Engineer"
- roles (typing): "Digital Stages", "Frontend Virtuoso", "Software Engineer", "Component Architect"
- tagline: "Orchestrating Software Engineer"
- description: "Frontend Developer & Software Engineer crafting modern, robust, and high-performance web applications. Blending the theatrical majesty and meticulous aesthetic of the grand opera house with rigorous engineering, scalable component architecture, and fluid web choreography."
- email: detikaa10@gmail.com
- github: https://github.com/tikature
- linkedin: https://www.linkedin.com/in/dewi-atika-muthi/
- instagram: TODO(user) — hide icon if empty
- tiktok: TODO(user) — hide icon if empty
- location: TODO(user) — fallback "Indonesia"
- resume: /resume/Dewi-Atika-Muthi-CV.pdf
- availability: "Open to opportunities"
- siteUrl: from `NEXT_PUBLIC_SITE_URL`
- footerNote: "Composed in Dark Burgundy, Vintage Burgundy, and Refined Cream"

## About
- eyebrow: "PROSCENIUM & VISION" · title: "The Story Behind *the Stage*"
- lead: "Years of conducting complex frontend architectures as a dramatic theatrical overture. Every layout is a stage, every interaction a cue, and every release an ovation."
- bio (extra paragraph): TODO(user) — fallback: "Software Engineering graduate who builds across web (Laravel/PHP, Next.js), mobile (Flutter), and AI/ML integration." VERIFY
- stats (TODO(user): replace with real numbers; keep labels): 
  - "Years on Stage" — TODO(user) (Stitch placeholder 3+)
  - "Productions Staged" — TODO(user) (Stitch placeholder 50+) — suggest counting real projects instead
  - "Standing Ovations" — TODO(user) (Stitch placeholder 20+)
  - "Backstage Readiness" — 24/7
- principles:
  1. "Directing the Interaction" — "Treating user journeys as scripted scenes where visual hierarchy, fluid micro-interactions, and flawless speed deliver undeniable drama."
  2. "Stagecraft & Precision" — "Behind the velvet curtains lies rigorous engineering: maintainable component architecture, strict type safety, and impeccable performance standards."
- caption under arch illustration: "OPÉRA GARNIER • STAGECRAFT & MASTERY"

## Technical Ensemble chips
React JS, Vue JS, Tailwind CSS, Next JS, TypeScript, Laravel, PHP, Flutter, Python (VERIFY: remove any she does not want to show)

## Productions (projects.ts) — VERIFY all; add real links/screenshots later
Type: `{ slug, act, title, tagline, description, category: "web"|"mobile"|"ai", stack[], role, problem, solution, highlights[], liveUrl?, repoUrl?, featured, preview }`
1. **Act I: Validly** — slug `validly` — category web — "Multi-tenant certificate generation and verification platform." Undergraduate thesis project; client CV. Oemah Website Purwokerto. liveUrl: https://thevalidly.com (VERIFY). stack: TODO(user) · highlights: TODO(user)
2. **Act II: AyoPilih** — slug `ayopilih` — category web — "Multi-tenant SaaS e-voting platform for Indonesian schools and organizations." stack/links: TODO(user)
3. **Act III: Go Attendance** — slug `go-attendance` — category mobile — "Flutter teacher attendance app with GPS geofencing and face detection." stack: Flutter (+ TODO(user))
4. **Act IV: Pemira-Telu** — slug `pemira-telu` — category web+mobile — "Digital student election system with a Flutter mobile app and a Next.js admin dashboard." stack: Flutter, Next.js (+ TODO(user))
5. **Act V: Overture by Atika** — slug `overture` — category web — "This portfolio: an opera-orchestra themed stage for code." stack: Next.js, React, TypeScript, Tailwind CSS, Motion. repoUrl: TODO(user)
(Stitch placeholder acts — Invoice AI SaaS, Symphony Dashboard, Royal Couture Boutique, Atmospheric Forecast, Social Salon — are NOT real projects. Do not ship them.)
Case-study sections (per project, use fallbacks when TODO): "The Premiere" (overview) · "The Score" (problem) · "The Performance" (solution & key features) · "The Ensemble" (stack & role) · "Curtain Call" (outcome/links).

## Repertoire
**Education (VERIFY)**
- Bachelor's in Software Engineering — Telkom University Purwokerto, Indonesia — period TODO(user) — GPA TODO(user)
**Skills (levels TODO(user); fallback show level labels "Advanced/Proficient/Familiar")**
- Frontend: React/Next.js, Vue.js, TypeScript, Tailwind CSS
- Backend: Laravel/PHP, Node.js (TODO confirm)
- Mobile: Flutter
- AI/ML & Data: ML integration, data analysis (Python)
- Tools: Git, Figma/UX (TODO confirm)

## Experience (The Journey)
TODO(user): list internships, freelance, organizations. Entry shape: `{ role, org, period, bullets[], stack[] }`. If empty, hide the section and its nav link.

## Laurels (certificates) — VERIFY
1. IBM — Data Analyst Professional Certificate
2. Microsoft — AI & ML Engineering Professional Certificate
3. Google — UX Design Professional Certificate
4. Google — IT Automation with Python Professional Certificate
Each: year TODO(user), credential id/URL TODO(user) (hide "Verify" if empty). Description: one line per certificate, written from the title — keep generic.

## Reviews
testimonials: [] (TODO(user)). Hide section when empty.

## Contact
- eyebrow "BACKSTAGE INQUIRIES & COMMISSION" · title "Send a Dispatch *to the Maestro*"
- sub: "Commission a premier digital stage, propose a principal engineering engagement, or discuss an artistic collaboration."
- labels/placeholders: "Your Name / Title", "Your Correspondence Email", "Production Scope / Subject", "The Overture / Message"; submit "Send Dispatch ✉"
- success: "Your dispatch has reached the stage. I will reply soon." · error: "The dispatch could not be delivered. Please email me directly."

## SEO
- title default: "Overture by Atika — Frontend Developer & Software Engineer"
- description: "Portfolio of Dewi Atika Muthi — frontend and full-stack engineer building web and mobile apps with Next.js, React, TypeScript, Laravel and Flutter."
- keywords: frontend developer, software engineer, Next.js, React, TypeScript, Flutter, Laravel, portfolio, Indonesia
