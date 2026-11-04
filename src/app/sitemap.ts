import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const currentDate = new Date();

  const staticRoutes = [
    "",
    "#about",
    "#skills",
    "#projects",
    "#certificates",
    "#contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/productions/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}