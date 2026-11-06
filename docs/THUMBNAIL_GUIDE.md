# Adding a Project Thumbnail

1. Open the project page in your browser.
2. Press **Windows+Shift+S** to open the snip tool and capture a **1280 × 800** region of the page (including the hero preview).
3. Save the screenshot as **`public/images/projects/<slug>.jpg`**, where `<slug>` matches the project's `slug` defined in `src/data/projects.ts` (e.g., `validly`).
4. Reload the site (`pnpm dev` or rebuild) – the card will now show the saved image.

If the file is missing, the component falls back to:
- The page's `og:image` meta tag (if reachable via HTTPS).
- The GitHub social card (`https://opengraph.githubassets.com/1/<owner>/<repo>`).
- A stylized placeholder.

No API key or external quota is required.
