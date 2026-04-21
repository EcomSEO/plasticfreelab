import { Eyebrow } from "./editorial/Eyebrow";

export function SourcesList({
  sources,
}: {
  sources: Array<{ label: string; url: string }>;
}) {
  if (!sources || sources.length === 0) return null;
  return (
    <section className="mt-14 pt-8 border-t border-forest/15">
      <Eyebrow tone="stone">References</Eyebrow>
      <h2 className="font-serif text-2xl text-forest mt-2 mb-5 leading-tight">
        Sources we cited on this page.
      </h2>
      <ol className="space-y-3 text-[14px] text-charcoal/85">
        {sources.map((s, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
            <span className="caps-label text-stone tnum">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={s.url}
              rel="noopener"
              target="_blank"
              className="text-forest hover:text-terracotta transition underline decoration-sage decoration-[1.5px] underline-offset-[3px]"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
