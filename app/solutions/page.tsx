import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Technology & IT Services",
  description:
    "Six practices — managed IT, cyber security, cloud, networking, infrastructure and Microsoft 365 — delivered across Oman, the UAE and India.",
  path: "/solutions",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/solutions" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        title="Every layer of your IT, designed together."
        crumbs={crumbs}
        lede="Most problems live between layers — a network built for one thing, a backup that never met the workload. We design and run the whole stack, so the seams are ours to answer for."
      />

      <Scene tone="paper">
        <div className="shell">
          <ul className="border-t border-[var(--scene-line)]">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/solutions/${service.slug}`}
                  className="row row-pad group/row grid items-start gap-x-10 gap-y-6 md:grid-cols-12"
                >
                  <div className="md:col-span-3">
                    <h2 className="title transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] group-hover/row:text-[var(--scene-accent)]">
                      {service.name}
                    </h2>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                      {service.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--scene-fg)]">
                      Read more
                      <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/row:translate-x-1" />
                    </span>
                  </div>

                  {/* The questions this practice exists to answer — the fastest
                      way for a visitor to recognise their own situation. */}
                  <div className="md:col-span-4">
                    <ul className="space-y-2">
                      {service.answers.slice(0, 3).map((question) => (
                        <li
                          key={question}
                          className="text-[0.875rem] leading-relaxed text-[var(--scene-fg-muted)]"
                        >
                          &ldquo;{question}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
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
