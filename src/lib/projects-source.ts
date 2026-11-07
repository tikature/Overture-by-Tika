import { projects as curatedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { resolveThumbnailsForProjects } from "./thumbnails";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  topics: string[];
  language: string | null;
  pushed_at: string;
}

export interface MergedProject {
  slug: string;
  act: string;
  title: string;
  tagline: string;
  description: string;
  category: "web" | "mobile" | "ai";
  stack: string[];
  role: string;
  problem: string;
  solution: string;
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  preview?: string;
  embeddable?: boolean;
  isAuto: boolean;
  thumbnail?: string;
  order?: number;
  pushedAt?: string;
}

/**
 * Normalize homepage URL: trim, ensure https, drop trailing slash.
 */
function normalizeHomepage(url: string | null): string | null {
  if (!url) return null;
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }
  try {
    const parsed = new URL(normalized);
    normalized = `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(/\/$/, "");
    return normalized;
  } catch {
    return null;
  }
}

function guessCategory(topics: string[], language: string | null): "web" | "mobile" | "ai" {
  const lowerTopics = topics.map((t) => t.toLowerCase());
  const lowerLang = (language || "").toLowerCase();
  if (
    lowerTopics.some((t) => t.includes("flutter") || t.includes("dart") || t.includes("android") || t.includes("ios")) ||
    lowerLang === "dart"
  ) {
    return "mobile";
  }
  if (
    lowerTopics.some((t) => t.includes("ai") || t.includes("ml") || t.includes("machine-learning") || t.includes("llm")) ||
    lowerLang === "python"
  ) {
    return "ai";
  }
  return "web";
}

function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getExcludeList(): string[] {
  return siteConfig.githubExclude || [];
}

/**
 * Check if a URL is embeddable by inspecting X-Frame-Options and CSP frame-ancestors.
 */
async function checkEmbeddable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return false;

    const xfo = res.headers.get("x-frame-options");
    if (xfo && /DENY|SAMEORIGIN/i.test(xfo)) return false;

    const csp = res.headers.get("content-security-policy");
    if (csp) {
      const frameAncestorsMatch = csp.match(/frame-ancestors\s+([^;]+)/i);
      if (frameAncestorsMatch) {
        const ancestors = frameAncestorsMatch[1].trim();
        if (ancestors !== "*" && !ancestors.includes("'self'") && !ancestors.includes("*")) {
          return false;
        }
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch public repos for the configured GitHub user.
 */
async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const username = process.env.GITHUB_USERNAME || "tikature";
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      {
        headers,
      }
    );
    if (!res.ok) {
      console.warn(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }
    const data: GitHubRepo[] = await res.json();
    return data;
  } catch (err) {
    console.warn("GitHub fetch failed:", err);
    return [];
  }
}

/**
 * Merge curated projects with GitHub repos.
 * New rule: a project card exists ONLY if a public GitHub repo backs it.
 * Curated data becomes optional ENRICHMENT keyed by exact repo name (case-insensitive).
 * Curated entry with no matching repo is ignored (dev warning printed).
 */
export async function getProjects(): Promise<MergedProject[]> {
  const repos = await fetchGitHubRepos();
  const exclude = new Set(getExcludeList());
  const username = process.env.GITHUB_USERNAME || "tikature";

  // Eligible repos: public, not fork, not archived, not private, not profile repo, not excluded,
  // AND (has homepage OR has topic "portfolio")
  const eligibleRepos = repos.filter((repo) => {
    if (repo.fork || repo.archived || repo.private) return false;
    if (repo.name === username) return false;
    if (exclude.has(repo.name)) return false;
    const hasHomepage = !!repo.homepage && repo.homepage.trim() !== "";
    const hasPortfolioTopic = repo.topics.some((t) => t.toLowerCase() === "portfolio");
    return hasHomepage || hasPortfolioTopic;
  });

  // Normalize homepage for those that have it
  const reposWithHomepage = eligibleRepos.map((repo) => ({
    ...repo,
    homepage: normalizeHomepage(repo.homepage),
  }));

  // Build curated enrichment map keyed by repo name (lowercase)
  const curatedByRepoName = new Map<string, typeof curatedProjects[0]>();
  curatedProjects.forEach((p) => {
    curatedByRepoName.set(p.slug.toLowerCase(), p);
  });

  const enriched: MergedProject[] = [];
  const auto: MergedProject[] = [];
  const matchedCuratedSlugs = new Set<string>();

  // Process eligible repos
  for (const repo of reposWithHomepage) {
    const curated = curatedByRepoName.get(repo.name.toLowerCase());
    const repoHomepage = repo.homepage;
    const repoDescription = repo.description?.trim() || "";
    const repoPushedAt = repo.pushed_at;

    if (curated) {
      matchedCuratedSlugs.add(curated.slug);
      // Curated fields override; GitHub fills missing
      const merged: MergedProject = {
        slug: repo.name, // use actual repo name as slug
        act: "", // will assign later
        title: curated.title,
        tagline: curated.tagline,
        description: curated.description || repoDescription,
        category: curated.category,
        stack: curated.stack.length ? curated.stack : (repo.topics.length ? repo.topics : (repo.language ? [repo.language] : [])),
        role: curated.role,
        problem: curated.problem,
        solution: curated.solution,
        highlights: curated.highlights,
        liveUrl: curated.liveUrl || repoHomepage || undefined,
        repoUrl: curated.repoUrl || repo.html_url,
        featured: curated.featured,
        isAuto: false,
        embeddable: false,
        order: curated.order,
        pushedAt: repoPushedAt,
      };
      enriched.push(merged);
    } else {
      // Auto card
      const category = guessCategory(repo.topics, repo.language);
      const merged: MergedProject = {
        slug: repo.name,
        act: "",
        title: humanizeRepoName(repo.name),
        tagline: repoDescription,
        description: repoDescription,
        category,
        stack: repo.topics.length ? repo.topics : (repo.language ? [repo.language] : []),
        role: "Full-Stack Developer",
        problem: "",
        solution: "",
        highlights: [],
        liveUrl: repoHomepage || undefined,
        repoUrl: repo.html_url,
        featured: true,
        isAuto: true,
        embeddable: false,
        pushedAt: repoPushedAt,
      };
      auto.push(merged);
    }
  }

  // Dev-only warning for curated entries with no matching repo
  if (process.env.NODE_ENV !== "production") {
    for (const curated of curatedProjects) {
      if (!matchedCuratedSlugs.has(curated.slug)) {
        console.warn(`curated entry ${curated.slug} has no matching GitHub repo`);
      }
    }
  }

  // Compute embeddable for up to 12 projects (enriched + auto) in parallel
  const allForEmbeddable = [...enriched, ...auto].slice(0, 12);
  const embeddableChecks = allForEmbeddable.map(async (proj) => ({
    slug: proj.slug,
    embeddable: proj.liveUrl ? await checkEmbeddable(proj.liveUrl) : false,
  }));
  const embeddableResults = await Promise.allSettled(embeddableChecks);
  const embeddableMap = new Map<string, boolean>();
  embeddableResults.forEach((result) => {
    if (result.status === "fulfilled") {
      embeddableMap.set(result.value.slug, result.value.embeddable);
    }
  });

  // Assign embeddable
  [...enriched, ...auto].forEach((p) => {
    p.embeddable = embeddableMap.get(p.slug) ?? false;
  });

  // Ordering: enriched with order first (by order), then the rest by pushed_at desc
  const enrichedWithOrder = enriched.filter((p) => typeof p.order === "number").sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const rest = [...enriched.filter((p) => typeof p.order !== "number"), ...auto].sort((a, b) => {
    const ta = a.pushedAt ? new Date(a.pushedAt).getTime() : 0;
    const tb = b.pushedAt ? new Date(b.pushedAt).getTime() : 0;
    return tb - ta;
  });

  const ordered = [...enrichedWithOrder, ...rest];

  // Assign act numerals (Roman)
  function intToRoman(num: number): string {
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return roman[num] || num.toString();
  }
  ordered.forEach((p, idx) => {
    p.act = `Act ${intToRoman(idx + 1)}`;
  });

  // Resolve thumbnails for all projects
  const thumbnailResults = await resolveThumbnailsForProjects(ordered);
  return ordered.map((p) => ({
    ...p,
    thumbnail: thumbnailResults.get(p.slug)?.url ?? undefined,
  }));
}