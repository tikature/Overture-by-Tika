import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getProjects } from "@/lib/projects-source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const mergedProjects = await getProjects();
  const projectRoutes = mergedProjects.map((project) => ({
    url: `${baseUrl}/productions/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}