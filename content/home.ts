import { liveSite } from "@/content/site";

/**
 * The home page's own copy.
 *
 * Every string in this file is decodingIT's, transcribed verbatim from the
 * capture of https://decodingit.com/ — including the lower-case section
 * headings, which are a deliberate part of their voice and not a typo.
 *
 * Where a heading carries an emphasised phrase the live site wraps it in its
 * own span, so it is modelled here as `{ before, accent, after }` rather than
 * as one string with markup baked in.
 */

export interface HeroSlide {
  before: string;
  accent: string;
  after?: string;
  sub: string;
}

/**
 * The live hero cycles five statements. The fifth is the one their page marks
 * `is-active`, so it leads here too.
 */
export const heroSlides: HeroSlide[] = [
  {
    before: "Extend your team,",
    accent: "on demand.",
    sub: "MegaAssist, GigaExtend, and TeraConsult — augment your team exactly where you need it.",
  },
  {
    before: "Your entire IT stack, covered by",
    accent: "one team.",
    sub: "Infrastructure, networking, cloud, security, and managed services — built to work together and supported under a single point of accountability.",
  },
  {
    before: "Build a",
    accent: "foundation",
    after: "that scales.",
    sub: "Technology Foundation, Enterprise Networking, and Microsoft Cloud Workspace — the infrastructure layer your business runs on.",
  },
  {
    before: "Grow without",
    accent: "compromise.",
    sub: "Private Cloud, Modern Digital Workplace, and Cyber Security Solutions — scale securely as your business grows.",
  },
  {
    before: "Run your IT,",
    accent: "fully managed.",
    sub: "MegaFix, GigaManaged, and TeraSecure — however hands-on you want us to be.",
  },
];

export const heroActions = {
  primary: "Talk to Our Experts",
  secondary: { label: "Browse Solutions", href: "/solutions" },
  check: {
    label: "Free Cyber Health Check — see your score in 5 min",
    href: `${liveSite}/tools/cyber-health-check`,
  },
} as const;

export const solutionsSection = {
  title: "every layer of your IT, designed together",
  lede: "Most problems live between layers — a network built for one thing, a backup that never met the workload. We design and run the whole stack, so the seams are ours to answer for.",
} as const;

export const plansSection = {
  title: "engagements built around your situation",
  lede: "Six ways to work with us — from fixing what is in front of you today to running the whole estate, or extending a team you already have.",
} as const;

export const bandSection = {
  title: "one partner. every layer. full accountability.",
  stats: [
    {
      figure: "13+",
      label: "Years in the region",
      body: "Long enough to have seen how these estates age — and to have supported them through it, across Oman and India.",
    },
    {
      figure: "6",
      label: "Layers, one team",
      body: "Foundation, network, cloud, continuity, workplace and security, answered by one team. When something breaks, there is no argument about whose layer it is.",
    },
    {
      figure: "1",
      label: "Contract, one owner",
      body: "One agreement covers every layer, with response times written into it — and a named account manager who owns whether they are met.",
    },
  ],
} as const;

export const partnersSection = {
  title: "Technology we work with",
} as const;

export const toolsSection = {
  title: "calculators our own engineers use",
  lede: "Built for our sizing and licensing work, then opened up. No sign-up, no email wall.",
} as const;

export const insightsSection = {
  title: "what we are seeing in the field",
} as const;

export const closingSection = {
  title: "Got a complex IT challenge? Let’s decode it into a simple solution.",
  lede: "Tell us what you’re trying to solve. Our experts will help you find the right way forward.",
  primary: "Get Started",
  secondary: {
    label: "Book a Cyber Health Check",
    href: `${liveSite}/tools/cyber-health-check`,
  },
} as const;
