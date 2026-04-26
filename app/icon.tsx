import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand mark — "P" with orange accent dot on the ink-teal masthead color.
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
          background: "#1A3338",
          color: "#FFFFFF",
          fontFamily: "Roboto, system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0,
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
              background: "#F55310",
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
