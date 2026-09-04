# Verification harness

Drive a real browser against a **production build**. A dev server has
different CSS ordering, different hydration timing, and no minification —
things pass there that fail in production and vice versa.

```bash
npm run build && PORT=3111 npm run start
```

Playwright + Chromium. Route every request through a filter that aborts
anything not on the local origin, so a test can't accidentally depend on the
network.

## Contents

1. [Three traps that make checks lie](#three-traps-that-make-checks-lie)
2. [The checks](#the-checks)
3. [Contrast auditing done properly](#contrast-auditing-done-properly)
4. [The single-file preview](#the-single-file-preview)

---

## Three traps that make checks lie

### 1. Endpoint tests pass on a site with no animation

"The timeline is native" and "nothing is stranded invisible at the bottom of
the page" are both true of an element that never moves at all. A completely
frozen animation satisfies both.

**Test the middle.** Park the page at a scroll position where the element's
range is partway through, assert it is at neither end, then move the page and
assert the value *changed*:

```js
const a = probe();                 // progress must be > 0.02 and < 0.98
await scrollTo(y2);
const b = probe();                 // must differ from a by a real margin
```

Read `getAnimations()[0].effect.getComputedTiming().progress` — for a
scroll-driven animation that is a fraction of the range, and it is the number
that proves the timeline is being driven by scroll position rather than
merely attached.

Generalise it: **assert the transition, not just the two states.** This
applies far beyond animation.

### 2. Read the property the framework actually animates

Tailwind v4 (and any system built on individual transform properties)
animates `translate`, `scale` and `rotate` — **not** `transform`. A probe
reading only `getComputedStyle(el).transform` reports every sliding arrow on
the site as dead.

```js
// Sample everything, or you will "find" failures that aren't there.
[cs.transform, cs.translate, cs.scale, cs.rotate,
 cs.backgroundColor, cs.backgroundSize, cs.backgroundImage,
 cs.borderColor, cs.color, cs.boxShadow, cs.opacity, cs.textDecorationLine]
```

`transition-transform` in Tailwind v4 expands to
`transition-property: transform, translate, scale, rotate`, so the animation
is genuinely transitioning — only the probe was wrong. Before believing a
harness that reports many failures at once, check the harness.

### 3. A stale server poisons an entire run

A `next start` left running from an earlier session holds the port, and the
whole harness silently measures an old build — for an unknown length of time,
reporting green.

Kill listeners before every run, and **assert something you just changed**
(a page title, a new string) as the first check. If that fails, nothing else
in the run means anything.

Related: hovering with Playwright's `locator.hover()` waits for the element
to be "stable". If anything on the page animates forever (a marquee), that
wait never resolves. Compute the box and drive `page.mouse.move()` directly.

---

## The checks

| Script | Asserts |
| --- | --- |
| `audit` | Per route: title/description length, exactly one `h1`, no skipped heading levels, no console errors, no broken internal links. Take the route list from `sitemap.xml` so it can't drift from the build. |
| `contrast` | Every text node meets WCAG AA, compositing what is really behind it. See below. |
| `motion` | Native path in use; nothing stranded at document end; under reduced motion no live timeline, nothing faded, infinite animations stopped. |
| `midflight` | Elements are genuinely mid-animation part-way through a scroll, and advance when the page moves. |
| `interact` | Skip link is the first tab stop; every tab stop shows a focus ring; menu focus traps include their own close button; Escape closes and returns focus; form validation messages are real and announced. |
| `flyout` | Menus open on hover *and* keyboard, contents are focusable when open, closed panels are `inert` and out of the tab order, mobile menu reaches the whole tree. |
| `grid` | One 12-column geometry across the site, headings share one left edge, no off-grid children. This is what "the alignments are wrong" actually measures. |
| `responsive` | At 390 / 768 / 1440: the document cannot scroll sideways, and nothing escapes the viewport *that isn't clipped by an ancestor*. |
| `hover` | Every interactive surface changes something on hover. |

### Two details that stop false positives

**Responsive:** decorative artwork deliberately overflows inside an
`overflow: hidden` parent, and honeypot fields sit at `-9999px`. Neither is
reachable, so neither is overflow. Walk up the ancestors and ignore anything
with a clipping `overflow-x`. Then assert the real thing separately:

```js
window.scrollTo(9999, window.scrollY);
const canScrollX = window.scrollX;   // must be 0
```

**Grid:** an absolutely-positioned menu panel that is wider than the viewport
still contributes to scrollable overflow even while `visibility: hidden`.
A page-width panel centred on a narrow nav item is the usual culprit — anchor
it to the page shell instead.

---

## Contrast auditing done properly

Naive contrast checks read `color` and `background-color` off the element and
compare them. That fails on real sites in three ways:

1. **Most elements have a transparent background.** You need what is actually
   painted behind the node — walk `document.elementsFromPoint()` at the
   node's centre and composite the stack.
2. **Skip `opacity: 0` elements while compositing.** An invisible backdrop is
   still hit-testable, and including it makes the audit report a colour
   nobody can see. (A real case: an `opacity-0` navy backdrop made a light
   nav read as "black on navy".)
3. **Modern CSS emits `oklab()` / `color-mix()`.** Parse via a canvas —
   paint the computed colour into a 1×1 context and read the pixel back — so
   you get real RGBA whatever the source notation.

This matters most for chrome over content: a transparent sticky header, text
over an image, a button on a gradient. Those are exactly the places a human
eyeball is least reliable and a naive check is most confidently wrong.

---

## The single-file preview

A reviewer who has to run `npm install` will not review. Bundle the built
site into one self-contained HTML file — inline the CSS, fold fonts in as
data URIs, drop the framework scripts, rewrite internal links to a hash
router.

This works **only** if the site is legible without JavaScript, which pure CSS
scroll-driven animation is.

Two lessons, both learned by shipping a broken preview:

- **Don't disable animation in the bundler.** An older bundler carried a rule
  that resolved every entrance with `!important` (a leftover from when
  reveals depended on an IntersectionObserver). The one artefact sent for
  review was the one place the motion provably could not run — and the
  feedback was, correctly, "I still don't see any animations."
- **Take the route list from the sitemap.** A hard-coded list went stale and
  the preview quietly captured 404s for six of thirteen pages.

Then run the mid-animation proof **on the preview file itself**, over
`file://`. That's the artefact the client actually opens; it's the one that
has to be right.
