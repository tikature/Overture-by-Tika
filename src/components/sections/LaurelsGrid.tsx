"use client";

import React from "react";
import { motion } from "motion/react";
import { useI18n } from "@/components/providers/I18nProvider";
import { certificates } from "@/data/certificates";
import { siteConfig } from "@/data/site";
import { LucideArrowRight } from "lucide-react";

export default function LaurelsGrid() {
  const { t } = useI18n();
  const featured = certificates.filter((c) => c.featured);
  const totalCount = certificates.length;

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs uppercase tracking-[0.25em] text-fg-muted font-opera font-bold mb-2">
            THE HALL OF FAME
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-fg font-display">
            Laurels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured certificates */}
          {featured.map((cert, i) => (
            <motion.article
              key={cert.credentialId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-border/20 rounded-2xl p-6 opera-border-hover flex flex-col h-full"
            >
              <div className="text-xs uppercase tracking-wider text-wine-red font-opera font-bold mb-2">
                {cert.issuer}
              </div>
              <h3 className="text-fg font-bold text-lg font-display mb-2">{cert.title}</h3>
              <div className="space-y-1 text-xs text-fg-subtle/70 font-body">
                {cert.year && <p>Conferred: {cert.year}</p>}
                {cert.credentialId && <p>Credential: {cert.credentialId}</p>}
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-opera font-bold text-fg-subtle hover:text-fg transition-colors mt-4 pt-4 border-t border-border/10"
                >
                  <span>{t("laurels.verify") || "Verify"}</span>
                  <LucideArrowRight className="w-3 h-3 text-wine-red" />
                </a>
              )}
            </motion.article>
          ))}

          {/* See more card */}
          <motion.a
            key="see-more"
            href={siteConfig.linkedinCertificationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("laurels.viewAllAria")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: featured.length * 0.1 }}
            className="bg-surface border-2 border-dashed border-border/30 rounded-2xl p-6 opera-border-hover flex flex-col h-full items-center justify-center text-center hover:border-fg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fg focus:ring-offset-2 focus:ring-offset-bg"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(128,0,32,0.6)] group-hover:translate-x-1 transition-transform duration-300">
              <LucideArrowRight className="w-8 h-8 text-fg" />
            </div>
            <h3 className="text-fg font-bold text-lg font-display mb-1">{t("laurels.viewAllTitle")}</h3>
            <p className="text-fg-muted/80 text-sm font-body">{t("laurels.viewAllCount", { count: String(totalCount) })}</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}