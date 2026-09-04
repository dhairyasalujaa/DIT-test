import type { Article } from "@/types";
import { liveSite } from "@/content/site";

/**
 * Published articles.
 *
 * `articles` stays empty on purpose: this build has no article bodies, and
 * writing them would mean publishing words under decodingIT's name that
 * decodingIT did not write. The route and the renderer are ready for real
 * entries; adding them here fills /insights and its detail pages.
 *
 * `fieldNotes` below is different — those are decodingIT's real, published
 * pieces, listed on their home page with their real titles, topics and
 * reading times. They link to the live articles because the bodies live
 * there, not here.
 */
export const articles: Article[] = [];

export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.published) - Date.parse(a.published),
);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export interface FieldNote {
  title: string;
  topic: string;
  readingMinutes: number;
  href: string;
}

/** The three pieces the live home page features, in its order. */
export const fieldNotes: FieldNote[] = [
  {
    title: "Memory and hardware prices are surging — invest now or wait it out?",
    topic: "Infrastructure",
    readingMinutes: 4,
    href: `${liveSite}/memory-and-hardware-prices-are-surging-should-companies-invest-now-or-wait-it-out`,
  },
  {
    title: "The Real Cost of a Ransomware Attack on a Small Business",
    topic: "Cybersecurity",
    readingMinutes: 2,
    href: `${liveSite}/real-cost-ransomware-attack-small-business`,
  },
  {
    title: "10 Cybersecurity Habits Every Employee Should Follow",
    topic: "Cybersecurity",
    readingMinutes: 2,
    href: `${liveSite}/10-cybersecurity-habits-every-employee-should-follow`,
  },
];
