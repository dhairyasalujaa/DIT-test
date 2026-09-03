import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { engagementShapes } from "@/content/approach";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "decodingIT delivers for corporate, SME and government clients under confidentiality. What an engagement involves, and how to ask for references.",
  path: "/work",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

/**
 * Work.
 *
 * There are no published case studies, and inventing them would be the fastest
 * possible way to destroy the credibility the rest of this site is arguing for.
 * So this page does the honest version: it says plainly why the work is not
 * shown, describes what an engagement actually involves, and offers references
 * — which is what a serious buyer wants anyway.
 *
 * Adding real, client-approved entries to `content/projects.ts` switches this
 * page to a project gallery automatically.
 */
export default function WorkPage() {
  const hasProjects = projects.length > 0;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow="Work"
        title="Delivered work, and how we engage."
        crumbs={crumbs}
        lede="We work for corporate, SME and government organisations across a range of verticals. Their infrastructure and security arrangements are not ours to publish, so this page sets out how we engage instead — and we are happy to put you in touch with clients who will talk."
      />

      {hasProjects ? (
        <Scene tone="paper" aria-labelledby="projects-title">
          <div className="shell">
            <SceneIntro eyebrow="Selected work" id="projects-title" title="Published with client consent." />
            <ul className="mt-16 border-t border-[var(--scene-line)]">
              {projects.map((project, i) => (
                <Reveal
                  as="li"
                  key={project.slug}
                  delay={(i % 3) * 70}
                  className="border-b border-[var(--scene-line)]"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group/p grid gap-x-10 gap-y-4 py-12 md:grid-cols-12"
                  >
                    <div className="md:col-span-3">
                      <p className="eyebrow">{project.year}</p>
                      <h2 className="mt-4 text-[1.5rem] tracking-[-0.025em] transition-colors duration-500 group-hover/p:text-[var(--scene-accent)]">
                        {project.client}
                      </h2>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-[1.0625rem] leading-relaxed">{project.title}</p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                        {project.problem}
                      </p>
                    </div>
                    <p className="eyebrow md:col-span-3">{project.disciplines.join(" · ")}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Scene>
      ) : (
        <Scene tone="paper" aria-labelledby="confidential-title">
          <div className="shell grid gap-x-10 gap-y-8 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <h2 id="confidential-title" className="eyebrow">
                On client confidentiality
              </h2>
            </Reveal>
            <div className="md:col-span-8 lg:col-span-7">
              <Reveal>
                <p className="text-[1.1875rem] leading-relaxed">
                  Client environments are covered by confidentiality, so named
                  case studies appear here only where a client has agreed to be
                  named and to stand behind the outcome described.
                </p>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-8 text-[1.1875rem] leading-relaxed">
                  Until then, the most useful thing we can offer is a
                  conversation with an organisation already working with us.
                  Ask, and we will arrange it.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-10">
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Reference request")}`}
                    className="group/ref inline-flex items-center gap-2.5 text-sm font-medium"
                  >
                    Request client references
                    <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/ref:translate-x-1" />
                  </a>
                </p>
              </Reveal>
            </div>
          </div>
        </Scene>
      )}

      {/* What the work looks like, described honestly and in detail. */}
      <Scene tone="ink" aria-labelledby="shapes-title">
        <div className="shell">
          <SceneIntro
            eyebrow="The shape of an engagement"
            id="shapes-title"
            title="How we engage."
            lede="decodingIT offers six ways to work together, from fixing what is in front of you today to running the whole estate or extending a team you already have. These are the two named models."
          />

          <div className="mt-16 border-t border-[var(--scene-line)]">
            {engagementShapes.map((shape, i) => (
              <Reveal
                key={shape.index}
                delay={(i % 3) * 60}
                className="grid gap-x-10 gap-y-5 border-b border-[var(--scene-line)] py-12 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--scene-accent)]">
                    {shape.index}
                  </p>
                  <h3 className="mt-4 text-[1.5rem] leading-tight tracking-[-0.03em]">
                    {shape.title}
                  </h3>
                  <p className="eyebrow mt-4">{shape.disciplines.join(" · ")}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="eyebrow">Usually triggered by</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {shape.trigger}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="eyebrow">What it involves</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {shape.involves}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
