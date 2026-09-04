# decodingIT — handoff

Everything a next person (or a next session) needs to pick this up without
re-deriving it. Written to be read top to bottom once, then used as a
reference.

---

## 1. What this is

A rebuild of **decodingit.com** in Next.js 16 (App Router, Turbopack), React
19, TypeScript strict, Tailwind CSS v4. 20 static routes, no database, no
runtime API.

Branch: `claude/decodingit-master-website-xm7lof`

```bash
npm install
npm run dev      # localhost:3000
npm run build    # 20 routes prerender
npm run lint
```

---

## 2. The rule that governs every decision

**Nothing on this site may be invented.** No clients, logos, metrics,
testimonials, awards, prices, addresses, dates or people that cannot be
traced to a source decodingIT published.

This is not a stylistic preference. It has already been violated once in this
project and caught: an earlier revision carried a **Muscat street address**
("Building 301, Way 4405, Al Udhaiba / PB 1811, PC 133"), labelled it the
headquarters, and emitted it as a `PostalAddress` in the Organization
JSON-LD — published to search engines as fact. It appears in no source the
client supplied. It is gone.

Removed in the same pass, and deliberately not replaced:

| Removed | Why |
| --- | --- |
| Muscat street address | In no source. Was in structured data. |
| `since: "2013"` | Derived by subtracting "13+ years" from the current year. "+" means "at least". |
| A four-business-hour reply SLA | Reads as a contractual commitment. No source. |
| Value-added-reseller claims naming Microsoft / HPE / Dell | Naming a vendor relationship is a legal claim. |
| Government clients | No source. |
| "Engineers on the ground in Muscat" | No source. |
| A four-phase methodology | Invented. Its own page metadata described five stages. |
| Four articles under decodingIT's byline | Written by Claude. Removed. |

**When a fact cannot be sourced, the section gets smaller.** It does not get
filled with something plausible. `content/about.ts` still carries an empty
`leadership: []` for exactly this reason — the company has named staff, but
publishing a person's name, role and biography is a claim about an individual
and needs their sign-off. The section renders only when real entries land.

### Facts that ARE sourced

- Oman phone `+968 2284 4777` — their own WhatsApp click-to-chat dials it.
- India phone `+91 87555 07444` and the Gurugram address — their footer.
- The 17 vendors in the marquee — their `hp-partners` strip, in their order.
- The six plans (Mega/Giga/Tera), tags, descriptions and `For:` audiences —
  their "engagements built around your situation" section, verbatim.
- The five published articles — their home page grid and Insights menu.
- "Veeam, Acronis and ExaGrid" in the Business Continuity copy — their words.
  Acronis is correctly *absent* from the logo strip, because their strip does
  not carry it.

---

## 3. Sources

The live domain **decodingit.com is hard-blocked by this sandbox's egress
proxy** and has been for the entire project. It cannot be fetched. Everything
comes from two client-supplied files:

1. **`216685c1-Decoding_IT___Managed_IT_Cloud_Cybersecurity__Consultancy.html`**
   — a browser "Save page as" capture of their real home page. This is the
   primary source and supersedes anything derived from search results.
   Structure extracted to `scratchpad/extract/structure.txt` (1219 lines).
2. **`5267ed5a-designextract.md`** — the client's earlier design extraction.
   Confirms the Oman phone. Contains **no** Muscat street address.

### ⚠ The logo files are not in that capture

"Save page as → Webpage, Complete" writes a companion `..._files/` folder.
Only the `.html` arrived. Every logo is an external reference
(`./…_files/microsoft-logo.png`); there are **zero `data:` URIs** and no
inline SVG logos. Verified by grep.

**To get real logos in:** zip the `_files` folder, or attach the 17 PNGs.
Drop them in `public/logos/` and the marquee upgrades from name pills to
images with no code change — `components/sections/technology-strip.tsx` does
a build-time `existsSync` per vendor.

