import { siteConfig } from "@/data/site";
import { LucideSparkles } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-surface-strong/90 text-fg-muted py-8 mt-auto border-t border-border/20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 mb-4 md:mb-0">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-strong border border-border/35 text-fg text-xs font-serif shadow-[0_0_10px_rgba(155,29,48,0.4)]">T</span>
          <span className="bg-gradient-to-r from-fg via-ivory-cream to-fg-muted text-deep-abyss font-opera font-black text-xs tracking-[0.22em] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,200,163,0.3)] uppercase border border-border/40">{siteConfig.displayName}</span>
        </div>
        {/* Nav links */}
        <ul className="flex space-x-4 text-sm font-opera uppercase tracking-wider text-fg-subtle/80">
          {[
            { href: "#home", label: "Overture" },
            { href: "#about", label: "The Stage" },
            { href: "#skills", label: "Repertoire" },
            { href: "#projects", label: "Productions" },
            { href: "#certificates", label: "Laurels" },
            { href: "#contact", label: "Curtain Call" },
          ].map(link => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-fg transition-colors">{link.label}</a>
            </li>
          ))}
        </ul>
        {/* Social & availability */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/tikature" target="_blank" rel="noreferrer" className="text-fg-subtle/80 hover:text-fg"><LucideSparkles className="w-4 h-4" /></a>
          <span className="text-xs font-opera text-fg-subtle/80">Open to opportunities</span>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-fg-subtle/70">
        © {currentYear} Dewi Atika Muthi
      </p>
    </footer>
  );
}