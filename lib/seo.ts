import type { Metadata } from "next";
import { SITE } from "./content/site";

const INDEX_WHEN_LAUNCHED: Metadata["robots"] = {
  index: true,
  follow: true,
};

const NO_INDEX_PRE_LAUNCH: Metadata["robots"] = {
  index: false,
  follow: false,
};

export function robotsMeta(): Metadata["robots"] {
  return SITE.launched ? INDEX_WHEN_LAUNCHED : NO_INDEX_PRE_LAUNCH;
}

export function canonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}): Metadata {
  const url = canonical(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: robotsMeta(),
    openGraph: {
      type: opts.ogType ?? "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: SITE.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
