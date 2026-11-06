# DEPLOY — Vercel

## One-time
1. `git init && git add . && git commit -m "feat: overture by atika"`; create repo `overture-by-atika` under github.com/tikature; `git remote add origin … && git push -u origin main`
2. vercel.com → Add New → Project → import the repo. Framework auto-detects Next.js (`vercel.json` already sets pnpm install/build).
3. Environment Variables (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. https://overture-atika.vercel.app, later custom domain)
   - `RESEND_API_KEY` = from resend.com
   - `CONTACT_TO_EMAIL` = detikaa10@gmail.com
   - `CONTACT_FROM_EMAIL` = `onboarding@resend.dev` (until a domain is verified in Resend)
    - `GITHUB_USERNAME` = tikature (or your GitHub username for auto-discovery)
    - `GITHUB_TOKEN` = optional, increases GitHub API rate limit
    - `GITHUB_EXCLUDE` = optional comma-separated repo names to exclude from auto-discovery
    - After adding or changing a project: run `pnpm previews`, commit `public/images/projects`, push.
4. Deploy. Every push to `main` → production; every PR/branch → preview URL.
5. Enable Vercel Analytics + Speed Insights in the project dashboard (the packages are already in the code).

## Or CLI
`pnpm dlx vercel login` → `pnpm dlx vercel link` → `pnpm dlx vercel env add …` → `pnpm dlx vercel --prod`

## Pre-deploy checklist (agent must run)
- `pnpm typecheck && pnpm lint && pnpm build` ✅
- No `TODO(user)` text visible in the UI (hide the element or use the agreed fallback)
- `public/resume/Dewi-Atika-Muthi-CV.pdf` exists or the resume button is hidden
- `robots.ts`/`sitemap.ts` use `NEXT_PUBLIC_SITE_URL`
- After first deploy: update `NEXT_PUBLIC_SITE_URL`, redeploy, test contact form on the live URL, run Lighthouse on mobile

## Custom domain (optional)
Vercel → Project → Settings → Domains → add domain → set DNS as shown → update `NEXT_PUBLIC_SITE_URL` → redeploy. Verify the domain in Resend and switch `CONTACT_FROM_EMAIL` to `hello@yourdomain`.
