import { SITE } from "@/lib/content/site";
import { hubs } from "@/lib/content/hubs";

export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Guides",
    ...hubs.map((h) => `- [${h.name}](${SITE.url}/guides/${h.slug})`),
    "",
    "## Editorial",
    `- [Editorial standards](${SITE.url}/editorial-standards)`,
    `- [About](${SITE.url}/about)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
