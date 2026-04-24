import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand mark — "P" in Fraunces-grade serif on forest, the wordmark's primary ink.
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2C3E2F",
          color: "#F4EFE6",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 600,
          fontSize: 24,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline" }}>
          <span>P</span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: 999,
              background: "#7A8B6F",
              marginLeft: 1,
              display: "block",
            }}
          />
        </span>
      </div>
    ),
    { ...size },
  );
}
