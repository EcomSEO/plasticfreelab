import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — wordmark-style composition with a sage dot ornament.
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2C3E2F",
          color: "#F4EFE6",
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 600,
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: "-0.045em",
          }}
        >
          <span style={{ color: "#F4EFE6" }}>P</span>
          <span style={{ color: "#C97D4F" }}>L</span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#7A8B6F",
              marginLeft: 6,
              marginBottom: 14,
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#A8B69E",
            display: "flex",
          }}
        >
          Est. MMXXVI
        </div>
      </div>
    ),
    { ...size },
  );
}
