import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

type Tone = "ink" | "paper" | "paper-raised";

const toneClass: Record<Tone, string> = {
  ink: "scene-ink",
  paper: "scene-paper",
  "paper-raised": "scene-paper-raised",
};

interface SceneProps {
  children: ReactNode;
  tone?: Tone;
  /** Anchor target and scroll-spy identity. */
  id?: string;
  as?: ElementType;
  className?: string;
  "aria-labelledby"?: string;
}

/**
 * A scene: one full-width band of the page with its own ground colour.
 *
 * `data-header-tone` lets the header read which scene sits beneath it and
 * recolour itself as the visitor scrolls between light and dark passages.
 */
export function Scene({
  children,
  tone = "paper",
  id,
  as: Tag = "section",
  className = "",
  ...rest
}: SceneProps) {
  return (
    <Tag
      id={id}
      data-header-tone={tone === "ink" ? "ink" : "paper"}
      className={`${toneClass[tone]} relative py-(--spacing-scene) ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface SceneIntroProps {
  /** Small mono label — the scene's index card. */
  eyebrow: string;
  /** The scene's heading. Rendered as an h2 by default. */
  title: ReactNode;
  /** Supporting paragraph. */
  lede?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Optional trailing element, e.g. a link out of the section. */
  aside?: ReactNode;
}

/**
 * The standard opening of a scene: a hairline, an index label, a heading and
 * an optional lede.
 *
 * There is exactly one of these, and every section uses it. The audit that
 * prompted this pass found three hand-rolled copies that had drifted apart —
 * different column spans, different gaps, different label tracking — which is
 * most of why the page read as assembled rather than designed.
 *
 * The grid is the site's only grid: a twelve-column field with a `gap-x-10`
 * gutter, a three-column label rail, and content on nine (eight at `lg`).
 * Every other twelve-column grid on the site matches it exactly, so a label
 * on one section sits on the same vertical as a label on the next.
 *
 * `items-baseline` is the optical correction: without it the mono label's
 * cap-height floats above the heading's, and the top of every section on
 * every page steps by a few pixels for no reason.
 */
export function SceneIntro({
  eyebrow,
  title,
  lede,
  as: Heading = "h2",
  id,
  className = "",
  aside,
}: SceneIntroProps) {
  return (
    <div className={className}>
      <Reveal variant="rule">
        <hr className="rule border-t" />
      </Reveal>
      <div className="mt-6 grid items-baseline gap-x-10 gap-y-6 md:grid-cols-12">
        <Reveal className="md:col-span-3" delay={60}>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <div className="md:col-span-9 lg:col-span-8">
          <Reveal delay={120}>
            <Heading id={id} className="display-sm">
              {title}
            </Heading>
          </Reveal>
          {lede && (
            <Reveal delay={200}>
              <p className="lede mt-6">{lede}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={260}>
              <div className="mt-9">{aside}</div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
