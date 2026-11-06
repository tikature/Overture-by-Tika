"use client";

import React from "react";
import { MergedProject } from "@/lib/projects-source";
import { LucideArrowUpRight, LucideGithub, LucideMonitor, LucideMousePointer2 } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import Image from "next/image";

function ThumbnailImage({ src }: { src: string }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-deepAbyss flex items-center justify-center">
        <svg className="w-12 h-12 text-burgundy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h6v6H9V9z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-deepAbyss">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-top transition-opacity duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deepAbyss via-deepAbyss/50 to-transparent pointer-events-none" />
    </div>
  );
}

interface ProductionsGridProps {
  projects: MergedProject[];
}

const categoryLabels: Record<"web" | "mobile" | "ai", string> = {
  web: "Web",
  mobile: "Mobile",
  ai: "AI",
};

function intToRoman(num: number): string {
  const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return roman[num] || num.toString();
}

export default function ProductionsGrid({ projects }: ProductionsGridProps) {
  const { t } = useI18n();
  const [filter, setFilter] = React.useState<"all" | "web" | "mobile" | "ai">("all");
  const [modalOpen, setModalOpen] = React.useState<{ project: MergedProject; viewport: "desktop" | "mobile" } | null>(null);
  const [showAll, setShowAll] = React.useState(false);

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const categories: Array<"all" | "web" | "mobile" | "ai"> = ["all", "web", "mobile", "ai"];

  const openModal = (project: MergedProject, viewport: "desktop" | "mobile" = "desktop") => {
    setModalOpen({ project, viewport });
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && modalOpen) closeModal();
  };

  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    if (modalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <>
      <div className="space-y-8">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-xs font-opera font-semibold uppercase tracking-wider transition-colors ${
                filter === cat
                  ? "bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed text-cream shadow-[0_0_20px_rgba(128,0,32,0.7)]"
                  : "bg-obsidianBurgundy/90 border border-darkCream/25 text-softCream hover:border-cream hover:text-cream"
              }`}
            >
              {cat === "all" ? t("productions.filters.all") : t(`productions.filters.${cat}`)}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <article
              key={project.slug}
              className="bg-obsidianBurgundy border border-darkCream/20 rounded-2xl overflow-hidden opera-border-hover flex flex-col group shadow-xl"
            >
              {/* Preview area */}
              <div className="relative h-48 bg-deepAbyss overflow-hidden p-4 flex flex-col justify-between border-b border-darkCream/20">
                <div className="absolute inset-0 bg-gradient-to-br from-oxblood via-darkBurgundy/40 to-deepAbyss" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-opera px-2.5 py-0.5 rounded bg-burgundy/60 text-cream border border-darkCream/30">
                    {/* Roman numeral act */}
                    {(() => {
                      // Determine index in original merged order for roman numeral
                      const allIndex = projects.findIndex(p => p.slug === project.slug);
                      return intToRoman(allIndex + 1);
                    })()} • {categoryLabels[project.category]}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
                </div>
                <div className="relative z-10 bg-deepAbyss/90 rounded-lg p-3 border border-darkCream/25">
                  {/* Thumbnail or placeholder */}
{project.thumbnail ? (
                      <ThumbnailImage src={project.thumbnail} />
                    ) : (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-deepAbyss flex items-center justify-center">
                      {/* Stylized placeholder: faint browser-window outline + card-suit glyph */}
                      <svg className="w-12 h-12 text-burgundy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  )}
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
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors"
                    >
                      <span>View Production</span>
                      <LucideArrowUpRight className="w-4 h-4 text-wineRed" />
                    </a>
                  )}
                  {(!project.liveUrl || project.liveUrl === "") && (
                    <a
                      href={`/productions/${project.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors"
                    >
                      <span>View Production</span>
                      <LucideArrowUpRight className="w-4 h-4 text-wineRed" />
                    </a>
                  )}
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
                    {project.liveUrl && project.embeddable && (
                      <button
                        onClick={() => openModal(project, "desktop")}
                        aria-label={t("productions.livePreview")}
                        className="text-warmCream/80 hover:text-cream transition-colors"
                      >
                        <LucideMonitor className="w-4 h-4" />
                      </button>
                    )}
                    {project.liveUrl && !project.embeddable && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t("productions.openSite")}
                        className="text-warmCream/80 hover:text-cream transition-colors"
                      >
                        <LucideMousePointer2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show all button */}
        {filteredProjects.length > 6 && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 text-sm font-opera font-semibold uppercase tracking-wider text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed rounded-full hover:shadow-[0_0_20px_rgba(128,0,32,0.7)] transition-all"
            >
              {t("productions.showAll", { count: String(filteredProjects.length) })}
            </button>
          </div>
        )}
      </div>

      {/* Live Preview Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deepAbyss/90 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t("productions.livePreview")}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 my-8 bg-obsidianBurgundy border border-darkCream/20 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2 bg-darkBurgundy border-b border-darkCream/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-wineRed" />
                <div className="w-3 h-3 rounded-full bg-vintageBurgundy" />
                <div className="w-3 h-3 rounded-full bg-oxblood" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <input
                  type="text"
                  readOnly
                  value={modalOpen.project.liveUrl}
                  className="w-full max-w-md px-3 py-1.5 text-[11px] font-opera text-softCream bg-deepAbyss border border-darkCream/25 rounded-full truncate"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen((prev) => prev ? { ...prev, viewport: prev.viewport === "desktop" ? "mobile" : "desktop" } : null)}
                  className="px-2 py-1 text-[10px] font-opera uppercase tracking-wider text-softCream/80 hover:text-cream transition-colors"
                >
                  {modalOpen.viewport === "desktop" ? t("productions.mobileView") : t("productions.desktopView")}
                </button>
                <a
                  href={modalOpen.project.liveUrl!}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-[10px] font-opera font-bold uppercase tracking-wider text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed rounded-full hover:shadow-[0_0_15px_rgba(128,0,32,0.7)] transition-all"
                >
                  {t("productions.openInNewTab")}
                </a>
              </div>
            </div>
            {/* Iframe */}
            <div className={`relative ${modalOpen.viewport === "mobile" ? "flex items-center justify-center p-4" : "w-full h-[calc(100%-48px)]"}`}>
              <iframe
                src={modalOpen.project.liveUrl}
                className={`w-full ${modalOpen.viewport === "mobile" ? "w-[390px] h-[844px]" : "h-full"} border-0 bg-deepAbyss`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer"
                loading="lazy"
                title={modalOpen.project.title}
                style={{ opacity: modalOpen ? 1 : 0 }}
                onLoad={() => {}}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-deepAbyss animate-pulse pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-burgundy/50 border border-cream/20" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}