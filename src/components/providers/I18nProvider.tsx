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

function fallbackT(key: string): string {
  return key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always use default values for SSR - no localStorage access during render
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [translations, setTranslations] = useState<Record<Locale, Record<string, unknown>> | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount (client-only)
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    
    if (savedLocale && locales.includes(savedLocale)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(savedLocale);
    }
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    
    // Apply theme immediately
    document.documentElement.classList.toggle("light-theme", savedTheme === "light");
    
    setHydrated(true);
  }, []);

  useEffect(() => {
    loadTranslations().then(setTranslations);
  }, []);

  useEffect(() => {
    if (hydrated) {
      document.documentElement.classList.toggle("light-theme", theme === "light");
    }
  }, [theme, hydrated]);

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

  // ALWAYS provide context - never render children without it
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