import { plans } from "@/content/plans";
import { plansSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";
import { ArrowRight } from "@/components/icons";

/**
 * The six service plans — the Mega / Giga / Tera line.
 *
 * Tags, names, descriptions and audiences are decodingIT's own words. The
 * plan pages are not built here, so each card links to its live page; see
 * `liveSite` in content/site.ts for the one place that decision is made.
 *
 * GigaManaged carries the live site's "Most chosen" flag and is the one card
 * given a filled ground — a single emphasis, so it actually reads as one.
 */
export function PlansGrid() {
  return (
    <Scene tone="paper" id="services" aria-labelledby="plans-title">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>

        <div className="mt-8 max-w-(--measure-lede)">
          <RevealText as="h2" id="plans-title" className="display-sm">
            {plansSection.title}
          </RevealText>
          <Reveal delay={120}>
            <p className="lede mt-6">{plansSection.lede}</p>
          </Reveal>
        </div>

        <ul className="after-intro grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal as="li" key={`${plan.prefix}${plan.accent}`} delay={(i % 3) * 70}>
              <a
                href={plan.href}
                className={
                  "panel group/plan flex h-full flex-col " +
                  (plan.featured ? "border-[var(--scene-accent)]/45 bg-[var(--scene-wash)]" : "")
                }
              >
                <p className="label">{plan.tag}</p>
                <h3 className="panel-title mt-4 text-[1.5rem] leading-none font-medium tracking-[-0.03em]">
                  {plan.prefix}
                  <span className="text-[var(--scene-accent)]">{plan.accent}</span>
                  {plan.suffix ? <span className="font-normal"> {plan.suffix}</span> : null}
                </h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {plan.description}
                </p>
                <p className="mt-5 border-t border-[var(--scene-line)] pt-4 text-[0.875rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  <span className="text-[var(--scene-fg)]">For:</span> {plan.audience}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--scene-accent)]">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/plan:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
