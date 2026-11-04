import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/static/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}