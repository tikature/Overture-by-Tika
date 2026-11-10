import { getActivityData } from "@/lib/github-activity";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { LucideHeart, LucideGithub } from "lucide-react";

export default async function RehearsalLogSection() {
  const data = await getActivityData();
  if (!data) return null;

  const { contributions, topLanguages, latestCommits } = data;
  const rawWeeks = contributions.rawWeeks ?? [];

  const maxWeekTotal = Math.max(...contributions.weeks.map((w) => w.total), 1);
  const intensityColors = [
    "bg-oxblood/30",
    "bg-burgundy/40",
    "bg-vintage-burgundy/60",
    "bg-wine-red/80",
    "bg-cream",
  ];

  function getIntensityClass(count: number) {
    const ratio = count / maxWeekTotal;
    const idx = Math.min(4, Math.floor(ratio * 5));
    return intensityColors[idx];
  }

  return (
    <section id="activity" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-border/20 bg-surface-strong/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-surface-strong/60 border border-border/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-ivory-cream font-opera font-bold">GITHUB ACTIVITY</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-display font-extrabold text-fg tracking-tight leading-[1.15]">
            The Rehearsal Log
          </h2>
          <p className="mt-4 text-fg-muted/85 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Public work, straight from the repository.
          </p>
        </div>

        <article className="bg-surface border border-border/20 rounded-3xl p-6 lg:p-8 opera-border-hover">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Heatmap + stats */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-fg-muted mb-4">
                Contribution Calendar (Last Year)
              </h3>
              <div className="overflow-x-auto" role="img" aria-label={`GitHub contributions heatmap. Total contributions: ${contributions.total}. Longest streak: ${contributions.longestStreak} days. Current streak: ${contributions.currentStreak} days.`}>
                <div className="min-w-max">
                  {/* Heatmap grid */}
                  <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(53, 8px)" }}>
                    {rawWeeks.length > 0 ? (
                      rawWeeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1" style={{ minWidth: "8px" }}>
                          {week.contributionDays.map((day, dayIdx) => (
                            <div
                              key={dayIdx}
                              className={`rounded ${getIntensityClass(day.contributionCount)} w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] lg:w-[12px] lg:h-[12px]`}
                              title={`${day.contributionCount} contributions on ${day.date}`}
                              style={{ width: "8px", height: "8px" }}
                            />
                          ))}
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 53 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1" style={{ minWidth: "8px" }}>
                          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] lg:w-[12px] lg:h-[12px] rounded bg-oxblood/30" style={{ width: "8px", height: "8px" }} />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Month labels - aligned with heatmap columns */}
                  <div className="flex gap-1 mt-2" style={{ gridTemplateColumns: "repeat(53, 8px)" }}>
                    {Array.from({ length: 53 }).map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - (52 - i) * 7);
                      const isMonthStart = date.getDate() <= 7;
                      return (
                        <div
                          key={i}
                          className="w-[8px] sm:w-[10px] lg:w-[12px] text-[8px] sm:text-[9px] lg:text-[10px] text-fg-subtle/50 font-opera uppercase tracking-wider text-center whitespace-nowrap overflow-hidden"
                          style={{ width: "8px" }}
                        >
                          {isMonthStart ? date.toLocaleDateString("en-US", { month: "short" }) : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-fg-subtle/70">
                <span>Less</span>
                <div className="flex gap-1">
                  {intensityColors.map((c, i) => (
                    <div key={i} className={`w-5 h-5 rounded ${c}`} />
                  ))}
                </div>
                <span>More</span>
              </div>

              {/* Stats tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-surface-strong/60 border border-border/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-fg">{contributions.total}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-fg-subtle/70 mt-1">Contributions (yr)</div>
                </div>
                <div className="bg-surface-strong/60 border border-border/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-fg">{contributions.longestStreak}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-fg-subtle/70 mt-1">Longest Streak</div>
                </div>
                <div className="bg-surface-strong/60 border border-border/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-fg">{contributions.currentStreak}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-fg-subtle/70 mt-1">Current Streak</div>
                </div>
              </div>
            </div>

            {/* Right side: Top languages + Latest cues */}
            <div className="lg:w-96 space-y-8 shrink-0">
              <div>
                <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-fg-muted mb-4">
                  Tonight&apos;s Programme
                </h3>
                <p className="text-[11px] font-opera uppercase tracking-wider text-fg-subtle/70 mb-3">By repositories</p>
                <div className="space-y-3">
                  {topLanguages.slice(0, 6).map((lang) => (
                    <div key={lang.language}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-opera uppercase tracking-wider text-fg">{lang.language}</span>
                        <span className="text-fg-subtle/70">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 bg-oxblood rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cream to-wine-red rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-fg-muted mb-4">
                  Latest Cues
                </h3>
                <ul className="space-y-3" role="list">
                  {latestCommits.length === 0 ? (
                    <li className="text-fg-muted/60 text-sm">No recent public commits.</li>
                  ) : (
                    latestCommits.map((commit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-strong border border-border/30 flex items-center justify-center mt-0.5" aria-hidden="true">
                          <LucideHeart className="w-3 h-3 text-wine-red drop-shadow-[0_0_6px_rgba(155,29,48,0.75)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-fg font-body truncate">
                            <span className="font-opera text-[10px] uppercase tracking-wider text-fg-subtle/70 mr-1">{commit.repo}</span>
                            {commit.message}
                          </p>
                          <p className="text-[11px] font-opera uppercase tracking-wider text-fg-subtle/50 mt-0.5">
                            {new Date(commit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-border/20">
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-opera font-bold uppercase tracking-wider text-fg hover:text-fg-muted transition-colors"
                >
                  <LucideGithub className="w-4 h-4" />
                  View all on GitHub
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}