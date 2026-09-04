import { liveSite } from "@/content/site";

/**
 * decodingIT's published writing.
 *
 * All of it lives on decodingit.com — this build carries no article bodies,
 * and writing them would mean publishing words under decodingIT's name that
 * decodingIT did not write. So every entry here links to the real piece.
 *
 * SOURCING: the first three are the home page's own "what we are seeing in
 * the field" grid, with its topics and reading times. The last two come from
 * the Insights mega menu, which lists titles only — hence the optional
 * `topic` and `readingMinutes`, rather than numbers invented to fill a card.
 */
export interface FieldNote {
  title: string;
  href: string;
  topic?: string;
  readingMinutes?: number;
  /** On the home page's three-up grid. */
  featured?: boolean;
}

export const fieldNotes: FieldNote[] = [
  {
    title: "Memory and hardware prices are surging — invest now or wait it out?",
    topic: "Infrastructure",
    readingMinutes: 4,
    href: `${liveSite}/memory-and-hardware-prices-are-surging-should-companies-invest-now-or-wait-it-out`,
    featured: true,
  },
  {
    title: "The Real Cost of a Ransomware Attack on a Small Business",
    topic: "Cybersecurity",
    readingMinutes: 2,
    href: `${liveSite}/real-cost-ransomware-attack-small-business`,
    featured: true,
  },
  {
    title: "10 Cybersecurity Habits Every Employee Should Follow",
    topic: "Cybersecurity",
    readingMinutes: 2,
    href: `${liveSite}/10-cybersecurity-habits-every-employee-should-follow`,
    featured: true,
  },
  {
    title: "What Is Multi-Factor Authentication, and why your business cannot afford to skip it",
    href: `${liveSite}/what-multi-factor-authentication-and-why-your-business-cannot-afford-skip-it`,
  },
  {
    title: "How to Spot a Phishing Email: a practical guide for your team",
    href: `${liveSite}/how-spot-phishing-email-practical-guide-your-team`,
  },
];

/** The three the live home page features, in its order. */
export const featuredNotes = fieldNotes.filter((note) => note.featured);
