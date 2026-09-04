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
  offset = 0,
  id,
  style,
}: RevealTextProps) {
  let n = offset;
  const lead = words(children).map((word) => <Word key={`l${n}`} word={word} index={n++} />);
  const mid = accent
    ? words(accent).map((word) => (
        <span key={`a${n}`} className={accentClassName}>
          <Word word={word} index={n++} />
        </span>
      ))
    : null;
  const tail = after ? words(after).map((word) => <Word key={`t${n}`} word={word} index={n++} />) : null;

  return (
    <Tag id={id} className={`rt ${className}`} style={style}>
      {lead}
      {mid}
      {tail}
    </Tag>
  );
}
