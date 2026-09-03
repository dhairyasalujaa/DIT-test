import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";

/**
 * Scene 02 — The statement.
 *
 * The page arrives out of the dark into paper, which is the brand argument
 * made structurally: the visitor has just moved from encoded to legible.
 * One idea, set large, with the explanation kept deliberately short.
 */
export function Statement() {
  return (
    <Scene tone="paper" aria-labelledby="statement-title">
      <div className="shell">
        <Reveal variant="clip">
          <h2 id="statement-title" className="display max-w-[18ch]">
            You should not need to be an engineer to make good decisions about
            your own systems.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-3" delay={80}>
            <p className="eyebrow">What we do</p>
          </Reveal>
          <Reveal className="md:col-span-5" delay={140}>
            <p className="text-[1.0625rem] leading-relaxed">
              We are an IT services company. We design and install the
              infrastructure, networks and cloud platforms an organisation runs
              on, secure them, and then take responsibility for keeping them
              working — as a managed service, to a standard we write down.
            </p>
          </Reveal>
          <Reveal className="md:col-span-4" delay={200}>
            <p className="text-[1.0625rem] leading-relaxed text-[var(--scene-fg-muted)]">
              What separates the good version of this work from the bad version
              is not the technology. It is whether anyone can explain the estate
              to the people paying for it — and whether the claims made about it
              have been tested.
            </p>
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}
