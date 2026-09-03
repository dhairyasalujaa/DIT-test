import Link from "next/link";
import { Facets } from "@/components/hero/facets";
import { ArrowRight } from "@/components/icons";
import { heroTagRow, site } from "@/content/site";

/**
 * The opening frame.
 *
 * Copy is decodingIT's own hero, captured from the live site. That hero
 * rotates between variants; this uses the primary one. The alternate reads
 * "Build a foundation that scales. / Technology Foundation, Enterprise
 * Networking, and Microsoft Cloud Workspace — the infrastructure layer your
 * business runs on."
 *
 * White ground with the faceted triangle motif behind it, matching the live
 * site, which is blue-on-white rather than dark.
 */
export function Hero() {
  return (
    <section
      data-header-tone="paper"
      className="scene-paper relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Decorative facets, bleeding off the right edge. */}
      <Facets className="pointer-events-none absolute -top-16 -right-24 hidden w-[38rem] opacity-[0.13] lg:block" />

      <div className="shell relative">
        <p className="enter eyebrow" style={{ "--enter-delay": "80ms" } as React.CSSProperties}>
          {site.tagline}
        </p>

        <h1 id="hero-title" className="display mt-6 max-w-[17ch]">
          <span className="enter block" style={{ "--enter-delay": "160ms" } as React.CSSProperties}>
            Extend your team,
          </span>
          <span
            className="enter-resolve block text-[var(--scene-accent)]"
            style={{ "--enter-delay": "400ms" } as React.CSSProperties}
          >
            on demand.
          </span>
        </h1>

        <p
          className="enter lede mt-7 max-w-[54ch]"
          style={{ "--enter-delay": "560ms" } as React.CSSProperties}
        >
          MegaAssist, GigaExtend and TeraConsult — augment your team exactly
          where you need it.
        </p>

        {/* The tag row, with the triangle separator the live site uses. */}
        <ul
          className="enter mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
          style={{ "--enter-delay": "660ms" } as React.CSSProperties}
        >
          {heroTagRow.map((tag, i) => (
            <li key={tag} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="text-[0.5rem] text-[var(--color-brand-light)]">
                  ▲
                </span>
              )}
              <span className="eyebrow">{tag}</span>
            </li>
          ))}
        </ul>

        <div
          className="enter mt-11 flex flex-wrap items-center gap-4"
          style={{ "--enter-delay": "740ms" } as React.CSSProperties}
        >
          <Link
            href="/contact"
            className="group/h inline-flex h-12 items-center gap-2.5 rounded-[4px] bg-[var(--scene-cta-bg)] px-6 text-sm font-bold text-[var(--scene-cta-fg)] transition-colors duration-300 hover:bg-[var(--scene-cta-bg-hover)]"
          >
            Talk to Our Experts
            <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/h:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center rounded-[4px] border border-[var(--scene-accent)] px-6 text-sm font-bold text-[var(--scene-accent)] transition-colors duration-300 hover:bg-[var(--scene-accent)] hover:text-white"
          >
            Browse Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
