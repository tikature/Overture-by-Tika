"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { LucideHeart, LucideDiamond, LucideExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function SpotlightSection() {
  const { t } = useI18n();
  const validly = projects.find((p) => p.slug === "validly");
  const eyebrowEn = "SPOTLIGHT";
  const eyebrowId = "SOROTAN";

  return (
    <section id="spotlight" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-darkCream/20 bg-darkBurgundy/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-ivoryCream font-opera font-bold">{t("spotlight.eyebrow")}</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-display font-extrabold text-cream tracking-tight leading-[1.15]">
            {t("spotlight.title")}
          </h2>
          <p className="mt-4 text-softCream/85 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("spotlight.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Card: Validly - spans 2 cols on lg */}
          <article className="lg:col-span-2 relative bg-obsidianBurgundy border border-darkCream/20 rounded-3xl p-8 opera-border-hover overflow-hidden">
            {/* Decorative suit glyph */}
            <div className="absolute top-6 right-6 w-16 h-16 opacity-30" aria-hidden="true">
              <LucideHeart className="w-full h-full text-wineRed drop-shadow-[0_0_12px_rgba(155,29,48,0.75)] drop-shadow-[0_0_6px_rgba(255,245,225,0.45)]" />
            </div>

            <div className="mb-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur text-[10px] font-opera font-bold uppercase tracking-wider text-ivoryCream">
                <span className="w-1.5 h-1.5 rounded-full bg-wineRed"></span>
                Act I
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-cream mb-3">
              {validly?.title}
            </h3>
            <p className="text-softCream/80 text-sm leading-relaxed mb-6">
              {validly?.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {validly?.stack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 text-[10px] font-opera font-bold uppercase tracking-wider text-warmCream/90">
                  {tech}
                </span>
              ))}
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Copyright registered",
                "UAT signed off",
                "Extreme Programming"
              ].map((chip, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-ivoryCream/10 border border-ivoryCream/30 text-[10px] font-opera font-bold uppercase tracking-wider text-cream">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/productions/${validly?.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed text-cream text-xs font-opera font-bold tracking-wider uppercase border border-darkCream/40 shadow-[0_0_18px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream transition-all"
              >
                <span>{t("spotlight.caseStudy")}</span>
                <LucideExternalLink className="w-3.5 h-3.5" />
              </Link>
              {validly?.liveUrl && (
                <a
                  href={validly.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-obsidianBurgundy border border-darkCream/30 text-softCream text-xs font-opera font-bold tracking-wider uppercase hover:border-cream hover:text-cream transition-colors"
                >
                  <LucideExternalLink className="w-3.5 h-3.5" />
                  <span>{t("spotlight.liveSite")}</span>
                </a>
              )}
            </div>
          </article>

          {/* Small Card 1: Students mentored */}
          <article className="bg-obsidianBurgundy border border-darkCream/20 rounded-3xl p-6 opera-border-hover">
            <div className="absolute top-4 right-4 w-12 h-12 opacity-20" aria-hidden="true">
              <LucideDiamond className="w-full h-full text-cream drop-shadow-[0_0_12px_rgba(255,245,225,0.6)] drop-shadow-[0_0_18px_rgba(128,0,32,0.65)]" />
            </div>
            <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 text-[10px] font-opera font-bold uppercase tracking-wider text-ivoryCream">
              {t("spotlight.mentored.label")}
            </span>
            <h4 className="text-xl font-display font-bold text-cream mb-2">
              {t("spotlight.mentored.title")}
            </h4>
            <p className="text-softCream/80 text-sm leading-relaxed">
              {t("spotlight.mentored.desc")}
            </p>
          </article>

          {/* Small Card 2: Events chaired */}
          <article className="bg-obsidianBurgundy border border-darkCream/20 rounded-3xl p-6 opera-border-hover">
            <div className="absolute top-4 right-4 w-12 h-12 opacity-20" aria-hidden="true">
              <LucideHeart className="w-full h-full text-wineRed drop-shadow-[0_0_12px_rgba(155,29,48,0.75)] drop-shadow-[0_0_6px_rgba(255,245,225,0.45)]" />
            </div>
            <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 text-[10px] font-opera font-bold uppercase tracking-wider text-ivoryCream">
              {t("spotlight.events.label")}
            </span>
            <h4 className="text-xl font-display font-bold text-cream mb-2">
              {t("spotlight.events.title")}
            </h4>
            <p className="text-softCream/80 text-sm leading-relaxed">
              {t("spotlight.events.desc")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}