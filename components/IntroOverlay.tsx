"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/content/site";

const KEY = "pfl:intro-seen";

export function IntroOverlay() {
  const t = useTranslations("intro");
  const [phase, setPhase] = useState<"pending" | "show" | "rising" | "done">(
    "pending"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem(KEY) === "1";

    if (reduce || seen) {
      setPhase("done");
      document.documentElement.classList.add("pfl-intro-done");
      return;
    }

    document.documentElement.classList.add("pfl-intro-lock");
    setPhase("show");

    const riseAt = window.setTimeout(() => setPhase("rising"), 900);
    const doneAt = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("pfl-intro-lock");
      document.documentElement.classList.add("pfl-intro-done");
      window.sessionStorage.setItem(KEY, "1");
    }, 1700);

    return () => {
      window.clearTimeout(riseAt);
      window.clearTimeout(doneAt);
      document.documentElement.classList.remove("pfl-intro-lock");
    };
  }, []);

  if (phase === "done" || phase === "pending") return null;

  return (
    <div
      className={`pfl-intro ${phase === "rising" ? "pfl-intro--rising" : ""}`}
      aria-hidden
    >
      <div className="pfl-intro__rule" />
      <div className="pfl-intro__content">
        <div className="pfl-intro__eyebrow">
          {t("edition", { volume: SITE.volume, issue: SITE.issue })}
        </div>
        <div className="pfl-intro__mark">
          PlasticFree<span className="pfl-intro__mark-accent">Lab</span>
        </div>
        <div className="pfl-intro__tag">
          {t("tagline")}
        </div>
      </div>
      <div className="pfl-intro__footer">
        <span>{new Date().getFullYear()}</span>
        <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>
  );
}
