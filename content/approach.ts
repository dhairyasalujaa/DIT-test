import type { ProcessStage } from "@/types";

/**
 * How an engagement actually runs.
 *
 * This is the real shape of a managed-services relationship — assessment,
 * design, transition, operation, review — rather than the five-step "discover,
 * ideate, deliver" diagram every agency prints. Each stage names what the
 * client receives, so the process is checkable rather than decorative.
 */
export const processStages: ProcessStage[] = [
  {
    index: "01",
    name: "Assess",
    summary: "We find out what you actually have.",
    detail:
      "Before anything is proposed, we survey the estate: servers, endpoints, network, licences, backups, security controls and the contracts underneath them. Almost every organisation is surprised by something at this stage — an unsupported host, a backup that has been failing quietly, a firewall out of subscription, a former employee's account still enabled.",
    output: "A written gap analysis: what you have, what is at risk, and what it would take to fix.",
  },
  {
    index: "02",
    name: "Design",
    summary: "We agree the target state and what it costs.",
    detail:
      "We set out where the estate should get to and in what order, separating what is urgent from what is merely untidy. Costs are presented as a whole — licences, hardware, service and the effort to get there — so decisions are made against real numbers rather than a headline rate.",
    output: "A target-state design, a prioritised plan and a cost model you can take to a board.",
  },
  {
    index: "03",
    name: "Transition",
    summary: "We take over without a gap in service.",
    detail:
      "Onboarding is the stage most providers underestimate. Monitoring and management agents are deployed, documentation is built, credentials are moved into managed vaults, escalation paths are agreed and your people are told — in plain language — how to raise something and what happens next.",
    output: "A documented environment, live monitoring, and a service desk your staff know how to reach.",
  },
  {
    index: "04",
    name: "Operate",
    summary: "We run it to an agreed standard.",
    detail:
      "Day to day this is support, patching, monitoring, backup verification and security operations. The difference between a good and a poor managed service is not the tooling; it is whether anyone reads the alerts, and whether the small things get fixed before they become the incident.",
    output: "Support to agreed response targets, monitored backups, and a live asset inventory.",
  },
  {
    index: "05",
    name: "Review",
    summary: "We tell you the truth about how it went.",
    detail:
      "Regular service reviews cover what broke, what was slow, what is ageing and what should be budgeted next. Where we missed a target we say so. The roadmap is revisited here, so investment follows evidence from your own environment rather than a vendor's release cycle.",
    output: "A service report, an updated risk register and a refreshed technology roadmap.",
  },
];

/** The commitments that shape how we work — each one testable. */
export const principles = [
  {
    title: "You own your environment",
    body: "Documentation, diagrams, configurations and credentials belong to you. If you ever leave us, you leave with everything you need to be run by somebody else. A provider that keeps you through lock-in has stopped competing on quality.",
  },
  {
    title: "Recovery is proven, not promised",
    body: "A backup that has never been restored is a theory. We test restores, and we would rather tell you today that a recovery target is unrealistic than discover it with you during an incident.",
  },
  {
    title: "Specification before product",
    body: "We are a reseller as well as a service provider, and we are aware of what that can incentivise. So the requirement is written down before anything is quoted, and we will say when the thing you asked to buy is not the thing you need.",
  },
  {
    title: "Plain language, always",
    body: "If an explanation only makes sense to somebody who already works in IT, it is not an explanation. Decisions get made by people who are not engineers, and they deserve to understand what they are approving.",
  },
];

/**
 * The kinds of engagement decodingIT delivers.
 *
 * These describe the shape of the work — what such a project involves — and
 * deliberately make no claim about specific past clients or outcomes. Named
 * case studies belong in `content/projects.ts`, and only with client consent.
 */
export const engagementShapes = [
  {
    index: "A",
    title: "Managed service transition",
    trigger: "An internal team is stretched, or an incumbent provider is not delivering.",
    involves:
      "A full survey of the estate, a documented baseline, deployment of monitoring and management tooling, migration of credentials and knowledge, and a defined cutover so support never falls between two providers.",
    disciplines: ["Managed IT services", "Cyber security"],
  },
  {
    index: "B",
    title: "Infrastructure build or refresh",
    trigger: "A new office, a data-centre move, or hardware that has run past its support life.",
    involves:
      "Workload-based sizing, procurement through vendor channels, structured cabling and comms room build, installation and configuration, migration of services, and documentation handed over at completion.",
    disciplines: ["IT infrastructure", "Enterprise networking"],
  },
  {
    index: "C",
    title: "Security hardening programme",
    trigger: "An incident, an insurance or audit requirement, or a board that has started asking.",
    involves:
      "A gap analysis against the current control set, prioritisation by real exposure, deployment of endpoint, email, network and identity controls, and a rehearsed recovery path for ransomware.",
    disciplines: ["Cyber security", "Managed IT services"],
  },
  {
    index: "D",
    title: "Cloud and workplace migration",
    trigger: "Ageing on-premises servers, distributed teams, or licences already bought and unused.",
    involves:
      "Deciding which workloads move and which stay, tenant and identity configuration, staged mailbox and file migration, endpoint enrolment, secure access policy, and user communication before cutover.",
    disciplines: ["Cloud & data centre", "Modern workplace"],
  },
];
