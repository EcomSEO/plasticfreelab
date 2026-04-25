import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] tracking-[0.14em] uppercase text-stone"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className="hover:text-sage transition">
                {c.label}
              </Link>
            ) : (
              <span className="text-forest">{c.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <span aria-hidden className="text-sage/50">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
