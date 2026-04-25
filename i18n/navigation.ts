import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware drop-in replacements for `next/link`, `next/navigation`'s
 * `useRouter`, `usePathname`, and `redirect`. Use these everywhere instead
 * of the next/* originals so locale prefixing happens automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
