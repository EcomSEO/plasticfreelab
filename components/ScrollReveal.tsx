"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — CSS-first scroll-triggered reveals.
 *
 * Finds every [data-reveal] in the document and toggles data-reveal="in"
 * when it enters the viewport. Once in, it stays in. If the user prefers
 * reduced motion, we mark everything in immediately and skip the observer.
 *
 * Paired with globals.css — the styles live there, not here.
 */
export function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (nodes.length === 0) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.setAttribute("data-reveal", "in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
