import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { markets } from "@/content/site";

/**
 * Scene 04 — Proof.
 *
 * The rhythm deliberately changes here: after the open, editorial services
 * index, a dark band. It opens with a statement at display size and no
 * container rules at all — the one moment on the page where type sits on a
 * ground with nothing ruled around it — and only then gets dense.
 *
 * This is where the visitor's real question — "can these people actually do
 * this?" — gets answered with things that can be checked rather than
 * adjectives. Every line is a commitment a prospective client could hold us
 * to, which is the only kind of proof worth printing when the client work
 * itself is confidential.
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
    <Scene tone="ink" aria-labelledby="proof-title" className="band">
      {/* The statement. No rail, no rule, no list — the shape of this moment
          is the whole point of it. It shifts against the band as it crosses,
          so the type and the ground move at different rates. */}
      <div className="shell band-shift">
        <Reveal variant="clip">
          <h2 id="proof-title" className="display max-w-[11ch]">
            One contract, <span className="text-[var(--scene-accent)]">one owner.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede mt-8">
            Every layer under one agreement, run by one team, with response
            times written into it.
          </p>
        </Reveal>
      </div>

      <div className="shell">
        {/* Four commitments, as objects rather than as more ruled text. */}
        <ul className="after-intro grid gap-4 sm:grid-cols-2">
          {commitments.map((item, i) => (
            <Reveal as="li" key={item.label} delay={(i % 2) * 80}>
              <div className="panel h-full">
                <p className="eyebrow">{item.label}</p>
                <h3 className="mt-5 text-[1.125rem] leading-snug tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* The portal — a concrete artefact rather than a claim. */}
        <div className="mt-20 grid items-baseline gap-x-10 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-3" delay={60}>
            <p className="eyebrow">Visibility</p>
          </Reveal>

          <div className="md:col-span-4">
            <Reveal delay={120}>
              <h3 className="title">You can see what we are doing, without asking us.</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                Monitoring, tickets, project progress and monthly reports are
                all tracked inside your client portal — so the state of your
                estate is something you can look at rather than ask about.
              </p>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5" delay={200}>
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
            <p className="eyebrow mt-6">Delivered in {markets.join(" · ")}</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16">
            <Action href="/approach" variant="secondary">
              How an engagement runs
            </Action>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
