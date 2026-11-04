"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";

const fallbackRoles = ["Digital Stages", "Frontend Virtuoso", "Software Engineer", "Component Architect"];
const fallbackPrefix = "Orchestrating ";

export default function TypingEffect() {
  const { t } = useI18n();
  const [displayedRole, setDisplayedRole] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [charIndex, setCharIndex] = React.useState(0);

  const roles = (t("hero.typingRoles") as unknown as string[]) || fallbackRoles;
  const prefix = t("hero.typingPrefix") || fallbackPrefix;

  React.useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 45;
    const holdTime = 1900;
    const gapTime = 400;

    const currentRole = roles[roleIndex] || "";
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedRole(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, holdTime);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedRole(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, gapTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <div className="text-2xl sm:text-3xl font-display font-semibold text-softCream flex items-center h-12">
      <span className="italic text-warmCream/85">{prefix}</span>
      <span className="text-cream cream-glow font-bold border-r-2 border-darkCream/80 pr-1 ml-2">
        {displayedRole}
      </span>
    </div>
  );
}