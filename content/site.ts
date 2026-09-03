import type { Location } from "@/types";

/**
 * Single source of truth for identity, contact details and canonical URLs.
 *
 * Every fact here is drawn from decodingIT's own published company
 * information. Nothing is estimated or invented — if a value is unknown it is
 * absent rather than guessed.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://decodingit.com"
).replace(/\/$/, "");

export const site = {
  name: "decodingIT",
  legalName: "Decoding IT Solutions",
  /** Used as the site-wide title suffix and in WebSite structured data. */
  shortName: "decodingIT",
  tagline: "Technology, decoded.",
  description:
    "decodingIT designs, builds and runs the IT that businesses depend on — infrastructure, networking, cloud, workplace and security — across Oman, the UAE and India.",
  email: "sales@decodingit.com",
  supportEmail: "support@decodingit.com",
  locale: "en",
  hours: {
    label: "Sunday – Thursday, 08:00 – 17:00 (GST)",
    opens: "08:00",
    closes: "17:00",
    days: [
      "https://schema.org/Sunday",
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
    ],
  },
} as const;

export const locations: Location[] = [
  {
    id: "muscat",
    city: "Muscat",
    country: "Oman",
    role: "Headquarters",
    addressLines: [
      "M Floor, Mosaic Tower",
      "Dohat Al Adab Street, Al Khuwair",
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
      "256, Spaze Edge Tower",
      "Sector 47, Sohna Road",
      "Gurugram, Haryana, India",
    ],
    phone: "+91 82854 26454",
    phoneHref: "+918285426454",
  },
];

/** Markets decodingIT serves directly. Formal names — used in structured data. */
export const markets = ["Oman", "United Arab Emirates", "India"] as const;

/** The same markets, abbreviated for tight typographic settings. */
export const marketsShort = ["Oman", "UAE", "India"] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/decoding-it-solutions" },
  { label: "Facebook", href: "https://www.facebook.com/decodingit/" },
] as const;
