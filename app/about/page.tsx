import type { Metadata } from "next";
import { leadership, manifesto, whoWeServe } from "@/content/about";
import { locations, markets, site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About decodingIT",
  exactTitle: true,
  description:
    "decodingIT is an IT services company working across Oman, the UAE and India. What we believe, who we work with, and how we think about technology.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={manifesto.eyebrow}
        title={manifesto.title}
        crumbs={crumbs}
        lede={manifesto.standfirst}
      />

      {/* The manifesto proper: argument, not company history. */}
      <Scene tone="paper" aria-labelledby="manifesto-title">
        <div className="shell grid items-baseline gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 id="manifesto-title" className="eyebrow">
              The argument
            </h2>
          </Reveal>
          <div className="md:col-span-9 lg:col-span-8">
            {manifesto.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="mb-8 text-[1.1875rem] leading-relaxed last:mb-0">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Scene>

      {/* How the company works lives on /approach; this page does not restate it. */}
      {/* Who this is for. */}
      <Scene tone="paper-raised" aria-labelledby="clients-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Clients"
            id="clients-title"
            title={whoWeServe.title}
            lede={whoWeServe.body}
          />

          <ul className="after-intro grid gap-4 sm:grid-cols-2">
            {whoWeServe.points.map((point, i) => (
              <Reveal as="li" key={point} delay={(i % 2) * 70}>
                <div className="panel flex h-full gap-4">
                  <span className="eyebrow shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed">{point}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      {/*
        Leadership renders only once real, consented profiles are added to
        content/about.ts. We would rather show nothing than publish a
        biography we cannot verify.
      */}
      {leadership.length > 0 && (
        <Scene tone="paper" aria-labelledby="leadership-title">
          <div className="shell">
            <SceneIntro eyebrow="Leadership" id="leadership-title" title="Who runs decodingIT." />
            <ul className="after-intro grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((person, i) => (
                <Reveal as="li" key={person.name} delay={(i % 3) * 70}>
                  <h3 className="text-[1.25rem] tracking-[-0.025em]">{person.name}</h3>
                  <p className="eyebrow mt-2">{person.role}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {person.bio}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Scene>
      )}

      {/* Where we are — verifiable, checkable facts. */}
      <Scene tone="paper" aria-labelledby="offices-title">
        <div className="shell">
          <SceneIntro
            eyebrow="Where we are"
            id="offices-title"
            title="Two offices, three markets."
            lede={`We deliver directly in ${markets.join(", ")}. Support is remote by default and on site when remote is not enough.`}
          />

          <ul className="after-intro grid gap-4 md:grid-cols-2">
            {locations.map((location, i) => (
              <Reveal as="li" key={location.id} delay={i * 90} className="panel">
                <p className="eyebrow">{location.role}</p>
                <h3 className="title mt-4">
                  {location.city}, {location.country}
                </h3>
                <address className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)] not-italic">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={`tel:${location.phoneHref}`}
                    className="link-underline mt-2 inline-block hover:text-[var(--scene-fg)]"
                  >
                    {location.phone}
                  </a>
                </address>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={80}>
            <p className="mt-10 text-[0.9375rem] text-[var(--scene-fg-muted)]">
              Enquiries:{" "}
              <a href={`mailto:${site.email}`} className="link-underline text-[var(--scene-fg)]">
                {site.email}
              </a>{" "}
              · {site.responsePromise}
            </p>
          </Reveal>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
