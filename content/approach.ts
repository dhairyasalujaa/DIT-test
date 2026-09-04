/**
 * How decodingIT describes working with them.
 *
 * Everything here is traceable to their own material — the accountability
 * band on their home page, the MyIT Portal caption in their mega menu, and
 * the audiences printed against their six service plans.
 *
 * A previous version of this file carried a four-phase engagement model
 * (Set up / Stabilise / Improve / Run), a set of four "principles", four
 * "engagement shapes" and a `serviceTiers` table. None of it appeared in any
 * source the client supplied, and the phase model contradicted the page's own
 * metadata, which described five stages. All of it is gone rather than
 * rewritten: a methodology is a claim about how a company works, and this one
 * was not theirs.
 */

export interface Commitment {
  title: string;
  body: string;
}

/**
 * The three commitments their accountability band makes, at full length.
 * Headline and body are decodingIT's own words.
 */
export const commitments: Commitment[] = [
  {
    title: "One team, every layer",
    body: "Foundation, network, cloud, continuity, workplace and security, answered by one team. When something breaks, there is no argument about whose layer it is.",
  },
  {
    title: "One contract, one owner",
    body: "One agreement covers every layer, with response times written into it — and a named account manager who owns whether they are met.",
  },
  {
    title: "Thirteen years in the region",
    body: "Long enough to have seen how these estates age — and to have supported them through it, across Oman and India.",
  },
];

/**
 * The client portal, described in decodingIT's own navigation caption.
 */
export const portal = {
  name: "MyIT Portal",
  summary: "Your dashboard, tickets and reports in one place.",
  href: "https://app.decodingit.com/clientportal",
} as const;
