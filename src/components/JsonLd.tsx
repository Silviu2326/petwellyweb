interface JsonLdProps {
  /** Objeto serializable a JSON. Si pasas un array, se serializan en un solo `<script>` con un `@graph`. */
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/**
 * Inserta un bloque JSON-LD en el HTML para SEO.
 *
 * Coloca este componente dentro de cualquier RSC (page o layout); Next.js
 * lo va a server-renderizar y el script saldrá tal cual en el HTML inicial,
 * que es exactamente lo que Google y otros buscadores quieren.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;
  return (
    <script
      type="application/ld+json"
      id={id}
      // dangerouslySetInnerHTML para evitar que React escape comillas dentro del JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
