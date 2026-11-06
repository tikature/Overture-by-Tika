"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import TypingEffect from "./TypingEffect";
import StageCard from "./StageCard";
import Button from "@/components/ui/Button";
import { useI18n } from "@/components/providers/I18nProvider";
import { LucideCompass, LucideScroll, LucideGithub, LucideLinkedin, LucideMail, LucideInstagram, LucideVideo } from "lucide-react";

interface HeroStatChipProps {
  label: string;
  value: number | string;
  liveDot?: boolean;
}

function HeroStatChip({ label, value, liveDot = false }: HeroStatChipProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isNumber = typeof value === "number";

  useEffect(() => {
    if (!isNumber) {
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      requestAnimationFrame(() => setDisplayValue(value));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = value;
            const duration = 1200;
            const start = performance.now();
            function animate(now: number) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(animate);
              else setDisplayValue(target);
            }
            requestAnimationFrame(animate);
            observer.unobserve(ref.current!);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNumber, value]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]"
    >
      {liveDot && (
        <span className="w-2 h-2 rounded-full bg-wineRed shadow-[0_0_8px_#B0303C] animate-pulse" aria-hidden="true" />
      )}
      <span className="text-[11px] uppercase tracking-[0.25em] text-ivoryCream font-opera font-bold">{label}</span>
      <span className="font-display font-extrabold text-cream">
        {isNumber ? displayValue.toLocaleString() : value}
      </span>
    </div>
  );
}

interface HeroSectionProps {
  publicRepos?: number;
  certificatesCount?: number;
  availability?: string;
}

export default function HeroSection({ publicRepos, certificatesCount, availability }: HeroSectionProps) {
  const { t } = useI18n();
  const socialLinks = [
    { href: siteConfig.github, icon: LucideGithub, label: "GitHub", show: true },
    { href: siteConfig.linkedin, icon: LucideLinkedin, label: "LinkedIn", show: true },
    { href: `mailto:${siteConfig.email}`, icon: LucideMail, label: "Email", show: true },
    { href: siteConfig.instagram, icon: LucideInstagram, label: "Instagram", show: !!siteConfig.instagram },
    { href: siteConfig.tiktok, icon: LucideVideo, label: "TikTok", show: !!siteConfig.tiktok },
  ];

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-w-0">
        {/* Hero Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-ivoryCream font-opera font-bold">{t("hero.eyebrow")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream font-display tracking-tight leading-[1.15]">
            {t("hero.greeting")} <span className="font-opera bg-gradient-to-r from-cream via-ivoryCream to-darkCream bg-clip-text text-transparent inline-block pr-2">{siteConfig.displayName.toUpperCase()}</span>
          </h1>
          <p className="text-softCream/85 text-sm sm:text-base leading-relaxed max-w-xl font-body">
            {t("hero.description")}
          </p>
          
          {/* Typing effect */}
          <TypingEffect />
          
          {/* CTAs and Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-3 w-full">
            <Button
              variant="primary"
              size="md"
              href="#projects"
            >
              <LucideCompass className="w-4 h-4 mr-2.5" />
              <span>{t("hero.ctaExplore")}</span>
            </Button>
            <Button
              variant="secondary"
              size="md"
              href={siteConfig.resume}
            >
              <LucideScroll className="w-4 h-4 mr-2" />
              <span>{t("hero.ctaResume")}</span>
            </Button>
            
            {/* Social Badges Pill Group */}
            <div className="flex items-center space-x-2 bg-obsidianBurgundy/90 border border-darkCream/25 rounded-full px-3 py-2 shadow-lg">
              {socialLinks.map((social, idx) =>
                social.show && (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-warmCream/80 hover:text-cream hover:bg-darkBurgundy/60 transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Hero Stat Chips */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {typeof publicRepos === "number" && (
              <HeroStatChip label="Public Repos" value={publicRepos} />
            )}
            {typeof certificatesCount === "number" && (
              <HeroStatChip label="Certificates" value={certificatesCount} />
            )}
            {availability && (
              <HeroStatChip label={availability} value="" liveDot />
            )}
          </div>
        </div>
        
        {/* Hero Right Column: Stage Card */}
        <div className="lg:col-span-5 flex justify-center relative pt-6 pb-2">
          <StageCard />
        </div>
      </div>
    </section>
  );
}