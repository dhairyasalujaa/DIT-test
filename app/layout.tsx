import type { Metadata, Viewport } from "next";
// Inter Tight carries everything a reader reads. It is the compressed
// grotesk the design brief specifies, and the compression is the point: at
// display sizes it sets tighter and darker than a normal-width grotesk, which
// is most of what makes a headline read as editorial rather than as UI.
// Geist Mono stays for the bracketed eyebrows and numeric metadata.
import { Inter_Tight } from "next/font/google";
import { GeistMono } from "geist/font/mono";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600"],
});
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
      className={`js h-full ${interTight.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* The theme, applied before the first pixel is painted.

            This has to be a blocking inline script in the head. Doing it in a
            component's effect means the browser paints light, then React
            mounts, then it flips — the flash that every themed site is judged
            by. It reads the remembered choice, falls back to the operating
            system's, and writes one attribute. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('dit-theme');" +
              "if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}" +
              "document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()",
          }}
        />

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
