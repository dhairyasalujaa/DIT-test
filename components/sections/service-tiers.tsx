import { serviceTiers } from "@/content/approach";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";

/**
 * The service tiers.
 *
 * decodingIT's product line — the Mega / Giga / Tera names — grouped by how
 * much of the estate the client hands over. This existed in `content/approach.ts`
 * and was rendered nowhere, which is why the site read as thinner than the
 * company it describes.
 *
 * A specification table rather than a card grid, deliberately: these are
 * commitments with a shape, and a shape is easier to compare down a column
 * than across eight boxes. The group name sits in the label rail and appears
 * only when it changes, so the eye reads the products as a list and the
 * groups as its structure.
 */
/**
 * One row per product, with every group it belongs to named in the rail.
 * Two of the eight products are listed under two groups in the source, and
 * printing them twice reads as a mistake rather than as the fact it is.
 */
const rows = (() => {
  const byName = new Map<string, { name: string; description: string; audience?: string; groups: string[] }>();
  for (const tier of serviceTiers) {
    for (const product of tier.products) {
      const existing = byName.get(product.name);
      if (existing) existing.groups.push(tier.group);
      else byName.set(product.name, { ...product, groups: [tier.group] });
    }
  }
  return [...byName.values()];
})();

export function ServiceTiers({
  tone = "paper",
  heading = "Pick how much you hand over.",
  lede = "The same engineers, scoped four ways — from fixed hours when you need them, to your whole IT department run for you.",
}: {
  tone?: "paper" | "paper-raised" | "ink";
  heading?: string;
  lede?: string;
}) {
  return (
    <Scene tone={tone} aria-labelledby="tiers-title">
      <div className="shell">
        <SceneIntro eyebrow="Service tiers" id="tiers-title" title={heading} lede={lede} />

        <ul className="spec after-intro">
          {rows.map((row, i) => (
            <Reveal as="li" key={row.name} delay={(i % 4) * 50} className="spec-row md:grid-cols-12">
              <p className="eyebrow md:col-span-3">{row.groups.join(" · ")}</p>
              <h3 className="title md:col-span-4">{row.name}</h3>
              <div className="md:col-span-5">
                <p className="text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {row.description}
                </p>
                {row.audience && (
                  <p className="mt-2 font-mono text-[0.75rem] tracking-[0.02em] text-[var(--scene-fg-muted)]">
                    For: {row.audience}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
