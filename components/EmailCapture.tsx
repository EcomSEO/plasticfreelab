"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./editorial/Eyebrow";

export function EmailCapture({
  headline,
  subhead,
  variant = "inline",
}: {
  headline?: string;
  subhead?: string;
  variant?: "inline" | "end-of-article";
}) {
  const t = useTranslations("emailCapture");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Beehiiv wiring lands with launch checklist §8. Pre-launch: local-only confirmation.
    await new Promise((r) => setTimeout(r, 400));
    setStatus("ok");
  }

  const isEnd = variant === "end-of-article";
  const headlineText = headline ?? t("headline");
  const subheadText = subhead ?? t("subhead");

  return (
    <section
      id="email-capture"
      className={`relative ${isEnd ? "my-12" : ""}`}
    >
      <div
        className={`bg-paper border border-forest/15 rounded-sm p-8 md:p-10 shadow-soft ${
          isEnd ? "" : ""
        }`}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
            <h2 className="font-serif text-[1.7rem] md:text-[2rem] text-forest mt-2 leading-[1.1]">
              {headlineText}
            </h2>
            <p className="mt-3 text-[15px] text-charcoal/80 max-w-2xl leading-relaxed">
              {subheadText}
            </p>

            {status === "ok" ? (
              <p className="mt-6 font-serif text-lg text-forest italic">
                {t("success")}
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg"
              >
                <label htmlFor="email" className="sr-only">
                  {t("emailLabel")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={t("placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input flex-1 rounded-sm border border-forest/20 px-4 py-3 bg-cream-deep/40 text-[15px]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary !py-3 justify-center"
                >
                  {status === "loading" ? t("submitLoading") : t("submit")}
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-stone max-w-lg leading-relaxed">
              {t("consent.before")}{" "}
              <a href="/privacy" className="underline text-forest">
                {t("consent.privacyLink")}
              </a>
              {t("consent.after")}
            </p>
          </div>

          {/* Decorative icon column */}
          <div className="hidden md:flex flex-col items-center justify-center px-6 py-4 border-l border-forest/10">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              className="text-sage"
              aria-hidden
            >
              <rect x="14" y="10" width="42" height="52" rx="2" />
              <line x1="22" y1="22" x2="48" y2="22" />
              <line x1="22" y1="30" x2="48" y2="30" />
              <line x1="22" y1="38" x2="48" y2="38" />
              <line x1="22" y1="46" x2="40" y2="46" />
              <circle cx="18" cy="22" r="1.5" fill="currentColor" />
              <circle cx="18" cy="30" r="1.5" fill="currentColor" />
              <circle cx="18" cy="38" r="1.5" fill="currentColor" />
              <circle cx="18" cy="46" r="1.5" fill="currentColor" />
            </svg>
            <div className="mt-4 caps-label text-stone text-center">
              {t("decoPages")}
              <br />
              {t("decoItems")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
