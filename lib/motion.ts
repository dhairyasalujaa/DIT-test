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

/**
 * The host a link leaves for, for the screen-reader-only note on off-site
 * links. Derived rather than hard-coded: this used to announce
 * "decodingit.com" for every http destination, which was a guess that
 * happened to be right only because every such link points there today.
 */
export const externalHost = (href: string) =>
  href.startsWith("http") ? href.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] : "";
