/**
 * Renders a JSON-LD graph. Server-rendered, so the structured data is present
 * in the initial HTML rather than injected after hydration.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local content modules, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
