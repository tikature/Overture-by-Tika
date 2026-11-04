# AGENTS.md — Overture by Atika

Opera-orchestra themed personal portfolio for **Dewi Atika Muthi** (handle: Tika).
Read this file first on every session. Detailed specs live in `docs/`.

## Source-of-truth order (when files disagree)
1. `docs/PRD.md` — scope, sections, routes, acceptance criteria
2. `reference/screen.png` + `reference/code.html` — the approved visual UI (Stitch export)
3. `docs/UI-REFERENCE.md` — design tokens, fonts, animation specs extracted from `code.html`
4. `docs/DESIGN.md` — original Stitch design-system prose (colors/spacing/components). Its font note (Manrope) is superseded by UI-REFERENCE (Plus Jakarta Sans).
5. `docs/CONTENT.md` — all copy and data. Never hardcode copy in components.
6. `docs/ASSETS.md` — which image is which

## Stack (fixed — do not substitute)
- Next.js 15 (App Router, `src/` dir) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`; no `tailwind.config.js`)
- `motion` (Framer Motion) for animation, `lucide-react` for icons, `next/font/google` for fonts, `next/image` for images
- Contact form: Route Handler + Resend + zod validation
- MDX is optional (Phase 7). Package manager: **pnpm**. Node 20+.
- Vue.js is NOT used as a framework (cannot coexist with Next.js/React). "Vue JS" appears only as a skill chip in the tech ticker.

## Commands
- `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` (`tsc --noEmit`) · `pnpm start`
- Before finishing any task run: `pnpm typecheck && pnpm lint && pnpm build`. Fix everything; do not report done on a failing build.

## Project structure
```
src/app/                  layout.tsx, page.tsx, globals.css, not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
src/app/productions/[slug]/page.tsx     project case study
src/app/api/contact/route.ts
src/components/layout/    Navbar, Footer, AmbientStage (fixed background: glows, embers, floating suits)
src/components/sections/  Hero, TechEnsemble, About, Productions, Repertoire, Experience, Laurels, Reviews, Contact
src/components/ui/        Button, Chip, Card, SectionHeading, Badge, Reveal
src/data/                 site.ts, projects.ts, skills.ts, education.ts, experience.ts, certificates.ts (typed, from docs/CONTENT.md)
src/lib/                  utils.ts (cn), seo.ts
public/images/            atika.webp, suits/{spade,diamond,club,heart}.webp
public/resume/            Dewi-Atika-Muthi-CV.pdf  (user supplies)
```

## Design rules (non-negotiable)
- Dark only. Background `#1B0509`, text `softCream #EFE2C6`. Never pure white/black, never default Tailwind gray/blue.
- Use palette tokens only (see UI-REFERENCE). No new hex values in components.
- Fonts: `font-display` Playfair Display (headlines, italics for emphasis), `font-opera` Cinzel (labels, nav, buttons, uppercase + wide tracking), `font-body` Plus Jakarta Sans.
- Depth = tonal layers + 1px cream hairline borders + burgundy glow. Not generic drop shadows.
- Cards/buttons per DESIGN.md "Components". Pill buttons (`rounded-full`) for CTAs/badges; `rounded-3xl` for hero stage card.
- Section eyebrow labels use opera vocabulary (Overture, The Stage, Repertoire, Productions, Laurels, Curtain Call).
- Match `reference/screen.png` layout and rhythm. Improve, don't redesign.

## Coding rules
- Server Components by default; `"use client"` only for interactivity (typing effect, motion, form, mobile menu).
- Typed data in `src/data/*`; components receive props. No inline copy duplication.
- Semantic HTML, one `<h1>`, `aria-label` on icon-only links, visible focus rings (cream), skip-link.
- Respect `prefers-reduced-motion` (disable drift, embers, typing loop → static text).
- Images: `next/image` with `width/height` or `fill` + `sizes`; hero portrait `priority`. Decorative suits `alt=""` + `aria-hidden`.
- Floating suits: max 16 on desktop, max 6 on `<768px`. Animate only `transform`/`opacity`. Fixed layer must be `pointer-events-none`.
- No `any`, no unused code, no console.log. Small components (<200 lines). Absolute imports via `@/`.
- Accessibility: contrast AA for body text (cream on burgundy passes; do not use cream at <60% opacity for body copy).
- Never commit secrets. Env vars only via `.env.local` / Vercel.

## Workflow
- Work phase by phase following `docs/TASKS.md`. Tick checkboxes as you finish. One phase per session unless told otherwise.
- After each phase: run checks, summarize what changed in ≤10 lines, list anything needing user input (copy, links, files).
- If something is ambiguous or content is missing, use the `TODO(user)` marker in `docs/CONTENT.md` fallback text and list it in your summary — do not invent facts (companies, metrics, credentials, testimonials).
- Ask before adding dependencies not listed in PRD.

## Deployment (Vercel)
See `docs/DEPLOY.md`. `vercel.json` already present. Requirements: `pnpm build` passes, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` documented in `.env.example`.
