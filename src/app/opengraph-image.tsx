import { NextResponse } from "next/server";

export async function GET() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630">
          <stop offset="0%" stop-color="#1B0509"/>
          <stop offset="100%" stop-color="#140508"/>
        </linearGradient>
        <radialGradient id="glowGrad" cx="600" cy="200" r="400">
          <stop offset="0%" stop-color="rgba(155,29,48,0.15)"/>
          <stop offset="70%" stop-color="transparent"/>
        </radialGradient>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFF5E1"/>
          <stop offset="50%" stop-color="#F7ECD4"/>
          <stop offset="100%" stop-color="#DCC8A3"/>
        </linearGradient>
        <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFF5E1"/>
          <stop offset="100%" stop-color="#EFE2C6"/>
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      
      <!-- Ambient glow -->
      <ellipse cx="600" cy="200" rx="500" ry="300" fill="url(#glowGrad)"/>
      
      <!-- Brand -->
      <g transform="translate(600, 200)">
        <circle cx="0" cy="0" r="32" fill="#3B0A12" stroke="rgba(220,200,163,0.35)" stroke-width="2"/>
        <text x="0" y="0" text-anchor="middle" dominant-baseline="central" 
              font-family="serif" font-size="24" font-weight="bold" fill="#FFF5E1">T</text>
        
        <text x="50" y="0" text-anchor="start" dominant-baseline="central" 
              font-family="Cinzel, serif" font-size="40" font-weight="900" 
              fill="url(#brandGrad)" letter-spacing="8" text-transform="uppercase">Tika</text>
      </g>
      
      <!-- Title -->
      <text x="600" y="340" text-anchor="middle" dominant-baseline="central"
            font-family="Playfair Display, serif" font-size="88" font-weight="800"
            fill="url(#titleGrad)" filter="drop-shadow(0 0 30px rgba(255,245,225,0.3))">
        Overture by Atika
      </text>
      
      <!-- Tagline -->
      <text x="600" y="440" text-anchor="middle" dominant-baseline="central"
            font-family="Plus Jakarta Sans, sans-serif" font-size="32"
            fill="#E6D7B9" font-style="italic">
        Orchestrating Software Engineer
      </text>
      
      <!-- Divider -->
      <line x1="540" y1="500" x2="660" y2="500" 
            stroke="url(#brandGrad)" stroke-width="2"/>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export default GET;