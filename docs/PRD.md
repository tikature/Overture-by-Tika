# PRD — Overture by Atika

## 1. Product
Personal portfolio website with an opera-orchestra / theatrical-grandeur theme. Goal: get Dewi Atika Muthi hired / commissioned as a Frontend / Full-Stack Software Engineer. Visitors (recruiters, clients, collaborators) must understand who she is, see proof of work, and contact her within 60 seconds.

- Brand: **Overture by Atika** (nav title, `<title>`, footer, OG). Hero greeting uses display name **Tika**.
- Language: English UI/copy (Indonesian toggle is Phase 7, optional).
- Links: GitHub https://github.com/tikature · LinkedIn https://www.linkedin.com/in/dewi-atika-muthi/ · Email detikaa10@gmail.com
- Visual reference: `reference/screen.png`, `reference/code.html` (mobile-width capture of a long single page).

## 2. Information architecture
Single-page home (`/`) with anchored sections + dynamic case-study routes.

| Nav label | Anchor | Section | In Stitch UI? |
|---|---|---|---|
| Overture | `#home` | Hero | yes |
| — | — | Technical Ensemble (tech ticker) | yes |
| The Stage | `#about` | About / "The Story Behind the Stage" + stats | yes |
| Productions | `#projects` | Featured Productions & Acts (project cards) | yes |
| Repertoire | `#skills` | Skills + Education timeline | yes |
| The Journey | `#experience` | Experience / internships / organizations timeline | **NEW** |
| Laurels | `#certificates` | Certificates | yes |
| Critics' Reviews | `#reviews` | Testimonials (hidden until real data exists) | **NEW** |
| Curtain Call | `#contact` | Contact form + socials | yes |

