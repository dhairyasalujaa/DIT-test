import type { Metadata } from "next";
import { fieldNotes } from "@/content/insights";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { CardAffordance } from "@/components/ui/card-link";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical notes on managed IT, hardware pricing, ransomware and everyday security habits — written by the engineers who do the work.",
  path: "/insights",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

/**
 * Insights.
 *
 * Every piece decodingIT has published, linking to the real article. The
 * bodies live on decodingit.com; they were not written here and are not
 * reproduced here.
 *
 * This page used to say "Nothing published here yet" above two paragraphs
 * written in decodingIT's voice about articles being "moved across" — copy
 * with no source, contradicted by the home page three sections below it,
 * which links to three of these. The detail route under it built zero pages,
 * because there were no bodies for it to render.
 */
export default function InsightsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        title="Things we end up explaining in meetings."
        crumbs={crumbs}
        lede="Practical technical writing from the engineers who do the work."
      />

      <Scene tone="paper">
        <div className="shell">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fieldNotes.map((note, i) => (
              <Reveal as="li" key={note.href} delay={(i % 3) * 80}>
                <a
                  href={note.href}
                  className="panel group/card flex h-full flex-col"
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Topic and reading time only where decodingIT publishes
                      them. The two pieces listed in their menu carry a title
                      and nothing else, so these cards show a title and
                      nothing else. */}
                  {note.topic && (
                    <p className="label">
                      {note.topic}
                      {note.readingMinutes ? ` · ${note.readingMinutes} min` : ""}
                    </p>
                  )}
                  <h2
                    className={`panel-title flex-1 text-[1.125rem] leading-snug tracking-[-0.02em] ${
                      note.topic ? "mt-4" : ""
                    }`}
                  >
                    {note.title}
                  </h2>
                  <CardAffordance label="Read" external className="mt-6" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
