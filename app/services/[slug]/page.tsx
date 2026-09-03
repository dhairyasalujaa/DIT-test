import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { marketsShort } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "@/components/icons";

/** Six known services, all statically generated at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    exactTitle: true,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(serviceSchema(service), breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={`Service ${service.index} / 06`}
        title={service.title}
        crumbs={crumbs}
        lede={service.lede}
        meta={[
          { label: "Practice", value: `${service.index} of 06` },
          { label: "Delivered in", value: marketsShort.join(" · ") },
          { label: "Engaged as", value: "Project, or ongoing managed service" },
          {
            label: "Usually with",
            value: related[0]?.name ?? "—",
          },
        ]}
      />

      {/* What the practice actually contains. */}
      <Scene tone="paper" aria-labelledby="capabilities-title">
        <div className="shell">
          <SceneIntro
            eyebrow="What it includes"
            id="capabilities-title"
            title="The parts of the service."
          />

          <ul className="after-intro grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {service.capabilities.map((capability, i) => (
              <Reveal as="li" key={capability.title} delay={(i % 3) * 70}>
                <div className="panel h-full">
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[1.1875rem] leading-snug tracking-[-0.02em]">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {capability.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      {/* The questions a buyer actually arrives with, in their own words. */}
      <Scene tone="ink" aria-labelledby="answers-title">
        <div className="shell grid items-baseline gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">Why people call us</p>
            </Reveal>
            <Reveal variant="clip" delay={80}>
              <h2 id="answers-title" className="display-sm mt-6">
                The questions behind the enquiry.
              </h2>
            </Reveal>
          </div>

          <ul className="md:col-span-6 md:col-start-7">
            {service.answers.map((question, i) => (
              <Reveal
                as="li"
                key={question}
                delay={i * 70}
                className="border-b border-[var(--scene-line)] py-6 first:border-t"
              >
                <p className="text-[1.0625rem] leading-relaxed">&ldquo;{question}&rdquo;</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      {/* The technical surface — named, but without claiming certifications. */}
      <Scene tone="paper-raised" aria-labelledby="stack-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Technology"
            id="stack-title"
            title="What we work with."
            lede={service.stackNote}
          />

          {/* The stack, as plates rather than as grey chips. A named vendor
              gets a slot the client can drop a logo file into; everything
              else is a discipline, and reads as one. */}
          <ul className="after-intro grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {service.stack.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 5) * 55} shift="0.75rem">
                <div className="plate h-full">
                  <span className="plate-name text-center">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      {/* Internal linking with real editorial intent. */}
      <Scene tone="paper" aria-labelledby="related-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Related"
            id="related-title"
            title="Usually bought alongside."
          />

          <ul className="after-intro grid gap-4 md:grid-cols-3">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 80}>
                <Link href={`/services/${item.slug}`} className="panel group/rel flex h-full flex-col">
                  <p className="eyebrow">{item.index}</p>
                  <h3 className="panel-title mt-5 text-[1.125rem] tracking-[-0.02em]">
                    {item.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {item.summary}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--scene-accent)]">
                    Read on
                    <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/rel:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
