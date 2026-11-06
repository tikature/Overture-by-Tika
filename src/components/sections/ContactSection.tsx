"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import ContactForm from "@/components/sections/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { LucideGithub, LucideLinkedin, LucideMail } from "lucide-react";
import { siteConfig } from "@/data/site";
import Image from "next/image";

export default function ContactSection() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-burgundy/10 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Decorative suit glyph divider */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/suits/heart.png"
            alt=""
            aria-hidden="true"
            className="w-12 h-12 opacity-60 filter drop-shadow-[0_0_12px_rgba(155,29,48,0.75)] drop-shadow-[0_0_6px_rgba(255,245,225,0.45)]"
            width={48}
            height={48}
          />
        </div>

        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={
            <>
              {t("contact.title").replace("to the Maestro", "")}{" "}
              <span className="italic text-darkCream font-serif">to the Maestro</span>
            </>
          }
        >
          {t("contact.subtitle")}
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-darkCream/20 bg-[#2A0B12]/60 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden opera-border">
              {/* Proscenium wash */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(128,0,32,.25),_transparent_70%)]" />
              <ContactForm />
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Email Card */}
            <div className="rounded-3xl border border-darkCream/20 bg-[#2A0B12]/60 backdrop-blur-xl p-6 opera-border-hover transition-all hover:border-cream/30">
              <h3 className="text-cream font-opera uppercase tracking-wider text-xs font-bold mb-3">Direct Correspondence</h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors"
              >
                <LucideMail className="w-5 h-5" />
                <span className="font-body">{siteConfig.email}</span>
              </a>
            </div>

            {/* Social Links Card */}
            <div className="rounded-3xl border border-darkCream/20 bg-[#2A0B12]/60 backdrop-blur-xl p-6 opera-border-hover transition-all hover:border-cream/30">
              <h3 className="text-cream font-opera uppercase tracking-wider text-xs font-bold mb-3">Connect Backstage</h3>
              <div className="flex flex-col space-y-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors hover:translate-x-1"
                >
                  <LucideGithub className="w-5 h-5" />
                  <span className="font-body">GitHub</span>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors hover:translate-x-1"
                >
                  <LucideLinkedin className="w-5 h-5" />
                  <span className="font-body">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability Card */}
            <div className="rounded-3xl border border-darkCream/20 bg-[#2A0B12]/60 backdrop-blur-xl p-6 opera-border-hover transition-all hover:border-cream/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-wineRed animate-pulse" />
                <span className="text-xs font-opera uppercase tracking-wider text-cream font-bold">{t("contact.availabilityLabel")}</span>
              </div>
              <p className="text-softCream/80 text-sm font-body">{t("contact.availability")}</p>
            </div>

            {/* Location Card */}
            {siteConfig.location && (
              <div className="rounded-3xl border border-darkCream/20 bg-[#2A0B12]/60 backdrop-blur-xl p-6 opera-border-hover transition-all hover:border-cream/30">
                <p className="text-xs font-opera uppercase tracking-wider text-darkCream font-bold mb-2">Location</p>
                <p className="text-softCream/80 text-sm font-body">{siteConfig.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}