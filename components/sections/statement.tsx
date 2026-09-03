import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/ui/scene";

/**
 * Scene 02 — The statement.
 *
 * The one section on the page with no eyebrow rail, no list and no rules: a
 * single oversized line held against two short columns of prose. Its job in
 * the sequence is to be the shape nothing else on the page is, so the reader
 * registers a change of gear rather than another block of the same thing.
 */
export function Statement() {
  return (
    <Scene tone="paper" aria-labelledby="statement-title" className="band">
      <div className="shell grid gap-x-10 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal variant="clip">
            <h2 id="statement-title" className="display max-w-[13ch]">
              When something breaks, there is no argument about whose layer it
              is.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-4 md:col-start-9 md:self-end">
          <Reveal delay={120}>
            <p className="eyebrow">What we do</p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed">
              Full-stack IT infrastructure, cloud, cybersecurity and managed
              services — provided to corporate, SME and government
              organisations across a range of verticals, on the ground in Oman
              and for clients in the UAE and India.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 border-t border-[var(--scene-line)] pt-8 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
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
