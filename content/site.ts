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
  /** The line that sits under the wordmark on the live site. */
  tagline: "Your IT. One Team.",
  description:
    "Full-stack IT infrastructure, cloud, cybersecurity, and managed services. One team, end-to-end — serving businesses across Oman, UAE, and India.",
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
    addressLines: [
      "258, Tower B, SpaceEdge Tower",
      "Sector 47, Sohna Road",
      "Gurugram, Haryana, India",
    ],
    phone: "+91 87555 07444",
    phoneHref: "+918755507444",
    email: "sales@decodingit.in",
  },
];

/** Markets decodingIT serves directly. Formal names — used in structured data. */
export const markets = ["Oman", "United Arab Emirates", "India"] as const;

/** The same markets, abbreviated for tight typographic settings. */
export const marketsShort = ["Oman", "UAE", "India"] as const;

/** The hero tag row, as it runs on the live site. */
export const heroTagRow = [
  "Infrastructure",
  "Cloud",
  "Networking",
  "Cybersecurity",
  "Managed Services",
] as const;

/** Certifications decodingIT states in its footer. */
export const certifications = ["ISO 27001", "ISO 9001"] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/decodingit" },
  { label: "X", href: "https://x.com/DecodingIT" },
  { label: "Facebook", href: "https://www.facebook.com/decodingit/" },
] as const;
