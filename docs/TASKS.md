# TASKS — build in order. Tick boxes as you go. One phase per session.

## Phase 0 — Scaffold
- [ ] `pnpm create next-app` equivalent in current dir (TS, App Router, `src/`, Tailwind, ESLint, no Turbopack flag needed, import alias `@/*`) — keep existing `AGENTS.md`, `docs/`, `reference/`, `public/images`, `opencode.json`, `vercel.json`, `.env.example`, `.nvmrc`, `.gitignore`
- [ ] Install allowed deps (PRD §5); add scripts: `typecheck`, `lint`, `format`
- [ ] `globals.css` with `@theme` tokens + utility classes from UI-REFERENCE
- [ ] `next/font` Playfair/Cinzel/Plus Jakarta wired in `layout.tsx`; `lang="en"`, body bg `deep-abyss`
- [ ] `src/data/*` typed from CONTENT.md; `lib/utils.ts` (`cn`)
- [ ] Verify: `pnpm build` passes; commit "chore: scaffold"

## Phase 1 — Shell & atmosphere
- [ ] `AmbientStage` (glows, embers, suits responsive count, reduced-motion)
- [ ] `Navbar` (desktop pill + active section + mobile overlay menu), skip-link, scroll progress
- [ ] `Footer`, `SectionHeading`, `Button`, `Chip`, `Reveal` primitives

## Phase 2 — Hero + Technical Ensemble
- [ ] Hero left copy, typing effect (client), CTAs, social pill
- [ ] Stage card with portrait pop-out exactly per UI-REFERENCE
- [ ] Tech ticker / marquee

## Phase 3 — About + Productions
- [ ] Stats with count-up, `ProsceniumArch` SVG, principle cards
- [ ] Productions bento grid + category filter
- [ ] `/productions/[slug]` case study page with `generateStaticParams`, prev/next

## Phase 4 — Repertoire, Experience, Laurels, Reviews
- [ ] Academic timeline + skill bars (animated, with text levels)
- [ ] Experience timeline (hide if empty) · Laurels grid · Reviews (hide if empty)

## Phase 5 — Contact & backend
- [ ] Form with zod (shared schema), honeypot, states
- [ ] `app/api/contact/route.ts` with Resend; 503 fallback → mailto
- [ ] Availability badge + socials

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
