import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

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
 */
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
    <section data-header-tone="ink" className="scene-ink pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="shell">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-10">
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

        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>

        <Reveal variant="clip" delay={80}>
          <h1 className="display mt-6 max-w-[16ch]">{title}</h1>
        </Reveal>

        {lede && (
          <Reveal delay={180}>
            <div className="lede mt-8 max-w-[52ch]">{lede}</div>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal delay={240}>
            <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-[var(--scene-line)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="eyebrow">{item.label}</dt>
                  <dd className="mt-2 text-sm text-[var(--scene-fg)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
