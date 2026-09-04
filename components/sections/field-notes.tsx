import { featuredNotes } from "@/content/insights";
import { insightsSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { CardAffordance } from "@/components/ui/card-link";

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
        <SceneIntro id="notes-title" title={insightsSection.title} />

        <ul className="after-intro grid gap-4 md:grid-cols-3">
          {featuredNotes.map((note, i) => (
            <Reveal as="li" key={note.href} delay={i * 80}>
              <a
                href={note.href}
                className="panel group/card flex h-full flex-col"
                target="_blank"
                rel="noreferrer"
              >
                <p className="label">
                  {note.topic} · {note.readingMinutes} min
                </p>
                <h3 className="panel-title mt-4 flex-1 text-[1.125rem] leading-snug tracking-[-0.02em]">
                  {note.title}
                </h3>
                <CardAffordance label="Read" external className="mt-6" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
