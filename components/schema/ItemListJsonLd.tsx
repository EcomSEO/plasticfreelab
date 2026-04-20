import { JsonLd } from "./JsonLd";

export function ItemListJsonLd({
  items,
}: {
  items: Array<{ rank: number; name: string }>;
}) {
  if (!items || items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((i) => ({
          "@type": "ListItem",
          position: i.rank,
          name: i.name,
        })),
      }}
    />
  );
}
