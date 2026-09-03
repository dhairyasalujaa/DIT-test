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
 * delays. Interior pages used to open as static text — the site had exactly
 * one page with an entrance and ten without, which is a large part of why
 * everything past the home page felt flat.
 */
const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  meta,
}: {
  eyebrow: string;
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
                    <span aria-hidden className="eyebrow">
                      /
                    </span>
                  )}
                  {i === crumbs.length - 1 ? (
                    <span className="eyebrow" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="eyebrow link-underline hover:text-[var(--scene-fg)]">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="enter eyebrow" style={enter(120)}>
          {eyebrow}
        </p>

        <h1 className="enter display mt-7 max-w-[15ch]" style={enter(220)}>
          {title}
        </h1>

        {lede && (
          <div className="enter lede mt-8" style={enter(400)}>
            {lede}
          </div>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="enter mt-16 grid gap-x-10 gap-y-6 border-t border-[var(--scene-line)] pt-6 sm:grid-cols-2 lg:grid-cols-4"
            style={enter(520)}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-2 text-sm text-[var(--scene-fg)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
