"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { LucideArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function SpotlightSection() {
  const { t } = useI18n();
  const validly = projects.find((p) => p.slug === "validly");

  return (
    <section id="spotlight" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-border/20 bg-bg-elevated/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-surface-strong/60 border border-border/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-ivory-cream font-opera font-bold">{t("spotlight.eyebrow")}</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl font-display font-extrabold text-fg tracking-tight leading-[1.15]">
            {t("spotlight.title")}
          </h2>
          <p className="mt-4 text-fg-muted/85 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("spotlight.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Card: Validly - spans 2 cols on lg */}
          <article className="lg:col-span-2 relative bg-surface border border-border/20 rounded-3xl p-8 opera-border-hover overflow-hidden">
            <div className="mb-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-strong/60 border border-border/30 backdrop-blur text-[10px] font-opera font-bold uppercase tracking-wider text-fg-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-strong" />
                Act I
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-3">
              {validly?.title}
            </h3>
            <p className="text-fg-muted/80 text-sm leading-relaxed mb-6">
              {validly?.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {validly?.stack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-surface-strong/60 border border-border/30 text-[10px] font-opera font-bold uppercase tracking-wider text-fg-subtle/90">
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
                <span key={idx} className="px-3 py-1 rounded-full bg-surface-strong/60 border border-border/30 text-[10px] font-opera font-bold uppercase tracking-wider text-fg">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {validly?.slug && (
                <Link
                  href={`/productions/${validly.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red text-fg text-xs font-opera font-bold tracking-wider uppercase border border-border/40 shadow-[0_0_18px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-fg transition-all"
                >
                  <span>{t("spotlight.caseStudy")}</span>
                  <LucideArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              {validly?.liveUrl && (
                <a
                  href={validly.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-strong border border-border/30 text-fg-muted text-xs font-opera font-bold tracking-wider uppercase hover:border-fg hover:text-fg transition-colors"
                >
                  <LucideArrowRight className="w-3.5 h-3.5" />
                  <span>{t("spotlight.liveSite")}</span>
                </a>
              )}
            </div>
          </article>

          {/* Small Card 1: Students mentored */}
          <article className="bg-surface border border-border/20 rounded-3xl p-6 opera-border-hover">
            <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-surface-strong/60 border border-border/30 text-[10px] font-opera font-bold uppercase tracking-wider text-fg-muted">
              {t("spotlight.mentored.label")}
            </span>
            <h4 className="text-xl font-display font-bold text-fg mb-2">
              {t("spotlight.mentored.title")}
            </h4>
            <p className="text-fg-muted/80 text-sm leading-relaxed">
              {t("spotlight.mentored.desc")}
            </p>
          </article>

          {/* Small Card 2: Events chaired */}
          <article className="bg-surface border border-border/20 rounded-3xl p-6 opera-border-hover">
            <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-surface-strong/60 border border-border/30 text-[10px] font-opera font-bold uppercase tracking-wider text-fg-muted">
              {t("spotlight.events.label")}
            </span>
            <h4 className="text-xl font-display font-bold text-fg mb-2">
              {t("spotlight.events.title")}
            </h4>
            <p className="text-fg-muted/80 text-sm leading-relaxed">
              {t("spotlight.events.desc")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}