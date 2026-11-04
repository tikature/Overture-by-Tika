---
description: Pre-deploy checklist for Vercel
---
Run the checklist in `docs/DEPLOY.md` ("Pre-deploy checklist"). Run `pnpm typecheck && pnpm lint && pnpm build`. Verify env vars are documented in `.env.example`, sitemap/robots/OG use `NEXT_PUBLIC_SITE_URL`, and no secrets are committed. Report pass/fail per item and fix failures.
