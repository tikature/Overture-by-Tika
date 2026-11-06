# GitHub Auto-Discovery for Productions

This document describes how the portfolio automatically discovers projects from GitHub and merges them with the curated list in `src/data/projects.ts`.

## Overview

On each build (or ISR revalidation), the server fetches the public repositories of `GITHUB_USERNAME` (default `tikature`) from the GitHub API (`/users/{user}/repos?per_page=100&sort=pushed`).  
If `GITHUB_TOKEN` is set, it is sent as a Bearer token to increase the rate limit.

### Filtering rules
Only repositories that satisfy **all** of the following are considered:
- Not a fork, not archived, not private.
- Have a `homepage` field that is a valid `https` URL (after normalisation).
- The repository name is **not** the profile README repo (same as the username).
- The repository name is **not** in `GITHUB_EXCLUDE` (comma-separated list in the environment).

### Normalisation
Homepage URLs are trimmed, prefixed with `https://` if missing, and trailing slashes are removed.

### Merging with curated projects
Curated projects live in `src/data/projects.ts`. Matching is performed in this order:
1. By normalised homepage hostname (exact match).
2. By repository name = curated `slug`.

If a match is found, the curated entry wins for all display fields (`act`, `title`, `tagline`, `description`, `highlights`, `problem`, `solution`, `category`, `role`).  
GitHub only fills missing fields:
- `liveUrl` (if curated lacks one)
- `repoUrl` (if curated lacks one)
- `description` (fallback to repo description)
- `stack` → `topics` (or primary language)
- `pushed_at` used for sorting auto cards.

Repositories that do **not** match any curated entry become **auto cards**:
- `slug` = repo name
- `act` auto-numbered after the last curated act (`Act I`, `Act II`, …)
- `title` = humanised repo name
- `tagline` = repo description (hidden if empty)
- `category` guessed from topics/language (`flutter`/`dart`/`android` → `mobile`, `ai`/`ml`/`python` → `ai`, else `web`)
- `stack` = topics or language
- `liveUrl` = normalised homepage
- `repoUrl` = GitHub HTML URL
- No case-study page is generated.

### Sorting
Curated projects appear first in the order defined in `projects.ts`.  
Auto cards follow, sorted by `pushed_at` descending.

### Embeddability check
For up to the first 12 projects (curated + auto) the server performs a lightweight `GET` (5 s timeout, follows redirects) on the `liveUrl`.  
A site is **not embeddable** if the response contains:
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- `Content-Security-Policy` with `frame-ancestors` that does not allow `*` (or `'self'` only).

The result is stored as `embeddable` on the project object. In the UI:
- If `embeddable === true` → “Live Preview” button opens an accessible modal with an `<iframe>`.
- If `embeddable === false` → “Open site” link opens the URL in a new tab.

The check runs in parallel with `Promise.allSettled` and never blocks the page render.

### Graceful failure
If the GitHub request fails, is rate-limited, or times out, the site falls back to the curated list **only**. No error is surfaced to the user; the build never fails because of GitHub.

## Configuration

| Env var | Required | Default | Description |
|---------|----------|---------|-------------|
| `GITHUB_USERNAME` | No | `tikature` | GitHub user whose repos are scanned. |
| `GITHUB_TOKEN` | No | — | Personal access token (classic) with `public_repo` scope. Increases rate limit from 60 req/h to 5 000 req/h. |
| `GITHUB_EXCLUDE` | No | — | Comma-separated repo names to exclude (e.g. `old-repo,temp`). |

## Adding a project

1. **Curated (recommended for featured work)**  
   Add an entry to `src/data/projects.ts` with all fields. The `slug` should match the GitHub repo name (or you can rely on homepage matching).

2. **Auto (for side projects, experiments, etc.)**  
   - Create a public GitHub repo under the configured user.  
   - Set the **Website** field in the repo settings to the live URL (must be `https`).  
   - Add a short **Description**.  
   - Add **Topics** that describe the stack (e.g. `react`, `tailwind`, `flutter`, `ai`).  
   - Ensure the repo is not forked/archived/private and its name is not in `GITHUB_EXCLUDE`.  

After the next build (or after the 1 h ISR window) the project will appear automatically.

## Local development

```bash
# optional: set a token to avoid rate limits
export GITHUB_TOKEN=ghp_xxx
pnpm dev
```

The server will call the real GitHub API (or mock if you intercept). To test the fallback, unset the token and block network access.

## Files involved
- `src/lib/projects-source.ts` — fetch, filter, merge, embeddability check
- `src/app/page.tsx` — calls `getProjects` and passes to `<ProductionsGrid>` and `<AboutSection>`
- `src/components/sections/ProductionsGrid.tsx` — renders filter chips, cards, live-preview modal
- `scripts/generate-previews.ts` — Playwright script to generate static thumbnails
- `public/images/projects/` — thumbnails (`<slug>.jpg`) and `manifest.json`
- `src/data/site.ts` — reads `GITHUB_EXCLUDE`
- `.env.example` — documents the three variables