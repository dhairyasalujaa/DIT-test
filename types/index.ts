/**
 * Shared content types.
 *
 * Everything the site renders comes from `content/*` through these shapes, so
 * moving to a CMS later means replacing the data source, not the components.
 */

export type Slug = string;

/** A capability bullet inside a service — one concrete thing decodingIT does. */
export interface Capability {
  title: string;
  description: string;
}

export interface Service {
  slug: Slug;
  /** Two-digit index used as the editorial marker in listings. */
  index: string;
  /** Short name, used in navigation and listings. */
  name: string;
  /** Full name, used as the page H1. */
  title: string;
  /** One line that answers "what is this?" before any detail. */
  summary: string;
  /** The opening paragraph of the service page. */
  lede: string;
  /** Page <title>. */
  metaTitle: string;
  /** Page meta description. */
  metaDescription: string;
  capabilities: Capability[];
  /** Named platforms and disciplines involved in delivering this service. */
  stack: string[];
  /** A line specific to this practice, shown above the stack. */
  stackNote: string;
  /** Questions this service exists to answer, in the customer's own words. */
  answers: string[];
  /** Slugs of the services most often bought alongside this one. */
  related: Slug[];
}

export interface ProcessStage {
  index: string;
  name: string;
  summary: string;
  detail: string;
  /**
   * What the client receives at the end of the stage.
   * Optional: only stated where decodingIT states it, rather than inventing
   * a deliverable to fill the column.
   */
  output?: string;
}

export interface Article {
  slug: Slug;
  title: string;
  /** Page <title> when it should differ from the article title. */
  metaTitle: string;
  metaDescription: string;
  /** Standfirst shown under the headline. */
  standfirst: string;
  /** ISO date. */
  published: string;
  updated?: string;
  topic: string;
  readingMinutes: number;
  /** Rendered as the article body. */
  body: ArticleBlock[];
  /** Service slugs this article should link out to. */
  related: Slug[];
}

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "checklist"; title: string; items: string[] }
  | { kind: "quote"; text: string };

/**
 * A delivered project.
 *
 * The array in `content/projects.ts` is intentionally empty: decodingIT's
 * client work is not published without consent, and inventing case studies
 * would be worse than having none. Add real entries here and `/work`
 * switches from the engagement-shapes view to a full project gallery.
 */
export interface Project {
  slug: Slug;
  client: string;
  title: string;
  year: string;
  disciplines: string[];
  /** The situation before decodingIT was engaged. */
  problem: string;
  /** What was designed and built. */
  approach: string;
  /** What measurably changed. Only include what the client has confirmed. */
  result: string;
  stack: string[];
}

export interface Location {
  id: string;
  city: string;
  country: string;
  role: string;
  addressLines: string[];
  phone: string;
  phoneHref: string;
}
