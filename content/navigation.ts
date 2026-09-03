/**
 * Navigation is data, not markup, so the header, the mobile menu, the footer
 * and the sitemap can never drift apart.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Shown in the mobile menu and footer to preview the destination. */
  hint?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/services", hint: "Every layer of your IT, designed together" },
  { label: "Approach", href: "/approach", hint: "How an engagement actually runs" },
  { label: "Work", href: "/work", hint: "The shape of what we deliver" },
  { label: "About", href: "/about", hint: "Who we are and what we refuse to do" },
];

/**
 * The mobile panel is a complete map rather than a copy of the desktop bar:
 * a phone has no flyout and no room for a persistent secondary link, so
 * Insights and Contact — which are reachable from the desktop chrome through
 * the footer and the CTA — get a place of their own here.
 */
export const mobileNav: NavItem[] = [
  ...primaryNav,
  { label: "Insights", href: "/insights", hint: "What our engineers write" },
  { label: "Contact", href: "/contact", hint: "A reply within four business hours" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Solutions",
    items: [
      { label: "Enterprise Networking", href: "/services/enterprise-networking" },
      { label: "Technology Foundation", href: "/services/technology-foundation" },
      { label: "Private Cloud & HCI", href: "/services/private-cloud-hci" },
      { label: "Business Continuity", href: "/services/business-continuity" },
      { label: "Modern Digital Workplace", href: "/services/modern-digital-workplace" },
      { label: "Cyber Security Solutions", href: "/services/cyber-security-solutions" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Approach", href: "/approach" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
