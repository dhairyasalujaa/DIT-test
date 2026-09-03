/**
 * The faceted triangle motif.
 *
 * decodingIT's logo mark is a stacked, faceted triangle in three blues, and
 * the same shape recurs across the site as a decorative background element.
 * This is that language, drawn once and reused — purely decorative, so it is
 * hidden from assistive technology.
 */
export function Facets({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      aria-hidden
      focusable="false"
      className={className}
      role="presentation"
    >
      {/* Three stacked planes, lightest behind, brand blue in front. */}
      <polygon points="86,40 300,160 86,280" fill="var(--color-brand-light)" opacity="0.22" />
      <polygon points="44,66 236,178 44,290" fill="var(--color-brand-link)" opacity="0.32" />
      <polygon points="16,96 168,186 16,276" fill="var(--color-brand)" opacity="0.9" />
    </svg>
  );
}
