import { liveSite } from "@/content/site";

/**
 * decodingIT's six service plans — the Mega / Giga / Tera line.
 *
 * Names, tags, descriptions and audiences are transcribed verbatim from the
 * "engagements built around your situation" section of decodingit.com. The
 * live site sets each name in two parts with the second emphasised, so the
 * split is modelled rather than baked into a string.
 *
 * These plan pages are not built here yet, so each links to its live page.
 */
export interface Plan {
  /** Small category line above the name, e.g. "Reactive". */
  tag: string;
  /** "Mega", "Giga" or "Tera". */
  prefix: string;
  /** The emphasised half: "Fix", "Managed", "Secure"… */
  accent: string;
  /** Anything after the accent, e.g. "SME". */
  suffix?: string;
  description: string;
  /** Who the plan is for, as the live site states it. */
  audience: string;
  href: string;
  /** The live site marks GigaManaged as its most chosen plan. */
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    tag: "Reactive",
    prefix: "Mega",
    accent: "Fix",
    suffix: "SME",
    description:
      "Flexible IT Support bundled as Fixed Hours that scales with your business",
    audience: "Business with occasional IT support needs",
    href: `${liveSite}/flex-it-services`,
  },
  {
    tag: "Most chosen · Fully managed",
    prefix: "Giga",
    accent: "Managed",
    description:
      "Your outsourced IT department: proactive Managed IT Service with Unlimited Support",
    audience: "organisations without an internal IT team",
    href: `${liveSite}/managed-it-services`,
    featured: true,
  },
  {
    tag: "Security-led",
    prefix: "Tera",
    accent: "Secure",
    description:
      "Always-on threat detection and protection with Managed Security Services",
    audience: "regulated or high-exposure environments",
    href: `${liveSite}/managed-cybersecurity-services`,
  },
  {
    tag: "Co-managed",
    prefix: "Mega",
    accent: "Assist",
    description:
      "Co-managed L2/L3 support for your datacentre bundled as Fixed Hours",
    audience: "IT teams needing on-demand L3 support",
    href: `${liveSite}/co-managed-services`,
  },
  {
    tag: "Manage what you own",
    prefix: "Giga",
    accent: "Extend",
    description:
      "Co-managed IT Service for organisations with complex environments — managed by an L2/L3 specialist team",
    audience: "existing infrastructure needing an operator",
    href: `${liveSite}/gigaextend-it-services`,
  },
  {
    tag: "Advisory",
    prefix: "Tera",
    accent: "Consult",
    description:
      "Gap assessment and consultancy for infrastructure, security, risk and compliance",
    audience: "a change big enough to plan properly",
    href: `${liveSite}/it-consulting-services`,
  },
];
