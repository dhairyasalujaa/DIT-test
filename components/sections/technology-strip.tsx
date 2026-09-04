import { existsSync } from "node:fs";
import { join } from "node:path";
import { vendors } from "@/content/technology";
import { partnersSection } from "@/content/home";
import { Scene } from "@/components/ui/scene";

/**
 * The technology marquee.
 *
 * decodingIT's own strip, rebuilt: seventeen vendors in their order, the
 * track holding them twice over so the loop closes seamlessly at -50%. The
 * second run is `aria-hidden`, so a screen reader hears seventeen vendors
 * rather than thirty-four.
 *
 * Logo files are the client's to supply, because whether decodingIT may show
 * a given vendor's mark is a partnership question, not a design one. Each
 * slot checks for its file at build time and otherwise sets the vendor's
 * name — the live site's own pill in its non-logo state.
 *
 * Motion: a plain CSS translate, paused on hover and on focus, and stopped
 * entirely under `prefers-reduced-motion`. Its speed is scaled by
 * `--marquee-boost`, which the Lenis component writes from scroll velocity.
 */
function hasLogo(file: string) {
  return existsSync(join(process.cwd(), "public", "logos", file));
}

export function TechnologyStrip({ tone = "paper" }: { tone?: "paper" | "paper-raised" }) {
  const run = vendors.map((vendor) => ({ ...vendor, present: hasLogo(vendor.logo) }));

  return (
    <Scene tone={tone} aria-labelledby="partners-title" className="py-20!">
      <h2 id="partners-title" className="shell title text-center text-[1.125rem]">
        {partnersSection.title}
      </h2>

      <div className="marquee mt-10">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track" aria-hidden={copy === 1 || undefined}>
              {run.map((vendor) => (
                <div key={`${copy}-${vendor.name}`} className="marquee-item">
                  {vendor.present ? (
                    // eslint-disable-next-line @next/next/no-img-element -- vendor marks are supplied at unknown intrinsic size
                    <img src={`/logos/${vendor.logo}`} alt={vendor.name} loading="lazy" />
                  ) : (
                    <span className="marquee-name">{vendor.name}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
