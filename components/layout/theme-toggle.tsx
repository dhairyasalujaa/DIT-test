"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * The light / dark switch.
 *
 * The whole site is built on `--color-*` tokens and scene classes that read
 * from them, so this changes one attribute on `<html>` and everything follows
 * — no second stylesheet, no `dark:` variants scattered through components.
 *
 * The choice is remembered. With nothing remembered it follows the operating
 * system, because a visitor who has set their machine to dark has already
 * told us their preference and being asked twice is not a courtesy.
 *
 * The value is applied before first paint by an inline script in the document
 * head (see `app/layout.tsx`). Doing it here instead would paint the light
 * theme first and then flip it, which is the flash every themed site is
 * judged by.
 */
/**
 * `<html data-theme>` is the source of truth, so this subscribes to it rather
 * than keeping a second copy in React state.
 *
 * The obvious version — read the attribute in an effect and call setState —
 * is a lint error for good reason: it renders once with a guessed value, then
 * again with the real one. `useSyncExternalStore` reads the DOM during render
 * on the client and returns the server snapshot on the server, so there is
 * one render and no mismatch. It also picks up a change made anywhere else,
 * which the effect version would not.
 */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// The server cannot know which theme this visitor resolved to. `null` renders
// the neutral state, and the first client read replaces it.
const getServerSnapshot = (): Theme | null => null;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("dit-theme", next);
    } catch {
      // Private browsing, or storage disabled. The theme still applies for
      // this page view; it simply will not be remembered.
    }
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // The label states the destination, not the state, so a screen reader
      // user hears what pressing it will do.
      aria-label={theme === null ? "Switch theme" : isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={
        "group/theme inline-flex size-8 items-center justify-center text-[var(--scene-fg)]/70 " +
        "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:text-[var(--scene-fg)] " +
        className
      }
    >
      {/* Both icons are rendered and cross-faded, so the button never reflows
          and the swap has something to animate. Before mount neither is
          shown, which keeps the server and client markup identical. */}
      <span className="relative block size-4">
        <Sun
          className={
            "absolute inset-0 size-4 transition-[opacity,rotate,scale] duration-[var(--dur-sweep)] ease-[var(--ease-editorial)] " +
            (theme === null ? "opacity-0" : isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100")
          }
        />
        <Moon
          className={
            "absolute inset-0 size-4 transition-[opacity,rotate,scale] duration-[var(--dur-sweep)] ease-[var(--ease-editorial)] " +
            (theme === null ? "opacity-0" : isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0")
          }
        />
      </span>
    </button>
  );
}

function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden className={className}>
      <circle cx="8" cy="8" r="3.1" />
      <path
        strokeLinecap="round"
        d="M8 1.2v1.5M8 13.3v1.5M14.8 8h-1.5M2.7 8H1.2M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1M12.8 12.8l-1.1-1.1M4.3 4.3 3.2 3.2"
      />
    </svg>
  );
}

function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.6 9.4A5.8 5.8 0 0 1 6.6 2.4a5.9 5.9 0 1 0 7 7Z"
      />
    </svg>
  );
}
