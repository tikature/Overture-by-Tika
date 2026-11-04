---
name: Theatrical Grandeur
colors:
  surface: '#230c11'
  surface-dim: '#230c11'
  surface-bright: '#4e3136'
  surface-container-lowest: '#1d070c'
  surface-container-low: '#2d1419'
  surface-container: '#31181d'
  surface-container-high: '#3d2227'
  surface-container-highest: '#492d32'
  on-surface: '#ffd9de'
  on-surface-variant: '#e0bfbf'
  inverse-surface: '#ffd9de'
  inverse-on-surface: '#44282e'
  outline: '#a78a8a'
  outline-variant: '#584141'
  surface-tint: '#ffb3b5'
  primary: '#ffb3b5'
  on-primary: '#680018'
  primary-container: '#800020'
  on-primary-container: '#ff828a'
  inverse-primary: '#af2b3e'
  secondary: '#d0c6af'
  on-secondary: '#363020'
  secondary-container: '#4f4937'
  on-secondary-container: '#c1b8a1'
  tertiary: '#d8c49f'
  on-tertiary: '#3b2f15'
  tertiary-container: '#493c20'
  on-tertiary-container: '#b9a683'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5'
  on-primary-fixed: '#40000b'
  on-primary-fixed-variant: '#8e0f28'
  secondary-fixed: '#ece2ca'
  secondary-fixed-dim: '#d0c6af'
  on-secondary-fixed: '#201b0d'
  on-secondary-fixed-variant: '#4d4635'
  tertiary-fixed: '#f5e0ba'
  tertiary-fixed-dim: '#d8c49f'
  on-tertiary-fixed: '#241a03'
  on-tertiary-fixed-variant: '#534529'
  background: '#230c11'
  on-background: '#ffd9de'
  surface-variant: '#492d32'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: 5rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: '600'
    lineHeight: 3.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '500'
    lineHeight: 3.5rem
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: 2.5rem
  headline-md:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: 2.5rem
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
  title-lg:
    fontFamily: Manrope
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: 0.01em
  title-md:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.625rem
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-lg:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.08em
  label-md:
    fontFamily: Manrope
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Manrope
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2.5rem
  margin: 1.5rem
  margin-md: 3rem
  margin-lg: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system draws inspiration from grand opera houses, velvet proscenium arches, gilded private boxes, and the dramatic chiaroscuro of stage lighting. It caters to classical vocalists, stage directors, scenographers, and premier cultural institutions seeking an evocative, elevated digital stage.

The aesthetic fuses classical romanticism with editorial restraint. High-contrast typography and luminous cream highlights emerge from deep wine-toned shadows, evoking the hushed intensity of an auditorium moments before the curtain rises. Surfaces feel tactile and stately, prioritizing negative space, measured proportions, and razor-sharp typographic discipline over gratuitous ornamentation.

## Colors

The palette establishes an immersive nocturnal environment anchored in deep wine tones and illuminated by warm, candlelit creams.

- **Primary (`#800020` / Dramatic Burgundy):** Used for focal interactive states, primary badges, and expressive focal points. Supported by deeper tones (`#5E0F1A`, `#3B0A12`) for container surfaces and brighter stage reds (`#9B1D30`, `#B0303C`) for hover accents and live indicators.
- **Secondary (`#F7ECD4` / Pale Cream):** The principal light value. Deployed for high-contrast headlines, primary button fills against dark surfaces, and luminous graphic dividers. Supported by pure highlights (`#FFF5E1`) and warm stage undertones (`#EFE2C6`).
- **Tertiary (`#DCC8A3` / Dark Cream & Gilded Sand):** A muted metallic neutral used for secondary metadata, subtle borders, inactive outlines, and refined ornamentation. Lightened by `#E6D7B9` for tertiary highlights.
- **Neutral & Surfaces (`#1E080D`, `#140508`, `#2A0B12`):** Base canvas values. `#140508` anchors the ground surface, `#1E080D` provides middle structural grounding, and `#2A0B12` elevates interactive cards and modal sheets.

## Typography

The typographic hierarchy pairs the theatrical nobility of **Playfair Display** with the calibrated, modern clarity of **Manrope**.

- **Playfair Display:** Reserved strictly for emotional weight—hero statements, production titles, movement markers, and grand quotes. Larger displays should utilize italic styles selectively for dramatic operatic emphasis (e.g., role titles like *Tosca*, *Don Giovanni*).
- **Manrope:** Handles functional navigation, technical cast details, repertory manifests, and continuous reading. Its open counters and geometric proportion provide effortless legibility against dark burgundy fields.
- **Labels & Micro-copy:** Rendered primarily in Manrope uppercase with expanded letter-spacing (0.08em to 0.12em) to mimic classical libretto notation and program staging notes.

## Layout & Spacing

