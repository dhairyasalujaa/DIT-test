import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { services } from "@/content/services";
import { articles } from "@/content/insights";
import { projects } from "@/content/projects";

/**
 * Sitemap.
 *
 * Lists exactly the canonical, indexable pages — no parameterised duplicates,
 * no routes that do not exist. Project detail URLs appear only once real
 * projects are added to content/projects.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/approach`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${siteUrl}/insights`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified: new Date(article.updated ?? article.published),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes, ...projectRoutes];
}
