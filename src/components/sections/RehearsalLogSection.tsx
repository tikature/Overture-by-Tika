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
    "bg-vintageBurgundy/60",
    "bg-wineRed/80",
    "bg-cream",
  ];

  function getIntensityClass(count: number) {
    const ratio = count / maxWeekTotal;
    const idx = Math.min(4, Math.floor(ratio * 5));
    return intensityColors[idx];
  }

  return (
    <section id="activity" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-darkCream/20 bg-darkBurgundy/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-ivoryCream font-opera font-bold">GITHUB ACTIVITY</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-display font-extrabold text-cream tracking-tight leading-[1.15]">
            The Rehearsal Log
          </h2>
          <p className="mt-4 text-softCream/85 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Public work, straight from the repository.
          </p>
        </div>

        <article className="bg-obsidianBurgundy border border-darkCream/20 rounded-3xl p-6 lg:p-8 opera-border-hover">
          <div className="grid grid-cols-12 gap-8">
            {/* Heatmap + stats */}
            <div className="lg:col-span-8">
              <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-ivoryCream mb-4">
                Contribution Calendar (Last Year)
              </h3>
              <div className="overflow-x-auto" role="img" aria-label={`GitHub contributions heatmap. Total contributions: ${contributions.total}. Longest streak: ${contributions.longestStreak} days. Current streak: ${contributions.currentStreak} days.`}>
                <div className="grid grid-cols-53 gap-1 min-w-max" style={{ gridTemplateColumns: "repeat(53, 10px)" }}>
                  {rawWeeks.length > 0 ? (
                    rawWeeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-1" style={{ minWidth: "10px" }}>
                        {week.contributionDays.map((day, dayIdx) => (
                          <div
                            key={dayIdx}
                            className={`w-[10px] h-[10px] rounded ${getIntensityClass(day.contributionCount)}`}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                            style={{ width: "10px", height: "10px" }}
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    // fallback: empty grid with 53 columns
                    Array.from({ length: 53 }).map((_, i) => (
                      <div key={i} className="flex flex-col gap-1" style={{ minWidth: "10px" }}>
                        <div className="w-[10px] h-[10px] rounded bg-oxblood/30" style={{ width: "10px", height: "10px" }} />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Month labels */}
              <div className="flex gap-px mt-2 overflow-x-auto min-w-max" style={{ gridTemplateColumns: "repeat(53, 10px)" }}>
                {Array.from({ length: 53 }).map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (52 - i) * 7);
                  const isMonthStart = date.getDate() <= 7;
                  return (
                    <div
                      key={i}
                      className="w-[10px] text-[9px] text-warmCream/50 font-opera uppercase tracking-wider text-center"
                      style={{ width: "10px" }}
                    >
                      {isMonthStart ? date.toLocaleDateString("en-US", { month: "short" }) : ""}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-6 text-xs text-warmCream/70">
                <span>Less</span>
                <div className="flex gap-1">
                  {intensityColors.map((c, i) => (
                    <div key={i} className={`w-5 h-5 rounded ${c}`} />
                  ))}
                </div>
                <span>More</span>
              </div>

              {/* Stats tiles */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-darkBurgundy/60 border border-darkCream/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-cream">{contributions.total}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-warmCream/70 mt-1">Contributions (yr)</div>
                </div>
                <div className="bg-darkBurgundy/60 border border-darkCream/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-cream">{contributions.longestStreak}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-warmCream/70 mt-1">Longest Streak</div>
                </div>
                <div className="bg-darkBurgundy/60 border border-darkCream/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-cream">{contributions.currentStreak}</div>
                  <div className="text-[11px] font-opera uppercase tracking-wider text-warmCream/70 mt-1">Current Streak</div>
                </div>
              </div>
            </div>

            {/* Right side: Top languages + Latest cues */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-ivoryCream mb-4">
                  Tonight&apos;s Programme
                </h3>
                <p className="text-[11px] font-opera uppercase tracking-wider text-warmCream/70 mb-3">By repositories</p>
                <div className="space-y-3">
                  {topLanguages.slice(0, 6).map((lang) => (
                    <div key={lang.language}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-opera uppercase tracking-wider text-cream">{lang.language}</span>
                        <span className="text-warmCream/70">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 bg-oxblood rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cream to-wineRed rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-opera font-bold uppercase tracking-wider text-ivoryCream mb-4">
                  Latest Cues
                </h3>
                <ul className="space-y-3" role="list">
                  {latestCommits.length === 0 ? (
                    <li className="text-softCream/60 text-sm">No recent public commits.</li>
                  ) : (
                    latestCommits.map((commit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-darkBurgundy border border-darkCream/30 flex items-center justify-center mt-0.5" aria-hidden="true">
                          <LucideHeart className="w-3 h-3 text-wineRed drop-shadow-[0_0_6px_rgba(155,29,48,0.75)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-cream font-body truncate">
                            <span className="font-opera text-[10px] uppercase tracking-wider text-warmCream/70 mr-1">{commit.repo}</span>
                            {commit.message}
                          </p>
                          <p className="text-[11px] font-opera uppercase tracking-wider text-warmCream/50 mt-0.5">
                            {new Date(commit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-darkCream/20">
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-opera font-bold uppercase tracking-wider text-cream hover:text-ivoryCream transition-colors"
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