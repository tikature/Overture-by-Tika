"use client";

import React from "react";
import { projects, ProjectCategory } from "@/data/projects";
import { LucideArrowUpRight, LucideGithub, LucideExternalLink } from "lucide-react";

const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  ai: "AI",
};

export default function ProductionsGrid() {
  const [filter, setFilter] = React.useState<"all" | ProjectCategory>("all");

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const categories: Array<"all" | ProjectCategory> = ["all", "web", "mobile", "ai"];

  return (
    <div className="space-y-8">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-opera font-semibold uppercase tracking-wider transition-colors ${
              filter === cat
                ? "bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed text-cream shadow-[0_0_20px_rgba(128,0,32,0.7)]"
                : "bg-obsidianBurgundy/90 border border-darkCream/25 text-softCream hover:border-cream hover:text-cream"
            }`}
          >
            {cat === "all" ? "All" : categoryLabels[cat as ProjectCategory]}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-obsidianBurgundy border border-darkCream/20 rounded-2xl overflow-hidden opera-border-hover flex flex-col group shadow-xl"
          >
            {/* Preview area */}
            <div className="relative h-48 bg-deepAbyss overflow-hidden p-4 flex flex-col justify-between border-b border-darkCream/20">
              <div className="absolute inset-0 bg-gradient-to-br from-oxblood via-darkBurgundy/40 to-deepAbyss" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-opera px-2.5 py-0.5 rounded bg-burgundy/60 text-cream border border-darkCream/30">
                  {project.act} • {categoryLabels[project.category]}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
              </div>
              <div className="relative z-10 bg-deepAbyss/90 rounded-lg p-3 border border-darkCream/25">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-wineRed" />
                  <div className="h-2 w-20 bg-darkBurgundy rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-oxblood/40 rounded" />
                  <div className="h-2 w-4/5 bg-oxblood/40 rounded" />
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-cream group-hover:text-darkCream transition-colors font-display mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-softCream/80 mb-4 leading-relaxed font-body">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[11px] font-opera px-2.5 py-1 rounded-md bg-darkBurgundy/80 text-ivoryCream border border-darkCream/25">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-darkCream/10">
                <a
                  href={`/productions/${project.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors"
                >
                  <span>View Production</span>
                  <LucideArrowUpRight className="w-4 h-4 text-wineRed" />
                </a>
                <div className="flex items-center space-x-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="text-warmCream/80 hover:text-cream transition-colors"
                    >
                      <LucideGithub className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      className="text-warmCream/80 hover:text-cream transition-colors"
                    >
                      <LucideExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}