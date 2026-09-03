import { Scene, SceneIntro } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { site } from "@/content/site";

/**
 * Scene 08 — Resolution.
 *
 * Deliberately the quietest scene on the page. By this point the argument has
 * been made; raising the volume now would undo it. One line, one action, and
 * a great deal of space — then the credits.
 *
 * It uses `SceneIntro` like every other section. It used to hand-roll the same
 * markup with `pt-20` where the shared component uses `mt-6`, which put the
 * final section of nine pages on a rhythm of its own.
 */
export function ClosingCta() {
  return (
    <Scene tone="paper" aria-labelledby="cta-title">
      <div className="shell">
        <SceneIntro
          eyebrow="Next"
          id="cta-title"
          title="Tell us what you are running, and what is not working."
          lede={`${site.responsePromise} Not an auto-responder, and not a salesperson.`}
          aside={
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Action href="/contact">Start a conversation</Action>
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
              >
                {site.email}
              </a>
            </div>
          }
        />
      </div>
    </Scene>
  );
}
