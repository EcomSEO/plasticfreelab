import Link from "next/link";
import type { Hub } from "@/lib/content/hubs";
import { Monogram } from "./editorial/Monogram";

export function HubCard({ hub }: { hub: Hub }) {
  return (
    <Link
      href={`/guides/${hub.slug}`}
      className="card-editorial block p-6 bg-white/60 border border-forest/10 rounded-lg h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <Monogram size={24} />
        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-stone">
          The PlasticFreeLab Team
        </span>
      </div>
      <h3 className="font-serif text-xl text-forest mb-2">{hub.name}</h3>
      <p className="text-sm text-charcoal/70 leading-relaxed">{hub.oneLiner}</p>
      <span className="mt-4 inline-block text-sage text-sm">Browse →</span>
    </Link>
  );
}
