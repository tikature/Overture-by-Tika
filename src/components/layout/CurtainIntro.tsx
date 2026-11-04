"use client";

import React from "react";
import { motion } from "motion/react";

export default function CurtainIntro() {
  const [visible, setVisible] = React.useState(() => {
    if (typeof window === "undefined") return false;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeen = sessionStorage.getItem("curtainSeen");
    return !prefersReduced && !hasSeen;
  });

  React.useEffect(() => {
    if (!visible) return;
    
    sessionStorage.setItem("curtainSeen", "true");
    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={false}
      animate={{
        left: ["0%", "-100%"],
        right: ["0%", "100%"],
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] pointer-events-none flex"
      role="presentation"
      aria-hidden="true"
    >
      <div className="w-1/2 h-full bg-deepAbyss" />
      <div className="w-1/2 h-full bg-deepAbyss" />
    </motion.div>
  );
}