import { closingSection } from "@/content/home";
import { ArtField } from "@/components/hero/facets";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";

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
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Action href="/contact" block>
              {closingSection.primary}
            </Action>
            <Action href={closingSection.secondary.href} variant="on-dark" icon="up-right" block>
              {closingSection.secondary.label}
            </Action>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
