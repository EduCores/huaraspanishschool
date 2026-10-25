import JsonLd from '@/components/JsonLd';
import Site from '@/components/Site';
import { fetchSanityContent } from '@/lib/sanity';

export default async function Page() {
  const content = await fetchSanityContent();
  return (
    <>
      <Site locale="en" content={content ?? undefined} />
      <JsonLd locale="en" content={content ?? undefined} />
    </>
  );
}