Layouts adhere to an asymmetric 12-column grid designed for editorial staging, balanced by substantial breathing room.

- **Breakpoints:**
  - **Mobile (< 768px):** 4 columns, `margin: 1.5rem`, `gutter-sm: 1rem`. Stacks into linear, single-focus visual acts.
  - **Tablet (768px – 1024px):** 8 columns, `margin-md: 3rem`, `gutter: 1.5rem`.
  - **Desktop (> 1024px):** 12 columns, max content constraint of 1440px, `margin-lg: 5rem`, `gutter-lg: 2.5rem`.
- **Rhythm & Cadence:** Vertical spacing follows musical phrasing. Major theatrical acts and case studies separate across `space-3xl` (6rem), while internal component modules interact through `space-md` (1rem) and `space-lg` (1.5rem).

## Elevation & Depth

Depth is modeled after proscenium staging rather than ambient artificial drop shadows. Visual depth relies on **tonal stratification** and **hairline gilded outlines**.

- **Layer 0 (Stage Void):** Background floor (`#140508`). Matte and infinite.
- **Layer 1 (Auditorium):** Primary sections and structural backing panels (`#1E080D`).
- **Layer 2 (Proscenium Tier):** Interactive cards, program items, and media containers (`#2A0B12`). Outlined with a fine 1px border of `rgba(220, 200, 163, 0.15)`.
- **Layer 3 (Spotlight & Float):** Modals, flyout menus, and floating media players (`#3B0A12`). Supported by a deep, wine-tinted ambient shadow (`0 20px 50px -10px rgba(10, 2, 4, 0.7)`) and a delicate 1px border of `rgba(247, 236, 212, 0.3)`.
- **Atmospheric Sheen:** Select surfaces may employ a faint radial wash (`radial-gradient(ellipse at top, rgba(128, 0, 32, 0.25) 0%, transparent 70%)`) to emulate warm stage follow-spots.

## Shapes

The shape vocabulary prioritizes structured, tailored forms with subtle softening (`roundedness: 1`). 

- **Primary Geometry:** Base UI elements (buttons, inputs, cards, media frames) utilize subtle 0.25rem (`4px`) corners. This keeps panels crisp, architectural, and reminiscent of framed playbills and classical score covers.
- **Accent Elements:** Select ornamental tags, performance date badges, and pill controls leverage full capsules (`rounded-full`) to offer contrast against rectilinear page structures.
- **Framing Details:** Featured production imagery optionally utilizes fine inset double-borders or notched corners (via clipping paths) to echo classical theatrical proscenium craft.

## Components

### Buttons
- **Primary (Gilded Curtain):** Background `#F7ECD4`, text `#1E080D`, typography `label-lg`. Hover shifts to `#FFF5E1` with a soft candlelight glow (`box-shadow: 0 0 20px rgba(247, 236, 212, 0.2)`).
- **Secondary (Burgundy Velvet):** Background `#800020`, text `#FFF5E1`, border 1px solid `rgba(220, 200, 163, 0.3)`. Hover elevates to `#9B1D30`.
- **Ghost (Opera Program):** Transparent background, text `#DCC8A3`, border 1px solid `rgba(220, 200, 163, 0.3)`. Hover triggers border `#F7ECD4` and text `#FFF5E1`.

### Cards & Production Displays
- Grounded in `#2A0B12` with a 1px `rgba(220, 200, 163, 0.12)` border.
- Image containers within cards use a subtle vignette overlay (`linear-gradient(to top, #2A0B12 0%, transparent 60%)`) to weave photography seamlessly into typography.
- On hover, borders brighten to `rgba(247, 236, 212, 0.4)` with an effortless 4px upward translation.

### Chips & Badges
- **Vocal Range / Category Chips:** Background `#1E080D`, border 1px solid `rgba(220, 200, 163, 0.25)`, text `#DCC8A3`, typography `label-md`.
- **Status (Live / In Rehearsal):** Pill-shaped with a `#B0303C` micro-dot and `#F7ECD4` text.

### Form Inputs
- Background `#140508`, text `#F7ECD4`, border 1px solid `rgba(220, 200, 163, 0.25)`.
- Placeholder text in `rgba(220, 200, 163, 0.45)`.
- Focus state establishes a crisp 1px border in `#F7ECD4` with a subtle inner glow.

### Audio & Media Scrubber
- Track background `#3B0A12`; elapsed progress bar rendered in `#800020` terminating in a polished `#F7ECD4` scrubber bead.
- Timestamps set in Manrope `label-sm` in `#DCC8A3`.

### Repertoire Lists
- Tabular row structure separated by hairlines (`rgba(220, 200, 163, 0.1)`).
- Work titles appear in Playfair Display `title-lg` with composer/year anchored in Manrope `label-md` uppercase.