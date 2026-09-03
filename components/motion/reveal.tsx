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
  /** Merged after the reveal's own custom properties. */
  style?: React.CSSProperties;
}

/**
 * A scroll-triggered entrance.
 *
 * This is a *server* component: it only emits a data attribute and two custom
 * properties. A single client-side engine in the root layout observes every
 * `[data-reveal]` on the page, so adding a hundred reveals adds no JavaScript.
 *
 * The animation is pure CSS, defined in globals.css, and is disabled entirely
 * under `prefers-reduced-motion`. Where the browser supports scroll-driven
 * animation the CSS takes over completely and the observer below is never
 * needed — which is why `delay` is emitted twice, once as milliseconds for
 * the transition fallback and once as `--reveal-lag`, a unitless multiplier
 * the native path turns into a shift along the scroll range. A progress
 * timeline has no time axis, so a stagger has to be expressed as distance.
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
  style,
}: RevealProps) {
  const merged = {
    ...(delay ? { "--reveal-delay": `${delay}ms`, "--reveal-lag": delay / 120 } : {}),
    ...(shift ? { "--reveal-shift": shift } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <Tag data-reveal={variant === "shift" ? "" : variant} className={className} style={merged}>
      {variant === "clip" ? <span className="reveal-clip">{children}</span> : children}
    </Tag>
  );
}
