import type { Locale } from "@/i18n/routing";

type LocaleSite = {
  tagline?: string;
  description?: string;
};

export const SITE = {
  name: "PlasticFreeLab",
  url: "https://plasticfreelab.com",
  tagline: "We test what's actually inside the products in your kitchen.",
  description:
    "We send pans, food storage, water filters, and bottles to an accredited lab. We home-test in real kitchens. We publish what we find, including what we wouldn't buy ourselves.",
  author: "The PlasticFreeLab Team",
  email: "hello@plasticfreelab.com",
  launched: true,
  volume: "Vol. I",
  issue: "No. 01",
  i18n: {
    de: {
      tagline: "Wir prüfen, was tatsächlich in Ihren Küchenprodukten steckt.",
      description:
        "Wir schicken Pfannen, Vorratsdosen, Wasserfilter und Trinkflaschen in ein akkreditiertes Labor. Wir testen sie zu Hause in echten Küchen. Wir veröffentlichen, was wir finden, auch das, was wir selbst nicht kaufen würden.",
    },
    fr: {
      tagline: "Nous testons ce que vos ustensiles de cuisine contiennent vraiment.",
      description:
        "Nous envoyons casseroles, contenants, filtres à eau et bouteilles dans un laboratoire accrédité. Nous les testons chez nous, en cuisine réelle. Nous publions ce que nous trouvons, y compris ce que nous n'achèterions pas.",
    },
    it: {
      tagline: "Verifichiamo cosa c'è davvero nei prodotti della vostra cucina.",
      description:
        "Mandiamo pentole, contenitori, filtri per l'acqua e borracce a un laboratorio accreditato. Le proviamo in cucine vere. Pubblichiamo ciò che troviamo, comprese le cose che non compreremmo.",
    },
    es: {
      tagline: "Comprobamos qué hay realmente en los productos de su cocina.",
      description:
        "Enviamos sartenes, recipientes, filtros de agua y botellas a un laboratorio acreditado. Las probamos en cocinas reales. Publicamos lo que encontramos, incluido lo que nosotros no compraríamos.",
    },
    nl: {
      tagline: "Wij testen wat er echt in uw keukenproducten zit.",
      description:
        "Wij sturen pannen, voorraadbakjes, waterfilters en flessen naar een geaccrediteerd lab. Wij testen ze thuis in echte keukens. Wij publiceren wat we vinden, ook wat we zelf niet zouden kopen.",
    },
    pl: {
      tagline: "Sprawdzamy, co naprawdę kryje się w produktach z Państwa kuchni.",
      description:
        "Wysyłamy patelnie, pojemniki, filtry do wody i butelki do akredytowanego laboratorium. Testujemy je w prawdziwych kuchniach. Publikujemy wyniki, także te dotyczące rzeczy, których sami byśmy nie kupili.",
    },
    sv: {
      tagline: "Vi testar vad som faktiskt finns i dina köksprodukter.",
      description:
        "Vi skickar stekpannor, förvaringskärl, vattenfilter och flaskor till ett ackrediterat laboratorium. Vi testar dem hemma i riktiga kök. Vi publicerar vad vi hittar, även det vi själva inte skulle köpa.",
    },
    pt: {
      tagline: "Verificamos o que está mesmo dentro dos produtos da sua cozinha.",
      description:
        "Enviamos frigideiras, recipientes, filtros de água e garrafas a um laboratório acreditado. Testamo-los em cozinhas reais. Publicamos o que encontramos, incluindo aquilo que nós próprios não compraríamos.",
    },
    ro: {
      tagline: "Verificăm ce conțin de fapt produsele din bucătăria dumneavoastră.",
      description:
        "Trimitem tigăi, recipiente, filtre de apă și sticle la un laborator acreditat. Le încercăm acasă, în bucătării reale. Publicăm ce găsim, inclusiv ce nu am cumpăra noi înșine.",
    },
    cs: {
      tagline: "Ověřujeme, co je doopravdy ve výrobcích z vaší kuchyně.",
      description:
        "Pánve, dózy, vodní filtry a láhve posíláme do akreditované laboratoře. Testujeme je doma, ve skutečných kuchyních. Zveřejňujeme, co najdeme, včetně věcí, které bychom sami nekoupili.",
    },
    no: {
      tagline: "Vi tester hva som faktisk finnes i kjøkkenproduktene dine.",
      description:
        "Vi sender panner, oppbevaringsbokser, vannfilter og flasker til et akkreditert laboratorium. Vi tester dem hjemme i ekte kjøkken. Vi publiserer det vi finner, også det vi selv ikke ville kjøpt.",
    },
  } satisfies Partial<Record<Locale, LocaleSite>>,
} as const;

export function siteTagline(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.tagline ?? SITE.tagline;
}

export function siteDescription(locale: Locale): string {
  return SITE.i18n[locale as keyof typeof SITE.i18n]?.description ?? SITE.description;
}
