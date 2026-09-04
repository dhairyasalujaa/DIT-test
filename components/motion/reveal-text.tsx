import type { ElementType } from "react";

/**
 * An upward text reveal: each word rises out of its own mask.
 *
 * The words are split server-side and each is wrapped in a clipping span, so
 * the effect needs no measurement, no layout thrash and no client JavaScript.
 * Because every word carries its own `view()` timeline, words on different
 * lines resolve at different scroll positions — the line-by-line cascade comes
 * out of the geometry rather than out of a hand-tuned delay list. A small
 * per-word offset on top of that keeps a single line from arriving as a block.
 *
 * The mask is padded and pulled back by an equal amount: `overflow: hidden` on
 * a line of type otherwise shaves the descenders off g, y and p.
 *
 * Accessibility: the words are plain text in source order, so the string is
 * read and copied normally. Under `prefers-reduced-motion` the whole effect is
 * inert and the text is simply there.
 */
interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** Extra classes for the emphasised run, if `accent` is given. */
  accentClassName?: string;
  /** Words after `children` that carry the accent treatment. */
  accent?: string;
  /** Words after the accent run. */
  after?: string;
  /** Extra classes for the trailing run — used for the two-tone `.release`. */
  afterClassName?: string;
  /** Delay before the first word, in words' worth of stagger. */
  offset?: number;
  id?: string;
  style?: React.CSSProperties;
}

/** Splits on whitespace but keeps the words' own punctuation intact. */
function words(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

function Word({ word, index }: { word: string; index: number }) {
  return (
    <span className="rt-mask" style={{ "--w": index } as React.CSSProperties}>
      <span className="rt-word">{word}</span>
    </span>
  );
}

export function RevealText({
  children,
  as: Tag = "span",
  className = "",
  accent,
  accentClassName = "text-[var(--scene-accent)]",
  after,
  afterClassName,
  offset = 0,
  id,
  style,
}: RevealTextProps) {
  // Indices are derived from the three runs' lengths rather than incremented
  // during render. A counter mutated inside JSX depends on the order React
  // evaluates props in, which is not something to build a stagger on.
  const lead = words(children);
  const mid = accent ? words(accent) : [];
  const tail = after ? words(after) : [];

  return (
    <Tag id={id} className={`rt ${className}`} style={style}>
      {lead.map((word, i) => (
        <Word key={`l${i}`} word={word} index={offset + i} />
      ))}
      {mid.map((word, i) => (
        <span key={`a${i}`} className={accentClassName}>
          <Word word={word} index={offset + lead.length + i} />
        </span>
      ))}
      {tail.map((word, i) =>
        afterClassName ? (
          <span key={`t${i}`} className={afterClassName}>
            <Word word={word} index={offset + lead.length + mid.length + i} />
          </span>
        ) : (
          <Word key={`t${i}`} word={word} index={offset + lead.length + mid.length + i} />
        ),
      )}
    </Tag>
  );
}
