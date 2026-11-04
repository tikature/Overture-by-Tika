import { NextResponse } from "next/server";

export async function GET() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#800020"/>
      <path d="M16 4 L16 14 M16 18 L16 28 M4 16 L14 16 M18 16 L28 16" stroke="#FFF5E1" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 10 L22 22 M22 10 L10 22" stroke="#FFF5E1" stroke-width="1.5" stroke-linecap="round"/>
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