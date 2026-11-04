import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function generateMetadata(): Metadata {
  return {
    title: siteConfig.brand,
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.brand,
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      type: "website",
      images: [
        {
          url: `${siteConfig.siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.brand,
      description: siteConfig.description,
      images: [`${siteConfig.siteUrl}/opengraph-image`],
    },
  };
}

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.displayName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    jobTitle: siteConfig.title,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Laravel",
      "PHP",
    ],
  };
}
