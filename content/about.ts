/**
 * About content.
 *
 * Rebuilt from decodingIT's own published description of itself, replacing an
 * earlier version that was authored rather than sourced. It is deliberately
 * shorter: where the company has not said something, this page does not say it
 * on the company's behalf.
 *
 * How the company works is on /approach, so the two pages do not restate
 * each other.
 */

export const manifesto = {
  eyebrow: "About",
  title: "One team, since 2013.",
  standfirst:
    "decodingIT is a Muscat-based IT solutions company. We make IT E.A.S.Y. — Effective and Success Yielding.",
  body: [
    "We provide IT services, solutions and products to corporate, SME and government organisations across a range of verticals, working on the ground in Oman and serving clients in the UAE and India.",
    "As a value-added reseller we work in partnership with globally recognised IT hardware and software vendors, and our focus is the management, access and monitoring of IT infrastructure and IT operations — the part that has to keep working after the project ends.",
    "The same team that designs a solution deploys it and supports it long-term. There is no handoff between a project team and a support desk, which means there is one point of accountability throughout.",
  ],
};

export const whoWeServe = {
  title: "Who we work with",
  body: "Corporate, SME and government organisations across a range of verticals, in Oman, the United Arab Emirates and India.",
  points: [
    "Organisations without an internal IT team, who need one that answers.",
    "Organisations with an internal team that needs an L2/L3 specialist alongside it.",
    "Multi-site operations that need the same standard in every location.",
    "Environments where controls have to be documented, not merely present.",
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
