"use client";

import React from "react";
import { motion } from "motion/react";
import { certificates } from "@/data/certificates";
import { LucideArrowUpRight } from "lucide-react";

export default function LaurelsGrid() {
  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs uppercase tracking-[0.25em] text-darkCream font-opera font-bold mb-2">
            THE HALL OF FAME
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display">
            Laurels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-obsidianBurgundy border border-darkCream/20 rounded-2xl p-6 opera-border-hover flex flex-col"
            >
              <div className="text-xs uppercase tracking-wider text-wineRed font-opera font-bold mb-2">
                {cert.issuer}
              </div>
              <h3 className="text-cream font-bold text-lg font-display mb-2">{cert.title}</h3>
              <p className="text-softCream/80 text-sm font-body mb-4 flex-1">{cert.description}</p>
              <div className="space-y-1 text-xs text-darkCream/70 font-body">
                {cert.year && <p>Conferred: {cert.year}</p>}
                {cert.credentialId && <p>Credential: {cert.credentialId}</p>}
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors mt-4 pt-4 border-t border-darkCream/10"
                >
                  <span>Verify</span>
                  <LucideArrowUpRight className="w-3 h-3 text-wineRed" />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}