Until then the strip runs each vendor's name in a pill, which is decodingIT's
own `hp-partner-pill` component in its non-image state — their pattern, not a
placeholder invented here.

---

## 4. Architecture

```
app/                    routes; every page is static
  globals.css           the entire design system — tokens, scenes, motion
components/
  hero/                 Hero, Facets/ArtField (brand-triangle SVG artwork)
  layout/               TopBar, SiteHeader (mega nav), PageHeader, Footer, Wordmark
  motion/               RevealText, Reveal, RevealEngine, SmoothScroll (Lenis)
  sections/             one file per home-page band
  ui/                   Action (the CTA), CardAffordance, Scene/SceneIntro
content/                all copy, typed, one file per domain — NO copy in components
lib/                    seo.ts, jsonld.ts, motion.ts, format.ts
types/                  shared shapes
```

**Copy lives in `content/`, never in a component.** That is what made the
fabrication audit possible in one pass: every claim on the site is greppable
in one directory.

### The scene system

Tokens are re-declared per scene rather than hard-coded per component:
`--scene-fg`, `--scene-fg-muted`, `--scene-line`, `--scene-accent`,
`--scene-bg`, `--scene-wash`, `--scene-panel`, `--scene-cta-*`,
`--scene-danger`.

Four scenes: `scene-ink` (navy), `scene-paper`, `scene-paper-raised`,
`scene-paper-tint`. A component written against the tokens works on all four
with no variant prop. `<Scene tone="ink|paper|…">` sets them.

The header reads which scene is behind it and recolours, via a direct
`document.elementsFromPoint` hit-test at the header's midpoint, once per rAF
(`site-header.tsx`). It used to be an IntersectionObserver band, which could
not track a sticky header and sampled *inside* it — every interior page had
near-black nav on navy at 1.03:1.

---

## 5. Motion

Native CSS scroll-driven animation: `animation-timeline: view()` with
`animation-range`, plus `linear()` easing curves. No JS animation loop.
Lenis (`components/motion/smooth-scroll.tsx`) moves the real scroll position,
so `view()`, `position: sticky` and IntersectionObserver all keep working.

Four curves, in `globals.css`:

| Token | Job |
| --- | --- |
| `--ease-rise` | Type and panels on a **time** timeline. Fast off the mark, long tail. |
| `--ease-rise-scroll` | The same rise on a **scroll** timeline. See §5.2. |
| `--ease-draw` | Rules and bars drawing in. Symmetric. |
| `--ease-settle` | Small objects arriving. 2% overshoot. |
| `--ease-drift` | Parallax. Strictly `linear(0, 1)` — anything else reads as lag. |

### 5.1 ⚠ `overflow: hidden` silently kills `view()` on descendants

**This cost a full round of "I still don't see any animations".**

`RevealText` puts each word in its own clipping mask. That mask used
`overflow: hidden` — which makes an element a **scroll container**. A
`view()` timeline resolves against its nearest ancestor scroll container, so
every word was measuring itself against its own mask, which it fills exactly.
Progress pinned at 1 forever. The animation was attached, native, and
permanently finished.

Confirmed, not inferred: `getAnimations()[0].timeline.source` returned
`SPAN.rt-mask`, and a word 828px down a 900px viewport reported progress 1.0.

**Fix: clip with `clip-path: inset(0)`.** Identical clipping at the border
box, no scroll container.

If you ever add `overflow: hidden` above something animated by `view()`, you
have just turned it off. Use `clip-path`.

### 5.2 `entry` ranges are sized by the element, not the viewport

An element's `entry` range spans **the element's own height**. For a
paragraph that is fine. For a single word it is about 40px of scrolling, so
`animation-range: entry 4% entry 88%` finished before the word cleared the
bottom edge.

Both ends of `.rt-word` are now `cover`-based — about 180px of real
scrolling — and the per-word `--w` offset shifts each word's **whole range**
later, which is what makes a line cascade rather than arrive as a block.

### 5.3 A time curve is the wrong curve for a scroll timeline

