"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "pfl:cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  function accept(choice: "accept" | "reject") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-cream border border-forest/20 rounded-lg shadow-lg p-4"
    >
      <p className="text-sm text-charcoal/90">
        {t("body.before")}{" "}
        <a href="/privacy" className="underline text-forest hover:text-sage transition-colors">
          {t("body.privacyLink")}
        </a>
        {t("body.after")}
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => accept("reject")}
          className="cursor-pointer min-h-[44px] text-sm px-3 py-2 rounded-md text-stone hover:text-forest transition-colors"
        >
          {t("reject")}
        </button>
        <button
          type="button"
          onClick={() => accept("accept")}
          className="cursor-pointer min-h-[44px] text-sm px-4 py-2 rounded-md bg-forest text-cream hover:bg-sage transition-colors"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
