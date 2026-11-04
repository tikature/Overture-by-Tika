# ASSETS — what each file is

Originals are in `reference/originals/`. Optimized, ready-to-use copies are in `public/images/`. Do not re-export or alter them unless asked.

| Use | File | Notes |
|---|---|---|
| Hero portrait (pops out of the stage card) | `public/images/atika.webp` | Transparent, trimmed, 1567×1100 landscape. Render with `next/image`, `priority`, width 140% of card, bottom fade mask. Alt: "Dewi Atika Muthi, frontend developer and software engineer" |
| Spade (black, ornate) | `public/images/suits/spade.webp` | 256×256 transparent, square-padded. Originals: `5.png` |
| Diamond (red, ornate) | `public/images/suits/diamond.webp` | Original: `6.png` |
| Club (black, ornate) | `public/images/suits/club.webp` | Original: `7.png` |
| Heart (red, ornate) | `public/images/suits/heart.webp` | Original: `8.png` |
| UI reference screenshot | `reference/screen.png` | 356×1600 long capture of full page |
| UI reference code | `reference/code.html` | Stitch export (Tailwind v3 CDN) — port, don't copy CDN setup |
| Palette board | `reference/color_palette.png` | Primary #800020 · Secondary #F7ECD4 · Tertiary #DCC8A3 · Neutral #1E080D; Playfair Display (headline) + Manrope (body/label, superseded by Plus Jakarta Sans in the UI) |

Suit usage: floating decorative layer only (and as section divider glyphs / favicon). Black suits (spade, club) carry cream glow; red suits (diamond, heart) carry burgundy+cream glow. All `alt=""`.

To create (agent): `src/app/icon.svg` (cream spade glyph on burgundy circle), `opengraph-image.tsx` (burgundy stage, "Overture by Atika", Playfair), SVG proscenium-arch illustration for About (inline component `ProsceniumArch.tsx`).
User must supply: `public/resume/Dewi-Atika-Muthi-CV.pdf`, project screenshots (optional) in `public/images/projects/<slug>.webp`.
