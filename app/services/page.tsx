import type { Metadata } from "next";
import { plans } from "@/content/plans";
import { plansSection } from "@/content/home";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { CardAffordance } from "@/components/ui/card-link";

export const metadata: Metadata = pageMetadata({
  title: "Service Plans",
  description:
    "Six ways to work with decodingIT — from fixed hours when you need them to a fully managed IT department, or an L2/L3 team alongside your own.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

/**
 * The service plans, at full width.
 *
 * Same six plans the home page previews, with room here for the audience line
 * to sit beside the description rather than under it. Copy is decodingIT's.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        title="Engagements built around your situation."
        crumbs={crumbs}
        lede={plansSection.lede}
      />

      <Scene tone="paper" aria-labelledby="plans-list">
        <div className="shell">
          <h2 id="plans-list" className="sr-only">
            Service plans
          </h2>

          <ul className="spec">
            {plans.map((plan, i) => (
              <Reveal
                as="li"
                key={`${plan.prefix}${plan.accent}`}
                delay={(i % 3) * 60}
                className="spec-row row-pad md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <p className="label">{plan.tag}</p>
                  <h3 className="mt-3 text-[1.75rem] leading-none font-medium tracking-[-0.035em]">
                    {plan.prefix}
                    <span className="text-[var(--scene-accent)]">{plan.accent}</span>
                    {plan.suffix ? <span className="font-normal"> {plan.suffix}</span> : null}
                  </h3>
                </div>

                <p className="text-[1.0625rem] leading-relaxed md:col-span-5">
                  {plan.description}
                </p>

                <div className="md:col-span-3">
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    <span className="text-[var(--scene-fg)]">For:</span> {plan.audience}
                  </p>
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/card mt-4 inline-flex"
                  >
                    <CardAffordance label="Explore" external />
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
