import Link from "next/link";
import { hubs } from "@/lib/content/hubs";

export function Footer() {
  return (
    <footer className="border-t border-forest/10 mt-20 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">
        <div>
          <h4 className="font-serif text-forest text-lg mb-4">Guides</h4>
          <ul className="space-y-2">
            {hubs.map((hub) => (
              <li key={hub.slug}>
                <Link href={`/guides/${hub.slug}`} className="text-charcoal/80 hover:text-sage">
                  {hub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-forest text-lg mb-4">About</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-charcoal/80 hover:text-sage">About PlasticFreeLab</Link></li>
            <li><Link href="/editorial-standards" className="text-charcoal/80 hover:text-sage">Editorial Standards</Link></li>
            <li><Link href="/contact" className="text-charcoal/80 hover:text-sage">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-forest text-lg mb-4">Fine print</h4>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="text-charcoal/80 hover:text-sage">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-charcoal/80 hover:text-sage">Terms of Service</Link></li>
            <li><Link href="/affiliate-disclosure" className="text-charcoal/80 hover:text-sage">Affiliate Disclosure</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest/10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-charcoal/60">
          <div>
            © {new Date().getFullYear()} PlasticFreeLab
          </div>
          <div className="max-w-xl">
            We sometimes earn a commission from links on this page. We never accept payment for placement.
          </div>
        </div>
      </div>
    </footer>
  );
}
