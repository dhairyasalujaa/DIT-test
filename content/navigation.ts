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
