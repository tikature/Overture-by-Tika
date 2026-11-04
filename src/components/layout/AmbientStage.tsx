import React from "react";
import Image from "next/image";

// AmbientStage: fixed background layer with glows, embers, and floating card suits.
// All styling comes from globals.css (utility classes & keyframes).

export default function AmbientStage() {
  // Suit positions and classes derived from reference/code.html
  const suits = [
    // diamond top left
    { className: "card-suit-diamond animate-suit-drift-1", style: { top: "6%", left: "4%", width: "2rem" } },
    // spade top center left
    { className: "card-suit-spade animate-suit-drift-5", style: { top: "10%", left: "28%", width: "1.75rem" } },
    // club top right
    { className: "card-suit-club animate-suit-drift-2", style: { top: "14%", right: "6%", width: "2rem" } },
    // heart upper mid right
    { className: "card-suit-heart animate-suit-drift-4", style: { top: "22%", right: "22%", width: "1.75rem" } },
    // heart upper mid left
    { className: "card-suit-heart animate-suit-drift-3", style: { top: "26%", left: "8%", width: "2rem" } },
    // club center region
    { className: "card-suit-club animate-suit-drift-1", style: { top: "34%", left: "47%", width: "1.75rem" } },
    // spade mid right
    { className: "card-suit-spade animate-suit-drift-2", style: { top: "38%", right: "8%", width: "2rem" } },
    // diamond mid section
    { className: "card-suit-diamond animate-suit-drift-4", style: { top: "46%", left: "12%", width: "2.25rem" } },
    // heart mid center right
    { className: "card-suit-heart animate-suit-drift-5", style: { top: "52%", right: "16%", width: "2rem" } },
    // spade lower mid left
    { className: "card-suit-spade animate-suit-drift-3", style: { top: "58%", left: "5%", width: "2rem" } },
    // club lower mid right
    { className: "card-suit-club animate-suit-drift-3", style: { top: "66%", right: "5%", width: "1.75rem" } },
    // diamond center lower
    { className: "card-suit-diamond animate-suit-drift-2", style: { top: "72%", left: "44%", width: "2rem" } },
    // heart lower left
    { className: "card-suit-heart animate-suit-drift-4", style: { top: "78%", left: "10%", width: "2rem" } },
    // spade lower right
    { className: "card-suit-spade animate-suit-drift-5", style: { top: "84%", right: "14%", width: "2rem" } },
    // club bottom left area
    { className: "card-suit-club animate-suit-drift-3", style: { top: "91%", left: "22%", width: "1.75rem" } },
    // diamond bottom right area
    { className: "card-suit-diamond animate-suit-drift-1", style: { top: "93%", right: "7%", width: "2rem" } },
  ];

  // Ember positions (hard‑coded to match reference)
  const embers = [
    { size: "0.5rem", left: "12%", delay: "0s", duration: "10s" },
    { size: "0.625rem", left: "34%", delay: "2.5s", duration: "13s" },
    { size: "0.375rem", left: "68%", delay: "1.2s", duration: "14s" },
    { size: "0.5rem", left: "86%", delay: "4s", duration: "9.5s" },
    { size: "0.375rem", left: "50%", delay: "3s", duration: "11s" },
  ];

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-vintageBurgundy/15 rounded-full blur-[180px] animate-spotlight-pulse" />
      <div className="absolute top-1/3 -left-36 w-[550px] h-[550px] bg-oxblood/35 rounded-full blur-[160px]" />
      <div className="absolute bottom-20 -right-24 w-[600px] h-[600px] bg-darkBurgundy/40 rounded-full blur-[170px]" />
      <div className="absolute top-[60%] left-1/3 w-[500px] h-[450px] bg-burgundy/15 rounded-full blur-[150px]" />

      {/* Embers */}
      {embers.map((e, i) => (
        <div
          key={i}
          className="subtle-cream-ember animate-ember-rise"
          style={{
            width: e.size,
            height: e.size,
            left: e.left,
            animationDuration: e.duration,
            animationDelay: e.delay,
          }}
        />
      ))}

      {/* Floating suits */}
      {suits.map((s, i) => (
        <div key={i} className="absolute" style={s.style as React.CSSProperties}>
          <Image
            alt=""
            className={`w-full h-auto select-none pointer-events-none ${s.className}`}
            src={`/images/suits/${s.className.includes('diamond') ? 'diamond' : s.className.includes('spade') ? 'spade' : s.className.includes('club') ? 'club' : 'heart'}.png`}
            width={40}
            height={40}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}