/**
 * About content.
 *
 * Every sentence here is traceable to decodingIT's own home page or to the
 * design extraction the client supplied. A previous version of this file said
 * several things that were not: that the company serves government
 * organisations, that it operates "as a value-added reseller" in partnership
 * with named vendors, that it works "on the ground in Oman", and that it has
 * been going "since 2013" — the last derived by subtracting their "13+ years
 * in the region" from the current year. None of those had a source. They have
 * been removed rather than softened.
 *
 * The page is short as a result. That is the correct outcome: where the
 * company has not said something, this page does not say it for them.
 */

export const manifesto = {
  title: "One partner. Every layer. Full accountability.",
  standfirst:
    "Full-stack IT infrastructure, cloud, cybersecurity, and managed services. One team, end-to-end — serving businesses across Oman, UAE, and India.",
  /** Their band copy, which is the fullest statement of position they publish. */
  body: [
    "Thirteen or more years in the region: long enough to have seen how these estates age — and to have supported them through it, across Oman and India.",
    "Foundation, network, cloud, continuity, workplace and security, answered by one team. When something breaks, there is no argument about whose layer it is.",
    "One agreement covers every layer, with response times written into it — and a named account manager who owns whether they are met.",
  ],
};

/**
 * Who each engagement is for.
 *
 * These are the "For:" audiences decodingIT publishes against its own service
 * plans, not an audience list written here.
 */
export const whoWeServe = {
  title: "Who we work with",
  body: "Six ways to work with us — from fixing what is in front of you today to running the whole estate, or extending a team you already have.",
  points: [
    "Business with occasional IT support needs.",
    "Organisations without an internal IT team.",
    "Regulated or high-exposure environments.",
    "IT teams needing on-demand L3 support.",
    "Existing infrastructure needing an operator.",
    "A change big enough to plan properly.",
  ],
};

/**
 * Leadership profiles.
 *
 * Intentionally empty. decodingIT has named staff, but publishing a person's
 * name, role and biography is a claim about an individual and needs their
 * sign-off. Supply verified entries and the section renders on /about and adds
 * `employee` entries to the Organization structured data.
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
