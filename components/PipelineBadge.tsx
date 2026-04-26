import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pipelineCounts } from "@/lib/content/pipeline";

/**
 * PipelineBadge — small chip in the masthead strip showing live counts
 * of investigations in the lab and queued. Links to /pipeline.
 *
 * Counts are computed at render-time from `lib/content/pipeline.ts`, so
 * the chip and the public log can never drift apart. The terracotta dot
 * pulses to imply ongoing work; the pulse is killed under
 * `prefers-reduced-motion` (see globals.css).
 */
export function PipelineBadge({ className = "" }: { className?: string }) {
  const t = useTranslations("pipeline");
  const counts = pipelineCounts();

  return (
    <Link
      href="/pipeline"
      className={`pipeline-badge ${className}`}
      aria-label={t("badgeAriaLabel", {
        testing: counts.testing,
        queued: counts.researching,
      })}
    >
      <span className="pipeline-badge__dot" aria-hidden="true" />
      <span>
        {t("inTheLabCount", { n: counts.testing })}
      </span>
      <span className="pipeline-badge__sep" aria-hidden="true">
        ·
      </span>
      <span>{t("queuedCount", { n: counts.researching })}</span>
      <span className="pipeline-badge__sep" aria-hidden="true">
        ·
      </span>
      <span>{t("updatedWeekly")}</span>
    </Link>
  );
}
