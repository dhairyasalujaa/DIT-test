import { Reveal } from "@/components/motion/reveal";

/**
 * The decode panel.
 *
 * The company's name, drawn literally: on the left, characters that mean
 * nothing; on the right, the same rows resolved into the six things decodingIT
 * actually does. Both halves are present in the still frame, so the idea reads
 * without any animation at all — the entrance only governs how it arrives.
 *
 * The noise column is decorative and hidden from assistive technology; the
 * discipline names are real text and are what a crawler or screen reader sees.
 */

const rows = [
  { noise: "%#@&*!?~", name: "Foundation" },
  { noise: "&!?%#@*+", name: "Network" },
  { noise: "@*%#&!?=", name: "Cloud" },
  { noise: "!?@&*%#|", name: "Continuity" },
  { noise: "#@!?&*%/", name: "Workplace" },
  { noise: "*%#@&!?\\", name: "Security" },
];

export function DecodePanel() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <span className="eyebrow">Input</span>
        <span
          className="enter-line h-px flex-1 bg-[var(--scene-line)]"
          style={{ "--enter-delay": "620ms" } as React.CSSProperties}
        />
        <span className="eyebrow">Output</span>
      </div>

      <ul className="mt-4">
        {rows.map((row, i) => (
          <li
            key={row.name}
            className="decode-row enter grid grid-cols-[auto_1fr_auto_1fr] items-center gap-3 border-b border-[var(--scene-line)] py-3 last:border-b-0 sm:gap-4"
            style={{ "--enter-delay": `${700 + i * 70}ms` } as React.CSSProperties}
          >
            <span
              aria-hidden
              className="decode-marker size-1 rounded-full bg-[var(--scene-fg-muted)] transition-colors duration-500"
            />
            <span
              aria-hidden
              className="decode-noise truncate font-mono text-[0.8125rem] tracking-[0.18em] text-[var(--scene-fg-muted)] opacity-70 transition-opacity duration-700"
            >
              {row.noise}
            </span>
            <span aria-hidden className="font-mono text-[0.6875rem] text-[var(--scene-fg-muted)]">
              →
            </span>
            <span className="truncate text-sm text-[var(--scene-fg)]">{row.name}</span>
          </li>
        ))}
      </ul>

      <Reveal delay={200}>
        <p className="mt-5 max-w-[38ch] text-[0.8125rem] leading-relaxed text-[var(--scene-fg-muted)]">
          Six areas, answered by one team — under one agreement, with response
          times written into it.
        </p>
      </Reveal>
    </div>
  );
}
