"use client";

import React from "react";
import { motion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { getExperiencesByType } from "@/data/experience";

export default function ExperienceTimeline() {
  const { t } = useI18n();
  const [filter, setFilter] = React.useState<"work" | "organization">("work");
  const filtered = getExperiencesByType(filter);

  if (filtered.length === 0) return null;

  return (
    <div>
      {/* Work / Organizations toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilter("work")}
          className={`text-xs font-opera uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
            filter === "work"
              ? "bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red text-fg shadow-[0_0_12px_rgba(128,0,32,0.6)]"
              : "text-fg-subtle/70 border-border/25 hover:text-fg hover:border-fg"
          }`}
        >
          {t("experience.tabs.work")}
        </button>
        <button
          onClick={() => setFilter("organization")}
          className={`text-xs font-opera uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
            filter === "organization"
              ? "bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red text-fg shadow-[0_0_12px_rgba(128,0,32,0.6)]"
              : "text-fg-subtle/70 border-border/25 hover:text-fg hover:border-fg"
          }`}
        >
          {t("experience.tabs.organizations")}
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {filtered.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 border-l border-border/20"
          >
            <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
            <div className="absolute left-0 top-5 bottom-0 w-0.5 bg-border/20" />

            <div className="bg-surface/80 border border-border/20 p-5 rounded-2xl backdrop-blur-md hover:border-border transition-all">
              <div className="flex flex-col gap-1 mb-3">
                <h3 className="text-fg font-bold text-lg font-display">
                  {exp.role}
                </h3>
                <p className="text-fg-subtle/80 text-sm font-opera uppercase tracking-wider">
                  {exp.org}
                </p>
                <p className="text-fg-muted/70 text-xs font-body">
                  {exp.period}
                </p>
              </div>

              <ul className="space-y-1.5 mb-4">
                {exp.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    className="text-fg-muted/80 text-sm font-body flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cream mt-1.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {exp.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] font-opera px-2 py-0.5 rounded bg-surface-strong/80 text-fg-muted border border-border/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}