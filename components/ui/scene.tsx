import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";

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
  /** The scene's heading. Plain text, so it can be split into words. */
  title: string;
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
 * per-word entrance carries more weight than
 * it used to.
 *
 * The heading rises word by word out of its own masks, the same way every
 * heading on the home page does — one motion idea for the whole site rather
 * than one per section.
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
      <div className="mt-8 max-w-(--measure-head)">
        <div>
          <RevealText as={Heading} id={id} className="display-sm">
            {title}
          </RevealText>
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
