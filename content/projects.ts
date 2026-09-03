import type { Project } from "@/types";

/**
 * Delivered client work.
 *
 * Intentionally empty.
 *
 * decodingIT works for corporate, SME and government clients, and that work is
 * not publishable without their consent. Inventing case studies — plausible
 * clients, plausible percentages, plausible logos — would be the single fastest
 * way to make a credible company look fraudulent to anyone who checked.
 *
 * So `/work` currently presents the *shape* of an engagement (see
 * `engagementShapes` in `content/approach.ts`), which is honest and still
 * useful to a buyer. Add real, client-approved entries to this array and the
 * page switches to a full project gallery, with `/work/[slug]` detail pages,
 * sitemap entries and CreativeWork structured data generated automatically.
 *
 * Only include a `result` the client has confirmed in writing.
 */
export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
