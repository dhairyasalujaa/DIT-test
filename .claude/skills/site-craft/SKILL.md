---
name: site-craft
description: Build or redesign a marketing/company website that is factually honest, visually alive, and provably correct. Covers sourcing real content instead of inventing it, a scene-token design system, scroll-driven motion that actually runs, and a browser-based verification harness. Use this whenever the user asks to build, redesign, restyle, or "make more lively" a website, landing page, or marketing site — including when they only mention a piece of it, like "add scroll animations", "the alignment is off", "it looks like a template", "add a logo slider", "make the nav transparent", or "add smooth scrolling". Also use it when writing copy for a real company's site, where the risk of inventing facts is highest.
---

# Site craft

Building a site for a real company has two failure modes that matter more than
anything else, and neither is caught by a linter:

1. **You invent something.** A plausible address, a founding year, a client
   logo, a response-time promise. It ships, and now the company is publishing
   a false claim under its own name.
2. **You build something that looks finished but isn't running.** An animation
   whose timeline never advances. A hover state on the wrong property. A test
   that passes because it measures the one thing that can't fail.

Everything below exists to prevent those two. The design guidance matters
too, but a beautiful site that lies is worse than an ugly one that doesn't.

---

## 1. Never invent a fact

**If it isn't in a source, it doesn't go on the site.**

Not clients, logos, metrics, testimonials, awards, reviews, prices, dates,
certifications, office addresses, phone numbers, staff names, or promises
about response times.

The trap is that fabrication doesn't feel like lying while you're doing it.
It feels like filling a layout. You have a three-column grid and two real
case studies, so a third appears. You have an address field and a city name,
so a street address appears. The grid wanted it.

**When a fact can't be sourced, the section gets smaller.** Cut the column,
change the layout, write an honest empty state. Never round the number up,
never turn "13+ years in the region" into a founding year, never let a card's
shape decide what's true.

Three things that make this tractable:

- **Put all copy in a `content/` directory**, typed, one file per domain,
  never inline in a component. Then every claim on the site is greppable in
  one place and a fabrication audit takes one pass instead of ten.
- **Comment the removals.** When you delete an unsourced claim, leave a note
  saying what it was and why it went. Otherwise the next person re-adds it,
  reasonably, because the gap looks like an oversight.
- **Structured data is publishing.** A fabricated address in a
  `PostalAddress` JSON-LD node goes to search engines as fact. Only emit
  schema that describes content genuinely visible on the page.

Real-world consequence, from the project this skill came from: an invented
Muscat street address was labelled "headquarters" and emitted as a
`PostalAddress`. It appeared in no source the client ever supplied. The phone
number in the same block *was* real. That mix — real fact next to invented
fact, in the same component — is the normal shape of this failure.

See `references/content.md` for how to run a sourcing audit and how to write
honest empty states.

---

## 2. Design decisions that keep it from reading as a template

The complaint "it looks like a Canva template" is usually not about colour.
It's about six specific things:

**Type does the work, not decoration.** One display size that is genuinely
large (`clamp(2.5rem, 7.2vw, 6rem)` is a reasonable ceiling), a real jump to
body copy, and nothing in between competing. Set headings tight
(`letter-spacing: -0.035em`, `line-height: 0.96`) and body loose.

**Kill micro-type.** Small uppercase letterspaced mono labels above every
section heading — "OUR SERVICES", "01", "WHAT WE DO" — are the single
strongest template tell. They are also usually load-bearing for nothing.
Delete them and let the heading open the section.

