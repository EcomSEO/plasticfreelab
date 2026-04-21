type Item = { label: string; detail: string };

const defaultItems: Item[] = [
  {
    label: "What we picked for",
    detail:
      "Disclosed materials, third-party certification, durability in real cooking, independent contamination testing where available.",
  },
  {
    label: "How we evaluated",
    detail:
      "Manufacturer disclosures, regulatory filings, peer-reviewed papers, and hands-on wear-testing. We read the labels and the filings, not the press releases.",
  },
  {
    label: "Who disagrees with us",
    detail:
      "We steel-man the opposing view in every comparison, and name the brand we almost picked and the reason we didn't.",
  },
  {
    label: "What would change our mind",
    detail:
      "New independent lab testing, reformulation by a ranked brand, or a peer-reviewed finding that contradicts our current reasoning.",
  },
];

export function MethodologyBlock({
  items = defaultItems,
  title = "How this comparison was made",
}: {
  items?: Item[];
  title?: string;
}) {
  return (
    <section className="my-12 bg-cream-deep/40 border border-forest/10 rounded-sm p-7 md:p-9">
      <div className="flex items-center gap-3 mb-5">
        <span className="h-2 w-2 rounded-full bg-sage" />
        <span className="caps-label text-forest">Methodology</span>
      </div>
      <h2 className="font-serif text-2xl text-forest mb-6 leading-tight">
        {title}
      </h2>
      <dl className="grid md:grid-cols-2 gap-x-10 gap-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="eyebrow text-stone mb-1">{item.label}</dt>
            <dd className="text-[15px] text-charcoal/85 leading-relaxed">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
