import Link from "next/link";
import { topBar } from "@/content/site";
import { Phone } from "@/components/icons";

/**
 * The utility bar above the header.
 *
 * decodingIT runs one on their live site carrying the India number, a link to
 * talk to somebody, and the client portal. It scrolls away with the page
 * rather than sticking, so the fixed header below it is the only chrome that
 * follows the reader down.
 */
export function TopBar() {
  return (
    <div className="scene-ink relative z-50 border-b border-white/10 text-[0.8125rem]">
      <div className="shell flex h-9 items-center justify-end gap-x-5 gap-y-1">
        <a
          href={`tel:${topBar.phoneHref}`}
          className="group/p inline-flex items-center gap-2 text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
        >
          <Phone className="size-3.5" />
          <span className="tabular-nums">{topBar.phone}</span>
          <span className="text-[var(--scene-fg-muted)]/70">{topBar.market}</span>
        </a>

        <span aria-hidden className="h-3 w-px bg-white/15" />

        <Link
          href="/contact"
          className="text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
        >
          {topBar.talkLabel}
        </Link>

        <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />

        <a
          href={topBar.portalHref}
          target="_blank"
          rel="noreferrer"
          className="hidden text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)] sm:inline"
        >
          {topBar.portalLabel}
        </a>
      </div>
    </div>
  );
}