`--ease-rise` is 98% travelled at half progress. On a clock that snaps and
settles. Driven by scroll position it means the word lands instantly and then
creeps: **1.4px of travel at 52% progress**, measured. `--ease-rise-scroll`
spreads the distance across the range — same word, same position, **22px**.

### 5.4 The hero runs a load choreography, not a scroll one

The hero is on screen at first paint, so a scroll timeline would resolve
instantly. `.rt-enter .rt-word` overrides `animation-timeline: auto` and
**restates the whole `animation` shorthand**, because those rules are
unlayered and the scroll shorthand deliberately carries no duration.
Overriding the timeline alone left the hero on a 0s animation — it snapped.

**Cascade rule worth remembering: unlayered declarations beat any `@layer`,
regardless of specificity.**

### 5.5 `prefers-reduced-motion`

Kills every scroll timeline and every infinite animation. The marquee is
**stopped, not slowed** — an infinite animation must not merely be slower.
Lenis is never instantiated. All asserted in `motion.mjs`.

---

## 6. Design decisions the client made

These are decisions, not defaults. Do not "fix" them without asking.

| Decision | Detail |
| --- | --- |
| **No micro-type, anywhere** | "Never add those kind of small subtitles or whatever anywhere ever." All kicker labels, row numerals, and mono/uppercase/letterspaced eyebrows are gone. Their real site *does* carry kickers above every section heading — this is a deliberate divergence. |
| **Nav always transparent** | "Always transparent, always visible. No fill, no blur, ever." |
| **Motion stronger than restrained** | "stronger than now but still clean and unique" — not the standard fade-up. |
| **Lower-case headings** | Their own headings are lower-case ("what we are seeing in the field"). Preserved deliberately. |

### Small type that stayed, and why

Removing these would break the page, so they were restyled to plain small
sans (`.label`) rather than deleted:

- Contact form field labels — `<label for>`.
- Breadcrumbs — navigation, and described by `BreadcrumbList` JSON-LD.
- Footer column headings — the accessible names of the footer's nav groups.
- Card meta (topic · reading time), plan tags, `For:` audiences — all
  decodingIT's own content, not decoration.
- **"SOLUTIONS" under the wordmark** — the only mono/uppercase string left in
  the rendered HTML, twice per page. It is part of the logo lockup, not a
  section kicker. Flag it if the client wants it gone.

### Open question for the client

The always-transparent bar means page content scrolls **under** the wordmark.
Contrast passes (the header text carries a halo via `.chrome-legible`), but
the collision is visible, and worst on mobile. A soft gradient scrim is a
one-line change. It was not made, because the client explicitly ruled out
fill and blur when asked.

---

## 7. Test harness

Playwright + Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
Scripts live in the scratchpad, not the repo. Run against a production build:

```bash
npm run build && PORT=3111 npm run start
node audit.mjs        # 14 routes: metadata, headings, links, console errors
node contrast.mjs     # WCAG AA, compositing what is really behind each node
node interact.mjs     # focus traps, keyboard, form validation
node motion.mjs       # native path live; nothing stranded; reduced motion
node midflight.mjs    # ← elements are genuinely MID-animation. See below.
node flyout.mjs       # mega menu + mobile menu
node grid.mjs         # one grid geometry, one heading x
node responsive.mjs   # nothing escapes the viewport at 390/768/1440
node hover.mjs        # every interactive surface responds to hover
node bundle.mjs       # → preview.html, the single-file review copy
node previewcheck.mjs # the mid-animation proof, run on preview.html itself
```

### ⚠ Three harness traps that produced false results

1. **Testing endpoints proves nothing.** Every motion check asserted that the
   timeline was native and that nothing was stranded at the document bottom.
   A site with **no animation at all** passes both. That is why the broken
   word reveal survived for rounds. `midflight.mjs` parks the page mid-range,
   asserts the element is at neither end, then asserts it *advances* when the
   page moves. Write that check first, not last.

