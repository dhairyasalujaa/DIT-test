# decodingit.com

The decodingIT website — a Next.js App Router site, statically generated, with
no client-side data fetching and no animation, icon or UI component libraries.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # every route prerenders; the build fails on a type error
npm run start
```

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute origin used for canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt`. Defaults to `https://decodingit.com`. Set this on preview deployments so they do not advertise production canonicals. |
| `CONTACT_WEBHOOK_URL` | **Yes, before launch** | Where `/contact` submissions are delivered. Until it is set the form validates normally and then tells the visitor plainly to email `sales@decodingit.com` instead — it never silently discards an enquiry. |

`CONTACT_WEBHOOK_URL` receives a `POST` with `Content-Type: application/json`:

```json
{
  "name": "...",
  "email": "...",
  "company": "...",
  "need": "Managed IT services",
  "message": "...",
  "source": "decodingit.com/contact",
  "receivedAt": "2026-09-03T09:12:00.000Z"
}
```

Any endpoint that accepts JSON works — a form service, an automation webhook, or
an internal API. A non-2xx response shows the visitor a fallback message with the
email address rather than a success screen.

## Where the content lives

Nothing is hardcoded in JSX. Everything the site renders comes from `content/`,
typed by `types/index.ts`, so moving to a CMS later means replacing the data
source rather than rewriting components.

| File | Contains |
| --- | --- |
| `content/site.ts` | Identity, offices, phone numbers, email, opening hours, markets |
| `content/navigation.ts` | Header and footer navigation |
| `content/services.ts` | The six areas, their capabilities, stacks and page metadata |
| `content/approach.ts` | The four phases, how the service works, engagement models |
| `content/about.ts` | Company description, who we serve, leadership (empty — see below) |
| `content/insights.ts` | Articles, as structured blocks (empty — see below) |
| `content/projects.ts` | Delivered work (empty — see below) |

### Three modules are deliberately empty

**`content/projects.ts`** — there are no published case studies. Inventing
clients, logos or percentages would be the fastest way to make a real company
look fraudulent. While the array is empty, `/work` explains why and offers
client references instead. Add real, client-approved entries and the page
becomes a project gallery, with `/work/[slug]` detail pages (problem, approach,
result, technology, next project) and sitemap entries generated from the same
data. That route was verified against fixture projects and then emptied again.

**`leadership` in `content/about.ts`** — naming and describing real people is a
claim about individuals. Supply verified names, roles and credentials and the
section renders on `/about` and adds `employee` entries to the Organization
structured data.

**`content/insights.ts`** — this previously held four full-length articles,
roughly 3,600 words, written by Claude and published under decodingIT's name.
They presented authored opinions as the company's positions, so they were
removed. decodingIT does publish real technical writing; porting it here is a
paste into the `articles` array, and /insights, the sitemap and Article
structured data all populate from it. "Insights" was taken out of the primary
navigation while the section is empty — restore it in `content/navigation.ts`.

These are the site's main remaining gaps. See "Still needs real company input".

## Architecture

```
app/            routes, metadata, sitemap, robots, social images
components/
  layout/       header (scene-aware), footer, page header, wordmark
  motion/       Reveal (server) + one client observer engine
  sections/     the home page's scenes
  hero/         the decode panel
  forms/        contact form
  ui/           Scene, SceneIntro, Action
content/        all copy and data
lib/            metadata helpers, JSON-LD builders, formatting
types/          shared content types
```

### Motion

There is no animation library. `components/motion/reveal.tsx` is a **server**
component that emits a data attribute; a single `IntersectionObserver` in
`components/motion/reveal-engine.tsx` reveals every `[data-reveal]` on the page.
Adding a hundred reveals adds no JavaScript.

Content is never gated behind an animation:

- `prefers-reduced-motion: reduce` disables entrances entirely.
- If `IntersectionObserver` is missing, everything reveals immediately.
- With JavaScript disabled, a `<noscript>` rule in the root layout hands the
  hidden state straight back.

### Scenes

A section declares its ground (`scene-ink`, `scene-paper`, `scene-paper-raised`)
and everything inside inherits `--scene-fg`, `--scene-line` and `--scene-accent`
from it. The same attribute (`data-header-tone`) lets the header read which
scene sits beneath it and recolour as the visitor scrolls.

### SEO

- Unique title and description per page, built through `lib/seo.ts` so no page
  can ship without a canonical.
- JSON-LD in `lib/jsonld.ts`: Organization and WebSite site-wide, plus Service,
  Article and BreadcrumbList where they describe visible content. No reviews,
  ratings, awards or prices are emitted, because none can be substantiated.
- `app/sitemap.ts` and `app/robots.ts` are generated from the same content
  modules the pages use, so they cannot drift.
- The social card is a static 1200×630 PNG (`app/opengraph-image.png`).
  Regenerate it if the brand changes.

## How this content was sourced — read before launch

**The build environment cannot reach decodingit.com** — the gateway refuses it.
The brand, palette, typography and copy in this repo come from a design
extraction of the live homepage supplied by decodingIT, plus search-index
records for the pages the extraction did not cover.

The design system is therefore first-hand: `#005598` brand blue, `#42afea`
accent, `#0b1a2b` navy, Exo 2 / Roboto Condensed / Open Sans, 4px corners and
the faceted-triangle motif all come from the live site. The solution names and
their one-line summaries are the site's own words, as are the Mega/Giga/Tera
service tiers, "one contract, one owner", the ISO certifications and the hero.

**Still second-hand and worth verifying:**

| Check | Where |
| --- | --- |
| The Muscat address (the extraction only carried the Gurugram one) | `content/site.ts` |
| "On the ground in Muscat since 2013" | `content/site.ts` |
| LinkedIn, X and Facebook URLs (they feed `sameAs` structured data) | `content/site.ts` |
| The four-business-hour response commitment | `content/site.ts` |
| The four phases of the Decoding IT Way | `content/approach.ts` |
| Capability bullets on each solution page — written from the summaries, not yet the site's own solution-page copy | `content/services.ts` |

Earlier versions of this site invented a tagline, a palette, a typeface
pairing, a five-stage process, a set of company principles and four full
articles. All of that has been removed and replaced with sourced material. If you find anything left
that decodingIT did not say, it is a bug — report it rather than working
around it.

## Still needs real company input

1. **`CONTACT_WEBHOOK_URL`** — until this is set the contact form cannot deliver.
2. **Real articles** — port decodingIT's existing writing into
   `content/insights.ts` and put Insights back in the primary navigation. Two
   are named in the extraction: "Memory and hardware prices are surging" and
   "The Real Cost of a Ransomware Attack on a Small Business".
3. **Leadership profiles** — verified names, roles and credentials.
4. **Case studies** — any client willing to be named and to stand behind a
   described outcome.
5. **Partner tiers** — the site names Microsoft, HPE, Dell, Cisco, Fortinet,
   Nutanix, Sangfor, Veeam, Acronis and ExaGrid as technologies worked with.
   No partner *tier* is claimed; add those once confirmed. ISO 27001 and ISO
   9001 are stated in the footer, per the extraction.
6. **Free tools** — the live site publishes six calculators (CCTV NVR storage,
   backup storage, M365 licence cost, downtime cost, IP subnet, Windows Server
   licensing). They are not in this build.
