/**
 * Methodology versioning surface.
 *
 * /methodology resolves to the current PFL Calculator methodology
 * version; historical versions remain reachable at /methodology/v1-1,
 * /methodology/v1-2 so external citations against an older score stay
 * resolvable. When a new version ships:
 *
 *   1. Add the new slug to METHODOLOGY_VERSIONS.
 *   2. Bump CURRENT_METHODOLOGY to that slug.
 *   3. Build /app/methodology/<new-slug>/page.tsx.
 *   4. Update older version pages with a "superseded by …" header.
 */

export const METHODOLOGY_VERSIONS = ["v1-2"] as const;
export type MethodologyVersionSlug = (typeof METHODOLOGY_VERSIONS)[number];

export const CURRENT_METHODOLOGY: MethodologyVersionSlug = "v1-2";

export const METHODOLOGY_LABEL: Record<MethodologyVersionSlug, string> = {
  "v1-2": "v1.2 (current)",
};
