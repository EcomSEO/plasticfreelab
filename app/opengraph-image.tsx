import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

// Runrepeat-style OG card: white bg, ink + orange wordmark, clean Roboto layout.
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          color: "#000000",
          fontFamily: "Roboto, system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          position: "relative",
        }}
      >
        {/* Top dark masthead bar */}
        <div
          style={{
            background: "#1A3338",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            padding: "20px 60px",
            fontFamily: "Roboto, system-ui, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          <span style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#FFFFFF" }}>PlasticFree</span>
            <span style={{ color: "#F55310" }}>Lab</span>
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              display: "flex",
            }}
          >
            plasticfreelab.com
          </span>
        </div>

        {/* Center: H1-style headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              fontFamily: "Roboto, system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#F55310",
              display: "flex",
              marginBottom: 20,
            }}
          >
            The Investigation
          </div>
          <div
            style={{
              fontFamily: "Roboto, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 72,
              lineHeight: 1.05,
              color: "#1A3338",
              letterSpacing: 0,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            We test what&apos;s actually inside your kitchen.
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Roboto, system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#000000",
              display: "flex",
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            borderTop: "1px solid #EEEEEE",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 72px",
            fontFamily: "Roboto, system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#666666",
          }}
        >
          <span style={{ display: "flex" }}>Calm &middot; Cited &middot; Tested</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#F55310",
                display: "block",
              }}
            />
            <span style={{ color: "#1A3338" }}>Independent Lab Reports</span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
