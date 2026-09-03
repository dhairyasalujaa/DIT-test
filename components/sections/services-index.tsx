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
 * ordered list with a number, a name, a plain description and the disciplines
 * underneath it. Each row is one link, so the whole row is a target on touch
 * and a single tab stop for the keyboard.
 */
export function ServicesIndex() {
  return (
    <Scene tone="paper-raised" aria-labelledby="services-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Services / 01 — 06"
          id="services-title"
          title="Six practices, one operating model."
          lede="Bought individually or as a whole. Most organisations start with one and end up handing us the rest, which is only a good outcome if the first one went well."
          aside={
            <Action href="/services" variant="secondary">
              All services
            </Action>
          }
        />

        <ul className="mt-16 border-t border-[var(--scene-line)]">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 60} shift="1.5rem">
              <Link
                href={`/services/${service.slug}`}
                className="group/row relative grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-[var(--scene-line)] py-8 transition-colors duration-500 md:grid-cols-12 md:py-10"
              >
                {/* The accent rule that draws in from the left on hover — the
                    one place the row's colour changes. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[var(--scene-accent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
                />

                <span className="eyebrow md:col-span-2">{service.index}</span>

                <div className="md:col-span-5">
                  <h3 className="text-[1.375rem] leading-tight tracking-[-0.025em] transition-colors duration-500 group-hover/row:text-[var(--scene-accent)] md:text-[1.625rem]">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)] md:hidden lg:block">
                    {service.summary}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <ul className="flex flex-wrap gap-x-2 gap-y-2">
                    {service.stack.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--scene-line)] px-3 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--scene-fg-muted)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="hidden justify-self-end md:col-span-1 md:block">
                  <ArrowRight className="size-4 text-[var(--scene-fg-muted)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1 group-hover/row:text-[var(--scene-accent)]" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
