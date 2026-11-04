import { siteConfig } from "@/data/site";
import { LucideSparkles } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-obsidianBurgundy/90 text-soft-cream py-8 mt-auto border-t border-darkCream/20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 mb-4 md:mb-0">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-darkBurgundy border border-darkCream/35 text-cream text-xs font-serif shadow-[0_0_10px_rgba(155,29,48,0.4)]">T</span>
          <span className="bg-gradient-to-r from-cream via-ivoryCream to-darkCream text-deepAbyss font-opera font-black text-xs tracking-[0.22em] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,200,163,0.3)] uppercase border border-darkCream/40">{siteConfig.displayName}</span>
        </div>
        {/* Nav links */}
        <ul className="flex space-x-4 text-sm font-opera uppercase tracking-wider text-warmCream/80">
          {[
            { href: "#home", label: "Overture" },
            { href: "#about", label: "The Stage" },
            { href: "#skills", label: "Repertoire" },
            { href: "#projects", label: "Productions" },
            { href: "#certificates", label: "Laurels" },
            { href: "#contact", label: "Curtain Call" },
          ].map(link => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-cream transition-colors">{link.label}</a>
            </li>
          ))}
        </ul>
        {/* Social & availability */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-warmCream/80 hover:text-cream"><LucideSparkles className="w-4 h-4" /></a>
          <span className="text-xs font-opera text-warmCream/80">{siteConfig.availability}</span>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-warmCream/70">
        {siteConfig.footerNote} © {currentYear} {siteConfig.fullName}
      </p>
    </footer>
  );
}
