import type { ArticleBlock } from "@/types";
import { slugify } from "@/lib/format";
import { Reveal } from "@/components/motion/reveal";

/**
 * On-page contents.
 *
 * A seven-minute read on a wide screen leaves half the frame empty and gives
 * the reader no sense of shape. This fills that column with something useful
 * rather than decorative: where the piece is going, and a way to jump.
 *
 * Plain anchor links — no scroll-spy, no client JavaScript. It works with the
 * keyboard, it works before hydration, and it works if scripts never load.
 */
export function ArticleToc({ blocks }: { blocks: ArticleBlock[] }) {
  const sections = blocks
    .filter((b): b is Extract<ArticleBlock, { kind: "h2" }> => b.kind === "h2")
    .map((b) => ({ text: b.text, id: slugify(b.text) }));

  if (sections.length < 3) return null;

  return (
    <Reveal className="lg:sticky lg:top-28">
      <nav aria-labelledby="toc-title">
        <p id="toc-title" className="eyebrow">
          In this article
        </p>
        <ol className="mt-5 border-t border-[var(--scene-line)]">
          {sections.map((section, i) => (
            <li key={section.id} className="border-b border-[var(--scene-line)]">
              <a
                href={`#${section.id}`}
                className="group/toc flex gap-3 py-3 text-[0.875rem] leading-snug text-[var(--scene-fg-muted)] transition-colors duration-300 hover:text-[var(--scene-fg)]"
              >
                <span className="font-mono text-[0.6875rem] tabular-nums opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{section.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  );
}
