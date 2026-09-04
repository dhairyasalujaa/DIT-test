import Link from "next/link";
import { services } from "@/content/services";
import { solutionsSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";
import { ArrowRight } from "@/components/icons";

/**
 * The six solutions, as the live site presents them.
 *
 * Names and one-line summaries are decodingIT's own, in their order. Their
 * page sets this as a three-up card grid; that shape is kept, because six
 * peers with equal weight is exactly what a grid is for.
 */
export function SolutionsGrid() {
  return (
    <Scene tone="paper-raised" id="solutions" aria-labelledby="solutions-title">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>

        <div className="mt-8 max-w-(--measure-head)">
          <RevealText as="h2" id="solutions-title" className="display-sm">
            {solutionsSection.title}
          </RevealText>
          <Reveal delay={120}>
            <p className="lede mt-6">{solutionsSection.lede}</p>
          </Reveal>
        </div>

        <ul className="after-intro grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={(i % 3) * 70}>
              <Link
                href={`/solutions/${service.slug}`}
                className="panel group/card flex h-full flex-col"
              >
                <h3 className="panel-title title text-[1.25rem]">{service.name}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {service.summary}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--scene-accent)]">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/card:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