Keep small type only where it carries function: form labels (`<label for>`),
breadcrumbs, footer nav-group headings (they're accessible names), and
genuine content like a card's topic and reading time. Restyle those as plain
small sans rather than mono. If a client says "never add those kind of small
subtitles anywhere ever", take the maximal reading.

**One grid, one left edge.** Every section's content starts at the same x.
A single 12-column geometry with one gutter, used everywhere. This is
measurable — see §5 — and it is most of what people mean by "the alignments
are wrong".

**Flat over floaty.** Hairline borders, small radii (4px), no drop shadows on
content cards. Shadow belongs on things that genuinely float, like an open
menu panel.

**Scene tokens, not per-component colour.** Declare
`--scene-fg`, `--scene-fg-muted`, `--scene-line`, `--scene-accent`,
`--scene-bg`, `--scene-wash`, `--scene-panel`, `--scene-cta-*`,
`--scene-danger` — then re-declare them per scene (`.scene-ink`,
`.scene-paper`, …). A component written against the tokens works on a dark
band and a light one with no variant prop and no `dark:` soup. This is the
highest-leverage structural decision in the whole system.

**Every interactive surface answers the pointer.** Cards, rows, nav items,
buttons, footer links. Same duration, same curve, everywhere — put the
durations in tokens (`--dur-hover`, `--dur-sweep`) so they can't drift.

### Motion

Detailed recipes and the traps that silently break scroll animation are in
`references/motion.md`. **Read it before writing any scroll-linked
animation** — it documents failures that produce zero visible symptoms and
pass naive tests.

The short version:

- Prefer native CSS `animation-timeline: view()` over an IntersectionObserver
  or a JS loop. It runs on the compositor and works in a saved HTML file with
  no JavaScript at all.
- Use `linear()` easing curves, not `cubic-bezier`, for entrances. They
  settle in a way beziers can't, which is most of what separates "considered"
  from "the default fade-up everybody uses".
- Give each curve one job and name it: `--ease-rise` (type and panels),
  `--ease-draw` (rules drawing in), `--ease-settle` (small objects, slight
  overshoot), `--ease-drift` (parallax — strictly linear; anything eased
  reads as the page lagging).
- Vertical fade-up on everything is the generic effect. Vary it: per-word
  upward masks for headings, horizontal settle for list rows, a rule drawing
  under a row, opposed parallax across a full-bleed band.
- `prefers-reduced-motion` kills every scroll timeline **and every infinite
  animation**. A marquee must stop, not merely slow down.

---

## 3. Images and art direction

Images make a site feel alive, and they are also the easiest place to
fabricate without noticing.

**The line:** an image that a viewer would read as documentary evidence about
the company must be real. A photo of a team, an office, a datacentre, a
product in use, a certificate — if it isn't theirs, it can't go on their
site, and generating one is fabrication whatever the disclaimer says.

**What's safe** is imagery that reads as art direction rather than evidence:
abstract geometry, light and gradient studies, macro texture, generative
fields built from the brand's own shapes and palette. Nobody mistakes those
for a claim.

Practical guidance:

- Derive artwork from the brand's own geometry where possible — a logo mark
  abstracted into a large background field costs nothing, is unambiguously
  theirs, and can be inline SVG that scales and recolours with the scene
  tokens.
- If generating imagery, brief it as *abstract* explicitly, in the brand's
  hex values, and check the result for accidental representational content
  (faces, logos, readable text, recognisable buildings).
- Serve modern formats (AVIF/WebP), give every image explicit
  `width`/`height` or `aspect-ratio` so it can't cause layout shift, and lazy
  load anything below the fold. `next/image` handles this; a bare `<img>`
  does not.
- Decorative images get `alt=""` and are hidden from assistive tech.
  Informative ones get real alt text. An abstract background is decorative.
- Watch the contrast cost: text over an image needs the composite measured,
  not eyeballed (§5).

---

## 4. Build discipline

- **Static by default.** Prerender everything that can be. No client
  component unless it genuinely needs state, and keep them at the leaves.
- **One component per job.** If the same button is hand-rolled in three
  files, they will drift to different heights — this is not hypothetical, it
  happened. Extract it the moment you write the second copy.
- **No dead surfaces.** A route that emits zero pages, a renderer nothing
  calls, a type nothing constructs — delete them. If they might come back,
  that's what version control is for. Say so in the commit.
- **Semantic HTML first.** A one-item `<ul>` announces "list, 1 item". A
  heading level skipped is a real navigation failure for screen reader users.
- **Comment the *why*, not the *what*.** The valuable comment is the one that
  says "this looks redundant but removing it breaks X", or "this diverges
  from the client's real site deliberately, here's the instruction".
- **Commit and push after each meaningful change**, with a message that says
  what was wrong and how you know it's fixed. If the user says "push after
  each major change", they mean it — don't batch a night's work into one
  commit.

---

## 5. Verify in a real browser, and test the middle

**Nothing counts as done because it looks right in the code.** Drive a real
browser (Playwright + Chromium) against a **production build**, not a dev
server.

The full harness — what each check does and the exact traps that make checks
lie — is in `references/verification.md`. Read it when setting up
verification or when a check disagrees with what you see.

The idea that generalises beyond this stack:

> **A test that only measures endpoints passes on a site with no animation
> at all.**

"The timeline is native" and "nothing is stuck invisible at the bottom of the
page" are both true of an element that never moves. A per-word reveal was
broken for several rounds behind exactly those two green checks. The check
that found it parks the page **mid-range**, asserts the element is at neither
end, then asserts it *advances* when the page moves. Write that check first.

The same principle applies outside motion: assert the transition, not just
the two states.

Checks worth having, in rough priority order:

| Check | What it catches |
| --- | --- |
| Contrast, compositing what's really behind each node | Chrome over content, text on images, transparent nav |
| Mid-animation | Animation that is attached but frozen |
| Console errors + broken links per route | Everything |
| Horizontal overflow at 390 / 768 / 1440 | Panels wider than the viewport |
| Grid geometry: one gutter, one heading x | "The alignments are wrong" |
| Keyboard: focus rings, focus traps, tab order | Menus that can't be closed |
| Hover on every interactive surface | Dead affordances |
| `prefers-reduced-motion` | Infinite animations that only slowed |

---

## 6. Working rhythm

**Plan before building anything substantial.** State what you'll change, what
you deliberately won't, and what you'll measure to prove it worked.

**Review as a council, not as an author.** After a pass, read the result as
four different people: a designer looking for template tells and alignment
drift, an engineer looking for dead code and duplicated logic, an
accessibility reviewer with a keyboard and a screen reader, and a
fact-checker with the source open. Each finds things the others structurally
cannot.

**Report honestly.** If a check fails, say so with the output. If something
was skipped, name it. Never write "verified" next to something you inferred.
When a harness disagrees with the code, suspect the harness *and* the code —
in the source project, one round of "5 hover states are dead" was entirely
the probe reading the wrong CSS property, and a different round of "the
animation works" was the harness measuring a stale server.

**Distinguish a client's decision from a default.** When the user chooses
something unconventional — a permanently transparent nav, no section labels,
lower-case headings — record it as a decision, implement it fully, and
surface the trade-off once rather than quietly softening it. Their site,
their call. Give them the one-line revert if they want it later.

---

## Reference files

- `references/content.md` — sourcing audits, honest empty states, structured
  data rules, and the specific claims that are always worth challenging.
- `references/motion.md` — scroll-driven animation: the recipes, and four
  traps that break it with no visible symptom. Read before writing motion.
- `references/verification.md` — the browser harness: what to check, how, and
  the traps that make checks report false results.
