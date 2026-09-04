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
 * The standard opening of a scene: a hairline, a heading and an optional lede.
 *
 * There is exactly one of these, and every section uses it. It used to carry
 * a small mono kicker label beside the heading (Solutions, Technology, How we
 * work…) — removed sitewide on the client's instruction: no small subtitles
 * anywhere. The heading now opens the section directly, which is also why its
 * per-line entrance (see `Reveal`'s `clip` variant) carries more weight than
 * it used to.
 *
 * The grid is the site's only grid: a twelve-column field with a `gap-x-10`
 * gutter and content on nine columns (eight at `lg`), starting at column one.
 * Every other twelve-column grid on the site matches it, so a heading on one
 * section sits on the same vertical as a heading on the next.
 */
export function SceneIntro({
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
      <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-12">
        <div className="md:col-span-9 lg:col-span-8">
          <Reveal variant="clip">
            <Heading id={id} className="display-sm">
              {title}
            </Heading>
          </Reveal>
          {lede && (
            <Reveal delay={120}>
              <p className="lede mt-6">{lede}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={180}>
              <div className="mt-9">{aside}</div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
