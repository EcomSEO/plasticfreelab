"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { hubs, tHub } from "@/lib/content/hubs";
import { Wordmark } from "./editorial/Wordmark";
import { Dateline } from "./editorial/Dateline";
import { ReadingProgress } from "./ReadingProgress";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const isCurrent = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  const curr = (href: string) =>
    isCurrent(href) ? { "aria-current": "page" as const } : {};

  return (
    <header className="bg-paper/95 backdrop-blur sticky top-0 z-40 border-b border-forest/10">
      {/* Masthead strip — newspaper/editorial cue */}
      <div className="relative border-b border-forest/10 hidden md:block">
        <div className="mx-auto max-w-6xl px-6 py-2 flex items-center justify-between">
          <Dateline />
          <div className="flex items-center gap-5 text-[11px] tracking-[0.14em] uppercase text-stone">
            <Link href="/editorial-standards" className="nav-link" {...curr("/editorial-standards")}>
              {t("editorialStandards")}
            </Link>
            <span aria-hidden className="text-sage/50">·</span>
            <Link href="/about" className="nav-link" {...curr("/about")}>
              {t("about")}
            </Link>
            <span aria-hidden className="text-sage/50">·</span>
            <Link href="/contact" className="nav-link" {...curr("/contact")}>
              {t("contact")}
            </Link>
            <span aria-hidden className="text-sage/50">·</span>
            <LocaleSwitcher />
          </div>
        </div>
        {/* Reading progress — very thin sage→forest→terracotta line that
            fills as the reader scrolls the page. The signature micro-interaction. */}
        <ReadingProgress />
      </div>

      {/* Main bar */}
      <div className="mx-auto max-w-6xl px-6 py-4 md:py-5 flex items-center justify-between gap-6">
        <Wordmark size="md" />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setGuidesOpen(true)}
            onMouseLeave={() => setGuidesOpen(false)}
          >
            <button
              onClick={() => setGuidesOpen((v) => !v)}
              className="nav-link flex items-center gap-1"
              aria-expanded={guidesOpen}
              aria-haspopup="menu"
              {...(pathname?.startsWith("/guides") ? { "aria-current": "page" as const } : {})}
            >
              {t("guides")}
              <span aria-hidden className="text-sage">▾</span>
            </button>
            {guidesOpen && (
              <div
                role="menu"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-paper border border-forest/15 rounded-sm shadow-card p-3"
              >
                <div className="eyebrow text-stone px-3 pb-2 border-b border-forest/10 mb-2">
                  {t("fiveHubs")}
                </div>
                {hubs.map((hub, i) => {
                  const th = tHub(hub, locale);
                  return (
                    <Link
                      key={hub.slug}
                      href={`/guides/${hub.slug}`}
                      role="menuitem"
                      className="flex items-start gap-3 px-3 py-2.5 hover:bg-sage/8 rounded-sm group"
                    >
                      <span className="rank-numeral !text-base !text-sage/60 group-hover:!text-sage shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="text-forest font-medium leading-tight">
                          {th.name}
                        </div>
                        <div className="text-xs text-stone mt-0.5">
                          {th.shortName}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <Link href="/guides/non-toxic-kitchen" className="nav-link" {...curr("/guides/non-toxic-kitchen")}>
            {t("kitchen")}
          </Link>
          <Link href="/newsletter" className="nav-link" {...curr("/newsletter")}>
            {t("newsletter")}
          </Link>
          <Link
            href="/newsletter"
            className="btn-primary !py-2.5 !px-4 !text-sm"
          >
            {t("getTheAuditArrow")}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-forest inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2"
          aria-label={tc("openMenu")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-paper md:hidden overflow-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-forest/10">
            <Wordmark size="sm" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={tc("closeMenu")}
              className="text-forest inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1">
            <div className="eyebrow text-stone mb-2">{t("fiveHubs")}</div>
            {hubs.map((hub, i) => {
              const th = tHub(hub, locale);
              return (
                <Link
                  key={hub.slug}
                  href={`/guides/${hub.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-lg text-forest font-serif flex items-center gap-3"
                >
                  <span className="rank-numeral !text-xl !text-sage/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {th.name}
                </Link>
              );
            })}
            <div className="eyebrow text-stone mt-6 mb-2">{t("masthead")}</div>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center py-2 text-lg text-forest">
              {t("about")}
            </Link>
            <Link href="/editorial-standards" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center py-2 text-lg text-forest">
              {t("editorialStandards")}
            </Link>
            <Link href="/newsletter" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center py-2 text-lg text-forest">
              {t("newsletter")}
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center py-2 text-lg text-forest">
              {t("contact")}
            </Link>
            <div className="mt-6 mb-2">
              <LocaleSwitcher onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="mt-3">
              <Link
                href="/newsletter"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {t("getTheAuditArrow")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
