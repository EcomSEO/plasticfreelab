import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, defaultLocale } from "./routing";

/**
 * Per-request i18n config.
 * Loads the dictionary JSON for the active locale and exposes it to all
 * Server Components via next-intl's request scope.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`./dictionaries/${locale}.json`)).default,
  };
});
