import { locations, markets, site, siteUrl, socials } from "@/content/site";
import { leadership } from "@/content/about";
import type { Article, Service } from "@/types";
import { canonical } from "@/lib/seo";

/**
 * Structured data.
 *
 * Every graph here describes content that is actually visible on the page it
 * is attached to. Nothing that cannot be substantiated — reviews, ratings,
 * awards, prices, employee counts — is emitted, deliberately.
 */

const organisationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organisationId,
    name: site.name,
    legalName: site.legalName,
    url: `${siteUrl}/`,
    description: site.description,
    email: site.email,
    areaServed: markets.map((m) => ({ "@type": "Country", name: m })),
    address: locations.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.addressLines.slice(0, -1).join(", "),
      addressLocality: location.city,
      addressCountry: location.country,
    })),
    contactPoint: locations.map((location) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: location.phoneHref,
      email: site.email,
      areaServed: location.country,
      availableLanguage: ["English"],
    })),
    sameAs: socials.map((s) => s.href),
    // Only emitted once real, consented profiles exist in content/about.ts.
    ...(leadership.length > 0
      ? {
          employee: leadership.map((person) => ({
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
          })),
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: site.shortName,
    description: site.description,
    publisher: { "@id": organisationId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: canonical(crumb.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: canonical(`/services/${service.slug}`),
    serviceType: service.name,
    provider: { "@id": organisationId },
    areaServed: markets.map((m) => ({ "@type": "Country", name: m })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: capability.title,
          description: capability.description,
        },
      })),
    },
  };
}

export function articleSchema(article: Article) {
  const url = canonical(`/insights/${article.slug}`);
  return {
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    // Published under the company name; we do not attribute writing to a
    // named individual without their sign-off.
    author: { "@id": organisationId },
    publisher: { "@id": organisationId },
    inLanguage: "en",
    articleSection: article.topic,
  };
}

/** Wraps one or more node objects into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
