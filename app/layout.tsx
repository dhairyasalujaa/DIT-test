import type { Metadata, Viewport } from "next";
// Geist, self-hosted through next/font. Two faces only: the sans carries
// everything a reader reads, the mono carries everything the site states about
// itself — labels, indices, counts, spec values.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealEngine } from "@/components/motion/reveal-engine";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { TopBar } from "@/components/layout/top-bar";
import { JsonLd } from "@/components/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { site, siteUrl } from "@/content/site";
import { defaultSocialImage } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Pages set their own full title; this is the fallback shape.
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: siteUrl }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false },
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    url: `${siteUrl}/`,
    images: [defaultSocialImage],
  },
  twitter: { card: "summary_large_image", images: [defaultSocialImage.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1a2b" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // `js` is set server-side so the scroll-entrance styles apply before
      // first paint — no flash of content appearing and then hiding. The
      // <noscript> block below hands everything straight back if JS never runs.
      className={`js h-full ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No JavaScript: hand the hidden state straight back — but only
            where the browser cannot run the scroll-driven path, which is pure
            CSS and works perfectly well without scripting. */}
        <noscript>
          <style>{`@supports not (animation-timeline: view()){[data-reveal]{opacity:1!important;transform:none!important;scale:1 1!important}.rt-word{transform:none!important}}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-brand focus:text-white"
        >
          Skip to content
        </a>
        <TopBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealEngine />
        <SmoothScroll />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
