export function SourcesList({
  sources,
}: {
  sources: Array<{ label: string; url: string }>;
}) {
  if (!sources || sources.length === 0) return null;
  return (
    <section className="mt-12 pt-8 border-t border-forest/10">
      <h2 className="font-serif text-xl text-forest mb-4">Sources</h2>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-charcoal/80">
        {sources.map((s, i) => (
          <li key={i}>
            <a
              href={s.url}
              rel="noopener"
              target="_blank"
              className="text-sage hover:underline"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
