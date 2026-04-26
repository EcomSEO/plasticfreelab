import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — runrepeat-style: ink-teal bg, white "PL" wordmark, orange accent.
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
          background: "#1A3338",
          color: "#FFFFFF",
          fontFamily: "Roboto, system-ui, sans-serif",
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 700,
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>P</span>
          <span style={{ color: "#F55310" }}>L</span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#F55310",
              marginLeft: 6,
              marginBottom: 14,
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: "Roboto, system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            opacity: 0.7,
            display: "flex",
          }}
        >
          PlasticFreeLab
        </div>
      </div>
    ),
    { ...size },
  );
}
