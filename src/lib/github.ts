import { projects as curatedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

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
    // drop trailing slash
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
 * Runs server-side only.
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
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
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
        next: { revalidate: 3600 }, // ISR 1 hour
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
 * Returns merged list (curated first, then auto cards sorted by pushed_at desc).
 */
export async function getMergedProjects(): Promise<MergedProject[]> {
  const repos = await fetchGitHubRepos();
  const exclude = new Set(getExcludeList());
  const username = process.env.GITHUB_USERNAME || "tikature";

  // Filter repos
  const filteredRepos = repos.filter((repo) => {
    if (repo.fork || repo.archived || repo.private) return false;
    if (repo.name === username) return false; // profile README repo
    if (exclude.has(repo.name)) return false;
    return !!repo.homepage;
  });

  // Normalize homepage
  const reposWithHomepage = filteredRepos.map((repo) => ({
    ...repo,
    homepage: normalizeHomepage(repo.homepage),
  })).filter((repo) => !!repo.homepage) as (GitHubRepo & { homepage: string })[];

  // Build lookup maps for curated projects
  const curatedByHomepage = new Map<string, typeof curatedProjects[0]>();
  const curatedBySlug = new Map<string, typeof curatedProjects[0]>();
  curatedProjects.forEach((p) => {
    if (p.liveUrl) {
      const norm = normalizeHomepage(p.liveUrl);
      if (norm) curatedByHomepage.set(norm, p);
    }
    curatedBySlug.set(p.slug, p);
  });

  // Merge
  const merged: MergedProject[] = [];
  const usedCurated = new Set<string>();

  // First pass: match repos to curated projects
  for (const repo of reposWithHomepage) {
    const matchedCurated = curatedByHomepage.get(repo.homepage!) || curatedBySlug.get(repo.name);
    if (matchedCurated) {
      usedCurated.add(matchedCurated.slug);
      merged.push({
        ...matchedCurated,
        // GitHub fills missing fields
        liveUrl: matchedCurated.liveUrl || repo.homepage,
        repoUrl: matchedCurated.repoUrl || repo.html_url,
        description: matchedCurated.description || repo.description || "",
        stack: matchedCurated.stack.length ? matchedCurated.stack : (repo.topics.length ? repo.topics : (repo.language ? [repo.language] : [])),
        isAuto: false,
        embeddable: false, // will be computed later
      });
    }
  }

  // Add remaining curated projects (those not matched)
  for (const curated of curatedProjects) {
    if (!usedCurated.has(curated.slug)) {
      merged.push({
        ...curated,
        isAuto: false,
        embeddable: false,
      });
    }
  }

  // Auto cards: repos not matched to any curated project
  const matchedRepoHomepages = new Set(merged.filter((m) => !m.isAuto).map((m) => m.liveUrl).filter(Boolean));
  const autoRepos = reposWithHomepage.filter((repo) => !matchedRepoHomepages.has(repo.homepage));

  // Compute embeddable for up to 12 projects in parallel
  const embeddableChecks = autoRepos.slice(0, 12).map(async (repo) => ({
    repo,
    embeddable: await checkEmbeddable(repo.homepage),
  }));
  const embeddableResults = await Promise.allSettled(embeddableChecks);
  const embeddableMap = new Map<string, boolean>();
  embeddableResults.forEach((result) => {
    if (result.status === "fulfilled") {
      embeddableMap.set(result.value.repo.name, result.value.embeddable);
    }
  });

  let actCounter = curatedProjects.length + 1;
  for (const repo of autoRepos) {
    const category = guessCategory(repo.topics, repo.language);
    merged.push({
      slug: repo.name,
      act: `Act ${actCounter++}`,
      title: humanizeRepoName(repo.name),
      tagline: repo.description || "No description provided",
      description: repo.description || "",
      category,
      stack: repo.topics.length ? repo.topics : (repo.language ? [repo.language] : []),
      role: "Full-Stack Developer",
      problem: "",
      solution: "",
      highlights: [],
      liveUrl: repo.homepage,
      repoUrl: repo.html_url,
      featured: true,
      isAuto: true,
      embeddable: embeddableMap.get(repo.name) ?? false,
    });
  }

  // Sort: curated first (already in order), then auto by pushed_at desc
  const curatedPart = merged.filter((p) => !p.isAuto);
  const autoPart = merged.filter((p) => p.isAuto).sort((a, b) => {
    const repoA = reposWithHomepage.find((r) => r.name === a.slug);
    const repoB = reposWithHomepage.find((r) => r.name === b.slug);
    if (!repoA || !repoB) return 0;
    return new Date(repoB.pushed_at).getTime() - new Date(repoA.pushed_at).getTime();
  });

  return [...curatedPart, ...autoPart];
}