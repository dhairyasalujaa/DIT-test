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

const commitments = [
  {
    label: "Monitoring",
    title: "Watched around the clock",
    body: "Servers, network devices and links are monitored continuously, so a failure is detected by us rather than reported to us.",
  },
  {
    label: "Recovery",
    title: "Restores tested, not assumed",
    body: "Backups are verified daily and restores are actually performed. A recovery target we have not proven is a recovery target we will tell you is unproven.",
  },
  {
    label: "Documentation",
    title: "An estate you own",
    body: "Diagrams, configurations, licences and credentials are documented and belong to you — including on the day you decide to leave.",
  },
  {
    label: "Assessment",
    title: "A gap analysis before a quote",
    body: "We survey what you have and put the risks in writing before proposing anything. It is a slower start and a far shorter list of surprises.",
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
              Anyone can promise uptime. These are the parts you can check.
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
              Managed clients get a portal. It exists because &ldquo;we are on
              it&rdquo; is not a status, and because the provider should not be
              the only party who knows the state of your estate.
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
