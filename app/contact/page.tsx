import type { Metadata } from "next";
import { locations, site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Scene } from "@/components/ui/scene";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { Mail, Phone, Pin } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact decodingIT — Muscat & Gurugram",
  exactTitle: true,
  description:
    "Tell us what is not working and we will tell you what we would do about it. Offices in Muscat, Oman and Gurugram, India.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHeader
        title="Tell us what is not working."
        crumbs={crumbs}
        lede="A description of the problem in your own words is enough to start. A real engineer will get back to you within four business hours — not an auto-responder, and not a salesperson."
      />

      <Scene tone="paper">
        {/* The site's one gutter, here too: gap-x-16 gave this page column
            boundaries no other page shared. 7 + 4 starting at 9 = twelve. */}
        <div className="shell grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h2 className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]">Direct</h2>
              <ul className="mt-6 space-y-4 text-[0.9375rem]">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-[var(--scene-fg-muted)]" />
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </li>

              </ul>
            </Reveal>

            <Reveal delay={90}>
              <h2 className="mt-12 text-[0.9375rem] font-semibold text-[var(--scene-fg)]">Offices</h2>
              <ul className="mt-6 space-y-8">
                {locations.map((location) => (
                  <li key={location.id}>
                    <h3 className="text-[1.0625rem] tracking-[-0.02em]">
                      {location.city}, {location.country}
                    </h3>
                    <p className="label mt-2">{location.role}</p>
                    <address className="mt-3 flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)] not-italic">
                      <Pin className="mt-1 size-4 shrink-0" />
                      <span>
                        {location.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </address>
                    <p className="mt-3 flex items-center gap-3 text-[0.9375rem]">
                      <Phone className="size-4 shrink-0 text-[var(--scene-fg-muted)]" />
                      <a href={`tel:${location.phoneHref}`} className="link-underline">
                        {location.phone}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="mt-12 text-[0.9375rem] font-semibold text-[var(--scene-fg)]">Response</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--scene-fg-muted)]">
                {site.responsePromise}
              </p>
            </Reveal>
          </aside>
        </div>
      </Scene>
    </>
  );
}
