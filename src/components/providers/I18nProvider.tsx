"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale } from "@/lib/i18n";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, unknown>;
  initialTheme: "dark" | "light";
}

function fallbackT(key: string): string {
  return key;
}

export function I18nProvider({ children, locale: initialLocale, messages, initialTheme }: I18nProviderProps) {
  const [locale] = useState<Locale>(initialLocale);
  const [theme, setThemeState] = useState<"dark" | "light">(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  const setLocale = (newLocale: Locale) => {
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split(".");
    let value: unknown = messages;

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    if (value === undefined || value === null) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing translation key: ${key} for locale ${locale}`);
      }
      return fallbackT(key);
    }

    if (typeof value === "string") {
      if (params) {
        return Object.entries(params).reduce((str, [k, v]) => str.replace(`{${k}}`, v), value);
      }
      return value;
    }

    return JSON.stringify(value);
  };

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