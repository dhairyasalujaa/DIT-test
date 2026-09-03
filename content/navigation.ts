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
  { label: "Services", href: "/services", hint: "Six practices, one operating model" },
  { label: "Approach", href: "/approach", hint: "How an engagement actually runs" },
  { label: "Work", href: "/work", hint: "The shape of what we deliver" },
  { label: "About", href: "/about", hint: "Who we are and what we refuse to do" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "Managed IT services", href: "/services/managed-it-services" },
      { label: "Cyber security", href: "/services/cyber-security" },
      { label: "Cloud & data centre", href: "/services/cloud-and-data-centre" },
      { label: "Enterprise networking", href: "/services/enterprise-networking" },
      { label: "IT infrastructure", href: "/services/it-infrastructure" },
      { label: "Modern workplace", href: "/services/modern-workplace" },
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
