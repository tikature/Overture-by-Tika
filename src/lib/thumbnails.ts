import fs from "fs";
import path from "path";

export interface ThumbnailResult {
  url: string | null;
  source: "local" | "og:image" | "github-card" | "placeholder";
  host?: string;
}

const LOCAL_EXTS = [".jpg", ".jpeg", ".webp", ".png"];

function findLocalImage(key: string): string | null {
  const publicDir = path.join(process.cwd(), "public", "images", "projects");
  for (const ext of LOCAL_EXTS) {
    const filePath = path.join(publicDir, `${key}${ext}`);
    if (fs.existsSync(filePath)) {
      return `/images/projects/${key}${ext}`;
    }
  }
  return null;
}

async function fetchOgImage(liveUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(liveUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OvertureBot/1.0; +https://overture.atika.dev)",
      },
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const html = await res.text();
    if (html.length > 1_000_000) return null;

    const ogImageMatch = html.match(
      /<meta\s+(?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["']([^"']+)["']/i
    );
    if (!ogImageMatch) return null;

    const imageUrl = ogImageMatch[1].trim();
    try {
      const resolved = new URL(imageUrl, liveUrl);
      if (resolved.protocol !== "https:") return null;
      return resolved.toString();
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

function githubCardUrl(owner: string, repo: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

export async function resolveThumbnail(
  key: string,
  liveUrl: string | undefined,
  repoUrl: string | undefined
): Promise<ThumbnailResult> {
  // 1. Local file
  const local = findLocalImage(key);
  if (local) {
    return { url: local, source: "local" };
  }

  // 2. Site's own og:image
  if (liveUrl) {
    const og = await fetchOgImage(liveUrl);
    if (og) {
      try {
        const host = new URL(og).hostname;
        return { url: og, source: "og:image", host };
      } catch {
        return { url: og, source: "og:image" };
      }
    }
  }

  // 3. GitHub social card
  if (repoUrl) {
    try {
      const parsed = new URL(repoUrl);
      if (parsed.hostname === "github.com") {
        const parts = parsed.pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
          const [owner, repo] = parts;
          const url = githubCardUrl(owner, repo);
          return { url, source: "github-card", host: "opengraph.githubassets.com" };
        }
      }
    } catch {
      // ignore
    }
  }

  // 4. Placeholder
  return { url: null, source: "placeholder" };
}

export async function resolveThumbnailsForProjects(
  projects: Array<{ slug: string; liveUrl?: string; repoUrl?: string }>
): Promise<Map<string, ThumbnailResult>> {
  const results = new Map<string, ThumbnailResult>();
  await Promise.all(
    projects.map(async (p) => {
      const result = await resolveThumbnail(p.slug, p.liveUrl, p.repoUrl);
      results.set(p.slug, result);
    })
  );
  return results;
}