import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { externalHost } from "@/lib/motion";

/**
 * The "keep going" affordance at the foot of a card or row.
 *
 * Seven places on the site had this same label-plus-sliding-arrow written out
 * by hand, differing only in the word and the hover-group name. One component
 * means the arrow travels the same distance, at the same speed, on the same
 * curve, everywhere — and that an external destination is always marked as
 * one rather than dressed up as an internal link.
 */
export function CardAffordance({
  label,
  external = false,
  href,
  className = "",
}: {
  label: string;
  /** Uses the outward arrow and is announced as leaving the site. */
  external?: boolean;
  /** The destination, so the off-site note can name the real host. */
  href?: string;
  className?: string;
}) {
  const host = (href && externalHost(href)) || "decodingit.com";
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium text-[var(--scene-accent)] ${className}`}
    >
      {label}
      <Icon
        className={
          "size-3.5 shrink-0 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] " +
          (external
            ? "group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
            : "group-hover/card:translate-x-1")
        }
      />
      {external && <span className="sr-only">(opens on {host})</span>}
    </span>
  );
}
