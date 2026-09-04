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
}

/** An office decodingIT publishes a postal address for. */
export interface Location {
  id: string;
  city: string;
  country: string;
  addressLines: string[];
  phone: string;
  phoneHref: string;
}
