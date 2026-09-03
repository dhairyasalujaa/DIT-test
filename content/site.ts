import type { Location } from "@/types";

/**
 * Identity, contact details and canonical URLs.
 *
 * SOURCING: everything here is drawn from decodingIT's own published company
 * information. The network in the build environment cannot reach
 * decodingit.com directly, so these came via search indexes of those pages —
 * second-hand, and worth one pass of verification against the live site before
 * launch. Values that could not be confirmed have been removed rather than
 * guessed; see README for the remaining checklist.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://decodingit.com"
).replace(/\/$/, "");

export const site = {
  name: "decodingIT",
  legalName: "Decoding IT Solutions",
  shortName: "decodingIT",
  /** The company's own line. E.A.S.Y. = Effective and Success Yielding. */
  tagline: "We make IT E.A.S.Y.",
  taglineExpanded: "Effective and Success Yielding",
  description:
    "decodingIT is a Muscat-based IT solutions company covering foundation, network, cloud, continuity, workplace and security — answered by one team. Serving Oman, the UAE and India.",
  email: "sales@decodingit.com",
  /** Operating in Muscat since 2013. */
  since: "2013",
  locale: "en",
  /** The company's own commitment on the contact page. */
  responsePromise: "A real engineer will get back to you within 4 business hours.",
} as const;

export const locations: Location[] = [
  {
    id: "muscat",
    city: "Muscat",
    country: "Oman",
    role: "Headquarters",
    addressLines: [
      "Building 301, Way 4405, Al Udhaiba",
      "PB 1811, PC 133",
      "Muscat, Sultanate of Oman",
    ],
    phone: "+968 2284 4777",
    phoneHref: "+96822844777",
  },
  {
    id: "gurugram",
    city: "Gurugram",
    country: "India",
    role: "Delhi NCR operations",
    addressLines: ["Spaze Edge Tower", "Sohna Road", "Gurugram, Haryana, India"],
    phone: "+91 87555 07444",
    phoneHref: "+918755507444",
  },
];

/** Markets decodingIT serves directly. Formal names — used in structured data. */
export const markets = ["Oman", "United Arab Emirates", "India"] as const;

/** The same markets, abbreviated for tight typographic settings. */
export const marketsShort = ["Oman", "UAE", "India"] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/decodingit" },
  { label: "X", href: "https://x.com/DecodingIT" },
  { label: "Facebook", href: "https://www.facebook.com/decodingit/" },
] as const;
