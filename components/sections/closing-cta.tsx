import Link from "next/link";
import { closingSection } from "@/content/home";
import { ArtField } from "@/components/hero/facets";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";
import { ArrowRight } from "@/components/icons";

/**
 * The closing panel.
 *
 * decodingIT's own words, and their own two calls to action. Set on ink so
 * the page ends where it began — and so the last thing on screen before the
 * footer is a question rather than a list.
 */
export function ClosingCta() {
  return (
    <Scene tone="ink" id="contact" aria-labelledby="cta-title" className="band overflow-hidden">
      <ArtField tone="ink" />

      <div className="shell band-shift">
        <RevealText as="h2" id="cta-title" className="display max-w-[20ch]">
          {closingSection.title}
        </RevealText>

        <Reveal delay={140}>
          <p className="lede mt-8">{closingSection.lede}</p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group/g inline-flex h-12 items-center justify-center gap-2.5 rounded-[4px] bg-[var(--scene-cta-bg)] px-6 text-sm font-semibold text-[var(--scene-cta-fg)] transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:-translate-y-0.5 hover:bg-[var(--scene-cta-bg-hover)]"
            >
              {closingSection.primary}
              <ArrowRight className="size-4 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/g:translate-x-1" />
            </Link>
            <a
              href={closingSection.secondary.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-[4px] border border-[var(--scene-fg)]/35 px-6 text-sm font-semibold text-[var(--scene-fg)] transition-[background-color,color,border-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:-translate-y-0.5 hover:border-[var(--scene-fg)] hover:bg-[var(--scene-fg)] hover:text-[var(--color-navy)]"
            >
              {closingSection.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
