import { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">{children}</div>;
}

export function ArticleShell({ children }: { children: ReactNode }) {
  return <article className="mx-auto max-w-3xl px-6 py-10 md:py-14">{children}</article>;
}

/**
 * Wide shell for money pages (comparison/pillar) that benefits from a TOC or
 * side column on desktop. Narrower inner column keeps reading length ideal.
 */
export function WideArticleShell({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 xl:col-span-8">{children}</div>
        {aside && (
          <aside className="lg:col-span-4 xl:col-span-4 lg:pl-4">
            <div className="lg:sticky lg:top-28">{aside}</div>
          </aside>
        )}
      </div>
    </article>
  );
}
