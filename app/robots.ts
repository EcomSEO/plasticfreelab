import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE.launched) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
