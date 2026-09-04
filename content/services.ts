import type { Service } from "@/types";

/**
 * The six solutions, as decodingIT presents them.
 *
 * Names, order and the one-line summaries are the live site's own words, from
 * the "every layer of your IT, designed together" section. Named platforms
 * (Nutanix, Sangfor, Veeam, Acronis, ExaGrid) are the ones the company cites.
 *
 * STILL TO COME: the body copy for each detail page. The capability bullets
 * below are written from the summary and the named platforms; they are
 * technically accurate but they are not yet decodingIT's own solution-page
 * copy. Replace them from the live solution pages when you have them.
 */
export const services: Service[] = [
  {
    slug: "enterprise-networking",
    index: "01",
    name: "Enterprise Networking",
    title: "Enterprise Networking",
    summary:
      "Wired, wireless and SD-WAN that stays predictable as sites, users and traffic grow.",
    lede:
      "A network is the one system every other system depends on. We design for the traffic you actually carry, across every site you actually have, and manage it as the business changes around it.",
    metaTitle: "Enterprise Networking — LAN, Wireless & SD-WAN | Decoding IT",
    metaDescription:
      "Wired, wireless and SD-WAN networking designed, deployed and managed for single-site and multi-branch organisations across Oman, the UAE and India.",
    capabilities: [
      { title: "Wired networking", description: "Switching and segmentation designed so a fault in one place does not become an outage everywhere." },
      { title: "Enterprise wireless", description: "Surveyed, tuned coverage that holds up as user and device counts grow." },
      { title: "SD-WAN", description: "Multi-site connectivity with policy-based routing across links." },
      { title: "Network security", description: "Segmentation and access control designed into the topology, not bolted onto its edge." },
      { title: "Engineers on the ground", description: "Local presence in Muscat, so site work does not wait on a visit from elsewhere." },
      { title: "Documentation", description: "Diagrams, addressing and configurations handed over to you." },
    ],
    stack: ["Cisco", "Fortinet", "SD-WAN", "Enterprise Wi-Fi", "Network monitoring"],
    answers: [
      "Why does the office slow down in the afternoon?",
      "Can our branches fail over cleanly?",
      "Does anyone have an accurate network diagram?",
    ],
    stackNote: "Designed for the traffic you carry and the sites you have, then documented and handed over.",
    related: ["technology-foundation", "cyber-security-solutions", "private-cloud-hci"],
  },
  {
    slug: "technology-foundation",
    index: "02",
    name: "Technology Foundation",
    title: "Technology Foundation",
    summary:
      "Servers, storage and virtualisation sized for the workload you actually run — not the one on the datasheet.",
    lede:
      "The foundation layer is the part nobody discusses until it fails. We size it against real workload data, install it, document it, and track when it falls out of support.",
    metaTitle: "Technology Foundation — Servers & Storage | Decoding IT",
    metaDescription:
      "Servers, storage and virtualisation sized against your real workload, supplied and installed as a value-added reseller for Microsoft, HPE and Dell.",
    capabilities: [
      { title: "Servers", description: "Specified against the workload it has to carry, with support terms that match how critical the system is." },
      { title: "Storage", description: "Capacity and performance sized from real utilisation rather than a datasheet figure." },
      { title: "Virtualisation", description: "Consolidated hosts and resource allocation that leaves room to grow." },
      { title: "Power and racks", description: "UPS, distribution and comms rooms built so the next engineer can work in them." },
      { title: "Procurement", description: "Hardware and licensing sourced through vendor channels as a value-added reseller." },
      { title: "Lifecycle tracking", description: "A record of what you own and when it needs replacing, so it is planned rather than urgent." },
    ],
    stack: ["Microsoft", "HPE", "Dell", "Virtualisation", "Shared storage"],
    answers: [
      "Is this hardware still supported?",
      "Is it sized for what we actually run?",
      "What needs replacing next year?",
    ],
    stackNote: "Sized against the workload you run, and sourced through vendor channels.",
    related: ["private-cloud-hci", "enterprise-networking", "business-continuity"],
  },
  {
    slug: "private-cloud-hci",
    index: "03",
    name: "Private Cloud & HCI",
    title: "Private Cloud & HCI",
    summary:
      "Hyper-converged platforms on Nutanix or Sangfor — the control of on-premise with the flex of cloud.",
    lede:
      "Hyper-converged infrastructure collapses compute, storage and networking into one platform you still control. We design it, migrate onto it, and run it afterwards.",
    metaTitle: "Private Cloud & HCI — Nutanix and Sangfor Platforms | Decoding IT",
    metaDescription:
      "Hyper-converged private cloud on Nutanix or Sangfor: the control of on-premise infrastructure with the flexibility of cloud, designed and managed end to end.",
    capabilities: [
      { title: "Platform design", description: "Compute, storage and network sized as one hyper-converged platform." },
      { title: "Nutanix", description: "Design, deployment and ongoing operation of Nutanix clusters." },
      { title: "Sangfor", description: "Sangfor HCI as an alternative platform where it fits the requirement better." },
      { title: "Migration", description: "Staged moves onto the platform with a defined cutover and a rollback position." },
      { title: "Scaling", description: "Adding nodes as demand grows, without redesigning the estate each time." },
      { title: "Ongoing management", description: "Capacity, patching and performance after go-live." },
    ],
    stack: ["Nutanix", "Sangfor", "Hyper-converged infrastructure", "Microsoft Azure"],
    answers: [
      "Do we keep this on-premise or move it?",
      "What does it cost to add capacity?",
      "Where does our data physically sit?",
    ],
    stackNote: "Platform choice follows the workload — we size against real utilisation from your estate.",
    related: ["technology-foundation", "business-continuity", "modern-digital-workplace"],
  },
  {
    slug: "business-continuity",
    index: "04",
    name: "Business Continuity",
    title: "Business Continuity",
    summary:
      "Veeam, Acronis and ExaGrid — protected copies kept off-site, with restores tested before you need them.",
    lede:
      "Continuity is the difference between an outage and a crisis. Copies are kept off-site, recovery targets are agreed per system, and the restore is something we have actually performed.",
    metaTitle: "Business Continuity — Backup & Disaster Recovery | Decoding IT",
    metaDescription:
      "Backup and disaster recovery on Veeam, Acronis and ExaGrid, with off-site protected copies and restores tested before you need them.",
    capabilities: [
      { title: "Backup", description: "Protected copies of servers, workstations and cloud data, monitored daily." },
      { title: "Off-site copies", description: "A copy kept away from the estate it protects, so an incident cannot take both." },
      { title: "Tested restores", description: "Restores performed and timed, so the plan is evidence rather than a document." },
      { title: "Recovery objectives", description: "Recovery time and recovery point agreed per system, not for the estate as a whole." },
      { title: "Disaster recovery", description: "Replication and a defined failover you have rehearsed." },
      { title: "Ransomware recovery", description: "Isolated copies and a defined recovery order." },
    ],
    stack: ["Veeam", "Acronis", "ExaGrid", "Replication & DR", "Daily backup monitoring"],
    answers: [
      "How much work would we lose?",
      "How long until we are trading again?",
      "Has anyone ever tested the restore?",
    ],
    stackNote: "Recovery targets are set per system, then tested — an untested target is recorded as untested.",
    related: ["private-cloud-hci", "cyber-security-solutions", "technology-foundation"],
  },
  {
    slug: "modern-digital-workplace",
    index: "05",
    name: "Modern Digital Workplace",
    title: "Modern Digital Workplace",
    summary:
      "Endpoints, identity and collaboration that work the same from the office, the site or home.",
    lede:
      "Most organisations already own more of Microsoft 365 than they use. We deploy it in the right order — identity, then devices, then collaboration — so it works the same wherever people are.",
    metaTitle: "Modern Digital Workplace — Microsoft 365 | Decoding IT",
    metaDescription:
      "Endpoints, identity and collaboration on Microsoft 365 — deployed, secured and managed so people work the same way from the office, the site or home.",
    capabilities: [
      { title: "Microsoft 365", description: "Tenant configuration, licensing matched to how people work, and migration from what you run today." },
      { title: "Identity", description: "Multi-factor authentication and conditional access, so remote working is not unguarded working." },
      { title: "Endpoint management", description: "Enrolment, compliance policy and application delivery across company and personal devices." },
      { title: "Collaboration", description: "Teams and SharePoint structured before they are adopted, so permissions mean something." },
      { title: "Email", description: "Mailbox migration, mail flow and the domain records that decide whether your mail is trusted." },
      { title: "Virtual desktops", description: "Hosted desktops for roles where the data should not leave the platform." },
    ],
    stack: ["Microsoft 365", "Microsoft Azure", "Endpoint management", "Teams & SharePoint"],
    answers: [
      "Are we paying for licences nobody uses?",
      "Can staff work remotely without opening a hole?",
      "What happens to company data on a personal device?",
    ],
    stackNote: "Most of this you already own — the work is usually configuration and identity rather than new licences.",
    related: ["cyber-security-solutions", "private-cloud-hci", "enterprise-networking"],
  },
  {
    slug: "cyber-security-solutions",
    index: "06",
    name: "Cyber Security Solutions",
    title: "Cyber Security Solutions",
    summary:
      "Perimeter, endpoint and email defence with the monitoring and response to make it mean something.",
    lede:
      "Controls without monitoring are decoration. We deploy perimeter, endpoint and email defence, and then operate them — because the value is in what happens after an alert fires.",
    metaTitle: "Cyber Security Solutions & Managed Security | Decoding IT",
    metaDescription:
      "Perimeter, endpoint and email defence with always-on monitoring and response, delivered as managed security services across Oman, the UAE and India.",
    capabilities: [
      { title: "Perimeter defence", description: "Next-generation firewalling on Fortinet and equivalent platforms." },
      { title: "Endpoint protection", description: "Anti-malware, detection and response, and device posture enforcement." },
      { title: "Email security", description: "Phishing protection, sandboxing, and SPF, DKIM and DMARC enforcement." },
      { title: "Monitoring and response", description: "Always-on threat detection, so an alert reaches somebody who acts on it." },
      { title: "Identity and access", description: "Privileged access management, elevation and session recording." },
      { title: "Ransomware readiness", description: "Layered protection alongside a rehearsed route back." },
    ],
    stack: ["Fortinet", "EDR / XDR", "Email gateway & DMARC", "Managed detection & response"],
    answers: [
      "If someone clicked the wrong link, would we know?",
      "Who is watching this outside office hours?",
      "How long until we are trading again after ransomware?",
    ],
    stackNote: "Controls are selected against your exposure. Where a product you already own does the job, we say so.",
    related: ["business-continuity", "modern-digital-workplace", "enterprise-networking"],
  },
];


export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
