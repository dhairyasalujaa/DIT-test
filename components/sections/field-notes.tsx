import { fieldNotes } from "@/content/insights";
import { insightsSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Scene } from "@/components/ui/scene";
import { ArrowUpRight } from "@/components/icons";

/**
 * Three published pieces, as the live home page lists them.
 *
 * Titles, topics and reading times are decodingIT's own. The article bodies
 * live on decodingit.com and were not written here, so each card links out to
 * the real piece rather than to a stub.
 */
export function FieldNotes() {
  return (
    <Scene tone="paper" id="insights" aria-labelledby="notes-title">
      <div className="shell">
        <Reveal variant="rule">
          <hr className="rule border-t" />
        </Reveal>

        <div className="mt-8 max-w-(--measure-head)">
          <RevealText as="h2" id="notes-title" className="display-sm">
            {insightsSection.title}
          </RevealText>
        </div>

        <ul className="after-intro grid gap-4 md:grid-cols-3">
          {fieldNotes.map((note, i) => (
            <Reveal as="li" key={note.href} delay={i * 80}>
              <a
                href={note.href}
                className="panel group/note flex h-full flex-col"
                target="_blank"
                rel="noreferrer"
              >
                <p className="label">
                  {note.topic} · {note.readingMinutes} min
                </p>
                <h3 className="panel-title mt-4 flex-1 text-[1.125rem] leading-snug tracking-[-0.02em]">
                  {note.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--scene-accent)]">
                  Read
                  <ArrowUpRight className="size-3.5 transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/note:-translate-y-0.5 group-hover/note:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
