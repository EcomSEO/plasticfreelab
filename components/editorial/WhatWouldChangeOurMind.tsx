import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

export async function WhatWouldChangeOurMind({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("postChrome");
  return (
    <section className="my-12 relative">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-2 w-2 rounded-full bg-terracotta" />
        <span className="caps-label text-terracotta">{t("changeMind")}</span>
      </div>
      <div className="pl-5 border-l-2 border-terracotta/50 max-w-prose text-[15.5px] text-charcoal/90 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
