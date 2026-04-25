import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { tHub, type Hub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";
import { Monogram } from "./editorial/Monogram";

export async function HubCard({ hub }: { hub: Hub }) {
  const t = await getTranslations("magazineGrid");
  const locale = (await getLocale()) as Locale;
  const th = tHub(hub, locale);

  return (
    <Link
      href={`/guides/${hub.slug}`}
      className="card-editorial block p-6 bg-white/60 border border-forest/10 rounded-lg h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <Monogram size={24} />
        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-stone">
          {t("team")}
        </span>
      </div>
      <h3 className="font-serif text-xl text-forest mb-2">{th.name}</h3>
      <p className="text-sm text-charcoal/70 leading-relaxed">{th.oneLiner}</p>
      <span className="mt-4 inline-block text-sage text-sm">
        {/* keep "Browse →" short — common.browse handles fallback */}
      </span>
    </Link>
  );
}
