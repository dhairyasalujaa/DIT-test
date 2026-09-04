# Scroll-driven motion

Native CSS scroll-driven animation (`animation-timeline: view()`) is the
right default: it runs on the compositor, needs no JavaScript, survives being
saved to a static HTML file, and can't desync from the scroll position.

It also has failure modes that produce **no error, no warning, and no visible
symptom** — the animation is attached, reported as native, and simply never
advances. This file is mostly about those.

## Contents

1. [The four silent traps](#the-four-silent-traps)
2. [Ranges: how to pick them](#ranges-how-to-pick-them)
3. [Easing](#easing)
4. [Recipes](#recipes)
5. [Smooth scroll (Lenis)](#smooth-scroll-lenis)
6. [Reduced motion](#reduced-motion)

---

## The four silent traps

### 1. `overflow: hidden` on an ancestor turns `view()` off

`overflow: hidden` makes an element a **scroll container**. A `view()`
timeline on a descendant resolves against its *nearest ancestor scroll
container* — so if you clip a word inside a mask and animate the word, the
word is measuring itself against the mask. It fills the mask exactly.
Progress pins at 1 forever.

This is the classic "upward text reveal" construction, and it silently
disables itself:

```css
/* BROKEN — the mask is a scroll container */
.mask { display: inline-block; overflow: hidden; }
.word { animation: rise both; animation-timeline: view(); }
```

```css
/* WORKS — clip-path clips identically, creates no scroll container */
.mask { display: inline-block; clip-path: inset(0); }
.word { animation: rise both; animation-timeline: view(); }
```

**Diagnose it in one line.** Don't reason about it — ask the browser what the
timeline is actually measuring:

```js
document.querySelector('.word').getAnimations()[0].timeline.source
// → SPAN.mask   ← broken, it's measuring the mask
// → HTML        ← correct, it's measuring the document
```

Any time you put `overflow: hidden` above something animated by `view()`, you
have turned it off. Reach for `clip-path` instead. (`overflow: clip` also
avoids creating a scroll container in modern browsers, but `clip-path` is the
safer, more widely supported choice for a mask.)

### 2. `entry` ranges are sized by the element, not the viewport

An element's `entry` range spans **the element's own height** — from its
leading edge crossing the viewport's end edge, to its trailing edge crossing
the same line.

For a paragraph that's a sensible distance. For a single word it's ~40px of
scrolling, so `animation-range: entry 4% entry 88%` is over before the word
has cleared the bottom of the screen. The animation runs perfectly and nobody
ever sees it.

**Use `cover` for anything small.** `cover` spans the viewport height plus
the element, so a percentage of it is a meaningful scroll distance:

```css
/* ~180px of travel in a 900px viewport, whatever the element's size */
animation-range: cover 1% cover 20%;
```

**Stagger by shifting the whole range, not by stretching it.** If you offset
only the end, items run at different *speeds*. Offsetting both ends by the
same amount makes each item start and finish later — which is what a cascade
actually is:

```css
.word {
  animation-range:
    cover calc(1%  + var(--w, 0) * 1.6%)
    cover calc(20% + var(--w, 0) * 1.6%);
}
```

### 3. A time curve is the wrong curve for a scroll timeline

An easing curve tuned for a clock — fast off the mark, long quiet tail — is
usually ~98% travelled at half progress. That reads beautifully as a 900ms
entrance.

Drive the same curve with scroll position and it means the element lands
almost immediately and then creeps for the rest of the range. Measured on a
real case: **1.4px of travel at 52% progress**. Technically animating.
Visually static.

Keep two curves. The scroll one spreads distance evenly enough that the
element visibly tracks the reader:

```css
/* time: snaps and settles */
--ease-rise: linear(
  0, 0.22 7%, 0.42 12%, 0.60 18%, 0.75 24%, 0.86 32%,
  0.93 40%, 0.98 52%, 0.997 68%, 1
);

/* scroll: same character, distance spread across the range */
--ease-rise-scroll: linear(
  0, 0.07 8%, 0.19 18%, 0.34 29%, 0.51 41%, 0.67 53%,
  0.81 65%, 0.91 77%, 0.97 88%, 1
);
```

Same element, same scroll position, after the swap: **22px** instead of
1.4px.

### 4. Unlayered declarations beat any `@layer`, at any specificity

CSS cascade layers lose to unlayered rules — always, regardless of
selector specificity. This bites when an above-the-fold element needs a
**time** animation while everything else uses a scroll one.

A scroll shorthand deliberately carries no duration (a progress timeline
doesn't use one). If the time-based override only flips the timeline:

```css
/* BROKEN — inherits the duration-less shorthand, so it runs at 0s */
.hero .word { animation-timeline: auto; }
```

…the element snaps into place instead of animating. **Restate the whole
shorthand:**

```css
.hero .word {
  animation: rise-load 0.95s var(--ease-rise)
             calc(var(--enter-delay, 0ms) + var(--w, 0) * 42ms) both;
  animation-timeline: auto;
}
```

Anything above the fold at first paint needs this treatment: a scroll
timeline resolves instantly there, so it must run on a load choreography with
explicit delays instead.

---

## Ranges: how to pick them

| Element | Range | Why |
| --- | --- | --- |
| Section heading words | `cover 1% → cover 20%`, staggered | Small elements; `entry` is too short |
| A paragraph or card | `entry 9% → cover 25%` | Tall enough that `entry` is meaningful |
| A rule drawing in | `entry 14% → cover 32%` | Wants to finish slightly later than its content |
| Parallax / drift | `cover 0% → cover 100%` | Runs the element's whole traversal |

**Always check the bottom of the document.** An element near the end may
never reach the end of its range, because there is no scroll left — and it
stays permanently mid-animation, often invisible. Scroll to
`document.body.scrollHeight` and assert nothing is below full opacity or
still clipped.

---

## Easing

Five curves, each with one job, is enough for a whole site and is what makes
the motion read as one hand:

| Token | Job | Shape |
| --- | --- | --- |
| `--ease-rise` | Type and panels, time-based | Fast start, long tail |
| `--ease-rise-scroll` | The same, scroll-based | Distance spread evenly |
| `--ease-draw` | Rules and bars drawing in | Symmetric, no overshoot |
| `--ease-settle` | Small objects arriving | ~2% overshoot, then settle |
| `--ease-drift` | Parallax | `linear(0, 1)` — strictly |

Parallax must be linear. Anything eased reads as the page lagging behind the
scroll rather than as depth.

---

## Recipes

### Per-word upward reveal

Split server-side so there's no measurement, no layout thrash, and no client
JavaScript. Each word gets its own mask and its own `view()` timeline, so
words on different lines resolve at different scroll positions and the
line-by-line cascade falls out of the geometry rather than a hand-tuned
delay list.

```css
.mask {
  display: inline-block;
  clip-path: inset(0);       /* NOT overflow: hidden — see trap 1 */
  padding-bottom: 0.18em;    /* or `hidden` shaves descenders off g, y, p */
  margin-bottom: -0.18em;
  vertical-align: bottom;
}
.mask::after { content: " "; white-space: pre; }  /* keeps word spacing */
.word { display: inline-block; will-change: transform; }

@keyframes rise { from { transform: translate3d(0, 110%, 0); } to { transform: none; } }
```

Accessibility: the words are plain text in source order, so the string reads
and copies normally.

### Infinite logo marquee

Render the row **twice**, second copy `aria-hidden="true"`, and translate the
track by exactly `-50%`. Seamless with nothing measuring anything.

```css
.marquee { overflow: hidden; mask-image: linear-gradient(to right, transparent, #000 6rem, #000 calc(100% - 6rem), transparent); }
.marquee-track { display: flex; width: max-content; animation: slide 40s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
@keyframes slide { to { transform: translate3d(-50%, 0, 0); } }
```

Two things that go wrong: nesting the animated class inside itself (both
copies then carry the animation, speed compounds, the `-50%` loop breaks —
give the inner rows a separate non-animated class), and forgetting that
`prefers-reduced-motion` must *stop* this, not slow it.

### Coupling motion to scroll velocity

If a smooth-scroll library is present, write its velocity to a custom
property and let CSS consume it. This is the one effect that only exists
*because* the library is there:

```js
lenis.on('scroll', ({ velocity }) => {
  root.style.setProperty('--marquee-boost', String(1 + Math.min(Math.abs(velocity) / 40, 2)));
});
```

Default it to `1` in CSS so the strip is correct with no JavaScript at all.

---

## Smooth scroll (Lenis)

Lenis moves the **real** scroll position rather than transforming a wrapper,
so `view()` timelines, `position: sticky` and IntersectionObserver all keep
working unchanged. That property is why it's safe here; a transform-based
smooth-scroll library would break all three.

Integration points that are easy to miss:

- **Remove `scroll-behavior: smooth`.** Lenis needs it off.
- **Don't instantiate under `prefers-reduced-motion`**, and destroy on
  change. Lenis has no built-in flag for this.
- **Anchors**: pass an offset equal to the sticky header's height so `#id`
  targets and the skip link don't land underneath it.
- **Scrollable overlays** (a mobile menu panel) need `data-lenis-prevent`,
  and the body-scroll lock should call `lenis.stop()` / `.start()`.
- **`window.scrollTo` becomes asynchronous.** Every test that scrolls must
  wait for `scrollY` to reach the target and hold for a few polls, or it
  reads mid-flight values by accident. This causes maddening flakiness if
  you don't know it.

---

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- No live `animation-timeline` anywhere.
- Nothing below full opacity, nothing left clipped or scaled to zero — the
  content must simply be present.
- **Infinite animations stop.** Slowing a marquee is not a reduced-motion
  accommodation.
- Smooth scroll is not instantiated.

All four are cheap to assert in a browser test, and all four are easy to
regress when adding a new effect.
