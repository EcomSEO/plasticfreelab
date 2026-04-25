"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { DotRule } from "@/components/editorial/DotRule";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="border-b border-forest/10">
        <div className="mx-auto max-w-3xl px-6 pt-16 md:pt-24 pb-16 md:pb-20">
          <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
          <h1 className="display-headline text-forest mt-5 text-[2.5rem] sm:text-5xl md:text-[3.5rem] leading-[1.04]">
            {t("title")}
          </h1>

          <p className="mt-7 text-charcoal/85 text-[1.0625rem] leading-[1.75] max-w-2xl">
            {t("body")}
          </p>

          <div className="mt-10" data-reveal>
            <DotRule className="rule-draw" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary"
            >
              {t("tryAgain")}
              <span aria-hidden>&rarr;</span>
            </button>
            <Link href="/" className="btn-secondary">
              {t("backToHome")}
            </Link>
          </div>

          {error?.digest && (
            <p className="mt-10 caps-label text-stone">
              {t("reference", { digest: error.digest })}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
