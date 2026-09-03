/**
 * About content.
 *
 * Deliberately free of the numbers a company like this is usually tempted to
 * print. Published sources disagree on decodingIT's trading history (the Indian
 * entity's registration year and the Oman "years in business" claim do not
 * reconcile), and we do not have verified headcount or client counts. So the
 * page argues from what is demonstrable — what we do, where we do it, and how —
 * rather than from statistics nobody can check.
 */

export const manifesto = {
  eyebrow: "About",
  // Not "Complexity in. Clarity out." — that line is the footer's, and it
  // appears on every page. Printing it again as this page's H1 would spend the
  // company's best sentence twice in one screen. This states the same argument
  // in a way that only works here.
  title: "The gap is rarely technical.",
  standfirst:
    "decodingIT exists because most organisations are not badly served by technology — they are badly served by explanation.",
  body: [
    "Ask a business owner what their IT costs and they can usually tell you. Ask what it does, what it protects, or what would happen if it stopped, and the answer gets vague. Not because they are careless, but because nobody ever explained it in language they could act on.",
    "That gap is where damage happens. It is why licences get renewed that nobody uses, why backups run for years without a single restore being tested, why a firewall sits out of subscription, and why an organisation discovers the true state of its infrastructure during an incident rather than before one.",
    "We named the company after the work of closing that gap. Decoding is not simplification — the systems stay as complex as they need to be. It is translation: taking an estate that only makes sense to specialists and rendering it into decisions a business can actually make.",
  ],
};

export const beliefs = [
  {
    index: "01",
    title: "The estate should be knowable",
    body: "Every environment we run is documented — hardware, licences, configuration, dependencies, contracts. Not because documentation is virtuous, but because you cannot make a decision about a system nobody can describe.",
  },
  {
    index: "02",
    title: "Boring is the goal",
    body: "The best possible outcome of good IT work is that nothing memorable happens. We are not trying to be visible. We are trying to make the technology stop being the thing anybody has to think about.",
  },
  {
    index: "03",
    title: "Say the uncomfortable thing early",
    body: "A recovery target that cannot be met, a server that should have been replaced two years ago, a project that will not land on the date somebody promised — these are cheaper to say now than to discover later.",
  },
  {
    index: "04",
    title: "Sell the requirement, not the catalogue",
    body: "We resell hardware and software, and we are clear-eyed about what that could incentivise. The requirement gets written before anything gets quoted, and we will tell you when the product you asked for is not the answer.",
  },
];

export const whoWeServe = {
  title: "Who we work with",
  body: "Corporate, SME and government organisations across a range of sectors, in Oman, the United Arab Emirates and India. The common thread is not size or industry — it is a point where technology has become significant enough to need running properly, and there is no appetite to build an internal department to do it.",
  points: [
    "Organisations without an internal IT team, who need one that answers the phone.",
    "Organisations with an internal team that should be working on the business, not resetting passwords.",
    "Multi-site operations where the network and the standards need to be the same in every location.",
    "Regulated or audited environments where controls have to be documented, not merely present.",
  ],
};

/**
 * Leadership profiles.
 *
 * Intentionally empty. Naming and describing real people is a claim about
 * individuals, and the details available publicly are partial and second-hand.
 * decodingIT should supply verified names, roles, credentials and photographs —
 * dropping them in here renders the section on /about and adds `employee`
 * entries to the Organization structured data.
 */
export interface Leader {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/name.jpg". */
  portrait?: string;
  linkedin?: string;
}

export const leadership: Leader[] = [];
