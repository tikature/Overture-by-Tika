import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generateJsonLd } from "@/lib/seo";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { CurtainIntro } from "@/components/layout/CurtainIntro";
import { locales, Locale, defaultLocale } from "@/lib/i18n";
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
    google: "",
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

async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale");
  if (localeCookie && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }
  return defaultLocale;
}

async function getThemeFromCookie(): Promise<"dark" | "light"> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  return (themeCookie?.value as "dark" | "light") ?? "dark";
}

async function getMessages(locale: Locale) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return messages;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();
  const initialTheme = await getThemeFromCookie();
  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${cinzel.variable} ${jakarta.variable} h-full antialiased scroll-smooth ${initialTheme === "light" ? "light-theme" : ""}`}
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
        <I18nProvider locale={locale} messages={messages} initialTheme={initialTheme}>
          {children}
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}