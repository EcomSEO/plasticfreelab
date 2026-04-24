/**
 * SignatureDivider — our in-house section break.
 *
 * A thin sage hairline that draws in from left (via .rule-draw),
 * a small centered caps label, and hairline continuing on the right.
 * Replaces generic <hr> between major sections.
 */
export function SignatureDivider({
  label = "— § —",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`signature-divider ${className}`} aria-hidden="true">
      <span className="signature-divider__rule rule-draw" />
      <span className="signature-divider__label">{label}</span>
      <span className="signature-divider__rule signature-divider__rule--right rule-draw" />
    </div>
  );
}
