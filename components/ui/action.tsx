import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { externalHost, externalProps, isExternal } from "@/lib/motion";

type Variant = "primary" | "secondary" | "on-dark";

interface ActionProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Rendered after the label; defaults to a right arrow. */
  icon?: "right" | "up-right" | "none";
  /** Fills the width of its container — used where buttons stack on a phone. */
  block?: boolean;
  className?: string;
}

const shared =
  "group/action inline-flex h-12 items-center justify-center gap-2.5 rounded-[4px] px-6 text-sm font-semibold " +
  "transition-[background-color,color,border-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-rise)] " +
  "hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  // Fills with the scene's own CTA colour, so the button inverts correctly on
  // ink and on paper without either being special-cased.
  primary:
    "bg-[var(--scene-cta-bg)] text-[var(--scene-cta-fg)] hover:bg-[var(--scene-cta-bg-hover)] " +
    "focus-visible:bg-[var(--scene-accent)]",
  secondary:
    "border border-[var(--scene-accent)] text-[var(--scene-accent)] " +
    "hover:bg-[var(--scene-accent)] hover:text-white",
  // A ghost button on a dark band, where the accent is too low-contrast to
  // outline with.
  "on-dark":
    "border border-[var(--scene-fg)]/35 text-[var(--scene-fg)] " +
    "hover:border-[var(--scene-fg)] hover:bg-[var(--scene-fg)] hover:text-[var(--color-navy)]",
};

/**
 * The site's call-to-action.
 *
 * There is one of these, at one height. Three places used to hand-roll the
 * same filled button at `h-12` while this component sat almost unused at
 * `h-11`, so the site had two button heights depending on which file you
 * were in.
 */
export function Action({
  href,
  children,
  variant = "primary",
  icon = "right",
  block = false,
  className = "",
}: ActionProps) {
  const external = isExternal(href);
  const host = externalHost(href);
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          className={
            "size-4 shrink-0 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] " +
            (icon === "up-right"
              ? "group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
              : "group-hover/action:translate-x-1")
          }
        />
      )}
      {host && <span className="sr-only">(opens on {host})</span>}
    </>
  );

  const classes = `${shared} ${variants[variant]} ${block ? "w-full sm:w-auto" : ""} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} {...externalProps(href)}>
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
