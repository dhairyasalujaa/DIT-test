import type { Metadata } from "next";
import Link from "next/link";
import { sortedArticles } from "@/content/insights";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Technology Insights",
  description:
    "Practical notes on managed IT, backup and recovery, email authentication and security baselines — written for the person making the decision.",
  path: "/insights",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow="Insights"
        title="Things we end up explaining in meetings."
        crumbs={crumbs}
        lede="Practical technical writing from the engineers who do the work."
      />

      <Scene tone="paper">
        <div className="shell">
          {sortedArticles.length > 0 ? (
            <ul className="border-t border-[var(--scene-line)]">
              {sortedArticles.map((article, i) => (
                <Reveal as="li" key={article.slug} delay={(i % 3) * 70}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group/a relative grid gap-x-10 gap-y-4 border-b border-[var(--scene-line)] py-12 md:grid-cols-12"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[var(--scene-accent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/a:scale-x-100 group-focus-visible/a:scale-x-100"
                    />

                    <div className="md:col-span-3">
                      <p className="eyebrow">{article.topic}</p>
                      <time
                        dateTime={article.published}
                        className="mt-3 block font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--scene-fg-muted)] uppercase"
                      >
                        {formatDate(article.published)} · {article.readingMinutes} min
                      </time>
                    </div>

                    <div className="md:col-span-8 lg:col-span-7">
                      <h2 className="text-[1.5rem] leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover/a:text-[var(--scene-accent)] md:text-[1.75rem]">
                        {article.title}
                      </h2>
                      <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-[var(--scene-fg-muted)]">
                        {article.standfirst}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm">
                        Read
                        <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/a:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            /*
              Honest empty state. This section previously held four articles
              written by Claude and published under decodingIT's name; they have
              been removed. It fills again the moment real entries are added to
              content/insights.ts.
            */
            <div className="grid gap-x-10 gap-y-8 border-t border-[var(--scene-line)] pt-12 md:grid-cols-12">
              <Reveal className="md:col-span-3">
                <p className="eyebrow">Nothing published here yet</p>
              </Reveal>
              <div className="md:col-span-8 lg:col-span-7">
                <Reveal>
                  <p className="text-[1.1875rem] leading-relaxed">
                    Our engineers write about the things clients actually ask —
                    choosing between virtual desktop platforms, what a managed
                    service agreement should cover, how to test a restore rather
                    than assume one.
                  </p>
                </Reveal>
                <Reveal delay={90}>
                  <p className="mt-8 text-[1.1875rem] leading-relaxed">
                    Those pieces are being moved across to this site. In the
                    meantime, if there is something you would like a straight
                    answer on, ask us directly — you will get an engineer rather
                    than a brochure.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-10">
                    <a
                      href={`mailto:${site.email}`}
                      className="group/ref inline-flex items-center gap-2.5 text-sm font-medium"
                    >
                      Ask us a technical question
                      <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/ref:translate-x-1" />
                    </a>
                  </p>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
