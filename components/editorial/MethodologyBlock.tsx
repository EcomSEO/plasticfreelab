import { getTranslations } from "next-intl/server";

type Item = { label: string; detail: string };

const KEYS = ["picked", "evaluated", "disagrees", "changeMind"] as const;

export async function MethodologyBlock({
  items,
  title,
}: {
  items?: Item[];
  title?: string;
} = {}) {
  const t = await getTranslations("methodology");
  const titleText = title ?? t("title");
  const resolvedItems: Item[] =
    items ??
    KEYS.map((k) => ({
      label: t(`items.${k}.label` as const),
      detail: t(`items.${k}.detail` as const),
    }));

  return (
    <section className="my-12 bg-cream-deep/40 border border-forest/10 rounded-sm p-7 md:p-9">
      <div className="flex items-center gap-3 mb-5">
        <span className="h-2 w-2 rounded-full bg-sage" />
        <span className="caps-label text-forest">{t("label")}</span>
      </div>
      <h2 className="font-serif text-2xl text-forest mb-6 leading-tight">
        {titleText}
      </h2>
      <dl className="grid md:grid-cols-2 gap-x-10 gap-y-5">
        {resolvedItems.map((item) => (
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
