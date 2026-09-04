import Link from "next/link";
import { services } from "@/content/services";
import { solutionsSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { CardAffordance } from "@/components/ui/card-link";

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
        <SceneIntro id="solutions-title" title={solutionsSection.title} lede={solutionsSection.lede} />

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
                <CardAffordance label="Explore" className="mt-8" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
