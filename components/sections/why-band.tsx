import { bandSection } from "@/content/home";
import { ArtField } from "@/components/hero/facets";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";

/**
 * The dark band: why decodingIT, in three checkable figures.
 *
 * Heading, figures, labels and body copy are decodingIT's own, from the
 * "one partner. every layer. full accountability." band on their home page.
 * Nothing here is rounded up or embellished — 13+, 6 and 1 are the numbers
 * their page prints.
 *
 * The figures rise out of masks like the heading does, so the section has one
 * motion idea rather than two.
 */
export function WhyBand() {
  return (
    <Scene tone="ink" aria-labelledby="band-title" className="band overflow-hidden">
      <ArtField tone="ink" />

      <div className="shell band-shift">
        <RevealText as="h2" id="band-title" className="display max-w-[16ch]">
          {bandSection.title}
        </RevealText>

        <ul className="after-intro grid gap-x-10 gap-y-12 md:grid-cols-3">
          {bandSection.stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 90}>
              <p className="text-[clamp(3rem,6vw,4.5rem)] leading-none font-[450] tracking-[-0.04em] text-[var(--scene-accent)] tabular-nums">
                <RevealText>{stat.figure}</RevealText>
              </p>
              <h3 className="title mt-4 text-[1.125rem]">{stat.label}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                {stat.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
