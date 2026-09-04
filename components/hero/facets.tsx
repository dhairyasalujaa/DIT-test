/**
 * Artwork.
 *
 * Every image on this site is drawn, not photographed. That is a sourcing
 * decision before it is an aesthetic one: a photograph of an office, a rack
 * or a team asserts something about decodingIT that we cannot verify, and a
 * stock photograph asserts it falsely. Geometry derived from their own logo
 * mark asserts nothing — and it costs nothing to serve, scales to any
 * viewport, and recolours with the scene tokens.
 *
 * decodingIT's own site works the same way: `.hero-facets`, `.band-facets`,
 * `.close-facets`, and article thumbnails built from two empty spans
 * (`.post-thumb > .pt1 .pt2`) rather than images.
 *
 * Everything here is decorative and hidden from assistive technology.
 */

/**
 * A small, stable hash so a card's artwork is derived from its own content.
 *
 * The alternative — `Math.random()` — would give a different composition on
 * the server and the client and blow up hydration, and a different one on
 * every build. FNV-1a is four lines and deterministic.
 */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * The faceted triangle motif.
 *
 * decodingIT's logo mark is a stacked, faceted triangle in three blues, and
 * the same shape recurs across their site as a background element.
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
 * The same mark as a large, layered field of refracted planes.
 *
 * Where `Facets` is the logo at logo scale, this is it opened out: planes
 * spread across the frame at different depths, each with its own gradient, so
 * a section has a ground with structure in it rather than a flat fill. It
 * carries most of the weight on the hero and the dark bands.
 */
export function Prism({
  tone = "ink",
  className = "",
  id = "p",
}: {
  tone?: "paper" | "ink";
  className?: string;
  /** Distinguishes this instance's gradient ids from any other on the page. */
  id?: string;
}) {
  const deep = tone === "ink";
  const near = deep ? "var(--color-brand-light)" : "var(--color-brand)";
  const far = deep ? "var(--color-brand)" : "var(--color-brand-light)";

  return (
    <svg
      viewBox="0 0 900 600"
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
    >
      <defs>
        {/* Every plane fades IN from its own flat back toward its apex.

            The mark is a triangle with a flat left edge, and at full-bleed
            scale that straight edge lands mid-viewport and reads as a seam in
            the page rather than as the edge of a shape. Running each gradient
            from transparent at the back to colour at the apex removes the
            edge entirely and is closer to how refracted light behaves. */}
        <linearGradient id={`${id}-a`} x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0%" stopColor={near} stopOpacity="0" />
          <stop offset="55%" stopColor={near} stopOpacity={deep ? 0.34 : 0.17} />
          <stop offset="100%" stopColor={near} stopOpacity={deep ? 0.52 : 0.26} />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0.8" x2="1" y2="0.2">
          <stop offset="0%" stopColor={far} stopOpacity="0" />
          <stop offset="60%" stopColor={far} stopOpacity={deep ? 0.28 : 0.14} />
          <stop offset="100%" stopColor={far} stopOpacity={deep ? 0.46 : 0.22} />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor={near} stopOpacity="0" />
          <stop offset="100%" stopColor={near} stopOpacity={deep ? 0.3 : 0.14} />
        </linearGradient>
        <linearGradient id={`${id}-d`} x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor={near} stopOpacity="0" />
          <stop offset="100%" stopColor={near} stopOpacity={deep ? 0.16 : 0.08} />
        </linearGradient>
      </defs>

      {/* Four planes at different depths. The apexes all point the same way,
          so the field reads as one mark refracted rather than as scattered
          triangles. */}
      <polygon points="120,-60 780,300 120,660" fill={`url(#${id}-c)`} />
      <polygon points="330,20 900,330 330,640" fill={`url(#${id}-a)`} />
      <polygon points="560,-40 980,210 560,460" fill={`url(#${id}-b)`} />
      <polygon points="40,140 300,300 40,460" fill={`url(#${id}-d)`} />

      {/* Two hairlines catching the light along a plane edge — the detail that
          stops the gradients reading as a blur. */}
      <path d="M330 20 L900 330" stroke={`url(#${id}-c)`} strokeWidth="1" fill="none" />
      <path d="M120 -60 L780 300" stroke={`url(#${id}-d)`} strokeWidth="1" fill="none" />
    </svg>
  );
}

