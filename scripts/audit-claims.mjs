#!/usr/bin/env node
/**
 * Forbidden-claims audit. Aligned with
 * `_shared/compliance-gap-fill.md` Component 4 + the brand-DNA voice
 * rules in `CLAUDE.md`. Exits 1 on any hit so commits / CI block on
 * regulator-flagged or voice-rule-flagged language reaching the
 * public site.
 *
 * Pure file reads — no shell, no network. Excludes the rules file
 * itself, the audit script, and the launch-blockers doc.
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

// Inline copy of FORBIDDEN_CLAIMS from lib/compliance/forbidden-claims.ts
// kept in sync at every commit. The audit script is intentionally a
// .mjs file with a duplicated rule list so it can run before tsc has
// a chance to compile the lib module.
const FORBIDDEN = [
  // Health / medical claims
  { phrase: "cures cancer", reason: "Disease claim" },
  { phrase: "cures disease", reason: "Disease claim" },
  { phrase: "prevents cancer", reason: "Disease-prevention claim" },
  { phrase: "prevents disease", reason: "Disease-prevention claim" },
  { phrase: "miracle", reason: "Therapeutic claim language" },
  { phrase: "miraculous", reason: "Therapeutic claim language" },

  // Brand-voice rules
  { phrase: "shocking truth", reason: "Voice rule: no fearmongering" },
  { phrase: "what they don't want you to know", reason: "Voice rule: no conspiracy framing" },
  { phrase: "must-have", reason: "Voice rule: brand book forbids" },
  { phrase: "toxic chemicals", reason: "Voice rule: name the specific chemical" },
  { phrase: "detox your home", reason: "Voice rule: 'detox' is wellness-influencer prose" },
  { phrase: "go green", reason: "Voice rule: vague greenwash" },
];

// Walk the editorial surfaces. Skip generated, vendored, or rule files.
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "_legacy",
  "scripts",
]);
const SKIP_FILES = new Set([
  "forbidden-claims.ts",
  "audit-claims.mjs",
  "launch-blockers.md",
  "humanizer-rules.md",
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), files);
      continue;
    }
    if (SKIP_FILES.has(entry.name)) continue;
    if (!/\.(mdx|md|tsx|ts|json)$/.test(entry.name)) continue;
    files.push(path.join(dir, entry.name));
  }
  return files;
}

const targets = [
  path.join(repoRoot, "app"),
  path.join(repoRoot, "components"),
  path.join(repoRoot, "lib", "content"),
  path.join(repoRoot, "i18n"),
];
const files = targets.flatMap((d) => (fs.existsSync(d) ? walk(d) : []));

let violations = 0;
for (const f of files) {
  const content = fs.readFileSync(f, "utf8").toLowerCase();
  for (const { phrase, reason } of FORBIDDEN) {
    if (content.includes(phrase)) {
      console.error(`x ${path.relative(repoRoot, f)}`);
      console.error(`   "${phrase}" -- ${reason}`);
      violations += 1;
    }
  }
}

if (violations > 0) {
  console.error(`\n${violations} forbidden-claim hits. Commit blocked.`);
  process.exit(1);
}
console.log("OK: no forbidden-claim patterns detected.");
