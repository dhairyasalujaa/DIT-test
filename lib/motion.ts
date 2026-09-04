import type { CSSProperties } from "react";

/**
 * The custom property the load choreography reads for its start delay.
 *
 * Written out identically in three components before this existed.
 */
export const enterDelay = (ms: number) =>
  ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Whether a destination leaves this site.
 *
 * There were four different answers to this question in the codebase — one
 * checked `http`, one added `mailto:`, one added `tel:` — which is why the
 * same kind of link opened in a new tab in one place and not in another.
 */
export const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:)/.test(href);

/** The props an external link needs, or nothing at all for an internal one. */
export const externalProps = (href: string) =>
  href.startsWith("http") ? ({ target: "_blank", rel: "noreferrer" } as const) : {};
