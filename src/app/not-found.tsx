"use client";

import React from "react";
import Link from "next/link";
import { LucideHome, LucideArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="text-9xl font-display font-extrabold text-cream/10 tracking-tight">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-cream">
          The Curtain Has Fallen
        </h1>
        <p className="text-softCream/80 text-base leading-relaxed font-body">
          The act you&apos;re looking for isn&apos;t on the playbill. Perhaps the stage is still being set, or the performance has moved to another venue.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-opera font-bold text-xs tracking-widest uppercase text-cream bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed border border-darkCream/40 shadow-[0_0_20px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream transition-all hover:-translate-y-0.5"
          >
            <LucideHome className="w-4 h-4" />
            <span>Return to Overture</span>
          </Link>
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-opera font-bold text-xs tracking-widest uppercase text-softCream bg-obsidianBurgundy/90 border border-darkCream/30 hover:border-cream hover:text-cream transition-all"
          >
            <LucideArrowLeft className="w-4 h-4" />
            <span>Browse Productions</span>
          </Link>
        </div>
        <p className="text-xs text-darkCream/70 font-opera uppercase tracking-wider">
          {siteConfig.footerNote}
        </p>
      </div>
    </main>
  );
}