import { services } from "@/content/services";

/**
 * The vendors decodingIT names in its own solution stacks.
 *
 * The list is deliberately derived from `content/services.ts` rather than
 * typed out again: a brand appears on the technology strip if, and only if,
 * decodingIT's own material names it against a solution. Nothing here is a
 * partnership claim — the strip says "we work with this technology", which is
 * what the source says, and no more.
 *
 * `logo` is the file the client supplies in `public/logos/`. Until that file
 * exists the strip renders the vendor's name instead; see
 * `components/sections/technology-strip.tsx`.
 */
const named = [
  "Cisco",
  "Fortinet",
  "Microsoft",
  "HPE",
  "Dell",
  "Nutanix",
  "Sangfor",
  "Veeam",
  "Acronis",
  "ExaGrid",
] as const;

export interface Vendor {
  name: string;
  /** Filename inside public/logos/. */
  logo: string;
  /** Slugs of the solutions whose stack names this vendor. */
  appearsIn: string[];
}

export const vendors: Vendor[] = named.map((name) => ({
  name,
  logo: `${name.toLowerCase()}.svg`,
  appearsIn: services
    .filter((service) => service.stack.some((entry) => entry === name || entry.startsWith(`${name} `)))
    .map((service) => service.slug),
}));
