import Link from "next/link";
import { services } from "@/content/services";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { ArrowRight } from "@/components/icons";

/**
 * Scene 03 — Exploration.
 *
 * Services as an editorial index rather than a grid of identical cards: an
 * ordered list with a number, a name and a plain description. Each row is one
 * link, so the whole row is a target on touch and a single tab stop for the
 * keyboard.
 *
 * The row spans read `3 / 6 / 2 / 1` — twelve exactly, on the site's one
 * gutter, so the numerals sit on the same vertical as every other label on
 * the page. The `.row` surface supplies the wash and the accent bar that draws
 * down the leading edge; `items-start` keeps the arrow off the heading's
 * baseline, where it used to be dragged by `items-baseline`.
 */
export function ServicesIndex() {
  return (
    <Scene tone="paper-raised" aria-labelledby="services-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Solutions"
          id="services-title"
          title="Every layer of your IT, designed together."
          lede="Most problems live between layers — a network built for one thing, a backup that never met the workload. We design and run the whole stack, so the seams are ours to answer for."
          aside={
            <Action href="/services" variant="secondary">
              All services
            </Action>
          }
        />

        <ul className="after-intro border-t border-[var(--scene-line)]">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 60} shift="1.5rem">
              <Link
                href={`/services/${service.slug}`}
                className="row row-pad group/row grid grid-cols-1 items-start gap-x-10 gap-y-3 md:grid-cols-12"
              >
                <span className="eyebrow md:col-span-3 md:pt-2">{service.index}</span>

                <div className="md:col-span-6">
                  <h3 className="title transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] group-hover/row:text-[var(--scene-accent)]">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {service.summary}
                  </p>
                </div>

                {/* The platforms this practice is actually built on. A count
                    was here first and read as information; it was six on every
                    row, so it said nothing. */}
                <span className="hidden font-mono text-[0.75rem] leading-relaxed tracking-[0.02em] text-[var(--scene-fg-muted)] md:col-span-2 md:block">
                  {service.stack.slice(0, 2).join(" · ")}
                </span>

                <span className="hidden justify-self-end md:col-span-1 md:block md:pt-1">
                  <ArrowRight className="size-4 text-[var(--scene-fg-muted)] transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/row:translate-x-1 group-hover/row:text-[var(--scene-accent)]" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
