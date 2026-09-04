import { tools } from "@/content/tools";
import { toolsSection } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { ArrowUpRight } from "@/components/icons";

/**
 * The free calculators.
 *
 * Names and descriptions are decodingIT's own. The calculators are live
 * applications on decodingit.com rather than pages in this build, so each row
 * links out — marked as an external destination rather than dressed up as an
 * internal one.
 */
export function ToolsGrid() {
  return (
    <Scene tone="paper-raised" id="tools" aria-labelledby="tools-title">
      <div className="shell">
        <SceneIntro id="tools-title" eyebrow="Free tools" title={toolsSection.title} lede={toolsSection.lede} />

        <ul className="after-intro grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.name} delay={(i % 3) * 60}>
              <a
                href={tool.href}
                className="panel group/card flex h-full flex-col"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex items-start justify-between gap-4">
                  <h3 className="panel-title text-[1.0625rem] leading-snug font-medium tracking-[-0.02em]">
                    {tool.name}
                    {tool.isNew && (
                      <span className="ml-2 inline-flex translate-y-[-1px] rounded-full bg-[var(--scene-accent)]/12 px-2 py-0.5 align-middle text-[0.6875rem] font-medium text-[var(--scene-accent)]">
                        New
                      </span>
                    )}
                  </h3>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-[var(--scene-fg-muted)] transition-transform duration-[var(--dur-sweep)] ease-[var(--ease-out-expo)] group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
                  <span className="sr-only">(opens on decodingit.com)</span>
                </span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                  {tool.description}
                </p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </Scene>
  );
}
