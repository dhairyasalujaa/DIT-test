import type { ArticleBlock } from "@/types";
import { Reveal } from "@/components/motion/reveal";
import { slugify } from "@/lib/format";

/**
 * Renders an article from structured blocks rather than raw HTML.
 *
 * Keeping the body as data means headings stay in a predictable hierarchy
 * (article H1 on the page, H2/H3 here), the markup stays semantic, and moving
 * this content into a CMS later is a change of source, not of renderer.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="max-w-[64ch]">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return (
              <Reveal key={i}>
                {/* scroll-mt keeps the heading clear of the fixed header when
                    arriving from the contents list or a shared anchor. */}
                <h2
                  id={slugify(block.text)}
                  className="mt-16 mb-5 scroll-mt-28 text-[1.625rem] leading-tight tracking-[-0.03em] first:mt-0"
                >
                  {block.text}
                </h2>
              </Reveal>
            );
          case "h3":
            return (
              <Reveal key={i}>
                <h3 className="mt-10 mb-4 text-[1.1875rem] leading-snug tracking-[-0.02em]">
                  {block.text}
                </h3>
              </Reveal>
            );
          case "p":
            return (
              <Reveal key={i}>
                <p className="mb-6 text-[1.0625rem] leading-[1.75]">{block.text}</p>
              </Reveal>
            );
          case "list":
            return (
              <Reveal key={i}>
                <ul className="mb-8 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-4 text-[1.0625rem] leading-[1.7]">
                      <span
                        aria-hidden
                        className="mt-[0.7em] size-1 shrink-0 rounded-full bg-[var(--scene-accent)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          case "checklist":
            return (
              <Reveal key={i}>
                <aside className="my-12 border-y border-[var(--scene-line)] py-8">
                  <p className="eyebrow">{block.title}</p>
                  <ul className="mt-6 space-y-4">
                    {block.items.map((item, n) => (
                      <li key={item} className="flex gap-4 text-[0.9375rem] leading-relaxed">
                        <span className="eyebrow text-[var(--scene-accent)]">
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            );
          case "quote":
            return (
              <Reveal key={i}>
                <blockquote className="my-12 border-l-2 border-[var(--scene-accent)] pl-6">
                  <p className="text-[1.25rem] leading-relaxed tracking-[-0.015em]">{block.text}</p>
                </blockquote>
              </Reveal>
            );
        }
      })}
    </div>
  );
}
