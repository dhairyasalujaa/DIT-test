import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Statement } from "@/components/sections/statement";
import { ServicesIndex } from "@/components/sections/services-index";
import { ServiceTiers } from "@/components/sections/service-tiers";
import { OperatingModel } from "@/components/sections/operating-model";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { ProcessPreview } from "@/components/sections/process-preview";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Decoding IT — Managed IT, Cloud, Cybersecurity & Consultancy",
  exactTitle: true,
  description: site.description,
  path: "/",
});

/**
 * The home page is a sequence of scenes, in this order for a reason:
 *
 *   Arrival     → curiosity      what is this?
 *   Statement   → clarity        what do they do?
 *   Solutions   → relevance      can they do the thing I need?
 *   Tiers       → fit            how much of it would I hand over?
 *   Proof       → confidence     can they actually do it?
 *   Technology  → substance      what is it built on?
 *   Approach    → trust          what would working with them be like?
 *   Resolution  → action         how do I start?
 *
 * Each scene answers the question the previous one raises.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesIndex />
      <ServiceTiers />
      <OperatingModel />
      <TechnologyStrip tone="paper-raised" />
      <ProcessPreview />
      <ClosingCta />
    </>
  );
}
