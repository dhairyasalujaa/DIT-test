import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { services } from "@/content/services";

/**
 * Sitemap.
 *
 * Lists exactly the canonical, indexable pages — no parameterised duplicates
 * and no routes that do not exist. decodingIT's articles are published on
 * decodingit.com and are not routes here, so they are not listed: a sitemap
 * names the pages this deployment serves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${siteUrl}/solutions`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/approach`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${siteUrl}/insights`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/solutions/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
