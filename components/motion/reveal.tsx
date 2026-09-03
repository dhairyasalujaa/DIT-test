import type { ElementType, ReactNode } from "react";

type RevealVariant = "shift" | "clip" | "rule";

interface RevealProps {
  children: ReactNode;
  /** Rendered element. Defaults to a div; use "span"/"li"/"section" as needed. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Distance travelled, e.g. "2rem". Only used by the default variant. */
  shift?: string;
  className?: string;
}

/**
 * A scroll-triggered entrance.
 *
 * This is a *server* component: it only emits a data attribute and two custom
 * properties. A single client-side engine in the root layout observes every
 * `[data-reveal]` on the page, so adding a hundred reveals adds no JavaScript.
 *
 * The animation is pure CSS, defined in globals.css, and is disabled entirely
 * under `prefers-reduced-motion` and when JavaScript is unavailable.
 *
 * The `clip` variant wraps its children in an inner element and clips *that*,
 * never the observed node: Chromium factors an element's own `clip-path` into
 * its intersection rect, so a clipped target reports zero intersection and the
 * observer would never fire for it.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "shift",
  delay = 0,
  shift,
  className,
}: RevealProps) {
  const style = {
    ...(delay ? { "--reveal-delay": `${delay}ms` } : {}),
    ...(shift ? { "--reveal-shift": shift } : {}),
  } as React.CSSProperties;

  return (
    <Tag data-reveal={variant === "shift" ? "" : variant} className={className} style={style}>
      {variant === "clip" ? <span className="reveal-clip">{children}</span> : children}
    </Tag>
  );
}
