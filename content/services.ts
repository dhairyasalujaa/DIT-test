import type { Service } from "@/types";

/**
 * The six areas decodingIT covers.
 *
 * These are the company's own six: foundation, network, cloud, continuity,
 * workplace and security — "answered by one team". Names and scope come from
 * decodingIT's published material; the supporting sentences stay deliberately
 * factual and short rather than adopting a voice the company has not approved.
 *
 * Slugs are written for search ("enterprise-networking" rather than "network")
 * while the display name stays the company's own word for the area.
 */
export const services: Service[] = [
  {
    slug: "it-infrastructure",
    index: "01",
    name: "Foundation",
    title: "Foundation",
    summary:
      "Servers, storage, power, cabling and physical access — the layer everything else runs on.",
    lede:
      "The foundation layer is the part nobody discusses until it fails. We specify it against the workload, install it, document it, and keep track of when it needs replacing.",
    metaTitle: "IT Infrastructure — Servers, Storage & Power | decodingIT",
    metaDescription:
      "Servers, storage, power protection, structured cabling and physical access control, designed and installed for offices and data centres in Oman and India.",
    capabilities: [
      { title: "Servers and storage", description: "Specified against the workload it has to carry, with support terms that match how critical the system is." },
      { title: "Power protection", description: "UPS and power distribution sized for real load and runtime, and monitored." },
      { title: "Structured cabling", description: "Passive infrastructure installed, labelled and certified — everything above it inherits its quality." },
      { title: "Physical access control", description: "Door access and CCTV, with the audit trail that makes a space a controlled one." },
      { title: "Procurement", description: "Hardware and licensing sourced through vendor channels as a value-added reseller." },
      { title: "Lifecycle tracking", description: "A record of what you own and when it falls out of support, so replacement is planned rather than urgent." },
    ],
    stack: ["Rack & tower servers", "Shared storage", "UPS & power", "Structured cabling", "CCTV & access control"],
    answers: [
      "Is this hardware still supported?",
      "How long do we run when the power goes?",
      "What needs replacing next year?",
    ],
    stackNote:
      "Specified against workload and runtime, and sourced through vendor channels.",
    related: ["cloud", "enterprise-networking", "business-continuity"],
  },
  {
    slug: "enterprise-networking",
    index: "02",
    name: "Network",
    title: "Network",
    summary:
      "From single-site offices to multi-branch enterprise deployments — designed, deployed and managed, with engineers on the ground.",
    lede:
      "A network is the one system every other system depends on. We design for the traffic you actually carry, document what we build, and manage it as the business changes around it.",
    metaTitle: "Enterprise Networking — LAN, WAN, SD-WAN & Wi-Fi | decodingIT",
    metaDescription:
      "Network design, deployment and management across LAN, WAN, SD-WAN and enterprise wireless, for single-site and multi-branch organisations in Oman and India.",
    capabilities: [
      { title: "Campus and branch LAN", description: "Switching and segmentation designed so a fault in one place does not become an outage everywhere." },
      { title: "WAN and SD-WAN", description: "Multi-site connectivity with policy-based routing across links." },
      { title: "Enterprise wireless", description: "Surveyed, tuned coverage rather than access points left to negotiate for themselves." },
      { title: "Network security", description: "Segmentation and access control designed into the topology, not bolted onto its edge." },
      { title: "Engineers on the ground", description: "Local presence in Muscat, so site work does not wait on a visit from elsewhere." },
      { title: "Documentation", description: "Diagrams, addressing and configurations handed over to you." },
    ],
    stack: ["Managed switching", "Routing & SD-WAN", "Enterprise Wi-Fi", "Network access control", "Network monitoring"],
    answers: [
      "Why does the office slow down in the afternoon?",
      "Can our branches fail over cleanly?",
      "Does anyone have an accurate network diagram?",
    ],
    stackNote:
      "Chosen for the traffic you carry and the sites you have, then labelled and documented.",
    related: ["it-infrastructure", "cyber-security", "cloud"],
  },
  {
    slug: "cloud",
    index: "03",
    name: "Cloud",
    title: "Cloud",
    summary:
      "Secure cloud and hybrid platforms with full control, predictable performance and room to scale.",
    lede:
      "Cloud is a means, not an outcome. The questions worth answering are which workloads belong where, what they cost once running, and how you keep control of data you no longer physically hold.",
    metaTitle: "Cloud Services — Migration, Hosting & Hybrid | decodingIT",
    metaDescription:
      "Cloud and hybrid platform design, migration and management — virtualisation, storage and Azure — for organisations in Oman, the UAE and India.",
    capabilities: [
      { title: "Platform design", description: "Compute, storage and network sized against real workload data." },
      { title: "Cloud migration", description: "Staged moves with a defined cutover window and a rollback position." },
      { title: "Virtualisation", description: "Consolidated hosts and sane resource allocation." },
      { title: "Microsoft Azure", description: "Tenant, identity and workload configuration on Azure." },
      { title: "Hybrid operation", description: "On-premises and cloud run as one estate rather than two." },
      { title: "Ongoing management", description: "Capacity, patching, cost and performance after go-live." },
    ],
    stack: ["Microsoft Azure", "Hypervisor & virtualisation", "SAN / NAS storage", "Backup tiering", "Capacity planning"],
    answers: [
      "Which systems should move, and which should not?",
      "What will this cost each month once it is live?",
      "Where does our data physically sit?",
    ],
    stackNote:
      "Platform choices follow the workload, sized against real utilisation from your estate.",
    related: ["business-continuity", "modern-workplace", "it-infrastructure"],
  },
  {
    slug: "business-continuity",
    index: "04",
    name: "Continuity",
    title: "Continuity",
    summary:
      "Backup, disaster recovery and the tested route back — so an incident stays an incident.",
    lede:
      "Continuity is the difference between an outage and a crisis. Backups are monitored daily, recovery targets are agreed in advance, and the failover is something you have actually performed rather than assumed.",
    metaTitle: "Business Continuity — Backup & Disaster Recovery | decodingIT",
    metaDescription:
      "Managed backup, disaster recovery planning and DR testing with agreed recovery time and recovery point objectives, for organisations in Oman and India.",
    capabilities: [
      { title: "Backup as a service", description: "Automated backup of servers, workstations and cloud data, monitored daily." },
      { title: "Disaster recovery planning", description: "Agreed recovery time and recovery point objectives, per system rather than for the estate as a whole." },
      { title: "DR testing", description: "Failover performed and timed, so the plan is evidence rather than a document." },
      { title: "Replication", description: "Data held at a second site or in cloud, ready to run." },
      { title: "Ransomware recovery", description: "Isolated copies and a defined recovery order." },
      { title: "Restore verification", description: "Restores actually carried out, not merely scheduled." },
    ],
    stack: ["Backup as a service", "Replication & DR", "Immutable copies", "DR runbooks", "Daily backup monitoring"],
    answers: [
      "How much work would we lose?",
      "How long until we are trading again?",
      "Has anyone ever tested the restore?",
    ],
    stackNote:
      "Recovery targets are set per system, then tested — an untested target is recorded as untested.",
    related: ["cloud", "cyber-security", "it-infrastructure"],
  },
  {
    slug: "modern-workplace",
    index: "05",
    name: "Workplace",
    title: "Workplace",
    summary:
      "Microsoft 365, Teams, SharePoint, virtual desktops and managed devices, so people can work securely from anywhere.",
    lede:
      "Most organisations already own more of Microsoft 365 than they use. We deploy it properly — identity first, then devices, then collaboration — so the licences you pay for start doing real work.",
    metaTitle: "Modern Workplace — Microsoft 365 & Virtual Desktops | decodingIT",
    metaDescription:
      "Microsoft 365, Exchange Online, Teams, SharePoint, Azure Virtual Desktop and endpoint management, deployed, secured and managed for your organisation.",
    capabilities: [
      { title: "Microsoft 365", description: "Tenant configuration, licensing matched to how people work, and migration from what you run today." },
      { title: "Exchange Online", description: "Mailbox migration, mail flow and the domain records that decide whether your mail is trusted." },
      { title: "Teams and SharePoint", description: "Collaboration structured before it is adopted, so permissions mean something." },
      { title: "Virtual desktops", description: "Azure Virtual Desktop, Citrix and Omnissa Horizon, for roles where the data should not leave the platform." },
      { title: "Endpoint management", description: "Enrolment, compliance policy and application delivery across devices." },
      { title: "Secure access", description: "Multi-factor authentication and conditional access, so remote working is not unguarded working." },
    ],
    stack: ["Microsoft 365", "Exchange Online", "Teams & SharePoint", "Azure Virtual Desktop", "Citrix", "Omnissa Horizon"],
    answers: [
      "Are we paying for licences nobody uses?",
      "Can staff work remotely without opening a hole?",
      "What happens to company data on a personal device?",
    ],
    stackNote:
      "Most of this you already own — the work is usually configuration and identity rather than new licences.",
    related: ["cyber-security", "cloud", "enterprise-networking"],
  },
  {
    slug: "cyber-security",
    index: "06",
    name: "Security",
    title: "Security",
    summary:
      "Multi-layer protection across endpoint, network, identity, email and data, with 24/7 monitoring.",
    lede:
      "Security is a set of decisions about what you protect, who can reach it, how you would notice an intrusion and how quickly you could recover. We work through those decisions and then operate the controls that come out of them.",
    metaTitle: "Cyber Security & Managed Security Services | decodingIT",
    metaDescription:
      "Endpoint, network, email and identity security with 24/7 monitoring and ransomware recovery. Advisory, deployment and managed security operations.",
    capabilities: [
      { title: "Endpoint protection", description: "Anti-malware, endpoint detection and response, and device posture enforcement." },
      { title: "Network security", description: "Telemetry and anomaly detection, to surface what a firewall alone will not catch." },
      { title: "Email security", description: "Phishing protection, sandboxing, and SPF, DKIM and DMARC enforcement." },
      { title: "Identity and access", description: "Privileged access management, with elevation and session recording." },
      { title: "24/7 monitoring", description: "Managed cybersecurity services with round-the-clock security monitoring." },
      { title: "Ransomware recovery", description: "Multi-layer protection plus a rehearsed route back." },
    ],
    stack: ["EDR / XDR", "Next-generation firewall", "Email gateway & DMARC", "Privileged access management", "24/7 monitoring"],
    answers: [
      "If someone clicked the wrong link, would we know?",
      "How long until we are trading again after ransomware?",
      "Who holds administrator rights, and why?",
    ],
    stackNote:
      "Controls are selected against your exposure. Where a product you already own does the job, we say so.",
    related: ["business-continuity", "modern-workplace", "enterprise-networking"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
