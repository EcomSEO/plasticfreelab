import { SITE } from "@/lib/content/site";

function currentMonth() {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function Dateline({ className = "" }: { className?: string }) {
  return (
    <div className={`dateline flex items-center gap-3 ${className}`}>
      <span>{SITE.volume}</span>
      <span aria-hidden>·</span>
      <span>{SITE.issue}</span>
      <span aria-hidden>·</span>
      <span>{currentMonth()}</span>
      <span aria-hidden>·</span>
      <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
    </div>
  );
}
