import React from "react";
import { techEnsembleChips } from "@/data/skills";
import { LucideMusic, LucideAtom, LucideTriangle, LucideWind } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "React JS": <LucideAtom className="w-4 h-4 text-ivoryCream" />,
  "Vue JS": <LucideTriangle className="w-4 h-4 text-darkCream" />,
  "Tailwind CSS": <LucideWind className="w-4 h-4 text-ivoryCream" />,
  "Next JS": (
    <span className="w-4 h-4 rounded-full bg-cream text-deepAbyss text-[10px] font-black flex items-center justify-center">
      N
    </span>
  ),
  TypeScript: (
    <span className="w-4 h-4 rounded bg-burgundy text-cream text-[10px] font-bold flex items-center justify-center border border-darkCream/40">
      TS
    </span>
  ),
};

export default function TechTicker() {
  return (
    <section
      id="tech"
      className="py-7 border-y border-darkCream/20 bg-darkBurgundy/35 backdrop-blur-md"
      data-purpose="tech-stack-strip"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 min-w-0">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-opera text-cream shrink-0 min-w-0">
          <LucideMusic className="w-4 h-4 text-wineRed" />
          <span>The Technical Ensemble</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-softCream overflow-x-auto pb-2 min-w-0" style={{ scrollbarWidth: 'none' }}>
          {techEnsembleChips.map((tech) => (
            <div
              key={tech}
              className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-obsidianBurgundy/90 border border-darkCream/25 hover:border-cream transition-colors shrink-0 whitespace-nowrap"
            >
              {iconMap[tech] || null}
              <span className="font-opera font-semibold text-xs tracking-wider text-cream">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
