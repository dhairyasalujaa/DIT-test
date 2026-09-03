import type { Metadata } from "next";
import { principles, processStages } from "@/content/approach";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { Action } from "@/components/ui/action";
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

      {/*
        The four engagement shapes used to be repeated here in full. They are
        /work's entire subject — that page exists to describe them, since there
        are no case studies to show — so printing them twice made two pages of
        substantially the same copy. This points there instead.
      */}
      <Scene tone="paper-raised" aria-labelledby="shapes-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Engagement types"
            id="shapes-title"
            title="Four shapes most work takes."
            lede="Not every project fits one of these, but most start as one of them — a managed service transition, an infrastructure build, a security programme, or a move to cloud and Microsoft 365."
            aside={
              <Action href="/work" variant="secondary">
                What each one involves
              </Action>
            }
          />
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
