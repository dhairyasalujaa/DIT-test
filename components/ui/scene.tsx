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
  /** The bracketed marginal note above the heading, e.g. "Solutions". */
  eyebrow?: string;
  /** The heading's second phrase, set light and dimmed — the two-tone device. */
  release?: string;
  /** Supporting paragraph. */
  lede?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Optional trailing element, e.g. a link out of the section. */
  aside?: ReactNode;
}

/**
 * The standard opening of a scene: a hairline, a bracketed eyebrow, a
 * two-tone heading and an optional lede.
 *
 * There is exactly one of these, and every section uses it.
 *
 * The eyebrow has been through both positions in this project: kicker labels
 * were stripped sitewide on the instruction that no small subtitles appear
 * anywhere, then restored in the design brief's bracketed form on a later
 * one. `[ Solutions ]` is doing a different job from `SOLUTIONS` — it reads
 * as a marginal note rather than a category tag, which is why it survives the
 * original objection.
 *
 * `release` is the brief's central typographic device: the heading opens in
 * medium weight and its second phrase drops to light and dimmed, so hierarchy
 * comes from weight rather than from adding a hue.
 *
 * The heading rises word by word out of its own masks, the same way every
 * heading on the home page does — one motion idea for the whole site rather
 * than one per section.
 */
export function SceneIntro({
  title,
  eyebrow,
  release,
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
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-6">{eyebrow}</p>
            </Reveal>
          )}
          <RevealText
            as={Heading}
            id={id}
            className="display-sm"
            after={release}
            afterClassName="release"
          >
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