2. **Tailwind v4 animates `translate`, not `transform`.** A probe reading
   only `getComputedStyle(el).transform` reports every sliding arrow on the
   site as dead. `hover.mjs` reports 5 false failures without this.

3. **A stale server poisons everything.** A `next start` left over from an
   earlier session held port 3111, and the whole harness silently measured an
   old build for an unknown length of time. Kill listeners before a run and
   check a title you just changed.

Also: **Lenis makes `window.scrollTo` asynchronous.** Every harness that
scrolls must wait for `scrollY` to reach the target and hold for a few polls,
or it reads mid-flight values by accident.

### Contrast auditing

Tailwind emits `oklab()`, and chrome over content is transparent, so the
audit composites what is actually behind each text node via
`elementsFromPoint` — and skips `opacity: 0` elements. An invisible
`opacity-0` navy backdrop was still hit-testable and made the audit read
"navy behind the nav".

---

## 8. Verified state

At `1204d8e`, against a fresh production build:

| Check | Result |
| --- | --- |
| `npm run lint`, `tsc --noEmit` | clean |
| `npm run build` | 20 routes prerender |
| `audit.mjs` | 14 routes, **0 problems** (1 console error = the deliberate 404 probe) |
| `contrast.mjs` | **1914 text nodes, all WCAG AA** |
| `interact.mjs` | 13 checks, 0 failures |
| `motion.mjs` | 13 checks, 0 failures |
| `midflight.mjs` | 6 checks, 0 failures |
| `flyout.mjs` | 15 checks, 0 failures |
| `hover.mjs` | 9 surfaces, 0 without feedback |
| `grid.mjs` | one geometry across 22 grids, 29 headings on one x, 0 off-grid |
| `responsive.mjs` | 390 / 768 / 1440 — nothing escapes, no sideways scroll |

**Untested: Safari and Firefox.** This sandbox can only install Chromium.
Scroll-driven animation is not in Safari yet; the site degrades to static
(words simply present), which is correct but unverified by eye.

---

## 9. Outstanding

1. **The 17 logo files.** See §3.
2. **Safari / Firefox pass.**
3. **`leadership: []`** in `content/about.ts` — fills when consented profiles
   are supplied.
4. **The contact form has no endpoint.** `app/contact/actions.ts` reports the
   unconfigured state honestly to the visitor rather than pretending to send.
   Wire it before launch.
5. **Six plan pages and the calculators** exist on the live site but not
   here. Every link to them points at `liveSite` (`content/site.ts`) so
   nothing is broken during review. Swap `liveSite` to `""` when they land.
6. **The nav scrim question** (§6).

---

## 10. Things that were fixed, so nobody re-breaks them

- `.eyebrow` was renamed to `.label` and **8 call sites were not updated** —
  every contact-form label rendered as unstyled 16px body text.
- The footer used `aria-labelledby={`f-${group.title}`}` — producing
  `"f-Key Solutions"`, a space-separated IDREF list resolving to two
  non-existent ids. Now `slugify()`d.
- The marquee nested `.marquee-track` inside itself; both copies carried the
  animation, compounding speed and breaking the `-50%` loop. Split into a
  non-animated `.marquee-run`.
- The mega panels were centred on their ~108px nav item at 1152px wide. At
  1440 the document really scrolled 150px sideways. Now anchored to the shell.
- The mobile focus trap excluded the close button.
- `/insights/[slug]` compiled ~500 lines and emitted **zero** pages
  (`articles: []` + `dynamicParams = false`). Removed; route count unchanged
  at 20, which is the proof.
- `bundle.mjs` had a hard-coded route list still naming `/work` and a
  `/services/*` tree that no longer exist — the preview was capturing 404s
  for six of thirteen pages. It reads the sitemap now.
- Form errors used `--scene-accent`, the same blue as every link, and colour
  was the only signal. `--scene-danger` plus a thicker underline on
  `aria-invalid`.
