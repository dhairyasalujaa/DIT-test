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
    body: "The same team that designs the solution deploys it and supports it long-term. There is no handoff between a project team and a support desk — one point of accountability throughout.",
  },
  {
    title: "One agreement across every layer",
    body: "Foundation, network, cloud, continuity, workplace and security sit under a single agreement, with response times written into it and a named account manager who owns whether they are met.",
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
 * Engagement models.
 *
 * decodingIT offers six ways to work together, from fixing what is in front of
 * you today to running the whole estate or extending a team you already have.
 * Only the two named models below could be sourced; the remaining four need
 * confirming from the company before they are published.
 */
export const engagementShapes = [
  {
    index: "A",
    title: "GigaManaged IT",
    trigger: "There is no internal IT team, or the one that exists is stretched.",
    involves:
      "An outsourced IT department: proactive managed IT service with unlimited support, covering every layer under one agreement with response times written in and a named account manager.",
    disciplines: ["Foundation", "Network", "Security"],
  },
  {
    index: "B",
    title: "Co-managed IT",
    trigger: "There is an internal team, and a complex environment that needs an operator alongside it.",
    involves:
      "An L2/L3 specialist team working with your own people rather than replacing them — taking the escalations, the monitoring and the deep technical work while your team keeps the business relationships.",
    disciplines: ["Network", "Cloud", "Continuity"],
  },
];
