/**
 * The wordmark.
 *
 * decodingIT's lockup sets "decoding" in near-black and "it" in the brand
 * blue, with "SOLUTIONS" in small letter-spaced caps beneath. On the navy
 * scenes the near-black half inverts to white so the mark stays legible.
 *
 * The sub-line is mono, like every other label on the site: it is the site
 * naming itself, which is exactly the job mono does here.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-[1.125rem] font-semibold tracking-[-0.03em]">
        <span className="text-[var(--scene-fg)]">decoding</span>
        <span className="text-[var(--scene-accent)]">it</span>
      </span>
      <span className="mt-[4px] self-end font-mono text-[0.5rem] tracking-[0.24em] text-[var(--scene-fg-muted)] uppercase">
        Solutions
      </span>
    </span>
  );
}
