import Link from "next/link";
import type { Hub } from "@/lib/content/hubs";

export function HubCard({ hub }: { hub: Hub }) {
  return (
    <Link
      href={`/guides/${hub.slug}`}
      className="block p-6 bg-white/60 border border-forest/10 rounded-lg hover:border-sage transition h-full"
    >
      <h3 className="font-serif text-xl text-forest mb-2">{hub.name}</h3>
      <p className="text-sm text-charcoal/70 leading-relaxed">{hub.oneLiner}</p>
      <span className="mt-4 inline-block text-sage text-sm">Browse →</span>
    </Link>
  );
}
