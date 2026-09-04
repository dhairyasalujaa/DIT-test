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
        title="What working with us is actually like."
        crumbs={crumbs}
        lede="Most process diagrams are decoration. This one names what you physically receive at the end of every stage, because a stage that produces nothing you can hold is a stage you should not be paying for."
      />

      {/* The five stages, at full detail. */}
      <Scene tone="paper" aria-labelledby="stages-title">
        <div className="shell">
          <SceneIntro
            id="stages-title"
            title="Four phases."
            lede="How an engagement runs, whether we are running your IT day to day or delivering a single project."
          />

          {/*
            Three columns that sum to twelve. This grid used to run 3 + 7 with
            a third block starting at column 10 — inside the second block's
            span — so the "You get" column dropped to a row of its own the
            moment a stage carried one.
          */}
          <ol className="spec after-intro">
            {processStages.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.index}
                delay={(i % 3) * 60}
                className="spec-row row-pad md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <h2 className="title">{stage.name}</h2>
                  <p className="mt-3 text-[0.9375rem] text-[var(--scene-fg-muted)]">
                    {stage.summary}
                  </p>
                </div>

                <div className={stage.output ? "md:col-span-6" : "md:col-span-9"}>
                  <p className="text-[1.0625rem] leading-relaxed">{stage.detail}</p>
                </div>

                {stage.output && (
                  <div className="md:col-span-3">
                    <p className="text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                      {stage.output}
                    </p>
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </Scene>

      {/* Commitments, stated so they can be held against us. */}
      <Scene tone="ink" aria-labelledby="principles-title">
        <div className="shell">
          <SceneIntro
            id="principles-title"
            title="What makes the service different."
            lede="Four things decodingIT does differently, and the reasons clients give for staying."
          />

          <ul className="after-intro grid gap-4 md:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={(i % 2) * 80}>
                <div className="panel h-full">
                  <h3 className="title text-[1.25rem]">{principle.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
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
