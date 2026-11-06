"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import AcademicTimeline from "./AcademicTimeline";
import SkillBars from "./SkillBars";
import ExperienceTimeline from "./ExperienceTimeline";

export default function RepertoireSection() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs uppercase tracking-[0.25em] text-darkCream font-opera font-bold mb-2">
            MASTERCLASS & REPERTOIRE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display">
            Masterclass & <span className="italic text-darkCream font-serif">Repertoire</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Academic Lineage + The Journey */}
          <div className="space-y-12">
            <div>
              <h3 className="text-cream font-bold text-lg mb-6 font-opera uppercase tracking-wider">
                Academic Lineage
              </h3>
              <AcademicTimeline />
            </div>

            <div id="experience">
              <h3 className="text-cream font-bold text-lg mb-6 font-opera uppercase tracking-wider">
                {t("experience.eyebrow")}
              </h3>
              <ExperienceTimeline />
            </div>
          </div>

          {/* Right: Technical Proficiency */}
          <div className="lg:sticky lg:top-28">
            <h3 className="text-cream font-bold text-lg mb-6 font-opera uppercase tracking-wider">
              Technical Proficiency
            </h3>
            <SkillBars />
          </div>
        </div>
      </div>
    </section>
  );
}