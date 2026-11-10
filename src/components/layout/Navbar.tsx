"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { LucideSparkles, LucideX } from "lucide-react";
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
    <div className="flex items-center gap-1 bg-surface-strong/90 border border-border/25 rounded-full px-1 py-1">
      {["en", "id"].map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc as "en" | "id")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[10px] font-opera font-bold uppercase tracking-wider transition-all",
            locale === loc
              ? "bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red text-fg shadow-[0_0_12px_rgba(128,0,32,0.6)]"
              : "text-fg-subtle/70 hover:text-fg hover:bg-surface-strong/50"
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
        "relative w-10 h-10 rounded-full bg-surface-strong/90 border border-border/25",
        "flex items-center justify-center transition-all duration-300",
        "hover:border-fg hover:bg-surface-strong/60 focus:outline-none focus:ring-2 focus:ring-fg/30",
        theme === "light" ? "bg-cream/10" : ""
      )}
      aria-label={t("theme.label")}
      aria-pressed={theme === "light"}
    >
      <svg className={cn("w-5 h-5 transition-all duration-300", theme === "light" ? "text-fg rotate-0 scale-100" : "text-fg-muted/50 -rotate-90 scale-50")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="23"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <svg className={cn("absolute w-5 h-5 transition-all duration-300", theme === "dark" ? "text-fg rotate-0 scale-100" : "text-fg-muted/50 rotate-90 scale-50")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
  );
}

function MobileMenu({ open, onClose, locale, setLocale, theme, toggleTheme, t }: {
  open: boolean;
  onClose: () => void;
  locale: "en" | "id";
  setLocale: (l: "en" | "id") => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  t: (k: string) => string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex flex-col justify-between items-center p-6 bg-bg/95 backdrop-blur-xl">
      {/* Close button - explicitly at top-right, NOT inside the links list */}
      <button
        className="absolute top-6 right-6 z-[60] p-2 text-fg hover:text-fg-muted transition-colors"
        onClick={onClose}
        aria-label="Close menu"
      >
        <LucideX className="w-6 h-6" />
      </button>

      {/* Navigation Links - centered vertically */}
      <nav className="flex flex-col items-center gap-6 w-full">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-2xl font-opera text-fg uppercase transition-colors hover:text-fg-muted"
            onClick={onClose}
          >
            {t(s.labelKey)}
          </a>
        ))}
      </nav>

      {/* Bottom Controls - Language & Theme toggle */}
      <div className="flex items-center gap-4 w-full justify-center pb-4">
        <LangToggle locale={locale} setLocale={setLocale} />
        <ThemeBtn theme={theme} toggleTheme={toggleTheme} t={t} />
      </div>
    </div>
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

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4" data-purpose="desktop-navigation">
      {/* Main Navbar - standard height, flexbox alignment */}
      <nav className="w-full max-w-6xl bg-surface-strong/90 backdrop-blur-xl border border-border/25 rounded-full px-5 py-2 flex items-center justify-between gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
        {/* Brand on the left */}
        <Link href="#home" className="flex-shrink-0 flex items-center space-x-2.5 group">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-strong border border-border/35 text-fg text-xs font-serif shadow-[0_0_10px_rgba(155,29,48,0.4)]">T</span>
          <span className="bg-gradient-to-r from-fg via-ivory-cream to-fg-muted text-deep-abyss font-opera font-black text-xs tracking-[0.22em] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,200,163,0.3)] uppercase border border-border/40 transition-transform group-hover:scale-105">{siteConfig.displayName}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6 text-[11px] font-opera font-bold uppercase tracking-[0.18em] text-fg-subtle/90 whitespace-nowrap">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="whitespace-nowrap transition-colors duration-200 hover:text-fg">{t(s.labelKey)}</a>
            </li>
          ))}
        </ul>

        {/* Language & Theme toggles (desktop) */}
        <div className="hidden lg:flex items-center gap-3 ml-auto whitespace-nowrap">
          <LangToggle locale={locale} setLocale={setLocale} />
          <ThemeBtn theme={theme} toggleTheme={toggleTheme} t={t} />
        </div>

        {/* CTA (desktop) */}
        <a href="#contact" className="hidden lg:flex whitespace-nowrap shrink-0 relative group overflow-hidden px-5 py-1.5 rounded-full text-xs font-opera font-bold tracking-wider text-fg bg-gradient-to-r from-burgundy via-vintage-burgundy to-wine-red border border-border/40 shadow-[0_0_18px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-fg transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          <span className="relative z-10 flex items-center gap-1.5"><LucideSparkles className="w-3.5 h-3.5" />{t("hero.ctaContact")}</span>
        </a>

        {/* Mobile hamburger on far right */}
        <button className="lg:hidden flex items-center justify-center w-10 h-10 p-2" onClick={toggleMenu} aria-label="Menu">
          <div className="relative w-6 h-5 flex flex-col justify-between items-center">
            <div className={cn("w-full h-0.5 bg-fg transition-all duration-300", open ? "rotate-45 translate-y-2" : "")}></div>
            <div className={cn("w-full h-0.5 bg-fg transition-all duration-300", open ? "opacity-0" : "")}></div>
            <div className={cn("w-full h-0.5 bg-fg transition-all duration-300", open ? "-rotate-45 -translate-y-2" : "")}></div>
          </div>
        </button>
      </nav>

      {/* Fullscreen Mobile Menu Overlay - separate component */}
      <MobileMenu
        open={open}
        onClose={toggleMenu}
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
      />
    </header>
  );
}