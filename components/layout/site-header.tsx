"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, type NavEntry, type NavGroup } from "@/content/navigation";
import { locations, site } from "@/content/site";
import { Wordmark } from "@/components/layout/wordmark";
import { ArrowRight, ChevronDown } from "@/components/icons";
import { externalProps } from "@/lib/motion";

/**
 * The header.
 *
 * It has no ground of its own — the client asked for a transparent navigation
 * and this one never paints a background, at any scroll position. What keeps
 * it legible instead is the tone observer: every scene declares
 * `data-header-tone`, a one-pixel band at the header's own baseline reports
 * which scene is currently under it, and the chrome recolours to match. So the
 * links are dark over paper and light over ink without either being
 * special-cased, and without a bar ever appearing between the reader and the
 * page.
 *
 * The mega menus carry decodingIT's own groupings and destination captions.
 * Each is a disclosure next to a real link, not instead of one: the label
 * still navigates, and the panel is still reachable from the keyboard.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [tone, setTone] = useState<"ink" | "paper">("paper");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  // Which scene is under the header line?
  //
  // Read directly rather than observed. An IntersectionObserver band is fixed
  // to the viewport, and this header is sticky: it sits below the utility bar
  // at the top of the page and pins to zero once that bar scrolls away, so
  // the line to sample moves. Sampling the header's own bottom edge is exact
  // at every scroll position, and one hit-test per frame is cheaper than the
  // bug was.
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      const { top, bottom } = header.getBoundingClientRect();
      const x = Math.round(window.innerWidth / 2);
      // Sample the header's middle rather than its edge: when a section
      // boundary runs through the bar, the majority of what sits behind the
      // text is what the text has to be legible against.
      const y = Math.round((top + bottom) / 2);
      const scene = document
        .elementsFromPoint(x, y)
        .find((el): el is HTMLElement => el instanceof HTMLElement && Boolean(el.dataset.headerTone));
      // Validated rather than asserted: a typo in any data-header-tone would
      // otherwise sail through as a valid tone and mis-colour the chrome.
      setTone(scene?.dataset.headerTone === "ink" ? "ink" : "paper");
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  // Close both menus on navigation, including browser back/forward, which
  // never runs a link's onClick. Adjusting during render rather than in an
  // effect means neither is briefly painted open on the new route.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  // While the mobile panel is open: lock the page, trap focus, honour Escape.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("lenis:stop"));

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      // The close button lives in the bar, not the panel, so it has to be
      // added to the cycle by hand. Without it a keyboard user can open the
      // menu and never reach the control that shuts it — Escape works, but
      // nothing on screen says so.
      const focusable = [
        ...(toggleRef.current ? [toggleRef.current] : []),
        ...Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, [open]);

  // A mega menu closes on Escape — returning focus to its trigger — and on any
  // click outside it, which is what a pointer user expects from a menu.
  useEffect(() => {
    if (!menu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = document.getElementById(`mega-trigger-${menu}`);
      setMenu(null);
      trigger?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (megaRef.current?.contains(event.target as Node)) return;
      setMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const chromeTone = open ? "ink" : tone;

  const navLink =
    "group/nav relative px-3 py-2 text-sm text-[var(--scene-fg)]/80 transition-colors " +
    "duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:text-[var(--scene-fg)] " +
    "aria-[current=page]:text-[var(--scene-fg)]";

  /** The indicator under a nav item: a rule that draws rather than resizes. */
  const indicator = (active: boolean) => (
    <span
      aria-hidden
      className={
        "absolute inset-x-3 bottom-1 h-px origin-left bg-[var(--scene-accent)] " +
        "transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-draw)] " +
        (active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100")
      }
    />
  );

  const megaPanel = (entry: NavEntry & { groups: NavGroup[] }) => (
    <div
      id={`mega-${entry.label}`}
      data-open={menu === entry.label}
      inert={menu !== entry.label}
      className="flyout scene-paper absolute top-full left-1/2 z-50 w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[6px] border border-hairline p-3"
    >
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${entry.groups.length + (entry.promo ? 1 : 0)}, minmax(0, 1fr))`,
        }}
      >
        {entry.groups.map((group) => (
          <div key={group.title} className="rounded-[4px] p-3">
            <p className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]">{group.title}</p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-[var(--scene-fg-muted)]">
              {group.summary}
            </p>
            <ul className="mt-4 space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...externalProps(item.href)}
                    className="group/f block rounded-[3px] p-3 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:bg-[var(--scene-wash)]"
                  >
                    <span className="block text-[0.9375rem] font-medium text-[var(--scene-fg)] transition-colors duration-[var(--dur-hover)] group-hover/f:text-[var(--scene-accent)]">
                      {item.label}
                    </span>
                    {item.hint && (
                      <span className="mt-1 block text-[0.8125rem] leading-relaxed text-[var(--scene-fg-muted)]">
                        {item.hint}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* The panel's closing column. Their menu ends two of its three
            dropdowns with one of these, and it is the only place either the
            Cyber Health Check or careers is offered from the navigation. */}
        {entry.promo && (
          <a
            href={entry.promo.href}
            target="_blank"
            rel="noreferrer"
            className="group/promo flex flex-col rounded-[4px] bg-[var(--scene-wash)] p-5 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:bg-[color-mix(in_oklab,var(--scene-accent)_10%,var(--scene-wash))]"
          >
            <span className="label text-[var(--scene-accent)]">{entry.promo.kicker}</span>
            <span className="mt-2 block text-[1.0625rem] leading-snug font-semibold text-[var(--scene-fg)]">
              {entry.promo.title}
            </span>
            <span className="mt-2 block text-[0.8125rem] leading-relaxed text-[var(--scene-fg-muted)]">
              {entry.promo.body}
            </span>
            <ul className="mt-4 flex-1 space-y-1.5">
              {entry.promo.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[0.8125rem] leading-snug text-[var(--scene-fg-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-[0.45em] size-1 shrink-0 rounded-full bg-[var(--scene-accent)]"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--scene-accent)]">
              {entry.promo.cta}
              <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/promo:translate-x-1" />
              <span className="sr-only">(opens on decodingit.com)</span>
            </span>
          </a>
        )}
      </div>

      <div className="mt-2 border-t border-hairline px-6 pt-3 pb-1">
        <Link
          href={entry.href}
          className="group/all inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--scene-accent)]"
        >
          All {entry.label.toLowerCase()}
          <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/all:translate-x-1" />
        </Link>
      </div>
    </div>
  );

  return (
    <header
      ref={headerRef}
      className={
        (chromeTone === "ink" ? "scene-ink" : "scene-paper") +
        " chrome-legible z-50 bg-transparent! transition-colors duration-150 ease-[var(--ease-rise)] " +
        // Sticky rather than fixed, so it sits below the utility bar at the
        // top of the page and pins once that bar has scrolled away. While the
        // mobile panel is open it is pinned outright, so the panel can be
        // positioned from the header's height without measuring anything.
        (open ? "fixed inset-x-0 top-0" : "sticky top-0")
      }
    >
      {/* While the mobile panel is open the bar needs a ground of its own,
          because the panel starts below it. Rendered only when open rather
          than faded to zero: an invisible navy plate left in the tree still
          answers hit-tests, and anything measuring what is behind the nav —
          a contrast audit, or a browser's own tooling — reads it as the
          background the links sit on. */}
      {open && <div aria-hidden className="absolute inset-0 -z-10 bg-navy" />}

      <div className="shell flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="-m-2 p-2 text-[var(--scene-fg)]" aria-label={`${site.name} — home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex" ref={megaRef}>
          {primaryNav.map((entry) =>
            entry.groups ? (
              <div
                key={entry.label}
                className="relative flex items-center"
                onMouseEnter={() => setMenu(entry.label)}
                onMouseLeave={() => setMenu(null)}
              >
                <Link
                  href={entry.href}
                  aria-current={isActive(entry.href) ? "page" : undefined}
                  className={navLink}
                >
                  {entry.label}
                  {indicator(isActive(entry.href))}
                </Link>
                <button
                  id={`mega-trigger-${entry.label}`}
                  type="button"
                  aria-expanded={menu === entry.label}
                  aria-controls={`mega-${entry.label}`}
                  onClick={() => setMenu((v) => (v === entry.label ? null : entry.label))}
                  className="-ml-1 flex size-7 items-center justify-center rounded-[3px] text-[var(--scene-fg)]/70 transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
                >
                  <span className="sr-only">
                    {menu === entry.label ? `Hide ${entry.label}` : `Show ${entry.label}`}
                  </span>
                  <ChevronDown
                    className={
                      "size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] " +
                      (menu === entry.label ? "rotate-180" : "")
                    }
                  />
                </button>
                {megaPanel({ ...entry, groups: entry.groups })}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                aria-current={isActive(entry.href) ? "page" : undefined}
                className={navLink}
              >
                {entry.label}
                {indicator(isActive(entry.href))}
              </Link>
            ),
          )}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex size-11 items-center justify-center text-[var(--scene-fg)] xl:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={
                "absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] " +
                (open ? "top-1.5 rotate-45" : "top-0")
              }
            />
            <span
              className={
                "absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] " +
                (open ? "top-1.5 -rotate-45" : "top-3")
              }
            />
          </span>
        </button>
      </div>

      {/* Full-screen mobile navigation, carrying the whole tree — a phone has
          no room for a mega menu, so the groups become sections instead. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open}
        data-lenis-prevent
        inert={!open}
        className={
          "scene-ink fixed inset-x-0 top-(--header-h) bottom-0 z-40 overflow-y-auto xl:hidden " +
          "transition-[opacity,visibility] duration-400 ease-[var(--ease-rise)] " +
          (open ? "visible opacity-100" : "invisible opacity-0")
        }
      >
        <nav aria-label="Primary (mobile)" className="shell flex min-h-full flex-col pt-4 pb-12">
          {primaryNav.map((entry, i) => (
            <div
              key={entry.label}
              className="menu-item border-b border-[var(--scene-line)] py-5"
              style={{ "--stagger": `${50 + i * 40}ms` } as React.CSSProperties}
            >
              <Link
                href={entry.href}
                onClick={close}
                data-nav-top
                aria-current={isActive(entry.href) ? "page" : undefined}
                className="text-[1.5rem] leading-none tracking-[-0.03em] text-[var(--scene-fg)]"
              >
                {entry.label}
              </Link>
              {entry.groups && (
                <div className="mt-4 space-y-4">
                  {entry.groups.map((group) => (
                    <div key={group.title}>
                      <p className="label">{group.title}</p>
                      <ul className="mt-2 space-y-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={close}
                              {...externalProps(item.href)}
                              className="text-[0.9375rem] text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {entry.promo && (
                    <a
                      href={entry.promo.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={close}
                      className="block rounded-[4px] border border-[var(--scene-line)] p-4"
                    >
                      <span className="label text-[var(--scene-accent)]">{entry.promo.kicker}</span>
                      <span className="mt-1 block text-[0.9375rem] font-medium text-[var(--scene-fg)]">
                        {entry.promo.title}
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

          <div
            className="menu-item mt-8"
            style={{ "--stagger": `${50 + primaryNav.length * 40}ms` } as React.CSSProperties}
          >
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-sm text-[var(--scene-fg-muted)]"
            >
              {site.email}
            </a>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {locations.map((location) => (
                <li key={location.id}>
                  <a
                    href={`tel:${location.phoneHref}`}
                    className="link-underline text-sm text-[var(--scene-fg-muted)]"
                  >
                    <span className="text-[var(--scene-fg)]">{location.city}</span> {location.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
