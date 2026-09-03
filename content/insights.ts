import type { Article } from "@/types";

/**
 * Insights.
 *
 * Four articles, each written to be genuinely useful to someone making a
 * decision — the kind of thing our engineers end up explaining in meetings.
 * They are published under the company name rather than an individual byline,
 * because we will not attribute writing to a named person without their sign-off.
 */
export const articles: Article[] = [
  {
    slug: "what-a-managed-it-contract-should-guarantee",
    title: "What a managed IT contract should actually guarantee",
    metaTitle: "What a Managed IT Contract Should Actually Guarantee | decodingIT",
    metaDescription:
      "How to read a managed IT proposal: response versus resolution times, coverage windows, and what quietly sits outside the fixed fee.",
    standfirst:
      "Most managed IT proposals are priced clearly and specified vaguely. Here is what to look for before you sign one — including the questions providers find uncomfortable.",
    published: "2026-07-14",
    topic: "Managed services",
    readingMinutes: 7,
    related: ["managed-it-services", "cyber-security"],
    body: [
      { kind: "p", text: "Two managed IT proposals for the same organisation can differ by a factor of three, and the expensive one is not automatically the better one. The difference is almost never in the monthly rate. It is in what the rate covers, how quickly anything has to happen, and what quietly falls outside the agreement and gets billed later." },
      { kind: "p", text: "If you are comparing providers, the contract is the product. These are the clauses worth reading properly." },
      { kind: "h2", text: "Response time is not resolution time" },
      { kind: "p", text: "Almost every agreement quotes a response time. Very few quote a resolution time, and the distinction matters more than any other number in the document." },
      { kind: "p", text: "A one-hour response target means somebody will acknowledge your ticket within an hour. It says nothing at all about when your finance system will be working again. A provider can hit a 100% response target every month while an issue sits open for a fortnight." },
      { kind: "p", text: "Ask instead for target resolution times banded by severity, with severity defined in the contract rather than decided by the provider after the fact. A workable structure looks like this:" },
      { kind: "list", items: [
        "Critical — a system that stops the business trading, or a suspected security incident. Continuous work until resolved or a workaround is in place.",
        "High — a whole team or site cannot work. Same business day.",
        "Medium — one person blocked, or a system degraded but usable. Next business day.",
        "Low — requests, changes and questions. An agreed window, typically a few working days.",
      ]},
      { kind: "p", text: "Then ask the question that actually reveals the answer: what happens when a target is missed? If nothing happens, the target is marketing." },
      { kind: "h2", text: "Check the coverage window against how you really work" },
      { kind: "p", text: "A contract covering Sunday to Thursday, 08:00 to 17:00, is entirely reasonable for an organisation that works those hours. It is not reasonable if your warehouse runs a night shift, or if month-end close routinely runs past nine in the evening." },
      { kind: "p", text: "Look for three things: the covered hours, the out-of-hours rate, and — the one people forget — whether monitoring runs outside the support window. Monitoring around the clock while support is business hours only is a perfectly sound arrangement, but you should know that is what you are buying, because it means a Friday night failure is detected on Friday night and fixed on Sunday morning." },
      { kind: "h2", text: "Find the boundary of the fee" },
      { kind: "p", text: "Every fixed-fee agreement has an edge. A good provider draws it clearly; a poor one leaves it fuzzy and invoices into the fog. Ask directly which of the following are inside the monthly fee and which are chargeable:" },
      { kind: "list", items: [
        "Onboarding and setting up a new starter, including the device build.",
        "Office moves, and adding a new site.",
        "Project work — migrations, upgrades, new system rollouts.",
        "Site visits, and whether there is a cap on them.",
        "Third-party liaison: chasing your internet provider, your line-of-business software vendor, your telephony supplier.",
        "Support for applications you own but the provider did not install.",
      ]},
      { kind: "p", text: "That last one causes more disputes than anything else. Somebody has to own the relationship with the vendor of your core business application, and if the contract does not say who, the answer in practice becomes nobody." },
      { kind: "h2", text: "Insist on an exit clause with teeth" },
      { kind: "p", text: "The clause that tells you most about a provider is the one describing how you leave. It should commit them, in writing, to handing over documentation, network diagrams, administrative credentials, licence ownership and configuration exports within a defined period, at no additional cost." },
      { kind: "p", text: "Providers who resist this are telling you something important about their retention strategy. Note also who holds the licences: if your Microsoft 365 tenant, your domain name or your firewall subscription is registered to the provider rather than to you, leaving becomes a negotiation instead of a decision." },
      { kind: "h2", text: "Ask what the reporting will actually contain" },
      { kind: "p", text: "Ticket volumes and closure rates describe the provider's workload, not your risk. A service report worth reading tells you the state of your estate: which backups failed and were re-run, which devices are missing patches and for how long, which hardware is out of warranty, which accounts have excessive privileges, and what changed since last month." },
      { kind: "checklist", title: "Before you sign", items: [
        "Resolution targets by severity, with severity defined in the contract.",
        "A stated consequence when a target is missed.",
        "Coverage hours that match your operating hours — and clarity on whether monitoring extends beyond them.",
        "An explicit list of what sits outside the fixed fee.",
        "Named ownership of the relationship with your core application vendor.",
        "An exit clause committing to documentation, credentials and licence transfer.",
        "Licences and domains registered to you, not to the provider.",
        "Reporting that describes the state of your estate, not the provider's ticket queue.",
      ]},
      { kind: "p", text: "None of this requires you to understand the technology. It requires the provider to be specific — and a provider who will not be specific before you sign is unlikely to become specific afterwards." },
    ],
  },
  {
    slug: "backup-is-not-recovery",
    title: "Backup is not recovery",
    metaTitle: "Backup Is Not Recovery: What You Can Restore | decodingIT",
    metaDescription:
      "A backup job that reports success is not proof you can recover. How to set realistic RTO and RPO targets, and how to run a real restore test.",
    standfirst:
      "A green tick on a backup job tells you a file was copied. It does not tell you that you could get the business running again — and those are very different claims.",
    published: "2026-06-02",
    topic: "Resilience",
    readingMinutes: 6,
    related: ["managed-it-services", "cyber-security", "cloud-and-data-centre"],
    body: [
      { kind: "p", text: "The most common serious failure we find when we take over an environment is not an unpatched server or a weak password. It is a backup that has been running successfully, and uselessly, for years." },
      { kind: "p", text: "Successfully, because the job completes and reports green. Uselessly, because it is backing up the wrong things, or to somewhere an attacker can also reach, or in a form that would take a fortnight to turn back into a working business. Nobody discovers this until the day it matters." },
      { kind: "h2", text: "Two numbers decide everything" },
      { kind: "p", text: "Before any product discussion, an organisation needs to agree two figures, and they are business decisions rather than technical ones." },
      { kind: "h3", text: "Recovery point objective (RPO)" },
      { kind: "p", text: "How much work you can afford to lose. If backups run nightly at 23:00 and a server fails at 16:00, you have lost a day of work. For a document store that may be tolerable. For a transactional system it usually is not, and the answer is more frequent snapshots or replication — which costs more. That is the trade-off, stated plainly." },
      { kind: "h3", text: "Recovery time objective (RTO)" },
      { kind: "p", text: "How long you can afford to be down. This is where estimates tend to be wildly optimistic, because people time the restore and forget everything around it: procuring or freeing hardware, rebuilding an operating system, reinstalling the application, restoring the data, checking integrity, reconnecting integrations, and telling users it is safe to work again." },
      { kind: "p", text: "Write both numbers down per system, not for the organisation as a whole. Your file server and your accounting database almost certainly deserve different answers, and paying for the strictest target across everything is how backup budgets become indefensible." },
      { kind: "h2", text: "Ransomware changed the requirement" },
      { kind: "p", text: "Traditional backup design assumed the threat was hardware failure, accidental deletion or fire — events that do not actively hunt for your backups. Ransomware does. Modern intrusions look for backup servers and repositories first, precisely because destroying them is what converts an incident into a payment." },
      { kind: "p", text: "Which means a backup on a network share, reachable with domain credentials, is not a backup in any meaningful sense. What matters now:" },
      { kind: "list", items: [
        "At least one copy that cannot be altered or deleted for a defined retention period — immutable storage or a genuinely offline copy.",
        "Backup infrastructure with its own credentials, not joined to the same directory as everything else.",
        "Multi-factor authentication on the backup console, treated as seriously as the firewall.",
        "Alerting on deletion or retention changes, because the first sign of a serious intrusion is often someone tidying up your restore points.",
      ]},
      { kind: "h2", text: "How to actually test a restore" },
      { kind: "p", text: "A restore test is not opening the backup console and confirming jobs are green. It is putting data back and checking whether it works. It does not have to be disruptive:" },
      { kind: "list", items: [
        "Pick one system that matters and restore it into an isolated network — not over the live copy.",
        "Time the whole thing, from the decision to start to the point a user could log in. Compare that against the RTO you wrote down.",
        "Open the data. Have somebody who uses the system daily confirm the records are complete and current, not just that files exist.",
        "Write down what went wrong, because something will: a missing licence key, an expired certificate, an integration pointing at a hostname that no longer exists.",
        "Fix those, and schedule the next test.",
      ]},
      { kind: "quote", text: "The purpose of a restore test is not to prove the backup works. It is to find the twenty minutes of unpleasant surprise now, while it costs twenty minutes." },
      { kind: "h2", text: "Do not forget the cloud" },
      { kind: "p", text: "Microsoft 365 and Google Workspace replicate your data across their infrastructure, which protects you against their hardware failing. It is not a backup of your business against your own mistakes: a deleted mailbox, a compromised account mass-deleting files, or a departing employee clearing a SharePoint site are all recoverable only within a retention window that is shorter than most people assume." },
      { kind: "p", text: "If your organisation now runs on a cloud productivity platform — and most do — the backup conversation needs to include it explicitly, with the same two numbers attached." },
    ],
  },
  {
    slug: "spf-dkim-dmarc-explained",
    title: "Why your email lands in spam: SPF, DKIM and DMARC without the jargon",
    metaTitle: "SPF, DKIM and DMARC Explained Without the Jargon | decodingIT",
    metaDescription:
      "Three DNS records decide whether your email is trusted or filtered — and whether anyone can impersonate you. A plain explanation and a safe rollout.",
    standfirst:
      "Three records in your domain's DNS decide whether your invoices reach customers, and whether a stranger can send mail that looks exactly like yours.",
    published: "2026-04-28",
    topic: "Email",
    readingMinutes: 6,
    related: ["modern-workplace", "cyber-security"],
    body: [
      { kind: "p", text: "Email was designed in an era when nobody expected anyone to lie. Nothing in the original protocol stops a sender from claiming to be someone else — which is why, without additional configuration, anybody on the internet can send a message that appears to come from your finance director." },
      { kind: "p", text: "Three mechanisms were added over the years to fix this. They are not optional any more: the large mail providers now filter or reject mail from domains that fail to implement them, so the same records that stop impersonation also determine whether your legitimate mail arrives at all." },
      { kind: "h2", text: "SPF — who is allowed to send" },
      { kind: "p", text: "SPF is a published list of the servers permitted to send mail for your domain. A receiving server checks whether the message came from one of them." },
      { kind: "p", text: "The usual failure is incompleteness. Mail leaves an organisation from more places than anyone remembers: the mail platform itself, the accounting system sending invoices, the CRM, the marketing platform, the website contact form, the scan-to-email function on a photocopier. Miss one and its mail starts failing — often silently, and often the mail that carries invoices." },
      { kind: "p", text: "There is also a hard technical limit worth knowing: an SPF record may trigger at most ten DNS lookups. Exceed it and the record does not merely degrade, it fails entirely. Organisations that have added services over years frequently sit just over the line without realising." },
      { kind: "h2", text: "DKIM — proof the message was not altered" },
      { kind: "p", text: "DKIM adds a cryptographic signature to each outgoing message. The receiving server fetches your public key from DNS and verifies it. If the signature checks out, the message genuinely came from a system holding your private key and was not modified in transit." },
      { kind: "p", text: "Where SPF authorises a server, DKIM authenticates the message — which is why it survives some forwarding scenarios that break SPF, and why you want both." },
      { kind: "h2", text: "DMARC — what to do when checks fail" },
      { kind: "p", text: "SPF and DKIM produce a result. DMARC is the record that says what a receiving server should do with that result, and asks for reports on what is being sent in your name." },
      { kind: "p", text: "It has three policy settings:" },
      { kind: "list", items: [
        "p=none — take no action, just send me reports. This is the observation setting, not a destination.",
        "p=quarantine — treat failing mail as suspicious; typically it lands in junk.",
        "p=reject — refuse failing mail outright. This is where a protected domain should end up.",
      ]},
      { kind: "p", text: "DMARC also requires alignment: it is not enough for SPF or DKIM to pass for some domain, it must pass for the domain the recipient actually sees in the From field. This detail catches a lot of otherwise-correct configurations, particularly where a third-party platform sends on your behalf." },
      { kind: "h2", text: "A rollout order that will not break your mail" },
      { kind: "p", text: "The one genuine risk here is enabling enforcement before you know every legitimate sender — at which point real mail starts disappearing. Do it in this order:" },
      { kind: "list", items: [
        "Inventory every system that sends mail as your domain. Ask finance, marketing, HR and whoever manages the website; then check the photocopiers.",
        "Publish SPF covering all of them, and count your DNS lookups.",
        "Enable DKIM signing on your mail platform and on every third-party sender that supports it.",
        "Publish DMARC at p=none with a reporting address, and leave it there for a few weeks.",
        "Read the reports. They will show senders you had forgotten, and probably some you never authorised.",
        "Fix the legitimate ones, then move to p=quarantine, then to p=reject.",
      ]},
      { kind: "p", text: "Expect the whole sequence to take a month or two in a typical organisation. Most of that is not technical work — it is finding out who has been sending mail as you, which is worth knowing regardless." },
      { kind: "h2", text: "One thing this does not do" },
      { kind: "p", text: "These records stop someone impersonating your exact domain. They do not stop a lookalike domain — a character swapped, or a different suffix — which is how most invoice-redirection fraud actually arrives. That needs separate controls at the mail gateway and, more than anything, a finance process where changes to bank details are verified by voice on a number nobody emailed you." },
    ],
  },
  {
    slug: "security-baseline-before-you-buy",
    title: "The security baseline to finish before you buy anything else",
    metaTitle: "A Practical Security Baseline for Growing Businesses | decodingIT",
    metaDescription:
      "Before buying another security product, close the gaps most incidents actually use: identity, privilege, patching, backup isolation and email.",
    standfirst:
      "Most organisations that get breached were not short of security products. They were short of a handful of unglamorous controls that nobody owned.",
    published: "2026-02-17",
    topic: "Security",
    readingMinutes: 7,
    related: ["cyber-security", "managed-it-services", "modern-workplace"],
    body: [
      { kind: "p", text: "There is a reliable pattern to security spending. An incident happens somewhere visible, a budget appears, a product is bought, and the product is deployed on top of an environment where the basics were never finished. The new tool generates alerts nobody reads, and the next incident arrives through a route the tool was never going to cover." },
      { kind: "p", text: "The controls below are not sophisticated. They are the ones that keep appearing in incident write-ups, and they are worth completing before any further product decision." },
      { kind: "h2", text: "1. Multi-factor authentication, with no exceptions left open" },
      { kind: "p", text: "Nearly every organisation has enabled MFA. Rather fewer have enabled it everywhere. The gaps are consistent: service accounts, shared mailboxes, the VPN, the remote-access gateway, legacy authentication protocols still permitted for one old application, and a handful of executives who found it inconvenient." },
      { kind: "p", text: "Those exceptions are the whole attack surface. Audit for accounts without MFA, and treat every exception as a documented, time-limited decision with an owner — not a permanent quiet arrangement." },
      { kind: "h2", text: "2. Take administrator rights off daily accounts" },
      { kind: "p", text: "If the account someone reads email with is also an administrator, then anything that runs as that person runs with administrative privilege. Separating daily-use accounts from privileged ones is free, and it converts a large share of potential compromises from an estate-wide problem into a single-machine one." },
      { kind: "p", text: "The same applies to servers. Count how many people hold domain administrator rights; in most environments the honest number is several times what anyone would defend." },
      { kind: "h2", text: "3. Patch the things that face the internet, on a schedule" },
      { kind: "p", text: "Attackers do not usually need a novel vulnerability. They need one that was published a few months ago on a device that is reachable from outside — a VPN appliance, a firewall, a remote-access gateway, a web server." },
      { kind: "p", text: "Internet-facing systems deserve a shorter patching window than workstations, and somebody's name against them. Add firmware to this: appliances are frequently the least-patched devices in an environment precisely because they sit outside the normal update tooling." },
      { kind: "h2", text: "4. Separate the backups from the estate" },
      { kind: "p", text: "Covered at length elsewhere, but it belongs in any baseline: a backup reachable with the same credentials as everything else does not survive a serious intrusion. At least one copy should be immutable or offline, on separate credentials, with alerting on deletion." },
      { kind: "h2", text: "5. Close the email routes" },
      { kind: "p", text: "Email remains the most common initial access route. The baseline is authentication records that prevent domain impersonation, gateway filtering with attachment sandboxing, and — importantly — a finance process that does not rely on an email being genuine before money moves." },
      { kind: "h2", text: "6. Know what you own" },
      { kind: "p", text: "You cannot patch, monitor or decommission a device nobody knows exists. An accurate asset inventory is the least exciting item on this list and the one that quietly makes the others possible. Every environment we survey contains something surprising: a server still running because one report depends on it, a test system exposed to the internet, an account belonging to someone who left." },
      { kind: "checklist", title: "The baseline", items: [
        "MFA on every account and every remote access path, with exceptions documented, owned and time-limited.",
        "Legacy authentication protocols disabled.",
        "Daily-use accounts separated from administrative accounts; the privileged group reduced to a defensible size.",
        "A patching schedule with a shorter window for internet-facing systems, including appliance firmware.",
        "At least one immutable or offline backup copy on separate credentials, with deletion alerting.",
        "SPF, DKIM and DMARC published and enforcing; gateway filtering with sandboxing.",
        "Payment-detail changes verified by voice, on a number not taken from the email.",
        "A current asset inventory covering hardware, software and accounts.",
      ]},
      { kind: "p", text: "Finish this list and the next product you buy will have something to stand on. Buy the product first and you have bought a more detailed view of a problem you had not yet addressed." },
    ],
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.published) - Date.parse(a.published),
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
