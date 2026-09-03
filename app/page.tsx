import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Statement } from "@/components/sections/statement";
import { ServicesIndex } from "@/components/sections/services-index";
import { OperatingModel } from "@/components/sections/operating-model";
import { ProcessPreview } from "@/components/sections/process-preview";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  exactTitle: true,
  description:
    "Managed IT, cyber security, cloud, networking and Microsoft 365 for organisations in Oman, the UAE and India. Technology designed, built and run properly.",
  path: "/",
});

/**
 * The home page is a sequence of scenes, in this order for a reason:
 *
 *   Arrival     → curiosity      what is this?
 *   Statement   → clarity        what do they do?
 *   Services    → relevance      can they do the thing I need?
 *   Proof       → confidence     can they actually do it?
 *   Approach    → trust          what would working with them be like?
 *   Insights    → authority      do they understand this properly?
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
      <OperatingModel />
      <ProcessPreview />
      <ClosingCta />
    </>
  );
}