Extra routes (NEW):
- `/productions/[slug]` — case study page per project (problem, role, stack, highlights, links, gallery placeholder, prev/next project)
- `/not-found` — themed 404 ("The curtain has fallen")
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image` (generated), `/icon.svg` (spade glyph)
- Resume: button downloads `/resume/Dewi-Atika-Muthi-CV.pdf` (hide button + log TODO if file missing)

Navbar: floating pill (see UI-REFERENCE), active-section highlight via IntersectionObserver, mobile hamburger → full-screen velvet overlay menu (NEW; Stitch only shows desktop).

## 3. Section requirements

### Hero
Left: eyebrow badge "FRONTEND DEVELOPER • SOFTWARE ENGINEER" · H1 "Hi, I'm TIKA" · typed rotating line "Orchestrating …" (roles list in `site.ts`) · intro paragraph · CTAs: Explore Productions (→ #projects), Download Resume / CV, social pill group (GitHub, LinkedIn, Email, + Instagram/TikTok only if URLs provided).
Right: "Stage Card" (`STAGE VIRTUOSO EDITION`, `PRINCIPAL MAESTRO` badge, footer bar "THE ROYAL STAGE / Grand Théâtre • Lead Software Composition", `MAESTRO V4.0` tag) with `atika.webp` portrait popping out of the card (140% width, bottom fade mask). Hover: portrait scale 1.02.

### Technical Ensemble
Strip with label + chips: React JS, Vue JS, Tailwind CSS, Next JS, TypeScript (+ Laravel, Flutter, PHP, Python — see CONTENT). Optional slow marquee (paused on hover, static under reduced motion).

### About — "The Story Behind the Stage"
Left: 4 stat tiles (Years on Stage, Productions Staged, Standing Ovations, Backstage Readiness) — numbers animate counting up on view. Center: SVG proscenium-arch illustration (opera house arch + burgundy curtain + chandelier, cream line art) captioned "OPÉRA GARNIER • STAGECRAFT & MASTERY". Right: two principle cards (Directing the Interaction, Stagecraft & Precision). Add a short personal bio paragraph + "Currently" line (NEW).

### Productions (Featured Productions & Acts)
Bento grid of project cards styled as playbill "Acts" (Act I … V). Card = act label chip, mini preview visual, title, 1–2 line description, tech chips, "View Production" link → `/productions/[slug]`; secondary icon links to live demo / GitHub if present. Filter chips (All / Web / Mobile / AI) (NEW). Hover: border brightens + 4px lift. Staggered reveal on scroll.

### Repertoire (Masterclass & Repertoire)
Left: "Academic Lineage" vertical timeline (education). Right: "Technical Proficiency" bars grouped (Frontend, Backend, Mobile, Tools). Bars animate on view. Show level as text label as well as bar (a11y).

### Experience — "The Journey" (NEW)
Vertical timeline: role, org, period, 2–3 bullet achievements, tech chips. Includes internships, freelance, organizations/volunteering. Same visual language as Academic Lineage.

### Laurels (Certificates)
Card grid: issuer eyebrow, certificate title, description, conferred year, credential ID, "Verify" link if URL provided.

### Critics' Reviews (NEW, conditional)
Testimonial carousel/grid. Render ONLY if `testimonials.length > 0`. Never fabricate quotes.

### Contact — "Send a Dispatch to the Maestro"
Form: name, email, subject, message (+ hidden honeypot). Client + server zod validation, loading/success/error states (toast or inline), rate-limit-light (honeypot + min-length). Server: Resend email to `CONTACT_TO_EMAIL`. If `RESEND_API_KEY` missing → return 503 and UI falls back to `mailto:` link. Beside form: email, GitHub, LinkedIn, location (from CONTENT), availability badge ("Open to opportunities" — LIVE dot style).

### Footer
Brand badge, nav links, socials, "Composed in Dark Burgundy, Vintage Burgundy, and Refined Cream", © {current year} Dewi Atika Muthi. Back-to-top button (spade glyph).

### Global
- `AmbientStage` fixed layer: 4 radial burgundy glows (one pulsing), 5 rising cream embers, floating card suits (assets in ASSETS.md) with drift animations 1–5 and per-suit dual glow.
- Scroll progress hairline (cream→burgundy) under navbar (NEW).
- Optional intro "curtain opening" (two burgundy panels sliding apart, ~1.2s, once per session via sessionStorage, skipped under reduced motion) (Phase 6).
- Smooth scroll with `scroll-margin-top` ≥ 7rem for the floating nav.

## 4. Non-functional requirements
- Lighthouse (mobile, production): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- LCP < 2.5s (portrait `priority`, fonts via next/font with `display: swap`), CLS < 0.05, no layout shift from typing effect (reserve line height).
- Responsive: 360px → 1440px+. Test 360, 768, 1024, 1440. No horizontal scroll.
- SEO: metadata API (title template "%s | Overture by Atika"), OG/Twitter cards, canonical, JSON-LD `Person`, sitemap, robots, semantic headings.
- Analytics: `@vercel/analytics` + `@vercel/speed-insights` (cookie-less).
- Security headers via `vercel.json`; contact route validates + sanitizes input.
- Reduced-motion and keyboard navigation fully supported.

## 5. Allowed dependencies
`next react react-dom typescript tailwindcss @tailwindcss/postcss motion lucide-react clsx tailwind-merge zod resend @vercel/analytics @vercel/speed-insights` · dev: `eslint eslint-config-next prettier prettier-plugin-tailwindcss @types/*`. Optional Phase 7: `@next/mdx`, `next-intl`. Anything else → ask.

## 6. Acceptance criteria
- [ ] Home visually matches `reference/screen.png` section-for-section on mobile and desktop
- [ ] All NEW sections present and consistent with the theme
- [ ] No hardcoded copy in components; all from `src/data`
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pass
- [ ] Contact form works end-to-end with Resend env set; graceful fallback without
- [ ] Reduced-motion mode verified
- [ ] Deployed to Vercel preview, all env vars set, Lighthouse targets met
