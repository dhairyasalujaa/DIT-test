import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/**
 * Crawling is allowed everywhere. There is nothing on this site that should be
 * hidden from a search engine, and the most common way to destroy a site's
 * visibility is an over-enthusiastic disallow rule.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
