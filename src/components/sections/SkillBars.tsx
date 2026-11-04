"use client";

import React from "react";
import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";

const levelWidths = {
  Advanced: "90%",
  Proficient: "70%",
  Familiar: "45%",
};

export default function SkillBars() {
  return (
    <div className="space-y-10">
      {skillCategories.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: catIndex * 0.1 }}
        >
          <h4 className="text-cream font-opera uppercase tracking-wider text-sm mb-4 font-semibold">
            {category.name}
          </h4>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ width: 0 }}
                whileInView={{ width: levelWidths[skill.level] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: catIndex * 0.1 + skillIndex * 0.05, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-softCream text-sm font-body">{skill.name}</span>
                  <span className="text-xs font-opera uppercase tracking-wider text-darkCream">
                    {skill.level}
                  </span>
                </div>
                <div className="h-2 bg-darkBurgundy rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}