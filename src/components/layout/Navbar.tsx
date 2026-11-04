"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { LucideSparkles } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";

const sections = [
  { id: "home", labelKey: "nav.overture" },
  { id: "about", labelKey: "nav.theStage" },
  { id: "skills", labelKey: "nav.repertoire" },
  { id: "projects", labelKey: "nav.productions" },
  { id: "certificates", labelKey: "nav.laurels" },
  { id: "contact", labelKey: "nav.curtainCall" },
];

function LangToggle({ locale, setLocale }: { locale: "en" | "id"; setLocale: (l: "en" | "id") => void }) {
  return (
    <div className="flex items-center gap-1 bg-obsidianBurgundy/90 border border-darkCream/25 rounded-full px-1 py-1">
      {["en", "id"].map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc as "en" | "id")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[10px] font-opera font-bold uppercase tracking-wider transition-all",
            locale === loc
              ? "bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed text-cream shadow-[0_0_12px_rgba(128,0,32,0.6)]"
              : "text-warmCream/70 hover:text-cream hover:bg-darkBurgundy/50"
          )}
          aria-pressed={locale === loc}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ThemeBtn({ theme, toggleTheme, t }: { theme: "dark" | "light"; toggleTheme: () => void; t: (k: string) => string }) {
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full bg-obsidianBurgundy/90 border border-darkCream/25",
        "flex items-center justify-center transition-all duration-300",
        "hover:border-cream hover:bg-darkBurgundy/60 focus:outline-none focus:ring-2 focus:ring-cream/30",
        theme === "light" ? "bg-cream/10" : ""
      )}
      aria-label={t("theme.label")}
      aria-pressed={theme === "light"}
    >
      <svg className={cn("w-5 h-5 transition-all duration-300", theme === "light" ? "text-cream rotate-0 scale-100" : "text-darkCream/50 -rotate-90 scale-50")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <svg className={cn("absolute w-5 h-5 transition-all duration-300", theme === "dark" ? "text-cream rotate-0 scale-100" : "text-darkCream/50 rotate-90 scale-50")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
  );
}

export default function Navbar() {
  const { t, locale, setLocale, theme, toggleTheme } = useI18n();
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
      <nav className="w-full max-w-6xl bg-obsidianBurgundy/90 backdrop-blur-xl border border-darkCream/25 rounded-full px-5 py-2 flex items-center gap-4 shadow-[0_12px_40px_rgba(27,5,9,0.9)]">
        {/* Brand */}
        <Link href="#home" className="flex-shrink-0 flex items-center space-x-2.5 group">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-darkBurgundy border border-darkCream/35 text-cream text-xs font-serif shadow-[0_0_10px_rgba(155,29,48,0.4)]">T</span>
          <span className="bg-gradient-to-r from-cream via-ivoryCream to-darkCream text-deepAbyss font-opera font-black text-xs tracking-[0.22em] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,200,163,0.3)] uppercase border border-darkCream/40 transition-transform group-hover:scale-105">{siteConfig.displayName}</span>
        </Link>
        
        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6 text-[11px] font-opera font-bold uppercase tracking-[0.18em] text-warmCream/90 whitespace-nowrap">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="whitespace-nowrap transition-colors duration-200 hover:text-cream">{t(s.labelKey)}</a>
            </li>
          ))}
        </ul>
        
        {/* Language & Theme toggles */}
        <div className="hidden lg:flex items-center gap-3 ml-auto whitespace-nowrap">
          <LangToggle locale={locale} setLocale={setLocale} />
          <ThemeBtn theme={theme} toggleTheme={toggleTheme} t={t} />
        </div>
        
        {/* CTA */}
        <a href="#contact" className="hidden lg:flex whitespace-nowrap relative group overflow-hidden px-5 py-1.5 rounded-full text-xs font-opera font-bold tracking-wider text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed border border-darkCream/40 shadow-[0_0_18px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          <span className="relative z-10 flex items-center gap-1.5"><LucideSparkles className="w-3.5 h-3.5" />{t("hero.ctaExplore")}</span>
        </a>
        
        {/* Mobile hamburger */}
        <button className="lg:hidden flex items-center" onClick={() => setOpen(!open)} aria-label="Menu">
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
            <LangToggle locale={locale} setLocale={setLocale} />
            <ThemeBtn theme={theme} toggleTheme={toggleTheme} t={t} />
          </div>
        </div>
      )}
    </header>
  );
}