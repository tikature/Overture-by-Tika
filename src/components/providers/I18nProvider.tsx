"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, locales, defaultLocale } from "@/lib/i18n";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

async function loadTranslations() {
  const [en, id] = await Promise.all([
    import("@/messages/en.json"),
    import("@/messages/id.json"),
  ]);
  return { en: en.default, id: id.default } as const;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const saved = localStorage.getItem("locale") as Locale | null;
  return saved && locales.includes(saved) ? saved : defaultLocale;
}

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
}

function fallbackT(key: string): string {
  return key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [theme, setThemeState] = useState<"dark" | "light">(getInitialTheme);
  const [translations, setTranslations] = useState<Record<Locale, Record<string, unknown>> | null>(null);

  useEffect(() => {
    loadTranslations().then(setTranslations);
    
    // Apply theme on mount
    document.documentElement.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const t = (key: string, params?: Record<string, string>) => {
    if (!translations) return fallbackT(key);
    
    const keys = key.split(".");
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    if (typeof value !== "string") {
      return fallbackT(key);
    }
    
    if (params) {
      return Object.entries(params).reduce((str, [k, v]) => str.replace(`{${k}}`, v), value);
    }
    
    return value;
  };

  // Always provide context, even before translations load
  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t,
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}