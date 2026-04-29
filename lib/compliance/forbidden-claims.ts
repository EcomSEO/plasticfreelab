/**
 * Forbidden-claim phrases for plasticfreelab. Aligned with
 * `_shared/compliance-gap-fill.md` Component 4 + the brand-DNA voice
 * rules in `CLAUDE.md` ("No fearmongering, alarm caps, mommy-blog
 * panic language").
 *
 * Two pattern families:
 *   - Regulator-flagged medical / health claims (EFSA closed-list,
 *     HWG §3 in DE, ANSM in FR)
 *   - Brand-voice forbidden tones (mom-blog panic, conspiracy framing,
 *     wellness-influencer prose)
 */

export type ForbiddenPhrase = {
  phrase: string;
  reason: string;
  locales: "*" | string[];
};

export const FORBIDDEN_CLAIMS: ForbiddenPhrase[] = [
  // ── Health / medical claims (EFSA, HWG, ANSM) ─────────────────────
  { phrase: "cures cancer", reason: "EFSA closed-list / regulator-forbidden disease claim.", locales: "*" },
  { phrase: "cures disease", reason: "EFSA closed-list disease claim.", locales: "*" },
  { phrase: "prevents cancer", reason: "Disease-prevention claim requires authorisation.", locales: "*" },
  { phrase: "prevents disease", reason: "Disease-prevention claim requires authorisation.", locales: "*" },
  { phrase: "miracle", reason: "Forbidden therapeutic claim language.", locales: "*" },
  { phrase: "miraculous", reason: "Forbidden therapeutic claim language.", locales: "*" },

  // ── Brand-voice rules from CLAUDE.md ──────────────────────────────
  { phrase: "shocking truth", reason: "Voice rule: no fearmongering / alarm caps.", locales: "*" },
  { phrase: "what they don't want you to know", reason: "Voice rule: no conspiracy framing.", locales: "*" },
  { phrase: "the secret", reason: "Voice rule: lab-notebook precision, no hype framing.", locales: "*" },
  { phrase: "must-have", reason: "Voice rule: brand book forbids 'must-have'.", locales: "*" },
  { phrase: "bright", reason: "Voice rule: brand book forbids 'bright' as descriptor.", locales: "*" },
  { phrase: "toxic chemicals", reason: "Voice rule: name the specific chemical (PFAS, BPA, etc.); 'toxic chemicals' is mom-blog framing.", locales: "*" },
  { phrase: "detox your home", reason: "Voice rule: 'detox' is wellness-influencer prose.", locales: "*" },
  { phrase: "go green", reason: "Voice rule: vague greenwash framing.", locales: "*" },
  { phrase: "eco-friendly", reason: "Voice rule: vague — name the specific property (PFAS-free, BPA-free, etc).", locales: "*" },

  // ── DE-specific (HWG §3) ──────────────────────────────────────────
  { phrase: "wundermittel", reason: "HWG §3 — unconditional success claim forbidden in DE health advertising.", locales: ["de"] },
  { phrase: "garantiert geheilt", reason: "HWG §3 — unconditional success claim forbidden in DE.", locales: ["de"] },

  // ── FR-specific ────────────────────────────────────────────────────
  { phrase: "remède miracle", reason: "ANSM — miracle-cure framing forbidden in FR.", locales: ["fr"] },
];

export function forbiddenForLocale(locale: string): ForbiddenPhrase[] {
  return FORBIDDEN_CLAIMS.filter(
    (p) => p.locales === "*" || p.locales.includes(locale),
  );
}

export function scanForbiddenClaims(
  body: string,
  locale: string,
): ForbiddenPhrase[] {
  const haystack = body.toLowerCase();
  return forbiddenForLocale(locale).filter((p) => haystack.includes(p.phrase));
}
