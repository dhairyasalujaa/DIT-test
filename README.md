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
| `content/services.ts` | The six practices, their capabilities, stacks and page metadata |
| `content/approach.ts` | Engagement stages, commitments, engagement shapes |
| `content/about.ts` | Manifesto, beliefs, who we serve, leadership (empty — see below) |
| `content/insights.ts` | Articles, as structured blocks |
| `content/projects.ts` | Delivered work (empty — see below) |

### Two modules are deliberately empty

**`content/projects.ts`** — there are no published case studies. Inventing
clients, logos or percentages would be the fastest way to make a real company
look fraudulent. While the array is empty, `/work` explains why and offers
client references instead. Add real, client-approved entries and the page
becomes a project gallery, with `/work/[slug]` detail pages and sitemap entries
generated from the same data.

**`leadership` in `content/about.ts`** — naming and describing real people is a
claim about individuals. Supply verified names, roles and credentials and the
section renders on `/about` and adds `employee` entries to the Organization
structured data.

Both are the site's main remaining gaps for E-E-A-T. See "Still needs real
company input" below.

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

## Still needs real company input

1. **`CONTACT_WEBHOOK_URL`** — until this is set the contact form cannot deliver.
2. **Leadership profiles** — verified names, roles and credentials.
3. **Case studies** — any client willing to be named and to stand behind a
   described outcome.
4. **Trading history** — published sources disagree on decodingIT's founding
   year and years in business, so the site asserts neither. Supply the correct
   figures if they should appear.
5. **Vendor partnerships and certifications** — no partner tier or accreditation
   is claimed anywhere. Add them once the current status is confirmed.
6. **LinkedIn and Facebook URLs** in `content/site.ts` should be checked against
   the live profiles before launch, as they feed `sameAs` structured data.
