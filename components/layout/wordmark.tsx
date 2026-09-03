/**
 * The wordmark.
 *
 * "decoding" is set in the sans face and "IT" in the mono face — the two
 * halves of what the company does, in two typefaces: the human reading and the
 * machine underneath. The signal dot is the only place the accent colour
 * appears in the chrome.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-px text-[0.9375rem] leading-none ${className}`}>
      <span className="font-medium tracking-[-0.03em]">decoding</span>
      <span className="font-mono font-medium tracking-[-0.02em]">IT</span>
      <span
        aria-hidden
        className="ml-0.5 size-1 shrink-0 self-center rounded-full bg-[var(--scene-accent)]"
      />
    </span>
  );
}
