"use client";

/**
 * The oversized wordmark at the foot of the page, which is also the
 * back-to-top control.
 *
 * The design brief calls this a signature end-of-page object rather than a
 * conventional logo lockup, and that is exactly the job: the page has to end
 * on something, and a company's own name set at `clamp(4rem, 20vw, 18rem)` is
 * a better ending than a row of small print. Making it the way back up means
 * the largest, easiest target on the page is also the most useful one.
 *
 * It is a real `<button>` with a real accessible name, so it is reachable by
 * keyboard and announced as an action rather than as decoration.
 */
export function BackToTop() {
  const toTop = () => {
    // Lenis intercepts this and eases; without it, or under reduced motion
    // where Lenis never starts, the browser's own behaviour applies.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="group/top mt-16 block w-full text-left"
    >
      <span
        aria-hidden
        className="
          block leading-[0.78] font-medium tracking-[-0.05em] text-[var(--scene-fg)]/12
          transition-[color,opacity] duration-[var(--dur-sweep)] ease-[var(--ease-editorial)]
          group-hover/top:text-[var(--scene-fg)]/25
          text-[clamp(4rem,20vw,18rem)]
        "
      >
        decoding<span className="text-[var(--scene-accent)]/25 group-hover/top:text-[var(--scene-accent)]/45">it</span>
      </span>
    </button>
  );
}
