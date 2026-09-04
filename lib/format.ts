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
