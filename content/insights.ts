import type { Article } from "@/types";

/**
 * Insights.
 *
 * Intentionally empty.
 *
 * This file previously held four full-length articles — roughly 3,600 words on
 * managed-services contracts, backup and recovery, email authentication and
 * security baselines. They were written by Claude and published under
 * decodingIT's name, presenting authored opinions as the company's own
 * positions. That is a worse failure than an empty section, so they are gone.
 *
 * decodingIT does publish real technical writing (for example a comparison of
 * Azure Virtual Desktop, Citrix and Omnissa Horizon). Porting those here is a
 * copy-and-paste into the `articles` array below: add entries and /insights,
 * /insights/[slug], the home page preview, the sitemap and Article structured
 * data all populate from this one source.
 *
 * Because the section is empty, "Insights" has been removed from the primary
 * navigation and kept in the footer. Restore it in content/navigation.ts once
 * there are real articles here.
 */
export const articles: Article[] = [];

export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.published) - Date.parse(a.published),
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
