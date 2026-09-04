"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling.
 *
 * decodingIT's own site runs Lenis — their `<html>` carries its class — so
 * this matches the real thing rather than adding a flourish.
 *
 * Lenis moves the real scroll position rather than transforming a wrapper,
 * which is why everything else on the site keeps working untouched: the
 * `animation-timeline: view()` entrances, the header's tone observer, and
 * `position: sticky` all read the same numbers they always did.
 *
 * Three things this component owns:
 *
 * 1. **Reduced motion.** Lenis has no built-in opt-out, so it is simply never
 *    started when the user has asked for less movement — and it is torn down
 *    if they change that setting while the page is open. Native scrolling
 *    takes over, which is the correct behaviour, not a degraded one.
 * 2. **The header offset.** In-page anchors have to clear the fixed bar, so
 *    the anchor handler is given the header's real measured height.
 * 3. **Marquee coupling.** Live scroll velocity is written to
 *    `--marquee-boost`, which scales the logo strip's speed. Scroll hard and
 *    the logos pull ahead; stop and they settle back to base. The property
 *    defaults to 1, so the strip is correct with no JavaScript at all.
 *
 * The mobile menu dispatches `lenis:stop` / `lenis:start` when it locks the
 * page, so the panel scrolls on its own while the page behind it does not.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const headerHeight = () =>
      document.querySelector("header")?.getBoundingClientRect().height ?? 68;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.05,
        // A gentle exponential settle. Slower than the default so the page
        // reads as weighted rather than slippery.
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        anchors: { offset: -headerHeight() },
      });

      const root = document.documentElement;
      lenis.on("scroll", ({ velocity }: { velocity: number }) => {
        // Map |velocity| onto a small multiplier and clamp it, so a hard
        // flick speeds the marquee up without ever making it a blur.
        const boost = Math.min(3.2, 1 + Math.abs(velocity) / 26);
        root.style.setProperty("--marquee-boost", boost.toFixed(3));
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
      document.documentElement.style.removeProperty("--marquee-boost");
    };

    const sync = () => (query.matches ? stop() : start());
    sync();

    const onStop = () => lenis?.stop();
    const onStart = () => lenis?.start();
    query.addEventListener("change", sync);
    window.addEventListener("lenis:stop", onStop);
    window.addEventListener("lenis:start", onStart);

    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("lenis:stop", onStop);
      window.removeEventListener("lenis:start", onStart);
      stop();
    };
  }, []);

  return null;
}
