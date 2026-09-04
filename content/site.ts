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
} as const;

/*
 * Removed on 2026-09-04, and deliberately not replaced:
 *
 * - `since: "2013"`. Derived by subtracting the band's "13+ years in the
 *   region" from the current year. The "+" means "at least"; turning it into
 *   a founding year invents precision the company has not published.
 * - `responsePromise`. A four-business-hour reply commitment. It read as an
 *   SLA and appears nowhere in decodingIT's own material.
 *
 * Both came from search-index summaries early in this project, before the
 * client supplied a capture of their real home page. Neither survives against
 * it. If they are true, they can come back with a source.
 */

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

/**
 * Offices.
 *
 * One postal address, because decodingIT publishes one: the Gurugram address
 * in their own footer, transcribed exactly as they print it.
 *
 * An earlier version of this file also carried a Muscat street address and
 * called it the headquarters. That address appears in no source the client has
 * supplied — not their home page, not their design extraction — and it was
 * being emitted as a PostalAddress in the site's Organization structured data,
 * which is to say published to search engines as fact. It is gone.
 *
 * The Oman phone number below IS sourced: it is the number their own WhatsApp
 * click-to-chat dials. It is listed as a contact number rather than an office,
 * because a number is all their material establishes.
 */
export const locations: Location[] = [
  {
    id: "gurugram",
    city: "Gurugram",
    country: "India",
    addressLines: ["258, Tower B, SpaceEdge Tower", "Sec 47, Sohna Road, Gurugram"],
    phone: "+91 8755507444",
    phoneHref: "+918755507444",
  },
];

/** Numbers decodingIT publishes, without claiming an office behind each one. */
export const phoneNumbers = [
  { region: "India", phone: "+91 87555 07444", href: "+918755507444" },
  { region: "Oman", phone: "+968 2284 4777", href: "+96822844777" },
] as const;

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
