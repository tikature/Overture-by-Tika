"use client";

import { useEffect } from "react";

export function CurtainIntro() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("curtainSeen")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    sessionStorage.setItem("curtainSeen", "true");

    const style = document.createElement("style");
    style.textContent = `
      @keyframes curtainOpen {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
      .curtain-panel {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 50%;
        background: #1B0509;
        z-index: 9999;
        pointer-events: none;
        animation: curtainOpen 1.2s cubic-bezier(0.16,1,0.3,1) forwards;
      }
      .curtain-panel.left { left: 0; }
      .curtain-panel.right { right: 0; animation-direction: reverse; transform-origin: right; }
    `;
    document.head.appendChild(style);

    const left = document.createElement("div");
    left.className = "curtain-panel left";
    const right = document.createElement("div");
    right.className = "curtain-panel right";
    document.body.appendChild(left);
    document.body.appendChild(right);

    const timer = setTimeout(() => {
      left.remove();
      right.remove();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}