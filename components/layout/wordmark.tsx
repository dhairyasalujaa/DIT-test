/**
 * The wordmark.
 *
 * decodingIT's lockup is a faceted mark to the left of the name: "decoding"
 * in near-black, "it" in the brand blue, "SOLUTIONS" beneath in small
 * letter-spaced caps. On the navy scenes the near-black half inverts to
 * white so the mark stays legible.
 *
 * The sub-line is mono, like every other label on the site: it is the site
 * naming itself, which is exactly the job mono does here.
 *
 * SOURCING NOTE on `Logomark`: the client pasted the logo as an inline chat
 * image three times rather than as a file attachment, so it never reached a
 * path this build can read — checked against the uploads directory each
 * time, only the two design-brief markdown files are ever there. What
 * follows is a hand-vectorised reconstruction from visual inspection across
 * those messages, not a trace of the source artwork: a right-pointing
 * faceted shield in the same three brand blues used everywhere else on the
 * site, with a play-arrow cut through it. It is built to be replaced in one
 * place the moment the real vector or a clean PNG arrives as an actual
 * attachment — swap the contents of this function, or drop a file at
 * `public/brand/logomark.svg` and render that instead.
 */
export function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      focusable="false"
      role="presentation"
      className={className}
    >
      <defs>
        {/* The play-arrow is a true hole, not a painted triangle — the mark
            sits on a transparent, scene-aware header, so anything short of a
            real cutout would show a solid patch where the background should
            show through. */}
        <mask id="lm-cut">
          <rect x="0" y="0" width="100" height="100" fill="#fff" />
          <polygon points="38,30 38,70 72,50" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#lm-cut)">
        {/* Three facets fanning from one interior point, same language as
            the section-level marks in hero/facets.tsx: darkest at the back
            (upper-left), the mid blue on the leading edge, lightest closing
            the shape at bottom-left. */}
        <polygon points="12,22 64,8 46,50" fill="var(--color-navy, #0b1a2b)" />
        <polygon points="64,8 92,50 46,50" fill="var(--color-brand-link, #007acd)" />
        <polygon points="92,50 62,90 46,50" fill="var(--color-brand-link, #007acd)" />
        <polygon points="62,90 12,78 46,50" fill="var(--color-brand-light, #42afea)" />
        <polygon points="12,78 12,22 46,50" fill="var(--color-brand-light, #42afea)" />
      </g>
      {/* A hairline around the outer silhouette only — not the internal facet
          seams, which stay implicit in the colour change.

          The darkest facet is `--color-navy`, and in the dark theme that is
          `#050d17` against a header background of `#0b1a2b`: two different
          tokens, but close enough in luminance that the facet's edge
          disappeared into the ground (checked: computed styles confirmed
          both are "different" colours that nonetheless read as one blob).
          `--scene-fg` already solves exactly this problem everywhere else on
          the site — it is defined to contrast with whatever scene it is in —
          so tracing the boundary with it, at low opacity, keeps the mark
          legible against the transparent hero, a light scene, a dark one, or
          the navy band, with no per-background branching. */}
      <polygon
        points="12,22 64,8 92,50 62,90 12,78"
        fill="none"
        stroke="var(--scene-fg)"
        strokeOpacity="0.28"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <Logomark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
      <span className="inline-flex flex-col leading-none">
        <span className="text-[1.125rem] font-semibold tracking-[-0.03em]">
          <span className="text-[var(--scene-fg)]">decoding</span>
          <span className="text-[var(--scene-accent)]">it</span>
        </span>
        <span className="mt-[4px] self-end font-mono text-[0.5rem] tracking-[0.24em] text-[var(--scene-fg-muted)] uppercase">
          Solutions
        </span>
      </span>
    </span>
  );
}
