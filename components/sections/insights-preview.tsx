import Link from "next/link";
import { sortedArticles } from "@/content/insights";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { formatDate } from "@/lib/format";

/**
 * Scene 07 — Authority.
 *
 * Three pieces of writing that would be useful to someone even if they never
 * contacted us. That is the only defensible reason for a company to publish.
 */
export function InsightsPreview() {
  const latest = sortedArticles.slice(0, 3);

  return (
    <Scene tone="paper" aria-labelledby="insights-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Insights"
          id="insights-title"
          title="Things we end up explaining in meetings."
          lede="Written for the person who has to make the decision, not for the engineer who already knows."
          aside={
            <Action href="/insights" variant="secondary">
              All insights
            </Action>
          }
        />

        <ul className="mt-16 grid gap-px border-t border-[var(--scene-line)] md:grid-cols-3">
          {latest.map((article, i) => (
            <Reveal
              as="li"
              key={article.slug}
              delay={i * 80}
              className="border-b border-[var(--scene-line)] md:border-b-0 md:px-6 md:not-last:border-r md:first:pl-0 md:last:pr-0"
            >
              <Link
                href={`/insights/${article.slug}`}
                className="group/card flex h-full flex-col py-8"
              >
                <div className="flex items-center gap-3">
                  <span className="eyebrow">{article.topic}</span>
                  <span aria-hidden className="h-px flex-1 bg-[var(--scene-line)]" />
                  <span className="eyebrow">{article.readingMinutes} min</span>
                </div>

                <h3 className="mt-6 text-[1.25rem] leading-snug tracking-[-0.025em] transition-colors duration-500 group-hover/card:text-[var(--scene-accent)]">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {article.standfirst}
                </p>

                <time
                  dateTime={article.published}
                  className="mt-6 font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--scene-fg-muted)] uppercase"
                >
                  {formatDate(article.published)}
                </time>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
