# UI-REFERENCE — extracted from `reference/code.html` (Stitch export) and `docs/DESIGN.md`

Open `reference/screen.png` and `reference/code.html` alongside this file. Port the structure, not the CDN setup (Stitch used Tailwind v3 CDN + unpkg Lucide; replace with Tailwind v4 + `lucide-react`).

## Tailwind v4 theme (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme {
  --color-burgundy: #800020;
  --color-vintage-burgundy: #9B1D30;
  --color-wine-red: #B0303C;
  --color-oxblood: #5E0F1A;
  --color-dark-burgundy: #3B0A12;
  --color-deep-abyss: #1B0509;        /* page background */
  --color-obsidian-burgundy: #24070D; /* navbar / chips surface */
  --color-cream: #FFF5E1;
  --color-ivory-cream: #F7ECD4;       /* secondary / primary button fill (light) */
  --color-soft-cream: #EFE2C6;        /* body text */
  --color-warm-cream: #E6D7B9;
  --color-dark-cream: #DCC8A3;        /* tertiary: borders, metadata */

  --font-display: var(--font-playfair), serif;
  --font-opera: var(--font-cinzel), serif;
  --font-body: var(--font-jakarta), sans-serif;

  --animate-spotlight-pulse: spotlightPulse 6s cubic-bezier(0.4,0,0.6,1) infinite;
  --animate-ember-rise: emberRise 10s linear infinite;
  --animate-float-subtle: floatSubtle 5s ease-in-out infinite;

  @keyframes spotlightPulse { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.6;transform:scale(1.05)} }
  @keyframes emberRise { 0%{transform:translate(0,100vh) rotate(0);opacity:0} 20%{opacity:.65} 80%{opacity:.5} 100%{transform:translate(45px,-30px) rotate(180deg);opacity:0} }
  @keyframes floatSubtle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
}
```
Map to DESIGN.md names: primary = burgundy `#800020`; secondary = ivory-cream `#F7ECD4`; tertiary = dark-cream `#DCC8A3`; neutral = `#1E080D` (use deep-abyss `#1B0509` as page bg, as in Stitch). Surface layers from DESIGN.md: void `#140508`, auditorium `#1E080D`, card `#2A0B12`, float `#3B0A12`.

## Fonts (`next/font/google`)
- Playfair Display: weights 400,500,600,700,900 + italic 400,600,700 → `--font-playfair`
- Cinzel: 500,600,700,800,900 → `--font-cinzel`
- Plus Jakarta Sans: 300,400,500,600,700 + italic 400 → `--font-jakarta`
(DESIGN.md mentions Manrope; the approved UI uses Plus Jakarta Sans — follow the UI.)
Type usage: H1 `text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15]`; section titles Playfair with an italic cream-gradient accent word ("the *Stage*"); nav/buttons/labels `font-opera font-bold uppercase tracking-[0.18em–0.25em] text-[11px]`; body `font-body text-sm sm:text-base leading-relaxed text-soft-cream/85`.

