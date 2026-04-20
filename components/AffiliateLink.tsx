import { ReactNode } from "react";

export function AffiliateLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      rel="sponsored nofollow noopener"
      target="_blank"
      className={className}
    >
      {children}
    </a>
  );
}
