import { existsSync } from "node:fs";
import { join } from "node:path";
import { vendors } from "@/content/technology";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";

/**
 * The technology strip.
 *
 * Every vendor here is one decodingIT's own material names against a solution;
 * the list is derived from `content/services.ts`, so it cannot drift from what
 * the site actually claims. The strip says "we work with this", which is what
 * the source says — it is not a partner or certification claim.
 *
 * Logo files are the client's to supply, because whether decodingIT may
 * display a given vendor's mark is a partnership question, not a design one.
 * Each slot checks for its file at build time and falls back to the vendor's
 * name set in mono — an empty slot should still say whose slot it is, and a
 * missing file should never leave a grey rectangle on the page.
 */
function hasLogo(file: string) {
  return existsSync(join(process.cwd(), "public", "logos", file));
}

export function TechnologyStrip({ tone = "paper" }: { tone?: "paper" | "paper-raised" }) {
  return (
    <Scene tone={tone} aria-labelledby="technology-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Technology"
          id="technology-title"
          title="The technology underneath."
          lede="The platforms our solutions are built on. We are a value-added reseller, so the hardware and software are chosen for the estate rather than for the catalogue."
        />

        <ul className="after-intro grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {vendors.map((vendor, i) => (
            <Reveal as="li" key={vendor.name} delay={(i % 5) * 60}>
              <div className="plate h-full">
                {hasLogo(vendor.logo) ? (
                  // eslint-disable-next-line @next/next/no-img-element -- vendor marks are SVG of unknown intrinsic size
                  <img src={`/logos/${vendor.logo}`} alt={vendor.name} loading="lazy" />
                ) : (
                  <span className="plate-name">{vendor.name}</span>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
