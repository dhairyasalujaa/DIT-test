import type { Metadata } from "next";
import { engagementShapes, principles, processStages } from "@/content/approach";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work — Assessment to Managed Service",
  description:
    "The five stages of a decodingIT engagement — assess, design, transition, operate, review — and what you receive at the end of each one.",
  path: "/approach",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Approach", path: "/approach" },
];

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow="Approach"
        title="What working with us is actually like."
        crumbs={crumbs}
        lede="Most process diagrams are decoration. This one names what you physically receive at the end of every stage, because a stage that produces nothing you can hold is a stage you should not be paying for."
      />

      {/* The five stages, at full detail. */}
      <Scene tone="paper" aria-labelledby="stages-title">
        <div className="shell">
          <SceneIntro eyebrow="The engagement" id="stages-title" title="Five stages." />

          <ol className="mt-16 border-t border-[var(--scene-line)]">
            {processStages.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.index}
                delay={(i % 3) * 60}
                className="grid gap-x-10 gap-y-6 border-b border-[var(--scene-line)] py-12 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--scene-accent)]">
                    {stage.index}
                  </p>
                  <h2 className="mt-4 text-[1.75rem] leading-tight tracking-[-0.03em]">
                    {stage.name}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] text-[var(--scene-fg-muted)]">
                    {stage.summary}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-[1.0625rem] leading-relaxed">{stage.detail}</p>
                </div>

                <div className="md:col-span-3 md:col-start-10">
                  <p className="eyebrow">You get</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {stage.output}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Scene>

      {/* Commitments, stated so they can be held against us. */}
      <Scene tone="ink" aria-labelledby="principles-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Commitments"
            id="principles-title"
            title="Four things we will not trade away."
            lede="Each of these costs us something. That is rather the point — a principle that is free to hold is not a principle."
          />

          <div className="mt-16 grid border-t border-[var(--scene-line)] md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal
                key={principle.title}
                delay={(i % 2) * 80}
                className="border-b border-[var(--scene-line)] py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12"
              >
                <h3 className="text-[1.25rem] leading-snug tracking-[-0.025em]">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      {/* What an engagement typically looks like in practice. */}
      <Scene tone="paper-raised" aria-labelledby="shapes-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Engagement types"
            id="shapes-title"
            title="Four shapes most work takes."
            lede="Not every project fits one of these, but most start as one of them."
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {engagementShapes.map((shape, i) => (
              <Reveal key={shape.index} delay={(i % 2) * 80}>
                <div className="flex items-baseline gap-4 border-t border-[var(--scene-line)] pt-6">
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--scene-accent)]">
                    {shape.index}
                  </span>
                  <h3 className="text-[1.25rem] tracking-[-0.025em]">{shape.title}</h3>
                </div>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="eyebrow">Usually triggered by</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                      {shape.trigger}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">What it involves</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                      {shape.involves}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
