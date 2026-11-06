"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";

const fallbackRoles = ["Digital Stages", "Frontend Experiences", "Component Architecture", "Web Choreography"];
const fallbackPrefix = "Orchestrating ";

function useTypewriter(words: string[], timings = { type: 100, erase: 45, hold: 1900, gap: 400 }) {
  const [text, setText] = React.useState("");
  const key = words.join("\u0000");
  const { type, erase, hold, gap } = timings;

  React.useEffect(() => {
    const list = key ? key.split("\u0000") : [];
    if (list.length === 0 || list[0] === "") return;

    let i = 0;
    let j = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = list[i];
      if (!deleting) {
        j += 1;
        setText(word.slice(0, j));
        if (j === word.length) {
          deleting = true;
          timer = setTimeout(tick, hold);
          return;
        }
        timer = setTimeout(tick, type);
      } else {
        j -= 1;
        setText(word.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % list.length;
          timer = setTimeout(tick, gap);
          return;
        }
        timer = setTimeout(tick, erase);
      }
    };

    timer = setTimeout(tick, type);
    return () => clearTimeout(timer);
  }, [key, type, erase, hold, gap]);

  return text;
}

export default function TypingEffect() {
  const { t } = useI18n();
  const rolesRaw = t("hero.typingRoles");
  const roles = (() => {
    try {
      const parsed = JSON.parse(rolesRaw);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return fallbackRoles;
  })();
  const prefix = t("hero.typingPrefix") || fallbackPrefix;

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const typedText = useTypewriter(roles);
  const displayedRole = prefersReducedMotion ? (roles[0] || "") : typedText;

  return (
    <div className="text-2xl sm:text-3xl font-display font-semibold text-softCream flex items-center min-h-[4rem]">
      <span className="italic text-warmCream/85">{prefix}</span>
      <span className="text-cream cream-glow font-bold border-r-2 border-darkCream/80 pr-1 ml-2">
        {displayedRole}
      </span>
    </div>
  );
}