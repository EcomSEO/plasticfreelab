import { JsonLd } from "./JsonLd";

export function FaqJsonLd({
  faq,
}: {
  faq: Array<{ q: string; a: string }>;
}) {
  if (!faq || faq.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      }}
    />
  );
}
