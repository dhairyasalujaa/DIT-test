import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { PlansGrid } from "@/components/sections/plans-grid";
import { WhyBand } from "@/components/sections/why-band";
import { TechnologyStrip } from "@/components/sections/technology-strip";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { FieldNotes } from "@/components/sections/field-notes";
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
 * The home page, in decodingIT's own order.
 *
 * Section order and copy follow their live home page exactly — arrival,
 * solutions, service plans, the accountability band, the technology strip,
 * the free calculators, three field notes, and the closing panel. What is
 * different here is the form each section takes, not what it says.
 *
 * The tonal run alternates so no two adjacent sections share a ground:
 * paper → raised → paper → ink → raised → paper → ink.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsGrid />
      <PlansGrid />
      <WhyBand />
      <TechnologyStrip tone="paper-raised" />
      <ToolsGrid />
      <FieldNotes />
      <ClosingCta />
    </>
  );
}
