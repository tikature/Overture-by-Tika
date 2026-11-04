"use client";

import React from "react";
import { motion } from "motion/react";
import { experiences } from "@/data/experience";

export default function ExperienceTimeline() {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs uppercase tracking-[0.25em] text-darkCream font-opera font-bold mb-2">
            THE JOURNEY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display">
            Experience
          </h2>
        </div>

        <div className="flex flex-col space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative pl-8 lg:pl-12 border-l border-darkCream/20"
            >
              <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-cream shadow-[0_0_10px_#FFF5E1]" />
              <div className="absolute left-0 top-6 bottom-0 w-0.5 bg-darkCream/20" />
              
              <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-6 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-cream font-bold text-lg font-display">{exp.role}</h3>
                    <p className="text-warmCream/80 text-sm mt-1 font-opera uppercase tracking-wider">{exp.org}</p>
                  </div>
                  <p className="text-darkCream/70 text-xs font-body whitespace-nowrap">{exp.period}</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="text-softCream/80 text-sm font-body flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cream mt-1.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {exp.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech, ti) => (
                      <span key={ti} className="text-[11px] font-opera px-2.5 py-1 rounded-md bg-darkBurgundy/80 text-ivoryCream border border-darkCream/25">
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
    </section>
  );
}