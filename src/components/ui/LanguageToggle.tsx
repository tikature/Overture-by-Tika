"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { locales, localeNames, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-opera uppercase tracking-wider text-darkCream">
        {t("language.label")}
      </label>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className={cn(
          "bg-obsidianBurgundy/90 border border-darkCream/25 text-cream",
          "rounded-full px-3 py-1.5 text-xs font-opera uppercase tracking-wider",
          "focus:outline-none focus:border-cream transition-colors",
          "appearance-none cursor-pointer"
        )}
        aria-label={t("language.label")}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}