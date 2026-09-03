/**
 * The wordmark.
 *
 * decodingIT's lockup sets "decoding" in near-black and "it" in the brand
 * blue, in a bold geometric sans, with "SOLUTIONS" in small letter-spaced
 * caps beneath. On the navy scenes the near-black half inverts to white so
 * the mark stays legible.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
        <span className="text-[var(--scene-fg)]">decoding</span>
        <span className="text-[var(--scene-accent)]">it</span>
      </span>
      <span className="mt-[3px] self-end font-heading text-[0.5rem] font-bold tracking-[0.22em] text-[var(--scene-fg-muted)] uppercase">
        Solutions
      </span>
    </span>
  );
}
