# Security & Content Security Policy

## CSP Header Location

The Content-Security-Policy header is defined in `next.config.ts` via the `async headers()` function. It is applied to all routes (`/(.*)`).

## Policy Construction

The policy is built by `buildCsp()` which switches behavior based on `NODE_ENV`:

- **Development (`NODE_ENV !== "production"`)** — adds `'unsafe-eval'` to `script-src` for Next.js Fast Refresh and React error stack reconstruction.
- **Production** — never includes `'unsafe-eval'`. Adds `upgrade-insecure-requests`.

### Directives

| Directive | Value | Rationale |
|-----------|-------|-----------|
| `default-src` | `'self'` | Baseline |
| `script-src` | `'self' 'unsafe-inline'` (+ `'unsafe-eval'` in dev) | Next.js inline bootstrap scripts; Vercel Analytics |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | Tailwind/inline styles; Google Fonts CSS |
| `img-src` | `'self' data: blob: https://opengraph.githubassets.com https://*.vercel.app https://*.netlify.app https://*.github.io https://thevalidly.com https://ayopilih.site` | Local images, data URIs, project thumbnails |
| `font-src` | `'self' data: https://fonts.gstatic.com` | Self-hosted fonts via next/font + Google Fonts |
| `frame-src` | `'self' https://*.vercel.app https://*.netlify.app https://*.github.io https://thevalidly.com https://ayopilih.site` | Live Preview iframes for embeddable projects |
| `connect-src` | `'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com` | Vercel Analytics / Speed Insights beacons |
| `form-action` | `'self'` | Contact form posts to `/api/contact` |
| `base-uri` | `'self'` | Prevent base tag hijacking |
| `object-src` | `'none'` | No plugins |
| `frame-ancestors` | `'none'` | Prevent clickjacking |
| `upgrade-insecure-requests` | (production only) | Enforce HTTPS |

## Adding a New Allowed Source

1. Identify the directive (`script-src`, `img-src`, `connect-src`, etc.).
2. Edit `buildCsp()` in `next.config.ts` and add the origin to the appropriate array.
3. Run `pnpm build && pnpm start` and verify no CSP violations in DevTools → Console / Issues.
4. Commit the change.

## Verification

- **Development** (`pnpm dev`): Open DevTools Console and Issues tab. No CSP violations should appear.
- **Production** (`pnpm build && pnpm start`): Same check. No `'unsafe-eval'` should be present in the `script-src` directive.

## No `eval` / `new Function` / String Timers

The codebase contains no `eval()`, `new Function()`, or string-argument `setTimeout`/`setInterval` calls. All timers use arrow functions.

## Dependencies

Production build (`pnpm build`) was inspected for bundles that might use `eval`. None found in first-party code. Third-party dependencies (`next`, `react`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`, `zod`, `resend`, `@vercel/analytics`, `@vercel/speed-insights`, `next-intl`) do not introduce `eval` in their production bundles.