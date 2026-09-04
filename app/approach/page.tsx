import type { Metadata } from "next";
import { commitments, portal } from "@/content/approach";
import { plans } from "@/content/plans";
import { bandSection } from "@/content/home";
import { PageHeader } from "@/components/layout/page-header";
import { Scene, SceneIntro } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { Action } from "@/components/ui/action";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Approach",
  description:
    "One partner, every layer, full accountability — how an engagement with Decoding IT is set up and who owns it.",
  path: "/approach",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Approach", path: "/approach" },
];

/**
 * Our Approach.
 *
 * Built entirely from what decodingIT publishes about how they work: the
 * three commitments in their accountability band, the portal their navigation
 * describes, and the six plans they scope engagements with. There is no
 * methodology diagram here because they do not publish one.
 */
export default function ApproachPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        title={bandSection.title}
        crumbs={crumbs}
        lede="One team across every layer, one agreement that covers all of it, and a named account manager who owns whether the response times in it are met."
      />

      <Scene tone="paper" aria-labelledby="commitments-title">
        <div className="shell">
          <SceneIntro
            id="commitments-title"
            eyebrow="What we commit to"
            title="What you are actually buying."
            lede="Three things decodingIT states about how the service works, and holds itself to."
          />

          <ul className="after-intro grid gap-4 md:grid-cols-3">
            {commitments.map((commitment, i) => (
              <Reveal as="li" key={commitment.title} delay={i * 80}>
                <div className="panel h-full">
                  <h3 className="title text-[1.25rem]">{commitment.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    {commitment.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      <Scene tone="paper-raised" aria-labelledby="portal-title">
        <div className="shell">
          <SceneIntro
            id="portal-title"
            eyebrow="Visibility"
            title="You can see what we are doing."
            lede={portal.summary}
            aside={
              <Action href={portal.href} variant="secondary" icon="up-right">
                {portal.name}
              </Action>
            }
          />
        </div>
      </Scene>

      <Scene tone="paper" aria-labelledby="scope-title">
        <div className="shell">
          <SceneIntro
            id="scope-title"
            eyebrow="Scope"
            title="How much you hand over is your call."
            lede="Six ways to work with us — from fixing what is in front of you today to running the whole estate, or extending a team you already have."
            aside={
              <Action href="/services" variant="secondary">
                Compare the six plans
              </Action>
            }
          />

          <ul className="after-intro grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal as="li" key={`${plan.prefix}${plan.accent}`} delay={(i % 3) * 60}>
                <div className="panel h-full">
                  <p className="label">{plan.tag}</p>
                  <h3 className="mt-3 text-[1.25rem] leading-none font-medium tracking-[-0.03em]">
                    {plan.prefix}
                    <span className="text-[var(--scene-accent)]">{plan.accent}</span>
                    {plan.suffix ? <span className="font-normal"> {plan.suffix}</span> : null}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                    <span className="text-[var(--scene-fg)]">For:</span> {plan.audience}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Scene>

      <ClosingCta />
    </>
  );
}
