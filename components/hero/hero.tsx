import Link from "next/link";
import { ArtField, Facets } from "@/components/hero/facets";
import { ArrowRight, Shield } from "@/components/icons";
import { heroActions, heroSlides } from "@/content/home";
import { RevealText } from "@/components/motion/reveal-text";
import { heroTagRow, site } from "@/content/site";

/**
 * The opening frame.
 *
 * The live site rotates five statements here. Rotating type that a reader has
 * not asked to move is a readability problem and an accessibility one, so the
 * statement their page marks active leads, and the other four are kept as a
 * static run beneath it — the same words, offered rather than swapped out from
 * under you.
 *
 * The headline arrives word by word out of its own masks. That is a load
 * choreography rather than a scroll one: it is on screen at first paint, so a
 * scroll timeline would resolve instantly and nobody would see it.
 */
const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const [lead, ...rest] = heroSlides;

  return (
    <section
      data-header-tone="paper"
      className="scene-paper relative overflow-hidden pt-24 pb-24 sm:pt-32 sm:pb-28"
      aria-labelledby="hero-title"
    >
      <ArtField />
      <Facets className="drift pointer-events-none absolute -top-20 -right-28 w-[24rem] opacity-[0.10] sm:-top-24 sm:-right-32 sm:w-[34rem] lg:w-[44rem]" />

      <div className="shell relative">
        <p className="enter label" style={enter(60)}>
          {site.tagline}
        </p>

        <h1 id="hero-title" className="display rt-enter mt-6" style={enter(140)}>
          <RevealText accent={lead.accent} after={lead.after}>
            {lead.before}
          </RevealText>
        </h1>

        <p className="enter lede mt-8" style={enter(560)}>
          {lead.sub}
        </p>

        <ul
          className="enter mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
          style={enter(660)}
        >
          {heroTagRow.map((tag, i) => (
            <li key={tag} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="text-[0.5rem] text-[var(--color-brand-light)]">
                  ▲
                </span>
              )}
              <span className="text-sm text-[var(--scene-fg-muted)]">{tag}</span>
            </li>
          ))}
        </ul>

        <div className="enter mt-11 flex flex-wrap items-center gap-4" style={enter(740)}>
          <Link
            href="/contact"
            className="group/h inline-flex h-12 items-center gap-2.5 rounded-[4px] bg-[var(--scene-cta-bg)] px-6 text-sm font-semibold text-[var(--scene-cta-fg)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:-translate-y-0.5 hover:bg-[var(--scene-cta-bg-hover)]"
          >
            {heroActions.primary}
            <ArrowRight className="size-4 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/h:translate-x-1" />
          </Link>
          <Link
            href={heroActions.secondary.href}
            className="inline-flex h-12 items-center rounded-[4px] border border-[var(--scene-accent)] px-6 text-sm font-semibold text-[var(--scene-accent)] transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:-translate-y-0.5 hover:bg-[var(--scene-accent)] hover:text-white"
          >
            {heroActions.secondary.label}
          </Link>
        </div>

        <p className="enter mt-8" style={enter(820)}>
          <a
            href={heroActions.check.href}
            className="group/c inline-flex items-center gap-2.5 text-sm text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-accent)]"
          >
            <Shield className="size-4 text-[var(--scene-accent)]" />
            {heroActions.check.label}
            <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/c:translate-x-1" />
          </a>
        </p>

        {/* The four statements the live hero rotates to. Offered as a list
            rather than swapped in on a timer: the reader chooses when to read
            them, and a screen reader is not interrupted mid-sentence. */}
        <ul className="enter mt-16 grid gap-x-10 gap-y-6 border-t border-[var(--scene-line)] pt-8 sm:grid-cols-2" style={enter(900)}>
          {rest.map((slide) => (
            <li key={slide.accent} className="text-[0.9375rem] leading-relaxed">
              <span className="font-medium text-[var(--scene-fg)]">
                {slide.before} <span className="text-[var(--scene-accent)]">{slide.accent}</span>
                {slide.after ? ` ${slide.after}` : ""}
              </span>{" "}
              <span className="text-[var(--scene-fg-muted)]">{slide.sub}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