/**
 * A soft field of brand-coloured light, sitting behind a section.
 *
 * Blurred blooms, which survive any viewport without tiling or cropping
 * badly. Each bloom drifts on its own scroll timeline (see `.art > *` in
 * globals.css), so the ground moves at a different rate to the type in front.
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

/**
 * Card artwork.
 *
 * This is decodingIT's `.post-thumb` — abstract shapes over a wash, drawn
 * rather than photographed — generalised so any card can carry one.
 *
 * Five compositions rather than one rotated shape. A single motif nudged a
 * few degrees per card reads as a repeated asset, which is the opposite of
 * the intent: six cards in a grid have to look like a set, not like a
 * stamp. Every composition is the same faceted plane language, so they still
 * belong together.
 *
 * Which one a card gets is derived from its own text, so every card differs,
 * every card is stable across builds, and nothing is random at render time
 * (which would also desync server and client and break hydration).
 */

/** The five compositions, in viewBox space (400 × 180). */
const COMPOSITIONS: { points: string; layer: "back" | "front" }[][] = [
  // 0 — one large plane entering from the left, apex right.
  [
    { points: "-70,-40 260,90 -70,220", layer: "back" },
    { points: "70,20 310,90 70,160", layer: "front" },
  ],
  // 1 — the mirror: apex left, entering from the right.
  [
    { points: "470,-40 140,90 470,220", layer: "back" },
    { points: "330,20 90,90 330,160", layer: "front" },
  ],
  // 2 — the logo mark itself, stacked, held to the left third.
  [
    { points: "60,-20 270,90 60,200", layer: "back" },
    { points: "18,14 152,90 18,166", layer: "front" },
    { points: "-30,38 60,90 -30,142", layer: "front" },
  ],
  // 3 — two planes crossing, one from each edge.
  [
    { points: "-60,-30 210,60 -60,150", layer: "back" },
    { points: "460,30 190,120 460,210", layer: "front" },
  ],
  // 4 — a shallow plane along the base, with a small apex above it.
  [
    { points: "-40,200 440,80 440,220 -40,240", layer: "back" },
    { points: "250,-30 400,50 250,130", layer: "front" },
  ],
];

export function CardArt({
  seed,
  tone = "wash",
  className = "",
}: {
  /** Anything stable and unique to this card — its title or href. */
  seed: string;
  tone?: "wash" | "ink";
  className?: string;
}) {
  const h = hash(seed);
  const id = `ca${h.toString(36).slice(0, 6)}`;

  // Three numbers from different parts of the hash so they vary
  // independently rather than moving together.
  const composition = COMPOSITIONS[h % COMPOSITIONS.length];
  const lean = -9 + ((h >> 7) % 18);
  const angle = (h >> 13) % 2 === 0 ? 35 : 145;

  const ground = tone === "ink" ? "var(--color-navy-raised)" : "var(--color-surface-wash)";
  const front = tone === "ink" ? "var(--color-brand-light)" : "var(--color-brand)";
  const back = tone === "ink" ? "var(--color-brand)" : "var(--color-brand-light)";

  // Kept deliberately quiet. The card's job is its heading; this is a ground
  // with structure in it, not a picture competing for the same attention.
  const alpha = tone === "ink" ? { front: 0.42, back: 0.3 } : { front: 0.26, back: 0.2 };

  const rad = (angle * Math.PI) / 180;
  const x2 = (0.5 + Math.cos(rad) / 2).toFixed(3);
  const y2 = (0.5 + Math.sin(rad) / 2).toFixed(3);

  return (
    <svg
      viewBox="0 0 400 180"
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2={x2} y2={y2}>
          <stop offset="0%" stopColor={ground} />
          <stop offset="100%" stopColor={ground} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={front} stopOpacity={alpha.front} />
          <stop offset="100%" stopColor={front} stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={back} stopOpacity={alpha.back} />
          <stop offset="100%" stopColor={back} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="180" fill={`url(#${id}-g)`} />

      <g transform={`rotate(${lean} 200 90)`}>
        {composition.map((plane) => (
          <polygon key={plane.points} points={plane.points} fill={`url(#${id}-${plane.layer === "front" ? "f" : "b"})`} />
        ))}
      </g>
    </svg>
  );
}
