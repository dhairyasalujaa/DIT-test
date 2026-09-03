import Link from "next/link";
import { DecodePanel } from "@/components/hero/decode-panel";
import { ArrowRight } from "@/components/icons";
import { locations, marketsShort, site } from "@/content/site";

/**
 * Scene 01 — Arrival.
 *
 * One idea, given room. The headline resolves out of focus on the word that
 * carries the brand; everything else settles around it in under a second.
 * The H1 is real text in the initial HTML, so nothing about the entrance
 * affects what a crawler or a screen reader receives.
 */
export function Hero() {
  return (
    <section
      data-header-tone="ink"
      className="scene-ink relative flex min-h-[calc(100svh-68px)] flex-col justify-center pt-28 pb-28 sm:min-h-svh sm:pt-32 sm:pb-32"
      aria-labelledby="hero-title"
    >
      <div className="shell grid w-full items-center gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="enter eyebrow" style={{ "--enter-delay": "80ms" } as React.CSSProperties}>
            IT services · {marketsShort.join(" · ")}
          </p>

          <h1 id="hero-title" className="display mt-7">
            <span className="enter block" style={{ "--enter-delay": "160ms" } as React.CSSProperties}>
              Technology,
            </span>
            <span
              className="enter-resolve block text-[var(--scene-accent)]"
              style={{ "--enter-delay": "420ms" } as React.CSSProperties}
            >
              decoded.
            </span>
          </h1>

          <p
            className="enter lede mt-8 max-w-[46ch]"
            style={{ "--enter-delay": "620ms" } as React.CSSProperties}
          >
            decodingIT designs, builds and runs the technology businesses depend
            on — infrastructure, networking, cloud, workplace and security — for
            organisations across Oman, the UAE and India.
          </p>

          <div
            className="enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ "--enter-delay": "740ms" } as React.CSSProperties}
          >
            <Link
              href="/contact"
              className="group/h inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--scene-fg)] px-6 text-sm font-medium text-[var(--scene-bg)] transition-colors duration-500 hover:bg-[var(--scene-accent)]"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/h:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="link-underline text-sm text-[var(--scene-fg-muted)] transition-colors duration-300 hover:text-[var(--scene-fg)]"
            >
              See what we do
            </Link>
          </div>
        </div>

        <div className="enter lg:col-span-5" style={{ "--enter-delay": "560ms" } as React.CSSProperties}>
          <DecodePanel />
        </div>
      </div>

      {/* The base of the opening frame. Small, precise, and factual — the
          details someone checks before they decide whether to keep reading. */}
      <div
        className="enter shell absolute inset-x-0 bottom-0"
        style={{ "--enter-delay": "1000ms" } as React.CSSProperties}
      >
        <hr className="rule border-t" />
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
          <p className="eyebrow">
            {locations.map((l) => l.city).join(" · ")}
          </p>
          <p className="eyebrow">{site.hours.label}</p>
        </div>
      </div>
    </section>
  );
}
