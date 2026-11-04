import React from "react";

export default function ProsceniumArch() {
  return (
    <svg
      className="w-full h-auto filter drop-shadow-[0_0_35px_rgba(128,0,32,0.4)]"
      fill="none"
      viewBox="0 0 500 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="archDrapeBurgundy"
          x1="250"
          x2="250"
          y1="40"
          y2="360"
        >
          <stop stopColor="#9B1D30" />
          <stop offset="0.5" stopColor="#800020" />
          <stop offset="1" stopColor="#3B0A12" />
        </linearGradient>
        <linearGradient id="creamTrimGrad" x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#DCC8A3" />
          <stop offset="0.5" stopColor="#FFF5E1" />
          <stop offset="1" stopColor="#DCC8A3" />
        </linearGradient>
      </defs>
      {/* Grand Proscenium Architectural Arch */}
      <path
        d="M 40 380 L 40 220 A 210 210 0 0 1 460 220 L 460 380"
        fill="none"
        stroke="url(#creamTrimGrad)"
        strokeWidth="6"
      />
      <path
        d="M 60 380 L 60 220 A 190 190 0 0 1 440 220 L 440 380"
        fill="none"
        stroke="#5E0F1A"
        strokeWidth="3"
      />
      {/* Keystone Crown */}
      <polygon
        fill="#FFF5E1"
        points="250,8 270,35 230,35"
        stroke="#DCC8A3"
        strokeWidth="1.5"
      />
      <circle cx="250" cy="22" fill="#800020" r="5" />
      {/* Elegant Curtain Drapes in Arch */}
      <path
        d="M 60 160 Q 150 140 250 180 Q 350 140 440 160 L 440 360 C 370 300 330 240 310 180 C 270 230 230 230 190 180 C 170 240 130 300 60 360 Z"
        fill="url(#archDrapeBurgundy)"
        stroke="#DCC8A3"
        strokeWidth="1.5"
      />
      {/* Center Chandelier Motif */}
      <line stroke="#DCC8A3" strokeWidth="1.5" x1="250" x2="250" y1="60" y2="130" />
      <ellipse cx="250" cy="132" fill="#FFF5E1" rx="36" ry="7" />
      <ellipse cx="250" cy="150" fill="#DCC8A3" rx="22" ry="5" />
      <polygon fill="#FFF5E1" points="250,156 246,175 254,175" />
      <polygon fill="#FFF5E1" points="230,138 227,152 233,152" />
      <polygon fill="#FFF5E1" points="270,138 267,152 273,152" />
      <circle cx="250" cy="124" fill="#FFF5E1" r="3.5" />
      <circle cx="235" cy="126" fill="#F7ECD4" r="3" />
      <circle cx="265" cy="126" fill="#F7ECD4" r="3" />
      {/* Minimalist Architectural Stage Platform */}
      <rect
        fill="#24070D"
        height="24"
        rx="4"
        stroke="#DCC8A3"
        strokeWidth="2"
        width="440"
        x="30"
        y="380"
      />
      <line stroke="#FFF5E1" strokeWidth="1.5" x1="40" x2="460" y1="384" y2="384" />
    </svg>
  );
}
