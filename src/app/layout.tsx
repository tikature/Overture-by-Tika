import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
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
      </head>
      <body className="min-h-full flex flex-col bg-deep-abyss text-soft-cream">{children}</body>
    </html>
  );
}