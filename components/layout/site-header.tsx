"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, mobileNav } from "@/content/navigation";
import { services } from "@/content/services";
import { locations, site } from "@/content/site";
import { Wordmark } from "@/components/layout/wordmark";
import { ArrowRight, ChevronDown } from "@/components/icons";

/**
 * The header is meant to be part of the environment rather than a fixture on
 * top of it: transparent while the visitor is still in the opening scene, and
 * only acquiring a ground once they have started reading.
 *
 * It also recolours itself. Scenes declare `data-header-tone`, and a narrow
 * observation band at the header's own height reports which scene currently
 * sits beneath it — so the chrome stays legible across the page's light and
 * dark passages without any page needing to configure it. The band is
 * measured from the rendered header rather than from a hard-coded 68px, which
 * used to be repeated in three places and could silently drift.
 *
 * Four links used to be the whole of it, with the six solution pages
 * reachable only by loading /services first. The flyout puts the depth of the
 * site one gesture away instead of one page load.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [tone, setTone] = useState<"ink" | "paper">("paper");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const flyoutTriggerRef = useRef<HTMLButtonElement>(null);

  // Which scene is under the header line?
  //
  // The observer is the only thing that writes `tone`. IntersectionObserver
  // delivers an initial callback for every target it starts observing, so the
  // opening value arrives from the same code path as every later one — no
  // synchronous seeding from inside the effect.
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-header-tone]"));
    if (scenes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const height = Math.round(headerRef.current?.getBoundingClientRect().height ?? 68);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTone(((entry.target as HTMLElement).dataset.headerTone as "ink" | "paper") ?? "paper");
          }
        }
      },
      // A ~1px band sitting exactly on the header's baseline.
      { rootMargin: `-${height}px 0px -100% 0px`, threshold: 0 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close both menus on navigation — including browser back/forward, which
  // never runs the links' onClick. Adjusting during render rather than in an
  // effect means neither is briefly painted open on the new route.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
    setFlyout(false);
  }

  // While the mobile menu is open: lock the page, trap focus, honour Escape.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
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
    };
  }, [open]);

  // The flyout closes on Escape — returning focus to its trigger — and on any
  // click outside it, which is what a pointer user expects from a menu.
  useEffect(() => {
    if (!flyout) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setFlyout(false);
      flyoutTriggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (flyoutRef.current?.contains(target) || flyoutTriggerRef.current?.contains(target)) return;
      setFlyout(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [flyout]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // The open menu is always ink, so the chrome inside it stays consistent.
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

  return (
    <header
      ref={headerRef}
      className={
        (chromeTone === "ink" ? "scene-ink" : "scene-paper") +
        " fixed inset-x-0 top-0 z-50 bg-transparent! transition-colors duration-700 ease-[var(--ease-rise)]"
      }
    >
      {/* The ground fades in once the visitor has left the opening frame — and
          always while the mobile menu is open, since the chrome inverts to ink
          then and white-on-white is not a look. */}
      <div
        aria-hidden
        className={
          "absolute inset-0 -z-10 border-b transition-opacity duration-500 ease-[var(--ease-rise)] " +
          (chromeTone === "ink"
            ? "border-white/12 bg-navy/90 backdrop-blur-xl"
            : "border-hairline bg-surface/90 backdrop-blur-xl") +
          (scrolled || open ? " opacity-100" : " opacity-0")
        }
      />

      <div className="shell flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="-m-2 p-2 text-[var(--scene-fg)]" aria-label="decodingIT — home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {/* Solutions keeps its link and gets a separate disclosure, so the
              label still navigates and the menu is still reachable by
              keyboard — one control cannot honestly do both jobs. */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setFlyout(true)}
            onMouseLeave={() => setFlyout(false)}
          >
            <Link
              href="/solutions"
              aria-current={isActive("/solutions") ? "page" : undefined}
              className={navLink}
            >
              Solutions
              {indicator(isActive("/solutions"))}
            </Link>
            <button
              ref={flyoutTriggerRef}
              type="button"
              aria-expanded={flyout}
              aria-controls="solutions-menu"
              onClick={() => setFlyout((v) => !v)}
              className="-ml-1 flex size-7 items-center justify-center rounded-[3px] text-[var(--scene-fg)]/70 transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
            >
              <span className="sr-only">{flyout ? "Hide solutions" : "Show all solutions"}</span>
              <ChevronDown
                className={
                  "size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] " +
                  (flyout ? "rotate-180" : "")
                }
              />
            </button>

            <div
              id="solutions-menu"
              ref={flyoutRef}
              data-open={flyout}
              inert={!flyout}
              className="flyout scene-paper absolute top-full left-1/2 z-50 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[4px] border border-hairline p-3"
            >
              <ul className="grid grid-cols-2 gap-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/solutions/${service.slug}`}
                      className="group/f block rounded-[3px] p-4 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:bg-[var(--scene-wash)]"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="eyebrow">{service.index}</span>
                        <span className="text-[0.9375rem] font-medium text-[var(--scene-fg)] transition-colors duration-[var(--dur-hover)] group-hover/f:text-[var(--scene-accent)]">
                          {service.name}
                        </span>
                      </span>
                      <span className="mt-2 block text-[0.8125rem] leading-relaxed text-[var(--scene-fg-muted)]">
                        {service.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-hairline px-4 pt-3 pb-1">
                <Link
                  href="/solutions"
                  className="group/all inline-flex items-center gap-2 text-[0.8125rem] text-[var(--scene-accent)]"
                >
                  All solutions, compared
                  <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/all:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {primaryNav
            .filter((item) => item.href !== "/solutions")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLink}
              >
                {item.label}
                {indicator(isActive(item.href))}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Quiet over the opening frame, filled once the header has a
              ground. A solid block of brand blue floating over the hero was
              the heaviest object in the first thing anybody saw. */}
          <Link
            href="/contact"
            className={
              "group/cta hidden h-9 items-center gap-2 rounded-[4px] px-4 text-sm font-semibold " +
              "transition-colors duration-500 ease-[var(--ease-rise)] md:inline-flex " +
              (scrolled
                ? "bg-[var(--scene-cta-bg)] text-[var(--scene-cta-fg)] hover:bg-[var(--scene-cta-bg-hover)]"
                : "border border-[var(--scene-accent)] text-[var(--scene-accent)] hover:bg-[var(--scene-accent)] hover:text-white")
            }
          >
            Start a conversation
            <ArrowRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0.5" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex size-11 items-center justify-center text-[var(--scene-fg)] md:hidden"
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
      </div>

      {/* Full-screen mobile navigation. It used to snap into place via the
          `hidden` attribute while every link carried a transition delay that
          animated nothing; now the panel fades and the links arrive on that
          delay. `inert` keeps the closed panel out of the tab order. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open}
        inert={!open}
        className={
          "scene-ink fixed inset-x-0 bottom-0 top-(--header-h) z-40 overflow-y-auto md:hidden " +
          "transition-[opacity,visibility] duration-400 ease-[var(--ease-rise)] " +
          (open ? "visible opacity-100" : "invisible opacity-0")
        }
      >
        <nav aria-label="Primary (mobile)" className="shell flex min-h-full flex-col pt-6 pb-10">
          <ul>
            {mobileNav.map((item, i) => (
              <li key={item.href} className="border-b border-[var(--scene-line)]">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="menu-item flex items-baseline justify-between gap-4 py-5"
                  style={{ "--stagger": `${60 + i * 45}ms` } as React.CSSProperties}
                >
                  <span className="text-[1.75rem] leading-none tracking-[-0.03em] text-[var(--scene-fg)]">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="eyebrow max-w-[45%] text-right leading-[1.5] normal-case tracking-normal">
                      {item.hint}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* The space below the links is not empty on a phone — it carries the
              two things someone opening a menu on a mobile most often wants. */}
          <div
            className="menu-item mt-10 pt-2"
            style={{ "--stagger": `${60 + mobileNav.length * 45}ms` } as React.CSSProperties}
          >
            <p className="eyebrow">Reach us</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-3 inline-block text-sm text-[var(--scene-fg-muted)]"
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

          <Link
            href="/contact"
            onClick={close}
            className="menu-item mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-[var(--scene-cta-bg)] px-6 text-sm font-semibold text-[var(--scene-cta-fg)]"
            style={{ "--stagger": `${105 + mobileNav.length * 45}ms` } as React.CSSProperties}
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
