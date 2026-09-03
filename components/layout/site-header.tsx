"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav } from "@/content/navigation";
import { locations, site } from "@/content/site";
import { Wordmark } from "@/components/layout/wordmark";
import { ArrowRight } from "@/components/icons";

/**
 * The header is meant to be part of the environment rather than a fixture on
 * top of it: transparent while the visitor is still in the opening scene, and
 * only acquiring a ground once they have started reading.
 *
 * It also recolours itself. Scenes declare `data-header-tone`, and a narrow
 * observation band at the header's own height reports which scene currently
 * sits beneath it — so the chrome stays legible across the page's light and
 * dark passages without any page needing to configure it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [tone, setTone] = useState<"ink" | "paper">("paper");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Which scene is under the header line?
  //
  // The observer is the only thing that writes `tone`. IntersectionObserver
  // delivers an initial callback for every target it starts observing, so the
  // opening value arrives from the same code path as every later one — no
  // synchronous seeding from inside the effect.
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-header-tone]"));
    if (scenes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTone(((entry.target as HTMLElement).dataset.headerTone as "ink" | "paper") ?? "paper");
          }
        }
      },
      // A ~1px band sitting exactly on the header's baseline.
      { rootMargin: "-68px 0px -100% 0px", threshold: 0 },
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

  // Close the menu on navigation — including browser back/forward, which never
  // runs the links' onClick. Adjusting during render rather than in an effect
  // means the menu is never briefly painted open on the new route.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  // While the menu is open: lock the page, trap focus, and honour Escape.
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // The open menu is always ink, so the chrome inside it stays consistent.
  const chromeTone = open ? "ink" : tone;

  return (
    <header
      className={
        (chromeTone === "ink" ? "scene-ink" : "scene-paper") +
        " fixed inset-x-0 top-0 z-50 bg-transparent! transition-colors duration-700 ease-[var(--ease-out-expo)]"
      }
    >
      {/* The ground fades in only once the visitor has left the opening frame. */}
      <div
        aria-hidden
        className={
          "absolute inset-0 -z-10 border-b transition-opacity duration-500 ease-[var(--ease-out-expo)] " +
          (chromeTone === "ink"
            ? "border-white/10 bg-ink/80 backdrop-blur-xl"
            : "border-black/10 bg-paper/80 backdrop-blur-xl") +
          (scrolled && !open ? " opacity-100" : " opacity-0")
        }
      />

      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Link
          href="/"
          className="-m-2 p-2 text-[var(--scene-fg)]"
          aria-label={`decodingIT — home`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="group/nav relative px-3 py-2 text-sm text-[var(--scene-fg)]/75 transition-colors duration-300 hover:text-[var(--scene-fg)] aria-[current=page]:text-[var(--scene-fg)]"
            >
              {item.label}
              {/* A short indicator under the active item; grows in on hover. */}
              <span
                aria-hidden
                className={
                  "absolute bottom-1 left-3 h-px bg-[var(--scene-accent)] transition-[width] duration-500 ease-[var(--ease-out-expo)] " +
                  (isActive(item.href) ? "w-[calc(100%-1.5rem)]" : "w-0 group-hover/nav:w-[calc(100%-1.5rem)]")
                }
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group/cta hidden h-9 items-center gap-2 rounded-full border border-[var(--scene-line)] px-4 text-sm text-[var(--scene-fg)] transition-colors duration-500 hover:border-[var(--scene-fg)] md:inline-flex"
          >
            Start a conversation
            <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0.5" />
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

      {/* Full-screen mobile navigation. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="scene-ink fixed inset-0 top-[68px] z-40 md:hidden"
      >
        <nav aria-label="Primary (mobile)" className="shell flex h-full flex-col pt-6 pb-10">
          <ul>
            {primaryNav.map((item, i) => (
              <li key={item.href} className="border-b border-[var(--scene-line)]">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between gap-4 py-5"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="text-[1.75rem] leading-none tracking-[-0.03em] text-[var(--scene-fg)]">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="eyebrow max-w-[45%] text-right leading-[1.4] normal-case tracking-normal">
                      {item.hint}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          {/* The space below the links is not empty on a phone — it carries the
              two things someone opening a menu on a mobile most often wants. */}
          <div className="mt-10 border-t border-[var(--scene-line)] pt-6">
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
                    <span className="text-[var(--scene-fg)]">{location.city}</span>{" "}
                    {location.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            onClick={close}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--scene-fg)] px-6 text-sm font-medium text-[var(--scene-bg)]"
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
