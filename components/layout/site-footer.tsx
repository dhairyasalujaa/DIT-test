import Link from "next/link";
import { footerNav } from "@/content/navigation";
import {
  certifications,
  locations,
  marketsShort,
  site,
  socials,
  whatsapp,
} from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Wordmark } from "@/components/layout/wordmark";
import { slugify } from "@/lib/format";
import { externalProps } from "@/lib/motion";

/**
 * The footer.
 *
 * Four columns in decodingIT's own grouping — Key Solutions, Services,
 * Resources and Contact — with their ISO certifications, their "We serve" row
 * and their four social destinations. The Gurugram office is the address
 * their own footer prints; Muscat is added because it is the headquarters and
 * omitting it from a site-wide footer would be odd.
 *
 * Columns sum to twelve at both breakpoints: md 6/3/3 then contact on its own
 * row, lg 3/3/3/3 in one.
 */
export function SiteFooter() {
  const india = locations.find((l) => l.id === "gurugram") ?? locations[0];

  return (
    <footer data-header-tone="ink" className="scene-ink pt-(--spacing-scene) pb-12">
      <div className="shell">
        <Reveal>
          <Link href="/" className="inline-block text-[var(--scene-fg)]" aria-label={`${site.name} — home`}>
            <Wordmark />
          </Link>
        </Reveal>

        <RevealText as="p" className="display-sm mt-8 max-w-[18ch]" accent="One owner.">
          One contract.
        </RevealText>

        <hr className="rule mt-16 border-t" />

        <div className="grid gap-x-10 gap-y-12 pt-12 md:grid-cols-12">
          {footerNav.map((group) => (
            // aria-labelledby is a space-separated list of IDREFs, so a
            // title like "Key Solutions" would resolve to two ids that do not
            // exist and leave the landmark unnamed.
            <nav
              key={group.title}
              aria-labelledby={`f-${slugify(group.title)}`}
              className="md:col-span-4 lg:col-span-3"
            >
              <h2
                id={`f-${slugify(group.title)}`}
                className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]"
              >
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...externalProps(item.href)}
                      className="link-underline text-sm text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:text-[var(--scene-fg)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {group.title === "Resources" && (
                <div className="mt-8">
                  <p className="label">Certified</p>
                  <p className="mt-1 text-sm text-[var(--scene-fg)]">
                    {certifications.join("  ·  ")}
                  </p>
                </div>
              )}
            </nav>
          ))}

          <div className="md:col-span-12 lg:col-span-3">
            <h2 className="text-[0.9375rem] font-semibold text-[var(--scene-fg)]">Contact</h2>
            <address className="mt-5 space-y-3 text-sm text-[var(--scene-fg-muted)] not-italic">
              {india.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a
                href={`tel:${india.phoneHref}`}
                className="link-underline block transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
              >
                {india.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="link-underline block transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
              >
                {site.email}
              </a>
            </address>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="link-underline text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
                >
                  Chat with us
                </Link>
              </li>
              <li>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
                >
                  {whatsapp.label}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <p className="label">We serve</p>
              <p className="mt-1 text-sm text-[var(--scene-fg)]">{marketsShort.join("  ·  ")}</p>
            </div>
          </div>
        </div>

        <hr className="rule mt-16 border-t" />

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-[var(--scene-fg-muted)]">
            {/* Evaluated at build time, because every route here is static.
                It is correct on the day the site ships and goes stale only
                if the site is never rebuilt — which is the right trade for
                not shipping a client component to print one number. */}
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="link-underline hover:text-[var(--scene-fg)]">
              {site.legalName}
            </Link>
            . All Rights Reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  {...externalProps(social.href)}
                  className="link-underline text-[0.8125rem] text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] hover:text-[var(--scene-fg)]"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
