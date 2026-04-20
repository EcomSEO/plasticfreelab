import { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">{children}</div>;
}

export function ArticleShell({ children }: { children: ReactNode }) {
  return <article className="mx-auto max-w-3xl px-6 py-10 md:py-14">{children}</article>;
}
