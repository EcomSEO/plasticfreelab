import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

// Editorial front-page OG card: wordmark, italic tagline, dateline strip.
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FBF8F1",
          color: "#1F1F1F",
          fontFamily: "Georgia, 'Times New Roman', serif",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Top masthead rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 16,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6B6B68",
          }}
        >
          <span>{SITE.volume}</span>
          <span style={{ color: "rgba(122,139,111,0.5)" }}>·</span>
          <span>{SITE.issue}</span>
          <span style={{ color: "rgba(122,139,111,0.5)" }}>·</span>
          <span>The Launch Edition</span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: "rgba(44,62,47,0.15)",
              marginLeft: 8,
              display: "block",
            }}
          />
        </div>

        {/* Center: wordmark + tagline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontWeight: 600,
              fontSize: 172,
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
          >
            <span style={{ color: "#2C3E2F" }}>PlasticFree</span>
            <span style={{ color: "#C97D4F" }}>Lab</span>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#7A8B6F",
                marginLeft: 10,
                marginBottom: 22,
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 40,
              fontStyle: "italic",
              fontSize: 40,
              color: "#2C3E2F",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            {SITE.tagline}
          </div>

          {/* Decorative dotted rule */}
          <div
            style={{
              marginTop: 44,
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: 420,
            }}
          >
            <span
              style={{
                flex: 1,
                height: 1,
                background: "rgba(122,139,111,0.4)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#7A8B6F",
                display: "block",
              }}
            />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "rgba(122,139,111,0.7)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#7A8B6F",
                display: "block",
              }}
            />
            <span
              style={{
                flex: 1,
                height: 1,
                background: "rgba(122,139,111,0.4)",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Bottom dateline strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6B6B68",
            borderTop: "1px solid rgba(44,62,47,0.15)",
            paddingTop: 22,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>{SITE.volume}</span>
            <span style={{ color: "rgba(122,139,111,0.5)" }}>·</span>
            <span>{SITE.issue}</span>
            <span style={{ color: "rgba(122,139,111,0.5)" }}>·</span>
            <span>plasticfreelab.com</span>
          </span>
          <span style={{ display: "flex" }}>Calm &middot; Cited &middot; Tested</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
