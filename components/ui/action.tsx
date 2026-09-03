import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

type Variant = "primary" | "secondary" | "quiet";

interface ActionProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Rendered after the label; defaults to a right arrow. */
  icon?: "right" | "up-right" | "none";
  className?: string;
}

const shared =
  "group/action inline-flex items-center gap-2.5 rounded-full text-sm font-medium " +
  "transition-[background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)]";

const variants: Record<Variant, string> = {
  // Fills with the scene's own foreground, so the button inverts correctly on
  // ink and on paper without either being special-cased.
  primary:
    "h-11 px-5 bg-[var(--scene-fg)] text-[var(--scene-bg)] hover:bg-[var(--scene-accent)] " +
    "focus-visible:bg-[var(--scene-accent)]",
  secondary:
    "h-11 px-5 border border-[var(--scene-line)] text-[var(--scene-fg)] " +
    "hover:border-[var(--scene-fg)]",
  quiet: "text-[var(--scene-fg)] hover:text-[var(--scene-accent)]",
};

/**
 * The site's single call-to-action element.
 *
 * The arrow shifts a few pixels on hover — a small directional cue that the
 * link goes somewhere, rather than decoration for its own sake.
 */
export function Action({
  href,
  children,
  variant = "primary",
  icon = "right",
  className = "",
}: ActionProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          className={
            "size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] " +
            (icon === "up-right"
              ? "group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
              : "group-hover/action:translate-x-1")
          }
        />
      )}
    </>
  );

  const classes = `${shared} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
