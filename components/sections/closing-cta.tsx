import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";
import { site } from "@/content/site";

/**
 * Scene 08 — Resolution.
 *
 * Deliberately the quietest scene on the page. By this point the argument has
 * been made; raising the volume now would undo it. One line, one action, and
 * a great deal of space — then the credits.
 */
export function ClosingCta() {
  return (
    <Scene tone="paper" aria-labelledby="cta-title" className="pb-(--spacing-scene)">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 pt-20 md:grid-cols-12">
          <Reveal className="md:col-span-3" delay={60}>
            <p className="eyebrow">Next</p>
          </Reveal>

          <div className="md:col-span-9 lg:col-span-8">
            <Reveal delay={120}>
              <h2 id="cta-title" className="display-sm max-w-[20ch]">
                Tell us what you are running, and what is not working.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-8 max-w-[46ch]">
                {site.responsePromise} Not an auto-responder, and not a
                salesperson.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Action href="/contact">Start a conversation</Action>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Scene>
  );
}
