import Link from "next/link";
import type { ReactNode } from "react";
import { Facets } from "@/components/hero/facets";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * The opening frame of every interior page.
 *
 * Interior pages arrive in ink for the same reason the home page does: the
 * visitor enters the encoded state and moves into the clear one. Keeping the
 * shape identical across pages is what makes the site read as one document.
 *
 * It runs the same `.enter` load choreography as the home hero, on the same
 * delays. It used to open with a small mono kicker line above the title
 * (Approach, Contact, Work…) — removed sitewide on the client's instruction:
 * no small subtitles anywhere. The breadcrumb trail is the one small-type
 * element left here, because it is navigation rather than decoration.
 */
const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function PageHeader({
  title,
  lede,
  crumbs,
  meta,
}: {
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  /** Small key/value pairs shown along the base of the header. */
  meta?: { label: string; value: ReactNode }[];
}) {
  return (
    <section
      data-header-tone="ink"
      className="scene-ink relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24"
    >
      <Facets className="drift pointer-events-none absolute -top-24 -right-28 w-[24rem] opacity-[0.16] sm:-right-32 sm:w-[32rem] lg:w-[40rem]" />

      <div className="shell relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="enter mb-10" style={enter(40)}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="label">
                      /
                    </span>
                  )}
                  {i === crumbs.length - 1 ? (
                    <span className="label" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="label link-underline hover:text-[var(--scene-fg)]">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="enter display" style={enter(160)}>
          {title}
        </h1>

        {lede && (
          <div className="enter lede mt-8" style={enter(360)}>
            {lede}
          </div>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="enter mt-16 grid gap-x-10 gap-y-6 border-t border-[var(--scene-line)] pt-6 sm:grid-cols-2 lg:grid-cols-4"
            style={enter(480)}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label">{item.label}</dt>
                <dd className="mt-2 text-sm text-[var(--scene-fg)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
