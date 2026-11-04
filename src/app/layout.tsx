import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generateJsonLd } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Overture by Atika — Frontend Developer & Software Engineer",
    template: "%s | Overture by Atika",
  },
  description: "Portfolio of Dewi Atika Muthi — frontend and full-stack engineer building web and mobile apps with Next.js, React, TypeScript, Laravel and Flutter.",
  keywords: ["frontend developer", "software engineer", "Next.js", "React", "TypeScript", "Flutter", "Laravel", "portfolio", "Indonesia"],
  authors: [{ name: "Dewi Atika Muthi" }],
  creator: "Dewi Atika Muthi",
  publisher: "Dewi Atika Muthi",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Overture by Atika",
    title: "Overture by Atika — Frontend Developer & Software Engineer",
    description: "Portfolio of Dewi Atika Muthi — frontend and full-stack engineer building web and mobile apps with Next.js, React, TypeScript, Laravel and Flutter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overture by Atika — Frontend Developer & Software Engineer",
    description: "Portfolio of Dewi Atika Muthi — frontend and full-stack engineer building web and mobile apps with Next.js, React, TypeScript, Laravel and Flutter.",
  },
  verification: {
    google: "TODO",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B0509",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

function JsonLd() {
  const data = generateJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cinzel.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-deep-abyss text-soft-cream">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] px-4 py-2 bg-cream text-deepAbyss font-opera font-bold uppercase tracking-wider rounded-md"
        >
          Skip to main content
        </a>
        <CurtainIntro />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function CurtainIntro() {
  if (typeof window === "undefined") return null;
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (sessionStorage.getItem('curtainSeen')) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            sessionStorage.setItem('curtainSeen', 'true');
            var style = document.createElement('style');
            style.textContent = '@keyframes curtainOpen { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } } .curtain-panel { position: fixed; top: 0; bottom: 0; width: 50%; background: #1B0509; z-index: 9999; pointer-events: none; animation: curtainOpen 1.2s cubic-bezier(0.16,1,0.3,1) forwards; } .curtain-panel.left { left: 0; } .curtain-panel.right { right: 0; animation-direction: reverse; transform-origin: right; }';
            document.head.appendChild(style);
            var left = document.createElement('div');
            left.className = 'curtain-panel left';
            var right = document.createElement('div');
            right.className = 'curtain-panel right';
            document.body.appendChild(left);
            document.body.appendChild(right);
            setTimeout(function() { left.remove(); right.remove(); }, 1200);
          })();
        `,
      }}
    />
  );
}