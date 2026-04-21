import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: "#7A8B6F",
        "sage-light": "#A8B69E",
        cream: "#F4EFE6",
        "cream-deep": "#EBE2D1",
        paper: "#FBF8F1",
        forest: "#2C3E2F",
        "forest-deep": "#1E2C20",
        terracotta: "#C97D4F",
        "terracotta-deep": "#A35E36",
        charcoal: "#1F1F1F",
        stone: "#6B6B68",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        reading: "42rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(44, 62, 47, 0.04), 0 4px 16px rgba(44, 62, 47, 0.04)",
        card: "0 1px 1px rgba(44, 62, 47, 0.02), 0 6px 24px rgba(44, 62, 47, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
