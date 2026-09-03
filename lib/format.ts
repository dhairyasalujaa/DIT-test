/**
 * Dates are formatted with an explicit locale and UTC time zone so the server
 * and client always produce the same string — a mismatch here is a classic
 * source of hydration errors.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Turns a heading into a stable URL fragment, so an article's sections can be
 * linked to directly and listed in an on-page contents.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
