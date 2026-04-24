"use client";

import { useEffect, useRef } from "react";

/**
 * BotanicalHero — signature hero interactive.
 *
 * A hand-drawn botanical line composition (stem, leaves, bud, seed) echoing
 * the PlasticFreeLab mark. Lines subtly bend toward the cursor as it moves
 * across the hero, suggesting "life reaching out." Pure SVG + rAF-throttled
 * transforms. Respects prefers-reduced-motion (static composition only).
 *
 * The composition is deliberately asymmetric — anchored bottom-right of the
 * hero, growing up and to the left — so it frames the headline without
 * competing with it.
 */
export function BotanicalHero({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const leaves = svg.querySelectorAll<SVGGElement>("[data-leaf]");
    const stems = svg.querySelectorAll<SVGPathElement>("[data-stem]");
    const bud = svg.querySelector<SVGGElement>("[data-bud]");

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    let rect = svg.getBoundingClientRect();

    const onResize = () => {
      rect = svg.getBoundingClientRect();
    };
    const onMove = (e: MouseEvent) => {
      // Normalize to -1..1 relative to svg center
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
    };

    const tick = () => {
      // Soft lerp
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Each leaf rotates/translates by its own weight
      leaves.forEach((leaf, i) => {
        const weight = parseFloat(leaf.dataset.weight || "1");
        const rot = currentX * 4 * weight;
        const tx = currentX * 2.2 * weight;
        const ty = currentY * 1.4 * weight;
        leaf.setAttribute(
          "transform",
          `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) rotate(${rot.toFixed(2)} ${leaf.dataset.ox} ${leaf.dataset.oy})`
        );
      });

      // Stems bow slightly
      stems.forEach((stem, i) => {
        const bow = (currentX * 1.2 + (i % 2 ? 0.4 : -0.4));
        stem.style.transform = `translate(${bow.toFixed(2)}px, ${(currentY * 0.8).toFixed(2)}px)`;
      });

      if (bud) {
        const s = 1 + (currentY * -0.02);
        bud.setAttribute(
          "transform",
          `translate(${(currentX * 2).toFixed(2)} ${(currentY * 1.5).toFixed(2)}) scale(${s.toFixed(3)})`
        );
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 520"
      className={`botanical-hero ${className}`}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central stem — draws upward from base */}
      <g className="botanical-group">
        <path
          data-stem
          className="botanical-draw botanical-draw-1"
          d="M210 500 C 208 440, 214 380, 206 320 C 198 260, 210 200, 200 140 C 196 110, 210 80, 204 40"
          strokeWidth="1.2"
        />

        {/* Secondary curving stem */}
        <path
          data-stem
          className="botanical-draw botanical-draw-2"
          d="M210 400 C 230 380, 260 360, 280 320"
          strokeWidth="0.9"
        />

        <path
          data-stem
          className="botanical-draw botanical-draw-3"
          d="M208 300 C 180 290, 150 280, 120 260"
          strokeWidth="0.9"
        />

        <path
          data-stem
          className="botanical-draw botanical-draw-4"
          d="M204 190 C 230 178, 250 160, 260 130"
          strokeWidth="0.85"
        />

        <path
          data-stem
          className="botanical-draw botanical-draw-5"
          d="M200 120 C 178 110, 160 92, 152 68"
          strokeWidth="0.85"
        />

        {/* Leaves — each is a small almond-shape path grouped so it can rotate around its base */}
        <g data-leaf data-weight="1.1" data-ox="280" data-oy="320">
          <path
            className="botanical-draw botanical-draw-6"
            d="M280 320 C 298 304, 322 296, 340 308 C 326 328, 302 336, 280 320 Z"
            strokeWidth="0.9"
          />
          <path
            className="botanical-draw botanical-draw-6"
            d="M282 321 C 300 316, 322 314, 338 310"
            strokeWidth="0.5"
            opacity="0.55"
          />
        </g>

        <g data-leaf data-weight="1.2" data-ox="120" data-oy="260">
          <path
            className="botanical-draw botanical-draw-7"
            d="M120 260 C 98 246, 70 246, 52 260 C 72 282, 100 282, 120 260 Z"
            strokeWidth="0.9"
          />
          <path
            className="botanical-draw botanical-draw-7"
            d="M118 262 C 98 262, 74 266, 54 262"
            strokeWidth="0.5"
            opacity="0.55"
          />
        </g>

        <g data-leaf data-weight="1.3" data-ox="260" data-oy="130">
          <path
            className="botanical-draw botanical-draw-8"
            d="M260 130 C 276 116, 298 114, 312 128 C 296 146, 276 146, 260 130 Z"
            strokeWidth="0.9"
          />
          <path
            className="botanical-draw botanical-draw-8"
            d="M262 130 C 278 126, 296 126, 310 128"
            strokeWidth="0.5"
            opacity="0.55"
          />
        </g>

        <g data-leaf data-weight="1.4" data-ox="152" data-oy="68">
          <path
            className="botanical-draw botanical-draw-9"
            d="M152 68 C 134 52, 110 48, 92 62 C 108 84, 134 86, 152 68 Z"
            strokeWidth="0.9"
          />
          <path
            className="botanical-draw botanical-draw-9"
            d="M150 70 C 132 68, 112 70, 94 64"
            strokeWidth="0.5"
            opacity="0.55"
          />
        </g>

        {/* Bud at top — the "life" moment, echoes mark.svg terracotta dot */}
        <g data-bud transform="translate(0 0)">
          <circle
            className="botanical-bud-outer"
            cx="204"
            cy="40"
            r="6"
            strokeWidth="0.8"
            fill="none"
          />
          <circle
            className="botanical-bud"
            cx="204"
            cy="40"
            r="2.6"
            fill="#C4633D"
            stroke="none"
          />
        </g>

        {/* Base anchor — echoes mark.svg forest dot */}
        <circle
          className="botanical-root"
          cx="210"
          cy="500"
          r="3.4"
          fill="#2C3E2F"
          stroke="none"
        />
      </g>
    </svg>
  );
}
