"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The one piece of client code behind every scroll animation on the site.
 *
 * A single IntersectionObserver watches all `[data-reveal]` elements and
 * reveals each once, then stops observing it. Re-scans on navigation so
 * client-side route changes pick up new content.
 *
 * Fallbacks are deliberate: if IntersectionObserver is missing, or the user
 * prefers reduced motion, everything is revealed immediately rather than
 * left hidden. Content is never gated behind an animation.
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"),
    );
    if (targets.length === 0) return;

    const revealAll = () => targets.forEach((el) => el.classList.add("is-revealed"));

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      {
        // Start the entrance slightly before the element reaches the fold, so
        // it finishes as it settles into view rather than after.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.01,
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
