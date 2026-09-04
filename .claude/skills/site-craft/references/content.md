# Sourcing, audits and honest empty states

Writing copy for a real company is the highest-risk part of building their
site, because fabrication here is invisible to every automated check you have.
A linter cannot tell you the company does not have an office in that city.

## Contents

1. [Establish the source first](#establish-the-source-first)
2. [Running a fabrication audit](#running-a-fabrication-audit)
3. [Claims that are always worth challenging](#claims-that-are-always-worth-challenging)
4. [Honest empty states](#honest-empty-states)
5. [Structured data](#structured-data)

---

## Establish the source first

Before writing a word, pin down what counts as authoritative and say so in
the code:

1. **The company's own live site** — best source. If you can't reach it, say
   so out loud rather than substituting search-engine summaries.
2. **A capture the client supplies** — a "Save page as" HTML file, a design
   extraction, a brand deck. Treat it as primary and let it *supersede*
   anything you inferred earlier.
3. **Search results and directory listings** — weakest. They are frequently
   stale or conflated with a similarly-named company. Everything that came
   from here should be re-verified the moment a real source arrives, and
   removed if it doesn't survive.

Put the sourcing rule in a comment at the top of the content files, naming
the source. It's how the next person knows which claims can be edited freely
and which need a citation:

```ts
/**
 * SOURCING: every value here comes from the client's capture of their own
 * home page. That is the primary source and supersedes the search-index
 * guesses these fields held before. Anything that could not be confirmed
 * against it has been removed rather than kept on trust.
 */
```

### A "Save page as" capture usually has no images

"Webpage, Complete" writes a companion `..._files/` folder, and clients
almost always attach only the `.html`. Every logo in it is then an external
reference to a folder you don't have. Check before assuming:

```bash
grep -c 'data:image' capture.html   # 0 → no embedded images
```

Ask for the `_files` folder zipped, and meanwhile build the component so a
dropped-in file upgrades it automatically (a build-time `existsSync` per
asset, falling back to a text treatment). Don't block on it, and don't
substitute lookalike logos.

---

## Running a fabrication audit

Do this as a dedicated pass, with the source open, reading only for truth —
not for style. It finds different things than a design review does.

For each claim on the site, answer: **which line of which source says this?**

Work through these categories, in this order — they're roughly ordered by how
much damage a false one does:

1. **Addresses, phone numbers, emails** — and anything emitted as structured
   data.
2. **Named relationships** — "partner", "reseller", "certified", "authorised"
   plus a vendor name. These are legal claims.
3. **Numbers** — years in business, client counts, uptime, response times,
   team size. Check the *derivation*, not just the number: "13+ years" does
   not license a founding year, and "+" means at least.
4. **Named people** — a name, role and biography is a claim about an
   individual and needs their sign-off, not just the company's.
5. **Client names, logos, case studies, testimonials, reviews.**
6. **Promises** — SLAs, guarantees, response commitments. These read as
   contractual.
7. **Methodology and process** — an invented five-step framework is still
   invented. Watch for internal contradictions (page copy saying four stages,
   metadata saying five) — that's a reliable tell that nobody sourced it.

When something fails, delete it and **leave a comment saying what went and
why**. Otherwise the gap looks like an oversight and someone helpfully fills
it back in.

```ts
/*
 * Removed, and deliberately not replaced:
 *
 * - `since: "2013"` — derived by subtracting "13+ years in the region" from
 *   the current year. The "+" means "at least"; turning it into a founding
 *   year invents precision the company has not published.
 * - `responsePromise` — a four-business-hour reply commitment. It reads as
 *   an SLA and appears nowhere in the company's own material.
 *
 * If they are true, they can come back with a source.
 */
```

### Watch for real-next-to-invented

The normal shape of this failure is not a wholly fabricated block. It's a
real phone number sitting inside an invented address, in one component, with
one comment above it. The realness of the neighbour is what stops anyone
looking.

---

## Claims that are always worth challenging

- A street address on a page where only a city was ever sourced.
- A founding year anywhere near a "N+ years" claim.
- Vendor logos in a "partners" strip that the company's own material doesn't
  carry. (Conversely: a vendor named in *body copy* but absent from *their
  logo strip* is usually correct — the strip is a narrower claim. Don't
  "fix" that by adding the logo.)
- Any number ending in a suspiciously round figure.
- "Trusted by", "used by", "chosen by" + a count.
- Certifications, unless the certificate number or issuer is published.
- Anything in a testimonial. Attributed quotes are the highest-risk content
  on any marketing site.

---

## Honest empty states

When a section has no real content, the failure is not the empty section —
it's the paragraph of invented voice written to fill it.

A real example of getting this wrong: an insights index said "Nothing
published here yet" above two paragraphs, in the client's voice, about
articles "being moved across to this site". Nothing sourced it, and the
company's own home page three sections below linked to three published
articles. The empty state was both fabricated *and* false.

Good empty states:

- **Say the true thing plainly.** "The article bodies live on
  company.com" is fine, and it's true.
- **Link to where the content actually is**, if it exists elsewhere. An
  external link is honest; a stub page pretending to host it is not.
- **Render nothing at all** when even that isn't warranted. Guard the whole
  section: `{items.length > 0 && <Section />}`. A leadership section with no
  consented profiles should simply not exist yet.
- **Leave the shape ready.** Typed content array, renderer built, comment
  explaining what fills it. Adding real entries should require no code.

---

## Structured data

JSON-LD is publishing. A fabricated value here goes to search engines as an
assertion of fact, and it's invisible in the rendered page, so it survives
design reviews indefinitely.

Rules:

- **Only describe content genuinely visible on the page.** Schema is a
  machine-readable summary of what's there, not an extra surface for claims.
- **Never emit a node you can't source completely.** No `PostalAddress`
  without a real address; no `AggregateRating` ever, unless real reviews are
  displayed; no `employee` entries without consented profiles.
- **Drop the schema when you drop the claim.** When an unsourced fact is
  removed from a page, its JSON-LD usually lives in a different file and gets
  forgotten. Grep for it.
- **Prefer fewer, accurate nodes.** `Organization` + `WebSite` +
  `BreadcrumbList` describing real content beats a rich graph that overstates.

The same applies to metadata: an OG description that promises something the
page doesn't deliver is the same failure with better distribution.
