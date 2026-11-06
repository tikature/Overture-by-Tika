import { siteConfig } from "@/data/site";

interface ContributionCalendar {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number;
      date: string;
    }>;
  }>;
}

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  total_commit_contributions_last_year?: number;
}

interface GitHubRepo {
  fork: boolean;
  archived: boolean;
  language: string | null;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: { commits: Array<{ message: string }> };
  created_at: string;
}

export interface ActivityData {
  contributions: {
    total: number;
    longestStreak: number;
    currentStreak: number;
    weeks: Array<{ weekStart: string; total: number }>;
    rawWeeks: ContributionCalendar["weeks"]; // for heatmap
  };
  topLanguages: Array<{ language: string; count: number; percentage: number }>;
  latestCommits: Array<{
    repo: string;
    message: string;
    date: string;
  }>;
  profile: {
    publicRepos: number;
    followers: number;
  };
}

function calculateStreaks(weeks: ContributionCalendar["weeks"]): { longest: number; current: number } {
  let longest = 0;
  let current = 0;
  let temp = 0;
  const today = new Date().toISOString().split("T")[0];

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) {
        temp++;
        if (day.date === today) current = temp;
      } else {
        if (temp > longest) longest = temp;
        temp = 0;
      }
    }
  }
  if (temp > longest) longest = temp;
  return { longest, current };
}

async function fetchContributionCalendar(username: string, token?: string): Promise<ContributionCalendar | null> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || process.env.GITHUB_TOKEN || ""}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.user?.contributionsCollection?.contributionCalendar ?? null;
}

async function fetchUserProfile(username: string, token?: string): Promise<GitHubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token || process.env.GITHUB_TOKEN || ""}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchRepos(username: string, token?: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=public`, {
    headers: {
      Authorization: `Bearer ${token || process.env.GITHUB_TOKEN || ""}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const repos = await res.json();
  return repos.filter((r: GitHubRepo) => !r.fork && !r.archived);
}

async function fetchPushEvents(username: string, token?: string): Promise<GitHubEvent[]> {
  const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=50`, {
    headers: {
      Authorization: `Bearer ${token || process.env.GITHUB_TOKEN || ""}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const events = await res.json();
  return events.filter((e: GitHubEvent) => e.type === "PushEvent");
}

function computeTopLanguages(repos: GitHubRepo[]): Array<{ language: string; count: number; percentage: number }> {
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .map(([language, count]) => ({ language, count, percentage: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count);
}

function extractLatestCommits(events: GitHubEvent[]) {
  const commits = [];
  for (const event of events) {
    if (commits.length >= 5) break;
    for (const commit of event.payload.commits) {
      if (commits.length >= 5) break;
      const message = commit.message.split("\n")[0].slice(0, 80);
      commits.push({
        repo: event.repo.name,
        message,
        date: event.created_at,
      });
    }
  }
  return commits;
}

function fallbackHeatmap(events: GitHubEvent[]) {
  const map: Record<string, number> = {};
  const now = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    map[key] = 0;
  }
  for (const event of events) {
    const day = event.created_at.split("T")[0];
    if (map[day] !== undefined) map[day]++;
  }
  const days = Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
  const weeks: Array<{ weekStart: string; total: number }> = [];
  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7);
    weeks.push({
      weekStart: week[0]?.date ?? "",
      total: week.reduce((s, d) => s + d.count, 0),
    });
  }
  return { weeks, total: days.reduce((s, d) => s + d.count, 0) };
}

export async function getActivityData(): Promise<ActivityData | null> {
  const username = siteConfig.github.replace("https://github.com/", "");
  const token = process.env.GITHUB_TOKEN;

  try {
    const [calendar, profile, repos, events] = await Promise.all([
      fetchContributionCalendar(username, token),
      fetchUserProfile(username, token),
      fetchRepos(username, token),
      fetchPushEvents(username, token),
    ]);

    if (!calendar || !profile) {
      // fallback to simple events-based heatmap
      const fallback = fallbackHeatmap(events);
      const languages = computeTopLanguages(repos);
      return {
        contributions: {
          total: fallback.total,
          longestStreak: 0,
          currentStreak: 0,
          weeks: fallback.weeks,
          rawWeeks: [], // fallback has no day-level data
        },
        topLanguages: languages,
        latestCommits: extractLatestCommits(events),
        profile: {
          publicRepos: profile?.public_repos ?? 0,
          followers: profile?.followers ?? 0,
        },
      };
    }

    const streaks = calculateStreaks(calendar.weeks);
    const weeks = calendar.weeks.map((w) => ({
      weekStart: w.contributionDays[0]?.date ?? "",
      total: w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
    }));

    const languages = computeTopLanguages(repos);

    return {
      contributions: {
        total: calendar.totalContributions,
        longestStreak: streaks.longest,
        currentStreak: streaks.current,
        weeks,
        rawWeeks: calendar.weeks,
      },
      topLanguages: languages,
      latestCommits: extractLatestCommits(events),
      profile: {
        publicRepos: profile.public_repos,
        followers: profile.followers,
      },
    };
  } catch {
    return null;
  }
}