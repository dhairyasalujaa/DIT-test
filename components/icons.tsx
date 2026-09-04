/**
 * Icons are inline SVG rather than an icon package: the site needs a handful
 * of them, and a handful of paths cost less than a dependency.
 *
 * All are decorative — they always sit next to a text label — so they are
 * hidden from assistive technology.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false as const,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ChevronDown({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}

export function Shield({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 1.8 3 3.6v4c0 3 2.1 5.4 5 6.6 2.9-1.2 5-3.6 5-6.6v-4L8 1.8Z" />
    </svg>
  );
}

export function Mail({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
      <path d="m2.5 4.5 5.5 4 5.5-4" />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.2 2.5H3a1.2 1.2 0 0 0-1.2 1.3c.3 4.6 4 8.3 8.6 8.6a1.2 1.2 0 0 0 1.3-1.2V9.1l-2.5-.8-1.2 1.3a9.3 9.3 0 0 1-3.5-3.5L6 4.9Z" />
    </svg>
  );
}

export function Pin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 9.8 8 14 8 14Z" />
      <circle cx="8" cy="6.4" r="1.6" />
    </svg>
  );
}
