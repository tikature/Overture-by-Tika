# TASKS — build in order. Tick boxes as you go. One phase per session.

## Phase 0 — Scaffold
- [x] `pnpm create next-app` equivalent in current dir (TS, App Router, `src/`, Tailwind, ESLint, no Turbopack flag needed, import alias `@/*`) — keep existing `AGENTS.md`, `docs/`, `reference/`, `public/images`, `opencode.json`, `vercel.json`, `.env.example`, `.nvmrc`, `.gitignore`
- [x] Install allowed deps (PRD §5); add scripts: `typecheck`, `lint`, `format`
- [x] `globals.css` with `@theme` tokens + utility classes from UI-REFERENCE
- [x] `next/font` Playfair/Cinzel/Plus Jakarta wired in `layout.tsx`; `lang="en"`, body bg `deep-abyss`
- [x] `src/data/*` typed from CONTENT.md; `lib/utils.ts` (`cn`)
- [x] Verify: `pnpm build` passes; commit "chore: scaffold"

## Phase 1 — Shell & atmosphere
- [x] `AmbientStage` (glows, embers, suits responsive count, reduced-motion)
- [x] `Navbar` (desktop pill + active section + mobile overlay menu), skip-link, scroll progress
- [x] `Footer`, `SectionHeading`, `Button`, `Chip`, `Reveal` primitives

## Phase 2 — Hero + Technical Ensemble
- [x] Hero left copy, typing effect (client), CTAs, social pill
- [x] Stage card with portrait pop-out exactly per UI-REFERENCE
- [x] Tech ticker / marquee

## Phase 3 — About + Productions
- [x] Stats with count-up, `ProsceniumArch` SVG, principle cards
- [x] Productions bento grid + category filter
- [ ] `/productions/[slug]` case study page with `generateStaticParams`, prev/next

## Phase 4 — Repertoire, Experience, Laurels, Reviews
- [x] Academic timeline + skill bars (animated, with text levels)
- [x] Experience timeline (hide if empty) · Laurels grid · Reviews (hide if empty)

## Phase 5 — Contact & backend
- [x] Form with zod (shared schema), honeypot, states
- [x] `app/api/contact/route.ts` with Resend; 503 fallback → mailto
- [x] Availability badge + socials

## Phase 6 — Polish, SEO, a11y, perf
- [ ] Metadata, OG image, sitemap, robots, icon, JSON-LD Person, themed 404
- [ ] Optional curtain intro (sessionStorage, reduced-motion skip)
- [ ] Analytics + Speed Insights
- [ ] Responsive pass 360/768/1024/1440; keyboard + focus pass; contrast pass
- [ ] Lighthouse mobile ≥ targets in PRD §4; fix regressions

## Phase 7 — Optional extras (ask first)
- [ ] "Program Notes" blog (MDX) · Indonesian/English toggle (`next-intl`) · light "Salon Cream" theme toggle

## Phase 8 — Ship
- [ ] Follow `docs/DEPLOY.md`; fill every TODO(user) leftover list; final acceptance checklist from PRD §6
