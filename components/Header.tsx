"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { hubs, tHub } from "@/lib/content/hubs";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PipelineBadge } from "./PipelineBadge";
import type { Locale } from "@/i18n/routing";

/**
 * Header — runrepeat-style single dark-teal masthead.
 *
 * Bar: 65px tall, bg-#1A3338, white text. Center: large white search
 * input with orange #F55310 submit button. Right: Reviews / Guides /
 * locale switcher. Below the bar: a thin secondary white strip with
 * the Pipeline badge.
 */
export function Header() {
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const isCurrent = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Main dark-teal bar */}
      <div
        className="bg-ink text-white"
        style={{ backgroundColor: "#1A3338" }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-[65px] flex items-center gap-4 md:gap-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="PlasticFreeLab — home"
            className="flex items-center gap-2 shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/mark.svg"
              alt=""
              aria-hidden
              className="h-6 w-6 md:h-7 md:w-7"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: 0,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              PlasticFree<span style={{ fontWeight: 400 }}>Lab</span>
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form
            role="search"
            action="/"
            className="hidden md:flex flex-1 max-w-[520px] mx-auto"
          >
            <label className="flex w-full">
              <span className="sr-only">Search</span>
              <input
                type="search"
                name="q"
                placeholder="Search investigations…"
                className="flex-1 h-9 px-3 text-[14px] bg-white text-black border border-white rounded-l-sm focus:outline-none focus:ring-1 focus:ring-orange"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <button
                type="submit"
                aria-label="Search"
                className="h-9 w-10 rounded-r-sm flex items-center justify-center"
                style={{ backgroundColor: "#F55310", color: "#FFFFFF" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </button>
            </label>
          </form>

          {/* Right nav — desktop */}
          <nav className="hidden md:flex items-center gap-5 shrink-0 text-[14px]">
            <div
              className="relative"
              onMouseEnter={() => setGuidesOpen(true)}
              onMouseLeave={() => setGuidesOpen(false)}
            >
              <button
                onClick={() => setGuidesOpen((v) => !v)}
                className="text-white hover:opacity-75 inline-flex items-center gap-1 transition"
                aria-expanded={guidesOpen}
                aria-haspopup="menu"
              >
                {t("guides")}
                <span aria-hidden style={{ fontSize: 10 }}>▾</span>
              </button>
              {guidesOpen && (
                <div
                  role="menu"
                  className="absolute top-full right-0 mt-2 w-72 rounded-sm shadow-card border border-gray-line p-2"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  {hubs.map((hub) => {
                    const th = tHub(hub, locale);
                    return (
                      <Link
                        key={hub.slug}
                        href={`/guides/${hub.slug}`}
                        role="menuitem"
                        onClick={() => setGuidesOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-soft rounded-sm"
                      >
                        <div className="text-ink font-medium text-[14px] leading-tight">
                          {th.name}
                        </div>
                        <div className="text-[12px] text-gray-mute mt-0.5">
                          {th.shortName}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Link
              href="/newsletter"
              className="text-white hover:opacity-75 transition"
              aria-current={isCurrent("/newsletter") ? "page" : undefined}
            >
              {t("newsletter")}
            </Link>
            <LocaleSwitcher />
          </nav>

          {/* Mobile: search icon + hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="text-white inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={tc("openMenu")}
              className="text-white inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search drawer */}
        {searchOpen && (
          <form
            role="search"
            action="/"
            className="md:hidden px-4 pb-3"
          >
            <label className="flex w-full">
              <input
                type="search"
                name="q"
                placeholder="Search investigations…"
                className="flex-1 h-9 px-3 text-[14px] bg-white text-black border border-white rounded-l-sm focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="h-9 w-10 rounded-r-sm flex items-center justify-center"
                style={{ backgroundColor: "#F55310", color: "#FFFFFF" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </button>
            </label>
          </form>
        )}
      </div>

      {/* Secondary strip: pipeline badge on white */}
      <div className="bg-white border-b border-gray-line">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-2 flex items-center justify-between gap-3">
          <PipelineBadge />
          <div className="hidden md:flex items-center gap-4 text-[11px] tracking-[0.05em] uppercase text-gray-mute">
            <Link href="/editorial-standards" className="hover:text-ink transition">
              {t("editorialStandards")}
            </Link>
            <span aria-hidden className="text-gray-mute opacity-50">·</span>
            <Link href="/about" className="hover:text-ink transition">
              {t("about")}
            </Link>
            <span aria-hidden className="text-gray-mute opacity-50">·</span>
            <Link href="/contact" className="hover:text-ink transition">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden overflow-auto">
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: "#1A3338", color: "#FFFFFF" }}
          >
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              PlasticFreeLab
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={tc("closeMenu")}
              className="text-white inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6 gap-1">
            <div className="caps-label mb-2">{t("fiveHubs")}</div>
            {hubs.map((hub) => {
              const th = tHub(hub, locale);
              return (
                <Link
                  key={hub.slug}
                  href={`/guides/${hub.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[16px] text-ink"
                >
                  {th.name}
                </Link>
              );
            })}
            <div className="caps-label mt-6 mb-2">{t("masthead")}</div>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center text-[16px] text-ink">
              {t("about")}
            </Link>
            <Link href="/editorial-standards" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center text-[16px] text-ink">
              {t("editorialStandards")}
            </Link>
            <Link href="/newsletter" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center text-[16px] text-ink">
              {t("newsletter")}
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="min-h-[44px] flex items-center text-[16px] text-ink">
              {t("contact")}
            </Link>
            <div className="mt-6 mb-2">
              <LocaleSwitcher onNavigate={() => setMobileOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
