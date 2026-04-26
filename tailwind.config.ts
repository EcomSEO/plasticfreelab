import type { Config } from "tailwindcss";

/**
 * Tailwind theme — runrepeat-inspired visual system.
 *
 * The canonical tokens are: ink, orange, score, yellow, red, gray-line,
 * gray-soft, gray-mute. Roboto is the single typeface family.
 *
 * Legacy color names (sage / cream / forest / terracotta / paper / charcoal /
 * stone) and the legacy `font-serif` family are kept as ALIASES so the 200+
 * existing component references compile without rewrites — but they now point
 * at the runrepeat tokens. So `text-forest` renders as #1A3338, `bg-cream`
 * renders as #FFFFFF, `font-serif` renders Roboto, etc.
 *
 * Components can be migrated to the canonical names at leisure; nothing
 * forces a sweeping rewrite.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Canonical runrepeat tokens
        ink: "#1A3338",
        "ink-deep": "#0F2024",
        orange: "#F55310",
        "orange-deep": "#C5430D",
        score: "#098040",
        yellow: "#FFB717",
        red: "#C53127",
        "gray-line": "#EEEEEE",
        "gray-soft": "#F7F7F7",
        "gray-mute": "#666666",

        // Legacy aliases — render new tokens
        sage: "#098040", // → score green
        "sage-light": "#7FBF9A",
        cream: "#FFFFFF", // → pure white
        "cream-deep": "#F7F7F7", // → gray-soft
        paper: "#FFFFFF", // → pure white
        forest: "#1A3338", // → ink
        "forest-deep": "#0F2024",
        terracotta: "#F55310", // → orange
        "terracotta-deep": "#C5430D",
        charcoal: "#000000", // → pure black
        stone: "#666666", // → gray-mute
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        // Legacy aliases — all map to Roboto so font-serif/font-instrument
        // class names continue to compile
        serif: ["Roboto", "system-ui", "sans-serif"],
        instrument: ["Roboto", "system-ui", "sans-serif"],
        accent: ["Roboto", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        reading: "42rem",
      },
      boxShadow: {
        // Single utilitarian shadow — no brand tinting
        soft: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)",
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
