import { liveSite } from "@/content/site";

/**
 * Navigation is data, not markup, so the header, the mobile menu, the footer
 * and the sitemap can never drift apart.
 *
 * Labels, groupings and destination captions are decodingIT's own, taken from
 * the mega menu on their live home page. Where a destination is not built
 * here yet the entry points at the live page rather than at a stub, so no
 * link in the chrome is a dead end.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Shown in the mega menu and the mobile panel to preview the destination. */
  hint?: string;
}

export interface NavGroup {
  title: string;
  /** The line under the group title in the live mega menu. */
  summary: string;
  items: NavItem[];
}

export interface NavEntry extends NavItem {
  /** Present when the item opens a mega menu. */
  groups?: NavGroup[];
}

export const primaryNav: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        title: "Build your foundation",
        summary: "Infrastructure, networking, and cloud services",
        items: [
          {
            label: "Technology Foundation",
            href: "/solutions/technology-foundation",
            hint: "Servers, cabling, power, and physical access control — built as one",
          },
          {
            label: "Enterprise Networking",
            href: "/solutions/enterprise-networking",
            hint: "High-performance LAN, WAN, and wireless built for resilience",
          },
          {
            label: "Business Continuity",
            href: "/solutions/business-continuity",
            hint: "Veeam, Acronis, and ExaGrid — restores tested, not assumed",
          },
        ],
      },
      {
        title: "Grow your capability",
        summary: "Scale cloud, endpoints, and security with confidence",
        items: [
          {
            label: "Private Cloud",
            href: "/solutions/private-cloud-hci",
            hint: "Dedicated cloud infrastructure, fully under your control",
          },
          {
            label: "Modern Digital Workplace",
            href: "/solutions/modern-digital-workplace",
            hint: "Manage endpoints, identities, and virtual desktops from one platform",
          },
          {
            label: "Cyber Security Solutions",
            href: "/solutions/cyber-security-solutions",
            hint: "Multi-layer protection from endpoint to network and identity",
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    groups: [
      {
        title: "Run your IT",
        summary: "For businesses without an in-house IT team",
        items: [
          {
            label: "MegaFix SME",
            href: `${liveSite}/flex-it-services`,
            hint: "Flexible IT Support bundled as Fixed Hours that scales with your business",
          },
          {
            label: "GigaManaged",
            href: `${liveSite}/managed-it-services`,
            hint: "Your outsourced IT department: proactive Managed IT Service with Unlimited Support",
          },
          {
            label: "TeraSecure",
            href: `${liveSite}/managed-cybersecurity-services`,
            hint: "Always-on threat detection and protection with Managed Security Services",
          },
        ],
      },
      {
        title: "Extend your IT",
        summary: "Add capability to your existing IT staff",
        items: [
          {
            label: "MegaAssist",
            href: `${liveSite}/co-managed-services`,
            hint: "Co-managed L2/L3 support for your datacentre bundled as Fixed Hours",
          },
          {
            label: "GigaExtend",
            href: `${liveSite}/gigaextend-it-services`,
            hint: "Co-managed IT Service for organisations with complex environments",
          },
          {
            label: "TeraConsult",
            href: `${liveSite}/it-consulting-services`,
            hint: "Gap assessment and consultancy for infrastructure, security, risk and compliance",
          },
        ],
      },
      {
        title: "More",
        summary: "Your portal, deployment, and the plan finder",
        items: [
          {
            label: "MyIT Portal",
            href: `${liveSite}/my-it-portal`,
            hint: "Your dashboard, tickets and reports in one place",
          },
          {
            label: "GigaDeploy",
            href: `${liveSite}/it-deployment-services`,
            hint: "Rollouts, migrations and installs, delivered to a plan",
          },
          {
            label: "Plan Recommender",
            href: `${liveSite}/tools/service-plan-recommender`,
            hint: "Four questions, and it shows its reasoning — no sign-up",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/insights",
    groups: [
      {
        title: "Latest Insights",
        summary: "Browse our latest articles and guides",
        items: [
          {
            label: "10 Cybersecurity Habits Every Employee Should Follow",
            href: `${liveSite}/10-cybersecurity-habits-every-employee-should-follow`,
          },
          {
            label: "The Real Cost of a Ransomware Attack",
            href: `${liveSite}/real-cost-ransomware-attack-small-business`,
          },
          {
            label: "What Is Multi-Factor Authentication?",
            href: `${liveSite}/what-multi-factor-authentication-and-why-your-business-cannot-afford-skip-it`,
          },
          {
            label: "How to Spot a Phishing Email",
            href: `${liveSite}/how-spot-phishing-email-practical-guide-your-team`,
          },
        ],
      },
      {
        title: "Free IT Tools",
        summary: "Calculators built for IT professionals",
        items: [
          { label: "IP Subnet Calculator", href: `${liveSite}/tools/subnet-calculator` },
          { label: "M365 License Cost Estimator", href: `${liveSite}/tools/m365-cost-estimator` },
          { label: "Downtime Cost Calculator", href: `${liveSite}/tools/downtime-cost-calculator` },
          { label: "Backup Storage Calculator", href: `${liveSite}/tools/backup-storage-calculator` },
        ],
      },
    ],
  },
  { label: "Our Approach", href: "/approach" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/** Flattened for the mobile panel, which has no room for a mega menu. */
export const mobileNav: NavItem[] = primaryNav;

/**
 * The footer's four columns, as the live site groups them.
 * "More →" entries are theirs too.
 */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Key Solutions",
    items: [
      { label: "Technology Foundation", href: "/solutions/technology-foundation" },
      { label: "Enterprise Networking", href: "/solutions/enterprise-networking" },
      { label: "Private Cloud Solutions", href: "/solutions/private-cloud-hci" },
      { label: "Business Continuity", href: "/solutions/business-continuity" },
      { label: "Modern Digital Workplace", href: "/solutions/modern-digital-workplace" },
      { label: "More →", href: "/solutions" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "MegaFix SME", href: `${liveSite}/flex-it-services` },
      { label: "GigaManaged", href: `${liveSite}/managed-it-services` },
      { label: "TeraSecure", href: `${liveSite}/managed-cybersecurity-services` },
      { label: "MegaAssist", href: `${liveSite}/co-managed-services` },
      { label: "GigaExtend", href: `${liveSite}/gigaextend-it-services` },
      { label: "TeraConsult", href: `${liveSite}/it-consulting-services` },
      { label: "More →", href: "/services" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: `${liveSite}/careers` },
      { label: "Plan Recommender", href: `${liveSite}/tools/service-plan-recommender` },
      { label: "Cyber Health Check", href: `${liveSite}/tools/cyber-health-check` },
      { label: "More Tools →", href: `${liveSite}/tools` },
    ],
  },
];
