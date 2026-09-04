import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, sortedArticles } from "@/content/insights";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ArticleBody } from "@/components/article-body";
import { ArticleToc } from "@/components/article-toc";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { ArrowRight } from "@/components/icons";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitle,
    exactTitle: true,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const more = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(articleSchema(article), breadcrumbSchema(crumbs))} />

      <PageHeader
        title={article.title}
        crumbs={crumbs}
        lede={article.standfirst}
        meta={[
          {
            label: "Published",
            value: <time dateTime={article.published}>{formatDate(article.published)}</time>,
          },
          { label: "Reading time", value: `${article.readingMinutes} minutes` },
          { label: "Topic", value: article.topic },
          { label: "Written by", value: site.name },
        ]}
      />

      <Scene tone="paper">
        <div className="shell grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* Contents first in the DOM would put a nav ahead of the article for
              screen readers, so it is ordered after and moved by the grid. */}
          <article className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <ArticleBody blocks={article.body} />

          {/* Authorship, stated plainly rather than hidden behind a stock
              portrait of somebody who did not write it. */}
          <Reveal>
            <div className="mt-20 max-w-[64ch] border-t border-[var(--scene-line)] pt-8">
              <h2 className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]">About this article</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                Published by {site.legalName}, drawn from what our engineers
                find in real environments. If something here does not match your
                situation, we would rather you told us —{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-[var(--scene-fg)]"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </Reveal>

          {related.length > 0 && (
            <Reveal>
              <div className="mt-14 max-w-[64ch]">
                <h2 className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]">Related services</h2>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {related.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/solutions/${service.slug}`}
                        className="group/rs inline-flex items-center gap-2 rounded-[4px] border border-[var(--scene-line)] px-4 py-2 text-sm transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:border-[var(--scene-fg)]"
                      >
                        {service.name}
                        <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/rs:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          </article>

          <aside className="lg:col-span-3 lg:col-start-10 lg:row-start-1">
            <ArticleToc blocks={article.body} />
          </aside>
        </div>
      </Scene>

      <Scene tone="paper-raised" aria-labelledby="more-title">
        <div className="shell">
          <Reveal variant="rule">
            <hr className="rule border-t" />
          </Reveal>
          <Reveal delay={60}>
            <h2 id="more-title" className="title mt-5">
              Keep reading
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-px md:grid-cols-2">
            {more.map((item, i) => (
              <Reveal
                as="li"
                key={item.slug}
                delay={i * 80}
                className="border-t border-[var(--scene-line)] md:px-6 md:not-last:border-r md:first:pl-0 md:last:pr-0"
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="group/m flex h-full flex-col py-8"
                >
                  <p className="label">{item.topic}</p>
                  <h3 className="mt-3 text-[1.25rem] leading-snug tracking-[-0.025em] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] group-hover/m:text-[var(--scene-accent)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {item.standfirst}
                  </p>
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
