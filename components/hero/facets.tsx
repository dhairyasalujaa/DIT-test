/**
 * The faceted triangle motif.
 *
 * decodingIT's logo mark is a stacked, faceted triangle in three blues, and
 * the same shape recurs across their site as a background element. This is
 * that language, drawn once and reused — purely decorative, so it is hidden
 * from assistive technology.
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

/**
 * A soft field of brand-coloured light, sitting behind a section.
 *
 * The live site scatters faceted shapes behind its hero, its dark band and
 * its closing panel; this is the same idea built from blurred gradient
 * blooms, which survive any viewport without tiling or cropping badly. Each
 * bloom drifts on its own scroll timeline (see `.art > *` in globals.css), so
 * the ground moves at a different rate to the type in front of it.
 */
export function ArtField({
  tone = "paper",
  className = "",
}: {
  tone?: "paper" | "ink";
  className?: string;
}) {
  const blooms =
    tone === "ink"
      ? [
          "top-[-18%] right-[-8%] h-[34rem] w-[34rem] bg-[var(--color-brand-link)] opacity-[0.20]",
          "bottom-[-26%] left-[-12%] h-[30rem] w-[30rem] bg-[var(--color-brand)] opacity-[0.30]",
          "top-[24%] left-[38%] h-[22rem] w-[22rem] bg-[var(--color-brand-light)] opacity-[0.10]",
        ]
      : [
          "top-[-24%] right-[-10%] h-[36rem] w-[36rem] bg-[var(--color-brand-light)] opacity-[0.16]",
          "bottom-[-30%] left-[-14%] h-[30rem] w-[30rem] bg-[var(--color-brand-link)] opacity-[0.10]",
        ];

  return (
    <div aria-hidden className={`art ${className}`}>
      {blooms.map((bloom) => (
        <span key={bloom} className={bloom} />
      ))}
    </div>
  );
}
