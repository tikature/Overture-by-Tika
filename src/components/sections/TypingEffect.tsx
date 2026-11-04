"use client";

import React from "react";
import { siteConfig } from "@/data/site";

export default function TypingEffect() {
  const [displayedRole, setDisplayedRole] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [charIndex, setCharIndex] = React.useState(0);

  React.useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 45;
    const holdTime = 1900;
    const gapTime = 400;

    const currentRole = siteConfig.roles[roleIndex];
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
          setRoleIndex((prev) => (prev + 1) % siteConfig.roles.length);
        }, gapTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <div className="text-2xl sm:text-3xl font-display font-semibold text-softCream flex items-center h-12">
      <span className="italic text-warmCream/85">Orchestrating </span>
      <span className="text-cream cream-glow font-bold border-r-2 border-darkCream/80 pr-1 ml-2">
        {displayedRole}
      </span>
    </div>
  );
}
