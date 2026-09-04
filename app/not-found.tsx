import type { Metadata } from "next";
import Link from "next/link";
import { mobileNav } from "@/content/navigation";
import { Facets } from "@/components/hero/facets";
import { Action } from "@/components/ui/action";

export const metadata: Metadata = {
  title: "Page not found | decodingIT",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Brand-consistent and brief: a joke that belongs to this company specifically,
 * then the fastest routes back. No illustration, no apology paragraph.
 *
 * It opens on the same `.enter` choreography as every other page. A 404 with
 * no motion at all, on a site whose every other page has an entrance, reads
 * as a page somebody forgot about.
 */
const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function NotFound() {
  return (
    <section
      data-header-tone="ink"
      className="scene-ink relative flex min-h-[80svh] flex-col justify-center overflow-hidden py-24"
    >
      <Facets className="pointer-events-none absolute -right-28 -bottom-32 w-[24rem] opacity-[0.14] sm:w-[32rem]" />

      <div className="shell relative">
        <p className="enter eyebrow" style={enter(80)}>
          Error 404
        </p>
        <h1 className="enter-resolve display mt-7 max-w-[14ch]" style={enter(180)}>
          Something got lost in <span className="text-[var(--scene-accent)]">translation</span>.
        </h1>
        <p className="enter lede mt-8" style={enter(460)}>
          This page does not exist, or it moved. Neither is your fault.
        </p>

        <div className="enter mt-12" style={enter(560)}>
          <Action href="/">Return home</Action>
        </div>

        <nav aria-label="Site sections" className="enter mt-20" style={enter(660)}>
          <p className="eyebrow">Or try</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {mobileNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
