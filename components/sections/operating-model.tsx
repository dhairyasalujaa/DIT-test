import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { markets } from "@/content/site";

/**
 * Scene 04 — Proof.
 *
 * The rhythm deliberately changes here: after the open, editorial services
 * index, a dense technical band on ink. This is where the visitor's real
 * question — "can these people actually do this?" — gets answered with things
 * that can be checked rather than adjectives.
 *
 * Every line is a commitment a prospective client could hold us to, which is
 * the only kind of proof worth printing when the client work itself is
 * confidential.
 */

/**
 * The four positions decodingIT states about how the service works. Sourced
 * from the company's own material rather than authored here.
 */
const commitments = [
  {
    label: "Accountability",
    title: "One team, no handoff",
    body: "The same team that designs the solution deploys it and supports it long-term. There is no handoff between a project team and a support desk.",
  },
  {
    label: "Agreement",
    title: "One agreement, every layer",
    body: "Foundation, network, cloud, continuity, workplace and security sit under a single agreement, with response times written into it and a named account manager who owns whether they are met.",
  },
  {
    label: "Presence",
    title: "Engineers on the ground",
    body: "We operate on the ground in Muscat and understand the local business environment and the infrastructure challenges that come with it.",
  },
  {
    label: "Response",
    title: "Four business hours",
    body: "Get in touch and a real engineer replies within four business hours — not an auto-responder, and not a salesperson.",
  },
];

const portalFeatures = [
  "Raise and track support tickets",
  "Follow project progress",
  "Read monitoring reports",
  "See the live asset register",
  "Review billing history",
];

export function OperatingModel() {
  return (
    <Scene tone="ink" aria-labelledby="proof-title">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>

        <div className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-12">
          <Reveal className="md:col-span-3" delay={60}>
            <p className="eyebrow">The operating model</p>
          </Reveal>
          <Reveal className="md:col-span-9 lg:col-span-7" delay={120}>
            <h2 id="proof-title" className="display-sm">
              Six areas, answered by one team.
            </h2>
          </Reveal>
        </div>

        {/* Dense two-column commitment grid, ruled like a specification sheet. */}
        <div className="mt-16 grid border-t border-[var(--scene-line)] sm:grid-cols-2">
          {commitments.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className="border-b border-[var(--scene-line)] py-8 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
            >
              <p className="eyebrow">{item.label}</p>
              <h3 className="mt-4 text-[1.125rem] leading-snug tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* The portal — a concrete artefact rather than a claim. */}
        <div className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-5" delay={60}>
            <p className="eyebrow">Visibility</p>
            <h3 className="mt-4 text-[1.5rem] leading-tight tracking-[-0.025em]">
              You can see what we are doing, without asking us.
            </h3>
            <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
              Monitoring, tickets, project progress and monthly reports are all
              tracked inside your client portal — so the state of your estate is
              something you can look at rather than ask about.
            </p>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={140}>
            <ul className="border-t border-[var(--scene-line)]">
              {portalFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 border-b border-[var(--scene-line)] py-4 text-[0.9375rem]"
                >
                  <span aria-hidden className="size-1 shrink-0 rounded-full bg-[var(--scene-accent)]" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--scene-fg-muted)] uppercase">
              Delivered in {markets.join(" · ")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-14">
            <Action href="/approach" variant="secondary">
              How an engagement runs
            </Action>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
