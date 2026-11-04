"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { LucideSun, LucideMoon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, t } = useI18n();

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
      <LucideSun
        className={cn(
          "w-5 h-5 transition-all duration-300",
          theme === "light" ? "text-cream rotate-0 scale-100" : "text-darkCream/50 -rotate-90 scale-50"
        )}
        aria-hidden="true"
      />
      <LucideMoon
        className={cn(
          "absolute w-5 h-5 transition-all duration-300",
          theme === "dark" ? "text-cream rotate-0 scale-100" : "text-darkCream/50 rotate-90 scale-50"
        )}
        aria-hidden="true"
      />
    </button>
  );
}