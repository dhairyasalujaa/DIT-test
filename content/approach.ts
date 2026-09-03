import type { ProcessStage } from "@/types";

/**
 * The Decoding IT Way.
 *
 * These four phases are decodingIT's own description of how an engagement
 * runs, whether the work is day-to-day IT or a specific project. They replace
 * an earlier five-stage model that was invented rather than sourced.
 */
export const processStages: ProcessStage[] = [
  {
    index: "01",
    name: "Set up",
    summary: "Your portal, your team, your environment on record.",
    detail:
      "We set up your portal, meet your team and document your full IT environment before anything else moves. Nothing is changed until what you have is written down.",
  },
  {
    index: "02",
    name: "Stabilise",
    summary: "Fix what is broken, close what is open.",
    detail:
      "We resolve immediate issues, close security gaps and establish a clean IT health baseline. This is the stage that turns an inherited estate into a known one.",
  },
  {
    index: "03",
    name: "Improve",
    summary: "Move from reactive to planned.",
    detail:
      "With the basics solid, we move to proactive improvements — performance, resilience and roadmap planning. Investment follows evidence from your own environment.",
  },
  {
    index: "04",
    name: "Run",
    summary: "Monitored, supported, reported.",
    detail:
      "Continuous monitoring, helpdesk support and monthly reports, all tracked inside your client portal — so the state of your estate is something you can look at rather than ask about.",
  },
];

/**
 * How decodingIT describes what makes the service different.
 *
 * Each of these is the company's own stated position, not an authored one.
 */
export const principles = [
  {
    title: "One team, no handoff",
    body: "The same team designs, deploys and supports every layer. When something breaks, there is no argument about whose layer it is.",
  },
  {
    title: "One contract, one owner",
    body: "One agreement covers every layer, with response times written into it — and a named account manager who owns whether they are met.",
  },
  {
    title: "Engineers on the ground",
    body: "decodingIT operates on the ground in Muscat and understands the local business environment and the infrastructure challenges that come with it. Site work does not wait on a visit from another country.",
  },
  {
    title: "Visibility through the portal",
    body: "Monitoring, tickets, project progress and monthly reports are tracked in a client portal, so the provider is not the only party who knows the state of your estate.",
  },
];

/**
 * The service tiers.
 *
 * decodingIT's product line, named on the live site: Mega / Giga / Tera
 * prefixes with Fix / Assist / Managed / Extend / Secure / Consult suffixes,
 * grouped by how much of the estate the client hands over.
 */
export interface ServiceTier {
  group: string;
  products: {
    name: string;
    description: string;
    /** Who the tier is for, where the site states it. */
    audience?: string;
  }[];
}

export const serviceTiers: ServiceTier[] = [
  {
    group: "Reactive",
    products: [
      {
        name: "MegaFix SME",
        description:
          "Flexible IT support bundled as fixed hours that scales with your business.",
        audience: "Businesses with occasional IT support needs",
      },
    ],
  },
  {
    group: "Co-managed",
    products: [
      {
        name: "MegaAssist",
        description:
          "Co-managed L2/L3 support for your datacentre, bundled as fixed hours.",
        audience: "IT teams needing on-demand L3 support",
      },
    ],
  },
  {
    group: "Fully managed",
    products: [
      {
        name: "MegaFix",
        description:
          "Flexible IT support bundled as fixed hours that scales with your business.",
      },
      {
        name: "GigaManaged IT",
        description:
          "Your outsourced IT department: proactive managed IT service with unlimited support.",
      },
      {
        name: "TeraSecure",
        description:
          "Always-on threat detection and protection, delivered as managed security services.",
      },
    ],
  },
  {
    group: "Extend your team",
    products: [
      {
        name: "MegaAssist",
        description:
          "Co-managed L2/L3 support for your datacentre, bundled as fixed hours.",
        audience: "IT teams needing on-demand L3 support",
      },
      {
        name: "GigaExtend",
        description:
          "Co-managed IT service for organisations with complex environments, managed by an L2/L3 specialist team.",
        audience: "Existing infrastructure needing an operator",
      },
      {
        name: "TeraConsult",
        description:
          "Gap assessment and consultancy for infrastructure, security and risk.",
      },
    ],
  },
];

/**
 * Kept for the pages that present engagement as a narrative rather than a
 * price list. Drawn from the tiers above.
 */
export const engagementShapes = [
  {
    index: "A",
    title: "GigaManaged IT",
    trigger: "There is no internal IT team, or the one that exists is stretched.",
    involves:
      "Your outsourced IT department — proactive managed IT service with unlimited support, covering every layer under one agreement with response times written in and a named account manager.",
    disciplines: ["Fully managed"],
  },
  {
    index: "B",
    title: "GigaExtend",
    trigger: "There is an internal team, and a complex environment that needs an operator alongside it.",
    involves:
      "Co-managed IT service run by an L2/L3 specialist team working with your own people rather than replacing them — taking the escalations, the monitoring and the deep technical work.",
    disciplines: ["Extend your team"],
  },
  {
    index: "C",
    title: "TeraSecure",
    trigger: "Security controls exist, but nobody is watching them outside office hours.",
    involves:
      "Always-on threat detection and protection as a managed security service, so an alert reaches somebody who acts on it.",
    disciplines: ["Fully managed"],
  },
  {
    index: "D",
    title: "TeraConsult",
    trigger: "A decision needs making, and the current state is not documented well enough to make it.",
    involves:
      "Gap assessment and consultancy across infrastructure, security and risk — a written picture of where you are before anything is proposed.",
    disciplines: ["Extend your team"],
  },
];
