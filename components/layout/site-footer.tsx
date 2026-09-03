import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { certifications, locations, markets, site, socials } from "@/content/site";
import { Wordmark } from "@/components/layout/wordmark";
import { Reveal } from "@/components/motion/reveal";

/**
 * End credits.
 *
 * The last scene of the page rather than a utility strip: a closing statement
 * at display size, then the details — where we are, how to reach us, what else
 * there is to read — set small and precisely, the way credits are.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-header-tone="ink" className="scene-ink relative">
      <div className="shell pt-(--spacing-scene) pb-12">
        {/* A step quieter than the closing call to action above it. Two
            consecutive display-size statements a few hundred pixels apart
            made the end of every page read as an argument being restated. */}
        <Reveal variant="clip">
          <p className="display-sm max-w-[16ch] text-balance">
            One contract.
            <br />
            <span className="text-[var(--scene-accent)]">One</span> owner.
          </p>
        </Reveal>

        {/*
          No call to action here. The closing scene immediately above already
          makes the invitation, with a reason attached — repeating the same
          button and address a few hundred pixels later spends the ask twice
          and makes the ending feel like a sales page rather than credits.
          The address and both office numbers are in the columns below.
        */}

        <hr className="rule mt-16 border-t" />

        {/*
          The columns sum to twelve at both breakpoints. They used to add up
          to fifteen at `md`, so "Reach us" wrapped and left column twelve
          empty, and at `lg` a `col-start-10` left column nine dead.
          md: 6 / 3 / 3, then Reach on its own row.  lg: 4 / 2 / 2 / 4.
        */}
        <div className="grid gap-x-10 gap-y-12 pt-12 md:grid-cols-12">
          {/* Offices */}
          <div className="md:col-span-6 lg:col-span-4">
            <p className="eyebrow">Offices</p>
            <ul className="mt-6 space-y-8">
              {locations.map((location) => (
                <li key={location.id}>
                  <p className="text-sm text-[var(--scene-fg)]">
                    {location.city}, {location.country}
                    <span className="text-[var(--scene-fg-muted)]"> — {location.role}</span>
                  </p>
                  <address className="mt-2 text-sm leading-relaxed text-[var(--scene-fg-muted)] not-italic">
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={`tel:${location.phoneHref}`}
                      className="link-underline mt-1 inline-block hover:text-[var(--scene-fg)]"
                    >
                      {location.phone}
                    </a>
                    {location.email && (
                      <a
                        href={`mailto:${location.email}`}
                        className="link-underline mt-1 block hover:text-[var(--scene-fg)]"
                      >
                        {location.email}
                      </a>
                    )}
                  </address>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation columns */}
          {footerNav.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="md:col-span-3 lg:col-span-2"
            >
              <p className="eyebrow">{group.title}</p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-[var(--scene-fg-muted)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-rise)] hover:text-[var(--scene-fg)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Reach */}
          <div className="md:col-span-6 lg:col-span-4">
            <p className="eyebrow">Reach us</p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--scene-fg-muted)]">
              <li>
                <a href={`mailto:${site.email}`} className="link-underline hover:text-[var(--scene-fg)]">
                  {site.email}
                </a>
              </li>
              <li className="pt-1">{site.responsePromise}</li>
            </ul>
            <p className="eyebrow mt-10">Certified</p>
            <p className="mt-3 text-sm text-[var(--scene-fg-muted)]">
              {certifications.join(" · ")}
            </p>

            <p className="eyebrow mt-10">We serve</p>
            <p className="mt-3 text-sm text-[var(--scene-fg-muted)]">
              {markets.map((m) => (m === "United Arab Emirates" ? "UAE" : m)).join(" · ")}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-sm text-[var(--scene-fg-muted)] hover:text-[var(--scene-fg)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="rule mt-16 border-t" />

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="decodingIT — home" className="-m-2 p-2">
            <Wordmark />
          </Link>
          <p className="eyebrow">
            © {year} {site.legalName} — Oman · United Arab Emirates · India
          </p>
        </div>
      </div>
    </footer>
  );
}
