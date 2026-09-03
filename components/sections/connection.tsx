import { beliefs } from "@/content/about";
import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";
import { Action } from "@/components/ui/action";

/**
 * Scene 06 — Connection.
 *
 * The quiet moment. One sentence at display size with a great deal of air
 * around it, then two of the four beliefs — enough to show there is a point of
 * view, not so much that the About page has nothing left to say.
 */
export function Connection() {
  return (
    <Scene tone="paper-raised" aria-labelledby="connection-title">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>
        <Reveal delay={60}>
          <p className="eyebrow mt-5">Why we exist</p>
        </Reveal>

        <Reveal variant="clip" delay={140}>
          <h2 id="connection-title" className="display mt-14 max-w-[15ch]">
            The best possible outcome of our work is that nothing memorable
            happens.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="lede mt-10 max-w-[52ch]">
            Good IT is invisible. We are not trying to be the most interesting
            thing about your business — we are trying to stop technology being
            something you have to think about at all.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-10 md:grid-cols-12">
          {beliefs.slice(0, 2).map((belief, i) => (
            <Reveal key={belief.index} delay={i * 90} className="md:col-span-5 md:even:col-start-8">
              <p className="eyebrow">{belief.index}</p>
              <h3 className="mt-4 text-[1.25rem] leading-snug tracking-[-0.025em]">
                {belief.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                {belief.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16">
            <Action href="/about" variant="secondary">
              About decodingIT
            </Action>
          </div>
        </Reveal>
      </div>
    </Scene>
  );
}
