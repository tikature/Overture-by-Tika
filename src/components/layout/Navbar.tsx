"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { LucideSparkles } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useI18n } from "@/components/providers/I18nProvider";

const sections = [
  { id: "home", labelKey: "nav.overture" },
  { id: "about", labelKey: "nav.theStage" },
  { id: "skills", labelKey: "nav.repertoire" },
  { id: "projects", labelKey: "nav.productions" },
  { id: "certificates", labelKey: "nav.laurels" },
  { id: "contact", labelKey: "nav.curtainCall" },
];

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = document.querySelector(`a[href="#${id}"]`);
          if (link) {
            if (entry.isIntersecting) link.classList.add("cream-glow");
            else link.classList.remove("cream-glow");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4" data-purpose="desktop-navigation">
      <nav className="w-full max-w-4xl xl:max-w-5xl bg-obsidianBurgundy/90 backdrop-blur-xl border border-darkCream/25 rounded-full px-5 py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(27,5,9,0.9)]">
        {/* Brand */}
        <Link href="#home" className="flex-shrink-0 flex items-center space-x-2.5 group mr-6">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-darkBurgundy border border-darkCream/35 text-cream text-xs font-serif shadow-[0_0_10px_rgba(155,29,48,0.4)]">T</span>
          <span className="bg-gradient-to-r from-cream via-ivoryCream to-darkCream text-deepAbyss font-opera font-black text-xs tracking-[0.22em] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,200,163,0.3)] uppercase border border-darkCream/40 transition-transform group-hover:scale-105">{siteConfig.displayName}</span>
        </Link>
        
        {/* Desktop links + toggles */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6 text-[11px] font-opera font-bold uppercase tracking-[0.18em] text-warmCream/90">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="whitespace-nowrap transition-colors duration-200 hover:text-cream">{t(s.labelKey)}</a>
              </li>
            ))}
          </ul>
          
          {/* Language & Theme toggles */}
          <div className="flex items-center gap-2 ml-2 border-l border-darkCream/20 pl-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          {/* CTA */}
          <a href="#contact" className="whitespace-nowrap relative group overflow-hidden px-5 py-1.5 rounded-full text-xs font-opera font-bold tracking-wider text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed border border-darkCream/40 shadow-[0_0_18px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            <span className="relative z-10 flex items-center gap-1.5"><LucideSparkles className="w-3.5 h-3.5" />{t("hero.ctaExplore")}</span>
          </a>
        </div>
        
        {/* Mobile hamburger */}
        <button className="md:hidden flex items-center" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className={cn("h-0.5 w-6 bg-cream mb-1 transition-transform", open ? "rotate-45 translate-y-2.5" : "")}></div>
          <div className={cn("h-0.5 w-6 bg-cream mb-1 transition-opacity", open ? "opacity-0" : "")}></div>
          <div className={cn("h-0.5 w-6 bg-cream transition-transform", open ? "-rotate-45 -translate-y-2.5" : "")}></div>
        </button>
      </nav>
      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 bg-deepAbyss/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-6">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-2xl font-opera text-cream uppercase" onClick={() => setOpen(false)}>{t(s.labelKey)}</a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-darkCream/20">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}