import type { Location } from "@/types";

/**
 * Identity, contact details and canonical URLs.
 *
 * SOURCING: every value here now comes from decodingIT's own home page —
 * a browser capture of https://decodingit.com/ supplied by the client. That
 * domain is unreachable from this build environment, so the capture is the
 * primary source and supersedes the search-index guesses these fields held
 * before. Anything that could not be confirmed against it has been removed
 * rather than kept on trust.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://decodingit.com"
).replace(/\/$/, "");

/**
 * Pages that exist on the live site but not in this build — service plans,
 * the calculators, published articles. Linking to the live URL keeps every
 * link working during review; swap this for "" once those routes exist here.
 */
export const liveSite = "https://decodingit.com";

export const site = {
  name: "Decoding IT",
  legalName: "Decoding IT Solutions LLC",
  shortName: "decodingIT",
  /** The line that sits under the wordmark on the live site. */
  tagline: "Your IT. One Team.",
  description:
    "Full-stack IT infrastructure, cloud, cybersecurity, and managed services. One team, end-to-end — serving businesses across Oman, UAE, and India.",
  email: "sales@decodingit.in",
  /** The address the footer's social row uses for general enquiries. */
  generalEmail: "info@decodingit.com",
  since: "2013",
  locale: "en",
  responsePromise: "A real engineer will get back to you within 4 business hours.",
} as const;

/** The utility bar above the header, as it runs on the live site. */
export const topBar = {
  phone: "+91 87555 07444",
  phoneHref: "+918755507444",
  market: "India",
  portalLabel: "MyIT Portal",
  portalHref: "https://app.decodingit.com/clientportal",
  talkLabel: "Talk to us",
} as const;

export const whatsapp = {
  label: "Chat on WhatsApp",
  href: "https://api.whatsapp.com/send?phone=918755507444&text=Hi%2C%20I%20have%20a%20question%20about%20your%20IT%20services.",
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
      "Sec 47, Sohna Road, Gurugram",
      "Haryana, India",
    ],
    phone: "+91 8755507444",
    phoneHref: "+918755507444",
    email: "sales@decodingit.in",
  },
];

/** Markets decodingIT serves directly. Formal names — used in structured data. */
export const markets = ["Oman", "United Arab Emirates", "India"] as const;

/** The same markets, abbreviated — the footer's "We serve" row. */
export const marketsShort = ["Oman", "UAE", "India"] as const;

/** The hero tag row, in the live site's order. */
export const heroTagRow = [
  "Infrastructure",
  "Cloud",
  "Networking",
  "Cybersecurity",
  "Managed Services",
] as const;

/** Certifications the live footer states. */
export const certifications = ["ISO 27001", "ISO 9001"] as const;

/** The four links in the live footer's social row, in its order. */
export const socials = [
  { label: "X", href: "https://x.com/DecodingIT" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/decodingit" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=mq3mPn0_YEw" },
  { label: "Email", href: "mailto:info@decodingit.com" },
] as const;
