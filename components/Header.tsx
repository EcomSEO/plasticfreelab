"use client";

import Link from "next/link";
import { useState } from "react";
import { hubs } from "@/lib/content/hubs";

export function Header() {
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-forest/10 bg-cream/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-forest font-semibold">
          PlasticFreeLab
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setGuidesOpen(true)}
            onMouseLeave={() => setGuidesOpen(false)}
          >
            <button
              onClick={() => setGuidesOpen((v) => !v)}
              className="hover:text-sage flex items-center gap-1"
              aria-expanded={guidesOpen}
              aria-haspopup="menu"
            >
              Guides
              <span aria-hidden>▾</span>
            </button>
            {guidesOpen && (
              <div
                role="menu"
                className="absolute top-full left-0 mt-2 w-72 bg-cream border border-forest/10 rounded-md shadow-lg p-2"
              >
                {hubs.map((hub) => (
                  <Link
                    key={hub.slug}
                    href={`/guides/${hub.slug}`}
                    role="menuitem"
                    className="block px-3 py-2 hover:bg-sage/10 rounded text-charcoal"
                  >
                    {hub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="hover:text-sage">
            About
          </Link>
          <Link href="/newsletter" className="hover:text-sage">
            Newsletter
          </Link>
          <Link
            href="/newsletter"
            className="rounded-md bg-forest px-4 py-2 text-cream hover:bg-sage transition"
          >
            Get the audit
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-forest"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-cream md:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-forest/10">
            <span className="font-serif text-xl text-forest font-semibold">
              PlasticFreeLab
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-forest"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6 gap-1">
            <div className="text-xs uppercase tracking-wide text-charcoal/50 mt-2 mb-1">
              Guides
            </div>
            {hubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-lg text-forest"
              >
                {hub.name}
              </Link>
            ))}
            <div className="text-xs uppercase tracking-wide text-charcoal/50 mt-6 mb-1">
              About
            </div>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-forest">
              About
            </Link>
            <Link href="/editorial-standards" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-forest">
              Editorial standards
            </Link>
            <Link href="/newsletter" onClick={() => setMobileOpen(false)} className="py-2 text-lg text-forest">
              Newsletter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
