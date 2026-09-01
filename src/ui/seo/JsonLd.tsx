/**
 * One <script type="application/ld+json"> block.
 *
 * The `<` escape is load-bearing: without it a `</script>` sequence appearing
 * anywhere inside the serialised data closes the tag early and the rest of the
 * payload is parsed as HTML.
 */
export function JsonLd({ data }: { data: unknown }) {
  if (data === null || data === undefined) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
