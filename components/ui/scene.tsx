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
  /** Removes the default vertical rhythm when a section sets its own. */
  flush?: boolean;
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
  flush = false,
  ...rest
}: SceneProps) {
  return (
    <Tag
      id={id}
      data-header-tone={tone === "ink" ? "ink" : "paper"}
      className={`${toneClass[tone]} relative ${flush ? "" : "py-(--spacing-scene)"} ${className}`}
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
  /** Optional right-hand column, e.g. a link out of the section. */
  aside?: ReactNode;
}

/**
 * The standard opening of a scene: a hairline, an index label, a heading and
 * an optional lede. Repeating this exactly is what makes the page feel like
 * one document rather than a stack of templates.
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
      <div className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-12">
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
              <p className="lede mt-6 max-w-(--measure)">{lede}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={260}>
              <div className="mt-8">{aside}</div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
