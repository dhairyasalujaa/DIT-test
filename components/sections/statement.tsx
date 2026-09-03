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
          <h2 id="statement-title" className="display max-w-[19ch]">
            One agreement. Every layer. A named account manager.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-3" delay={80}>
            <p className="eyebrow">What we do</p>
          </Reveal>
          <Reveal className="md:col-span-5" delay={140}>
            <p className="text-[1.0625rem] leading-relaxed">
              decodingIT is a Muscat-based IT solutions company. We provide IT
              services, solutions and products to corporate, SME and government
              organisations across a range of verticals — working on the ground
              in Oman, and for clients in the UAE and India.
            </p>
          </Reveal>
          <Reveal className="md:col-span-4" delay={200}>
            <p className="text-[1.0625rem] leading-relaxed text-[var(--scene-fg-muted)]">
              As a value-added reseller we work with globally recognised
              hardware and software vendors, and our focus is the management,
              access and monitoring of IT infrastructure and operations — the
              part that has to keep working after the project ends.
            </p>
          </Reveal>
        </div>
      </div>
    </Scene>
  );
}
