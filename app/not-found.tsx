import type { Metadata } from "next";
import Link from "next/link";
import { primaryNav } from "@/content/navigation";
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
 */
export default function NotFound() {
  return (
    <section
      data-header-tone="ink"
      className="scene-ink flex min-h-svh flex-col justify-center py-32"
    >
      <div className="shell">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-7 max-w-[14ch]">
          Something got lost in <span className="text-[var(--scene-accent)]">translation</span>.
        </h1>
        <p className="lede mt-8 max-w-[42ch]">
          This page does not exist, or it moved. Neither is your fault.
        </p>

        <div className="mt-12">
          <Action href="/">Return home</Action>
        </div>

        <nav aria-label="Site sections" className="mt-20">
          <p className="eyebrow">Or try</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
