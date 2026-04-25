"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { tPost, type Post } from "@/lib/content/posts";
import { tHub, type Hub } from "@/lib/content/hubs";
import type { Locale } from "@/i18n/routing";
import { Eyebrow } from "./editorial/Eyebrow";

const CLAIM_KEYS = ["01", "02", "03"] as const;

export function PinnedInvestigation({
  post,
  hub,
}: {
  post: Post;
  hub: Hub | undefined;
}) {
  const t = useTranslations("pinnedInvestigation");
  const locale = useLocale() as Locale;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const pt = tPost(post, locale);
  const ht = tHub(hub, locale);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(CLAIM_KEYS.length - 1);
      setProgress(1);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const p = Math.max(0, Math.min(1, -rect.top / total));
        setProgress(p);
        const step = Math.min(
          CLAIM_KEYS.length,
          Math.floor(p * (CLAIM_KEYS.length + 0.5))
        );
        setActive(step);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="pinned-investigation"
      aria-labelledby="pinned-investigation-title"
    >
      <div className="pinned-investigation__pin">
        <div className="pinned-investigation__grid">
          <div className="pinned-investigation__lede">
            <Eyebrow tone="terracotta">{t("eyebrow")}</Eyebrow>
            <h2
              id="pinned-investigation-title"
              className="pinned-investigation__title"
              data-balance
            >
              {t("title.before")}{" "}
              <span className="font-instrument italic text-terracotta">
                {t("title.italic")}
              </span>{" "}
              {t("title.after")}
            </h2>

            <div className="pinned-investigation__track" aria-hidden>
              <span
                className="pinned-investigation__track-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <ol className="pinned-investigation__claims">
              {CLAIM_KEYS.map((k, i) => (
                <li
                  key={k}
                  data-active={i <= active}
                  className="pinned-investigation__claim"
                >
                  <span className="pinned-investigation__claim-num">{k}</span>
                  <div>
                    <div className="pinned-investigation__claim-label">
                      {t(`claims.${k}.label` as const)}
                    </div>
                    <p className="pinned-investigation__claim-body">
                      {t(`claims.${k}.body` as const)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <article
            className="pinned-investigation__card"
            data-reveal={active >= CLAIM_KEYS.length ? "in" : undefined}
          >
            <Link href={`/${post.slug}`} className="group block">
              <div className="pinned-investigation__card-meta">
                <span className="tier-badge">{t("editorsPick")}</span>
                <span className="caps-label text-stone">
                  {ht.shortName} · {post.readingTime} min
                </span>
              </div>
              <h3 className="pinned-investigation__card-title">{pt.title}</h3>
              <p className="pinned-investigation__card-body">
                {pt.description}
              </p>
              {post.ourPick && (
                <div className="pinned-investigation__pick">
                  <span className="caps-label text-stone shrink-0">
                    {t("ourPick")}
                  </span>
                  <span className="font-serif text-forest text-lg">
                    {post.ourPick.name}
                  </span>
                </div>
              )}
              <span className="pinned-investigation__cta">
                {t("cta")}
                <span aria-hidden>→</span>
              </span>
            </Link>
            <aside className="pinned-investigation__byline" aria-hidden>
              <span className="pinned-investigation__byline-label">
                {t("bylineBy")}
              </span>
              <span
                className="pinned-investigation__byline-name"
                style={{ whiteSpace: "pre-line" }}
              >
                {t("bylineName")}
              </span>
              <span className="pinned-investigation__byline-date">
                {t("bylineDate")}
              </span>
            </aside>
          </article>
        </div>
      </div>
    </section>
  );
}
