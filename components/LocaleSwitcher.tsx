"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

/**
 * LocaleSwitcher — small inline EN · DE · FR toggle.
 *
 * Lives in the masthead strip next to the trust links. Switches the
 * current path to the chosen locale via next-intl's locale-aware router,
 * preserving the rest of the URL. Sage hairline separators, 11px Inter
 * uppercase to match the rest of the masthead strip.
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

  const handle = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
      onNavigate?.();
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase"
      data-pending={isPending ? "true" : undefined}
    >
      {locales.map((l, i) => {
        const isActive = l === active;
        return (
          <span key={l} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden className="text-sage/50">
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => handle(l)}
              aria-current={isActive ? "true" : undefined}
              className={
                isActive
                  ? "text-forest font-semibold cursor-default"
                  : "text-stone hover:text-sage transition cursor-pointer"
              }
              lang={l}
            >
              <span className="sr-only">{t(`${l}Full` as "enFull" | "deFull" | "frFull")}</span>
              <span aria-hidden>{t(l)}</span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
