import { processStages } from "@/content/approach";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";

/**
 * Scene 05 — Confidence.
 *
 * The five stages of an engagement, each naming what the client actually
 * receives at the end of it. A process diagram that does not say what it
 * produces is decoration; the `output` line is what makes this checkable.
 */
export function ProcessPreview() {
  return (
    <Scene tone="paper" aria-labelledby="process-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Approach"
          id="process-title"
          title="How the work actually runs."
          lede="Five stages, and the thing you hold in your hand at the end of each one."
        />

        <ol className="mt-16 grid gap-px border-t border-[var(--scene-line)] md:grid-cols-5 md:border-t-0">
          {processStages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.index}
              delay={i * 80}
              className="border-b border-[var(--scene-line)] py-8 md:border-t md:border-b-0 md:pr-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--scene-accent)]">
                  {stage.index}
                </span>
                <h3 className="text-[1.125rem] tracking-[-0.02em]">{stage.name}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                {stage.summary}
              </p>
              <p className="mt-5 border-t border-[var(--scene-line)] pt-4 text-[0.8125rem] leading-relaxed">
                <span className="eyebrow block">You get</span>
                <span className="mt-2 block text-[var(--scene-fg-muted)]">{stage.output}</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Scene>
  );
}
