import { processStages } from "@/content/approach";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";

/**
 * Scene 05 — Confidence.
 *
 * The four phases of an engagement, drawn as a stepped run rather than four
 * equal columns: a rule carries the eye left to right, each phase sits on a
 * node, and the phases step down the page slightly so the sequence reads as
 * a progression instead of a row of boxes.
 *
 * The connecting rule is drawn with a scroll-linked scaleX, so it writes
 * itself across the section as the reader arrives at it.
 */
export function ProcessPreview() {
  return (
    <Scene tone="paper" aria-labelledby="process-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Approach"
          id="process-title"
          title="The Decoding IT Way."
          lede="Four phases, whether we are running your IT day to day or delivering a single project."
        />

        <div className="after-intro relative">
          {/* The rule the phases hang from. Horizontal from md up, where the
              steps sit side by side; vertical below it, where they stack. */}
          <Reveal variant="rule">
            <hr className="rule absolute top-0 left-0 hidden w-full border-t md:block" />
          </Reveal>

          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-12">
            {processStages.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.index}
                delay={i * 90}
                className="relative border-t border-[var(--scene-line)] pt-6 md:col-span-3 md:border-t-0"
                // Each phase sits a little lower than the one before it, so
                // the four read as a run rather than a rank.
                style={{ "--step-offset": `${i * 1.25}rem` } as React.CSSProperties}
              >
                <span
                  aria-hidden
                  className="absolute -top-[3px] left-0 hidden size-1.5 rounded-full bg-[var(--scene-accent)] md:block"
                />
                <div className="md:pt-(--step-offset)">
                  <p className="eyebrow text-[var(--scene-accent)]">{stage.index}</p>
                  <h3 className="title mt-4 text-[1.25rem]">{stage.name}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {stage.summary}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed">{stage.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  );
}
