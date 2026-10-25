import JsonLd from '@/components/JsonLd';
import Site from '@/components/Site';
import { fetchSanityContent } from '@/lib/sanity';

export default async function EsPage() {
  const content = await fetchSanityContent();
  return (
    <>
      <Site locale="es" content={content ?? undefined} />
      <JsonLd locale="es" content={content ?? undefined} />
    </>
  );
}
