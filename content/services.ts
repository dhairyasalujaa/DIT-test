import type { Service } from "@/types";

/**
 * The six practices decodingIT delivers.
 *
 * Descriptions are written from decodingIT's published service lines. Where a
 * platform is named it is one the company actually deploys and supports; no
 * vendor partnership, certification level or accreditation is claimed here,
 * because those are commercial facts that belong to the company to state.
 */
export const services: Service[] = [
  {
    slug: "managed-it-services",
    index: "01",
    name: "Managed IT services",
    title: "Managed IT services",
    summary:
      "Your entire IT function — support, monitoring, patching, backup and security — run to an agreed standard by an accountable team.",
    lede:
      "Most organisations do not want to run IT. They want IT to work, to be predictable, and to stop being a source of surprise. Managed services are how we take that whole problem off the table: one team, one number to call, one monthly cost, and a documented standard we hold ourselves to.",
    metaTitle: "Managed IT Services — Support, Monitoring & Backup | decodingIT",
    metaDescription:
      "Outsource IT support, monitoring, patching, backup and security to an accountable team. Managed IT services for businesses in Oman, the UAE and India.",
    capabilities: [
      {
        title: "End-user support",
        description:
          "A staffed helpdesk for the things that stop people working — desktops, laptops, printers, UPS units, peripherals — with engineers on site when remote hands are not enough.",
      },
      {
        title: "24×7 monitoring",
        description:
          "Servers, network devices and links watched continuously, so the first person who knows a circuit dropped is us, not your finance director.",
      },
      {
        title: "Backup as a service",
        description:
          "Automated daily backup of servers, workstations and cloud data, monitored every day, with restores tested rather than assumed.",
      },
      {
        title: "Security as a service",
        description:
          "Firewall, endpoint and policy management operated as an ongoing service rather than a box that was configured once and never revisited.",
      },
      {
        title: "Email and collaboration",
        description:
          "Mailbox administration, mail flow, anti-phishing controls and the authentication records that keep your domain trusted.",
      },
      {
        title: "Asset and lifecycle management",
        description:
          "A live inventory of what you own, what it runs, when it was patched and when it needs replacing — so budgets stop being guesswork.",
      },
    ],
    stack: [
      "Remote monitoring & management",
      "Endpoint protection",
      "Patch management",
      "Backup & replication",
      "Service desk / ITSM",
      "Asset discovery",
    ],
    answers: [
      "Who do my people call when something breaks?",
      "What happens at 2am when a server stops responding?",
      "Can I predict what IT costs next year?",
      "Is anyone actually checking that the backups ran?",
    ],
    related: ["cyber-security", "cloud-and-data-centre", "modern-workplace"],
  },
  {
    slug: "cyber-security",
    index: "02",
    name: "Cyber security",
    title: "Cyber security",
    summary:
      "Layered defence across endpoint, network, identity, email and data — plus a tested route back when something gets through.",
    lede:
      "Security is not a product you install. It is a set of decisions about what you protect, who can reach it, how you would notice an intrusion, and how quickly you could recover. We work through those decisions with you and then operate the controls that come out of them.",
    metaTitle: "Cyber Security Solutions & Managed Security | decodingIT",
    metaDescription:
      "Endpoint, network, email and identity security with tested ransomware recovery. Advisory, deployment and managed security operations.",
    capabilities: [
      {
        title: "Endpoint protection",
        description:
          "Anti-malware, endpoint detection and response, application control and device posture enforcement across laptops, desktops and mobile devices.",
      },
      {
        title: "Network security",
        description:
          "Continuous network telemetry, anomaly detection and automated investigation to surface lateral movement, data exfiltration and intrusions that firewalls alone will not catch.",
      },
      {
        title: "Email security",
        description:
          "Phishing protection, attachment sandboxing and SPF, DKIM and DMARC enforcement on inbound and outbound mail flow.",
      },
      {
        title: "Identity and privileged access",
        description:
          "Credential vaulting, session isolation, just-in-time privilege elevation and recorded sessions for audit and forensics.",
      },
      {
        title: "Ransomware readiness and recovery",
        description:
          "Immutable and isolated copies of your data, a defined recovery order, and a restore path that has been rehearsed before you need it.",
      },
      {
        title: "Security advisory",
        description:
          "Gap analysis against where you are now, prioritised by what would actually hurt — not by what a vendor happens to sell.",
      },
    ],
    stack: [
      "EDR / XDR",
      "Next-generation firewall",
      "Email gateway & DMARC",
      "Privileged access management",
      "Immutable backup",
      "Vulnerability management",
    ],
    answers: [
      "If someone clicked the wrong link this morning, would we know?",
      "How long would it take to get trading again after ransomware?",
      "Who has administrator rights, and why?",
      "Are we defensible if a regulator or insurer asks?",
    ],
    related: ["managed-it-services", "it-infrastructure", "modern-workplace"],
  },
  {
    slug: "cloud-and-data-centre",
    index: "03",
    name: "Cloud & data centre",
    title: "Cloud & data centre",
    summary:
      "Dedicated, secure cloud and hybrid platforms sized to what you actually run — with predictable performance and a way back out.",
    lede:
      "Cloud is a means, not an outcome. The question worth answering is which workloads belong where, what they cost once they are running, and how you keep control of data you no longer physically hold. We design for that, migrate carefully, and then operate what we built.",
    metaTitle: "Cloud & Data Centre Services — Migration & Hosting | decodingIT",
    metaDescription:
      "Private and hybrid cloud design, migration and management — virtualisation, storage and disaster recovery for businesses in Oman and India.",
    capabilities: [
      {
        title: "Platform design",
        description:
          "Compute, storage and network sized against real workload data rather than a vendor sizing sheet, with the growth curve built in.",
      },
      {
        title: "Dedicated cloud",
        description:
          "Isolated cloud infrastructure where tenancy, residency and performance need to be yours rather than shared.",
      },
      {
        title: "Migration",
        description:
          "Staged moves with a defined cutover window, a rollback position and users who know what changes on Monday morning.",
      },
      {
        title: "Virtualisation",
        description:
          "Consolidated hosts, sane resource allocation and the operational discipline that stops a virtual estate sprawling.",
      },
      {
        title: "Disaster recovery",
        description:
          "Replication with agreed recovery time and recovery point objectives — and a failover you have actually performed.",
      },
      {
        title: "Ongoing operation",
        description:
          "Capacity, patching, cost and performance managed after go-live, which is where most cloud programmes quietly come apart.",
      },
    ],
    stack: [
      "Hypervisor & virtualisation",
      "Microsoft Azure",
      "SAN / NAS storage",
      "Replication & DR",
      "Backup tiering",
      "Monitoring & capacity planning",
    ],
    answers: [
      "Which of our systems should move, and which should not?",
      "What will this cost every month once it is live?",
      "Where does our data physically sit?",
      "How quickly could we run again from the secondary site?",
    ],
    related: ["it-infrastructure", "managed-it-services", "cyber-security"],
  },
  {
    slug: "enterprise-networking",
    index: "04",
    name: "Enterprise networking",
    title: "Enterprise networking",
    summary:
      "LAN, WAN, SD-WAN and wireless designed, installed and managed as one network rather than a decade of accumulated exceptions.",
    lede:
      "A network is the one system every other system depends on. When it is right, nobody mentions it. We design for the traffic you actually carry, document what we build, and manage it so that the network stays deliberate as the business changes around it.",
    metaTitle: "Enterprise Networking — LAN, WAN, SD-WAN & Wi-Fi | decodingIT",
    metaDescription:
      "Network design, deployment and management across LAN, WAN, SD-WAN and enterprise wireless — for multi-site organisations in Oman, the UAE and India.",
    capabilities: [
      {
        title: "Campus and branch LAN",
        description:
          "Switching, segmentation and resilience designed so a fault in one part of the building does not become an outage in another.",
      },
      {
        title: "WAN and SD-WAN",
        description:
          "Multi-site connectivity with policy-based routing across links, so critical traffic keeps its path when a circuit degrades.",
      },
      {
        title: "Enterprise wireless",
        description:
          "Surveyed, tuned coverage — not access points hung optimistically from a ceiling and left to negotiate for themselves.",
      },
      {
        title: "Network security integration",
        description:
          "Segmentation, access control and inspection designed into the topology rather than bolted onto its edge.",
      },
      {
        title: "Structured cabling",
        description:
          "Passive infrastructure installed, labelled and certified, because everything above it inherits its quality.",
      },
      {
        title: "Documentation and handover",
        description:
          "Diagrams, addressing, configurations and change history you actually own — including if you ever leave us.",
      },
    ],
    stack: [
      "Managed switching",
      "Routing & SD-WAN",
      "Enterprise Wi-Fi",
      "Network access control",
      "Structured cabling",
      "Network monitoring",
    ],
    answers: [
      "Why does the office slow down every afternoon?",
      "Can our branches fail over without anyone noticing?",
      "Is our guest Wi-Fi genuinely separated from our systems?",
      "Does anyone have an accurate diagram of this network?",
    ],
    related: ["it-infrastructure", "cyber-security", "managed-it-services"],
  },
  {
    slug: "it-infrastructure",
    index: "05",
    name: "IT infrastructure",
    title: "IT infrastructure",
    summary:
      "Servers, storage, power, cabling and physical access — the layer everything else quietly assumes is working.",
    lede:
      "Infrastructure is unglamorous until it fails, and then it is the only thing anyone talks about. We specify it against the workload, install it properly, label it, document it, and plan its replacement before it becomes an emergency purchase.",
    metaTitle: "IT Infrastructure — Servers, Storage & Power | decodingIT",
    metaDescription:
      "Design, supply and installation of servers, storage, power protection, structured cabling and physical access control for offices and data centres.",
    capabilities: [
      {
        title: "Servers and storage",
        description:
          "Sized to the workload and its growth, with warranty and support terms that match how critical the system actually is.",
      },
      {
        title: "Power protection",
        description:
          "UPS and power distribution specified for real load and runtime, monitored, and with batteries tracked to their end of life.",
      },
      {
        title: "Racks and cabling",
        description:
          "Comms rooms laid out so the next engineer can work in them — labelled, patched, documented and cooled.",
      },
      {
        title: "Physical access control",
        description:
          "Door access, CCTV and the audit trail that turns a physical space into a controlled one.",
      },
      {
        title: "Procurement",
        description:
          "Hardware and licensing sourced through vendor channels, with specification led by requirement rather than margin.",
      },
      {
        title: "Lifecycle planning",
        description:
          "An honest replacement schedule so hardware is refreshed on a plan instead of after a failure.",
      },
    ],
    stack: [
      "Rack & tower servers",
      "Shared storage",
      "UPS & power distribution",
      "Structured cabling",
      "CCTV & access control",
      "Hardware lifecycle tracking",
    ],
    answers: [
      "Is this hardware still supported by anyone?",
      "How long do we run when the power goes?",
      "Who physically walked into the server room last night?",
      "What are we going to have to replace next year?",
    ],
    related: ["cloud-and-data-centre", "enterprise-networking", "managed-it-services"],
  },
  {
    slug: "modern-workplace",
    index: "06",
    name: "Modern workplace",
    title: "Modern workplace",
    summary:
      "Microsoft 365, Teams, SharePoint and managed devices set up so that people can work securely from anywhere, on purpose.",
    lede:
      "Most organisations already own far more of Microsoft 365 than they use, and rather less of it is configured than they assume. We deploy it properly — identity first, then devices, then collaboration — so the licences you already pay for start doing real work.",
    metaTitle: "Microsoft 365 & Modern Workplace Services | decodingIT",
    metaDescription:
      "Microsoft 365, Exchange Online, Teams, SharePoint and Azure deployed, secured and managed — with endpoint management and secure remote access.",
    capabilities: [
      {
        title: "Microsoft 365 deployment",
        description:
          "Tenant configuration, licensing that matches how people actually work, and migration from whatever you are on today.",
      },
      {
        title: "Exchange Online and mail flow",
        description:
          "Mailbox migration, routing, retention and the domain authentication records that decide whether your mail is trusted.",
      },
      {
        title: "Teams and SharePoint",
        description:
          "Collaboration structured before it is adopted, so files have somewhere sensible to live and permissions mean something.",
      },
      {
        title: "Unified endpoint management",
        description:
          "Enrolment, configuration, compliance policy and application delivery for company and personal devices.",
      },
      {
        title: "Identity and secure access",
        description:
          "Multi-factor authentication, conditional access and single sign-on, so remote working does not mean unguarded working.",
      },
      {
        title: "Virtual desktops",
        description:
          "Hosted desktops for roles where the data should never leave the platform, or where the device should not matter.",
      },
    ],
    stack: [
      "Microsoft 365",
      "Exchange Online",
      "Microsoft Teams",
      "SharePoint",
      "Microsoft Azure",
      "Endpoint management",
    ],
    answers: [
      "Are we paying for licences nobody uses?",
      "Can staff work from home without opening a hole?",
      "Where is our data actually stored in Microsoft 365?",
      "What happens to company data on a device we do not own?",
    ],
    related: ["cyber-security", "managed-it-services", "cloud-and-data-centre"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
