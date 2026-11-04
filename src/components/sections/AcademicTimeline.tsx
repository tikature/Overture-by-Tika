"use client";

import React from "react";
import { motion } from "motion/react";
import { education } from "@/data/education";

export default function AcademicTimeline() {
  return (
    <div className="flex flex-col space-y-8">
      {education.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="relative pl-8 lg:pl-12 border-l border-darkCream/20"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-cream shadow-[0_0_10px_#FFF5E1]" />
          
          {/* Timeline line continues */}
          <div className="absolute left-0 top-6 bottom-0 w-0.5 bg-darkCream/20" />
          
          <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all">
            <h3 className="text-cream font-bold text-lg font-display">{edu.degree}</h3>
            <p className="text-warmCream/80 text-sm mt-1 font-opera uppercase tracking-wider">
              {edu.institution}
            </p>
            <p className="text-darkCream/70 text-xs mt-2">{edu.location} · {edu.period}</p>
            {edu.gpa && (
              <p className="text-ivoryCream text-xs mt-1">GPA: {edu.gpa}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}