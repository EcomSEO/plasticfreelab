"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

/**
 * LocaleSwitcher — language picker in the masthead strip.
 *
 * With 12 locales the old inline "EN · DE · FR" toggle no longer fits.
 * The current implementation uses a styled native <select> so it stays
 * compact on every viewport, ships zero JS for the menu itself, and
 * keeps native-OS picker UX on mobile. Brand styling matches the rest
 * of the masthead — 11px Inter uppercase, sage hairline, forest text.
 */
export function LocaleSwitcher({
  onNavigate,
}: {
  onNavigate?: () => void;
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
      onNavigate?.();
    });
  };

  type ShortKey = (typeof locales)[number];
  const shortKey = (l: Locale) => l as ShortKey;
  const fullKey = (l: Locale) => `${l}Full` as `${ShortKey}Full`;

  return (
    <label
      aria-label={t("label")}
      className="relative inline-flex items-center text-[11px] tracking-[0.14em] uppercase"
      data-pending={isPending ? "true" : undefined}
    >
      <span className="sr-only">{t("label")}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-stone"
      >
        ⌐
      </span>
      <select
        value={active}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className="appearance-none bg-transparent border border-sage/40 rounded-sm pl-6 pr-6 py-1 text-forest font-semibold cursor-pointer hover:border-sage/70 focus:outline-none focus:ring-1 focus:ring-sage/60 transition"
        aria-label={t("label")}
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l}>
            {t(shortKey(l))} — {t(fullKey(l))}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-sage/70 text-[9px]"
      >
        ▾
      </span>
    </label>
  );
}
