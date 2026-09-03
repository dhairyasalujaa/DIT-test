import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, projectSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "@/components/icons";

/**
 * A project detail page.
 *
 * `content/projects.ts` is empty today, so this route generates nothing — but
 * `/work` links here and `sitemap.ts` publishes these URLs the moment a real
 * project is added, which is precisely when a missing route would start
 * handing out 404s. The route exists so that adding a project is the only step.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.client}`,
    description: project.problem.slice(0, 155),
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.client, path: `/work/${project.slug}` },
  ];

  // The three movements of the story, in the order a reader needs them.
  const chapters = [
    { label: "The problem", body: project.problem },
    { label: "The approach", body: project.approach },
    { label: "The result", body: project.result },
  ];

  return (
    <>
      <JsonLd data={graph(projectSchema(project), breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={`${project.client} · ${project.year}`}
        title={project.title}
        crumbs={crumbs}
        lede={project.problem}
        meta={[
          { label: "Client", value: project.client },
          { label: "Year", value: project.year },
          { label: "Disciplines", value: project.disciplines.join(" · ") },
          { label: "Technology", value: project.stack.slice(0, 2).join(" · ") },
        ]}
      />

      <Scene tone="paper" aria-labelledby="story-title">
        <div className="shell">
          <SceneIntro eyebrow="The engagement" id="story-title" title="What happened." />

          <div className="mt-16 border-t border-[var(--scene-line)]">
            {chapters.map((chapter, i) => (
              <Reveal
                key={chapter.label}
                delay={(i % 3) * 70}
                className="grid gap-x-10 gap-y-4 border-b border-[var(--scene-line)] py-12 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-heading text-[0.75rem] font-bold tracking-[0.14em] text-[var(--scene-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-[1.5rem] leading-tight tracking-[-0.03em]">
                    {chapter.label}
                  </h2>
                </div>
                <p className="md:col-span-8 text-[1.0625rem] leading-relaxed">{chapter.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      <Scene tone="paper-raised" aria-labelledby="proj-stack-title">
        <div className="shell">
          <SceneIntro eyebrow="Technology" id="proj-stack-title" title="What it was built with." />
          <ul className="mt-14 flex flex-wrap gap-3">
            {project.stack.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 45} shift="0.75rem">
                <span className="inline-block rounded-[4px] border border-[var(--scene-line)] px-4 py-2 font-heading text-[0.8125rem] font-semibold tracking-[0.04em] text-[var(--scene-fg-muted)]">
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      {/* Moving between projects should feel like walking through a gallery,
          so the next one is announced rather than left to the back button. */}
      {next && next.slug !== project.slug && (
        <Scene tone="ink" aria-labelledby="next-title">
          <div className="shell">
            <Reveal>
              <p id="next-title" className="eyebrow">
                Next project
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Link href={`/work/${next.slug}`} className="group/next mt-6 block">
                <h2 className="display-sm max-w-[16ch] transition-colors duration-500 group-hover/next:text-[var(--scene-accent)]">
                  {next.title}
                </h2>
                <span className="mt-6 inline-flex items-center gap-2.5 text-sm">
                  {next.client} · {next.year}
                  <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/next:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </Scene>
      )}

      <ClosingCta />
    </>
  );
}