## Reusable utility classes (port to `@layer components`)
- `.opera-border` — `border:1px solid rgba(220,200,163,.22); box-shadow:0 10px 30px rgba(27,5,9,.8), inset 0 0 15px rgba(220,200,163,.04)`
- `.opera-border-hover` — border `rgba(220,200,163,.2)`, transition .35s cubic-bezier(.16,1,.3,1); hover: border `rgba(247,236,212,.55)`, shadow `0 14px 35px rgba(128,0,32,.35), inset 0 0 20px rgba(247,236,212,.06)`, `translateY(-3px)`
- `.cream-glow` — `text-shadow:0 0 14px rgba(255,245,225,.45)` · `.burgundy-glow` — `0 0 18px rgba(155,29,48,.6)`
- `.proscenium-arch` — `radial-gradient(ellipse at 50% 0%, rgba(94,15,26,.45) 0%, rgba(27,5,9,.98) 75%)`
- `.subtle-cream-ember` — radial-gradient(circle,#FFF5E1 30%,#DCC8A3 70%,transparent 100%), round, drop-shadow 0 0 5px rgba(247,236,212,.6)
- Suit glows: diamond/heart → `drop-shadow(0 0 12px rgba(155,29,48,.75)) drop-shadow(0 0 6px rgba(255,245,225,.45))`; club/spade → `drop-shadow(0 0 12px rgba(255,245,225,.6)) drop-shadow(0 0 18px rgba(128,0,32,.65))`
- Suit drift keyframes 1–5 (12s,15s,18s,14s,16s ease-in-out infinite): translate ±(14–20px X, 24–38px Y), rotate 18–32°, scale .9–1.08, opacity oscillating .2↔.75. Copy exactly from `reference/code.html` `<style>`.
- Reduced motion: all drift/pulse/ember/float animations `none`, opacity .35.

## Ambient stage layer (fixed, z-0, pointer-events-none)
Glows (blurred circles): top-center 900×650 `vintage-burgundy/15` blur-[180px] pulsing; left 550 `oxblood/35` blur-[160px]; bottom-right 600 `dark-burgundy/40` blur-[170px]; mid 500×450 `burgundy/15` blur-[150px]. Embers: 5 dots (6–10px) at left 12/34/68/86/50 %, durations 10/13/14/9.5/11 s, staggered delays. Suits: Stitch placed 16 suits at the positions below (top %, side %, width) cycling diamond→spade→club→heart; replicate on desktop, keep first 6 on mobile:
`diamond t6 l4 w40 · spade t10 l28 · club t14 r6 w44 · heart t22 r22 · heart t26 l8 · club t34 l47 · spade t38 r8 · diamond t46 l12 w44 · heart t52 r16 · spade t58 l5 · club t66 r5 · diamond t72 l44 · heart t78 l10 · spade t84 r14 · club t91 l22 · diamond t93 r7` (widths 28–44px).

## Components (from code.html)
**Navbar** — `fixed top-5 inset-x-0 z-50`, inner `max-w-4xl rounded-full bg-obsidian-burgundy/90 backdrop-blur-xl border border-dark-cream/25 px-5 py-2` + shadow `0 12px 40px rgba(27,5,9,.9)`. Left: round "T" badge (28px, dark-burgundy, cream border) + gradient cream pill "TIKA" (Cinzel black, tracking .22em, text deep-abyss). Links: Overture · The Stage · Repertoire · Productions · Laurels · Curtain Call (Cinzel 11px bold, active = cream + cream-glow). CTA "Get in Touch" gradient pill burgundy→vintage→wine, sparkles icon.
**Primary button** — pill, `bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red`, cream text, Cinzel xs tracking-widest uppercase, border dark-cream/40, glow `0 0 20px rgba(128,0,32,.7)`; hover glow turns cream `0 0 30px rgba(220,200,163,.45)`, border cream, lift -0.5.
**Secondary/ghost** — `bg-obsidian-burgundy/90 border-dark-cream/30 text-soft-cream`, hover border/text cream.
**Eyebrow badge** — pill `bg-dark-burgundy/60 border-dark-cream/30 backdrop-blur`, 8px cream dot with glow, Cinzel 11px tracking .25em.
**Hero stage card** — wrapper `w-[310px] sm:w-[350px] md:w-[370px]`; card `h-[470px] sm:h-[490px] rounded-3xl bg-[#26090e] border border-[#7a1829]/60`, shadow `0 20px 60px rgba(15,2,4,.95), inset 0 0 40px rgba(75,10,20,.7)`, inner hairline `inset-2.5 rounded-2xl border-dark-cream/15`, vertical gradient overlay `#3a0b14/70 → #22060b/90 → #190408`. Header row: "STAGE VIRTUOSO EDITION" + pill "PRINCIPAL MAESTRO" (wine-red dot). Footer bar `bg-[#160307]/90 backdrop-blur rounded-2xl border-[#6b1625]/50` with "THE ROYAL STAGE" + sub + tag "MAESTRO V4.0". Portrait layer: absolute, `top-[38–42px]`, centered, **`w-[140%]`**, mask `linear-gradient(to bottom, black 0%, black 65%, transparent 95%)`, drop-shadows `0 20px 35px rgba(0,0,0,.9)` + `0 0 24px rgba(128,0,32,.3)`. Backing glow circle 288–384px `from-burgundy via-oxblood/35 to-transparent blur-3xl opacity-50`.
**Tech ticker** — `py-7 border-y border-dark-cream/20 bg-dark-burgundy/35 backdrop-blur-md`; label with music icon (wine-red) + "THE TECHNICAL ENSEMBLE"; chips with icon.
**Cards** — see DESIGN.md "Cards & Production Displays" + `.opera-border-hover`. Project cards use a mini-preview (UI mock, color swatches, weather/boutique motif) in the upper half — recreate with simple divs/SVG, no screenshots required.
**Contact form** — inputs bg `#140508`, text ivory-cream, border dark-cream/25, placeholder dark-cream/45, focus border ivory-cream + inner glow; submit "Send Dispatch ✉" primary pill.
**Typing effect** — roles cycle ["Digital Stages","Frontend Virtuoso","Software Engineer","Component Architect"]; type 100ms, delete 45ms, hold 1900ms, gap 400ms; cream blinking caret. Reserve min-height to prevent CLS.
**Icons** — lucide: sparkles, compass, scroll, music, github, linkedin, instagram, video (TikTok stand-in), mail.

## Section decorations in screen.png
Small diamond/suit glyph dividers between sections (centered, burgundy glow). Section header pattern: Cinzel eyebrow ("THE PLAYBILL") → Playfair title with italic gradient word → muted subtitle.
