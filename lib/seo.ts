import type { Metadata } from "next";
import { site, siteUrl } from "@/content/site";

interface PageMetaInput {
  /** Page-specific title. The site name is appended unless `exactTitle`. */
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services". Home is "/". */
  path: string;
  /** Use the title verbatim, without the " | decodingIT" suffix. */
  exactTitle?: boolean;
  /** Override the social image path (root-relative or absolute). */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/**
 * The default social card, rendered once at 1200x630 and served statically.
 *
 * It is referenced explicitly rather than relying on Next's file convention:
 * a page that exports its own `openGraph` object replaces the inherited one
 * wholesale, which silently drops the convention-supplied image.
 */
export const defaultSocialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "decodingIT — We make IT E.A.S.Y.",
} as const;

export function canonical(path: string): string {
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds page metadata with a canonical URL and complete Open Graph data.
 * Centralised so no page can ship without a canonical or a unique description.
 */
export function pageMetadata({
  title,
  description,
  path,
  exactTitle = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  const resolvedTitle = exactTitle ? title : `${title} | ${site.name}`;
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: resolvedTitle }]
    : [defaultSocialImage];

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: site.name,
      locale: "en",
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
