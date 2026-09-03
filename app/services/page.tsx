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
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow="Services"
        title="Six areas, answered by one team."
        crumbs={crumbs}
        lede="Foundation, network, cloud, continuity, workplace and security. Each can be taken on its own, or all six under a single agreement with response times written into it and a named account manager who owns whether they are met."
      />

      <Scene tone="paper">
        <div className="shell">
          <ul className="border-t border-[var(--scene-line)]">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group/row relative grid gap-x-10 gap-y-6 border-b border-[var(--scene-line)] py-12 md:grid-cols-12"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[var(--scene-accent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
                  />

                  <div className="md:col-span-3">
                    <p className="eyebrow">{service.index}</p>
                    <h2 className="mt-4 text-[1.5rem] leading-tight tracking-[-0.025em] transition-colors duration-500 group-hover/row:text-[var(--scene-accent)]">
                      {service.name}
                    </h2>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                      {service.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm">
                      Read more
                      <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1" />
                    </span>
                  </div>

                  {/* The questions this practice exists to answer — the fastest
                      way for a visitor to recognise their own situation. */}
                  <div className="md:col-span-4">
                    <p className="eyebrow">Answers</p>
                    <ul className="mt-4 space-y-2">
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
