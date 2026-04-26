import type { Locale } from "@/i18n/routing";

/**
 * Translated metadata (title + description) for each post.
 *
 * Phase 1 shipped German + French. Phase 2 expanded to 12 locales:
 * en/de/fr/it/es/nl/pl/sv/pt/ro/cs/no. Slugs stay in English; body
 * content (faq, products, items, sources) stays in English and the
 * article pages render a translation-pending banner over the body.
 *
 * Adding a new locale = drop another `<locale>` key into each entry.
 */
export type LocalePost = {
  title?: string;
  description?: string;
  h1?: string;
};

export type PostI18n = Partial<Record<Locale, LocalePost>>;

export const POST_I18N: Record<string, PostI18n> = {
  "best-non-toxic-cookware": {
    de: {
      title: "Schadstoffarmes Kochgeschirr 2026: getestet und gerankt",
      h1: "Schadstoffarme Kochgeschirr-Sets 2026, getestet und gerankt",
      description:
        "Wir haben 14 Marken für schadstoffarmes Kochgeschirr geprüft. Hier sind die Empfehlung der Redaktion, die günstigste Wahl und die Sets, von denen wir abraten – jeweils mit Quellen.",
    },
    fr: {
      title: "Meilleurs ustensiles non toxiques 2026, testés et classés",
      h1: "Meilleures batteries non toxiques de 2026, testées et classées",
      description:
        "Nous avons testé 14 marques d’ustensiles non toxiques. Voici notre choix, l’option budget et celles que nous écartons, sources à l’appui.",
    },
    it: {
      title: "Migliori pentole non tossiche 2026: testate e classificate",
      h1: "Set di pentole non tossiche del 2026, testati e classificati",
      description:
        "Abbiamo provato 14 marchi di pentole non tossiche. Ecco la scelta della redazione, l'opzione economica e i set che sconsigliamo — con tanto di fonti.",
    },
    es: {
      title: "Mejor menaje sin tóxicos 2026: probado y clasificado",
      h1: "Mejores baterías de cocina sin tóxicos de 2026, probadas y clasificadas",
      description:
        "Hemos probado 14 marcas de menaje sin tóxicos. Aquí están nuestra elección, la opción económica y las baterías que descartamos — con fuentes.",
    },
    nl: {
      title: "Beste giftvrije pannensets 2026: getest en gerangschikt",
      h1: "Beste giftvrije pannensets van 2026, getest en gerangschikt",
      description:
        "Wij testten veertien merken giftvrij kookgerei. Hier zijn onze keuze, de budgetoptie en de sets die wij afraden — met bronnen.",
    },
    pl: {
      title: "Najlepsze garnki bez toksyn 2026: testy i ranking",
      h1: "Najlepsze zestawy garnków bez toksyn na 2026 — testowane i klasyfikowane",
      description:
        "Sprawdziliśmy 14 marek garnków bez toksyn. Oto wybór redakcji, opcja budżetowa oraz zestawy, które odradzamy — wszystkie ze źródłami.",
    },
    sv: {
      title: "Bästa giftfria köksredskap 2026: testade och rangordnade",
      h1: "Bästa giftfria köksredskapsset 2026, testade och rangordnade",
      description:
        "Vi testade 14 märken av giftfria köksredskap. Här är redaktionens val, budgetalternativet och de set vi avråder från — med källor.",
    },
    pt: {
      title: "Melhores utensílios sem tóxicos 2026: testados e ordenados",
      h1: "Melhores conjuntos de utensílios sem tóxicos de 2026, testados e ordenados",
      description:
        "Testámos 14 marcas de utensílios sem tóxicos. Aqui ficam a nossa escolha, a opção mais económica e os conjuntos que rejeitamos — com fontes.",
    },
    ro: {
      title: "Cele mai bune ustensile fără toxine 2026: testate și clasate",
      h1: "Cele mai bune seturi de ustensile fără toxine din 2026, testate și clasate",
      description:
        "Am încercat 14 mărci de ustensile fără toxine. Iată alegerea redacției, opțiunea de buget și seturile pe care le respingem — cu surse.",
    },
    cs: {
      title: "Nejlepší netoxické nádobí 2026: otestováno a seřazeno",
      h1: "Nejlepší sady netoxického nádobí pro rok 2026, otestované a seřazené",
      description:
        "Vyzkoušeli jsme 14 značek netoxického nádobí. Tady je volba redakce, rozpočtová varianta a sady, které nedoporučujeme — vše se zdroji.",
    },
    no: {
      title: "Beste giftfrie kjøkkenredskaper 2026: testet og rangert",
      h1: "De beste giftfrie kjøkkensettene i 2026, testet og rangert",
      description:
        "Vi prøvde 14 merker giftfrie kjøkkenredskaper. Her er redaksjonens valg, budsjettvarianten og settene vi fraråder — med kilder.",
    },
  },
  "best-water-filters": {
    de: {
      title:
        "Wasserfilter für zu Hause: Auftischgerät, Untertisch oder zentral",
      h1: "Beste Wasserfilter für zu Hause: Auftischgerät, Untertisch oder zentral",
      description:
        "Wir haben Auftisch-, Untertisch- und Hauswasser­filter auf Schadstoff­entfernung, Durchfluss und Kosten je Liter verglichen. Hier ist unsere geordnete Empfehlung.",
    },
    fr: {
      title:
        "Meilleurs filtres à eau\u202F: comptoir, sous-évier, point d’entrée",
      h1: "Meilleurs filtres à eau pour la maison\u202F: comptoir, sous-évier ou point d’entrée",
      description:
        "Nous avons comparé les filtres de comptoir, sous-évier et point d’entrée selon la rétention des contaminants, le débit et le coût au litre. Voici notre choix classé.",
    },
    it: {
      title: "Migliori filtri per l'acqua: da banco, sottolavello o centralizzati",
      h1: "Migliori filtri per l'acqua di casa: da banco, sottolavello o centralizzati",
      description:
        "Abbiamo confrontato filtri da banco, sottolavello e centralizzati per riduzione dei contaminanti, portata e costo al litro. Ecco la nostra raccomandazione classificata.",
    },
    es: {
      title: "Mejores filtros de agua: encimera, bajo fregadero o central",
      h1: "Mejores filtros de agua para casa: encimera, bajo fregadero o central",
      description:
        "Hemos comparado filtros de encimera, bajo fregadero y de entrada según retención de contaminantes, caudal y coste por litro. Aquí está nuestra recomendación ordenada.",
    },
    nl: {
      title: "Beste waterfilters: aanrecht, onder gootsteen of hoofdleiding",
      h1: "Beste waterfilters voor thuis: aanrecht, onder gootsteen of hoofdleiding",
      description:
        "Wij vergeleken aanrecht-, ondergootsteen- en hoofdleidingfilters op contaminantverwijdering, doorstroming en kosten per liter. Hier is onze geordende aanbeveling.",
    },
    pl: {
      title: "Najlepsze filtry do wody: nablatowy, podzlewowy czy centralny",
      h1: "Najlepsze domowe filtry do wody: nablatowy, podzlewowy czy centralny",
      description:
        "Porównaliśmy filtry nablatowe, podzlewowe i centralne pod kątem redukcji zanieczyszczeń, przepływu i kosztu na litr. Oto nasza rekomendacja w rankingu.",
    },
    sv: {
      title: "Bästa vattenfilter: bänkmodell, under diskbänk eller huvudledning",
      h1: "Bästa vattenfiltren för hemmet: bänkmodell, under diskbänk eller huvudledning",
      description:
        "Vi jämförde bänk-, under-diskbänks- och huvudledningsfilter på kontaminantborttagning, flöde och kostnad per liter. Här är vår rangordnade rekommendation.",
    },
    pt: {
      title: "Melhores filtros de água: bancada, sob lava-loiça ou ponto de entrada",
      h1: "Melhores filtros de água para casa: bancada, sob lava-loiça ou ponto de entrada",
      description:
        "Comparámos filtros de bancada, sob lava-loiça e de ponto de entrada quanto à remoção de contaminantes, caudal e custo por litro. Aqui fica a nossa recomendação ordenada.",
    },
    ro: {
      title: "Cele mai bune filtre de apă: pentru blat, sub chiuvetă sau centrale",
      h1: "Cele mai bune filtre de apă pentru casă: blat, sub chiuvetă sau centrale",
      description:
        "Am comparat filtrele de blat, sub chiuvetă și centrale după reducerea contaminanților, debit și costul per litru. Iată recomandarea noastră clasată.",
    },
    cs: {
      title: "Nejlepší filtry na vodu: nástolný, podtlakový nebo centrální",
      h1: "Nejlepší domácí filtry na vodu: nástolný, podtlakový nebo centrální",
      description:
        "Porovnali jsme filtry nástolné, pod dřez a hlavní podle redukce kontaminantů, průtoku a ceny za litr. Tady je naše seřazené doporučení.",
    },
    no: {
      title: "Beste vannfilter: benk, underbenk eller hovedinntak",
      h1: "Beste vannfiltrene for hjemmet: benk, underbenk eller hovedinntak",
      description:
        "Vi sammenlignet benk-, underbenk- og hovedinntaksfiltre på forurensningsfjerning, gjennomstrømning og kostnad per liter. Her er vår rangerte anbefaling.",
    },
  },
  "best-microplastic-free-underwear": {
    de: {
      title: "Mikroplastik­freie Unterwäsche-Marken, getestet und gerankt",
      h1: "Beste mikroplastik­freie Unterwäsche-Marken",
      description:
        "Nach der PFAS-Klage gegen Thinx ein ruhiger Leitfaden zu Unterwäsche-Marken, deren Materialien sich tatsächlich überprüfen lassen.",
    },
    fr: {
      title:
        "Meilleures marques de sous-vêtements sans microplastiques, testées",
      h1: "Meilleures marques de sous-vêtements sans microplastiques",
      description:
        "Après l’affaire PFAS de Thinx, voici le guide posé des marques de sous-vêtements dont les matériaux peuvent être réellement vérifiés.",
    },
    it: {
      title: "Marchi di intimo senza microplastici, testati e classificati",
      h1: "Migliori marchi di intimo senza microplastici",
      description:
        "Dopo la causa PFAS contro Thinx, una guida sobria ai marchi di intimo i cui materiali si possono davvero verificare.",
    },
    es: {
      title: "Marcas de ropa interior sin microplásticos, probadas y clasificadas",
      h1: "Mejores marcas de ropa interior sin microplásticos",
      description:
        "Tras el caso PFAS de Thinx, una guía serena de las marcas de ropa interior cuyos materiales sí se pueden verificar.",
    },
    nl: {
      title: "Microplasticvrije ondergoedmerken, getest en gerangschikt",
      h1: "Beste microplasticvrije ondergoedmerken",
      description:
        "Na de PFAS-zaak rond Thinx een rustige gids voor ondergoedmerken waarvan de materialen werkelijk te verifiëren zijn.",
    },
    pl: {
      title: "Marki bielizny bez mikroplastiku, testowane i klasyfikowane",
      h1: "Najlepsze marki bielizny bez mikroplastiku",
      description:
        "Po sprawie PFAS przeciw Thinx — spokojny przewodnik po markach bielizny, których materiały naprawdę można zweryfikować.",
    },
    sv: {
      title: "Mikroplastfria underklädesmärken, testade och rangordnade",
      h1: "Bästa mikroplastfria underklädesmärken",
      description:
        "Efter PFAS-fallet mot Thinx, en lugn guide till underklädesmärken vars material faktiskt går att verifiera.",
    },
    pt: {
      title: "Marcas de roupa interior sem microplásticos, testadas e ordenadas",
      h1: "Melhores marcas de roupa interior sem microplásticos",
      description:
        "Após o caso PFAS contra a Thinx, um guia calmo das marcas de roupa interior cujos materiais podem mesmo ser verificados.",
    },
    ro: {
      title: "Mărci de lenjerie fără microplastice, testate și clasate",
      h1: "Cele mai bune mărci de lenjerie fără microplastice",
      description:
        "După procesul PFAS împotriva Thinx, un ghid liniștit al mărcilor de lenjerie ale căror materiale chiar pot fi verificate.",
    },
    cs: {
      title: "Značky spodního prádla bez mikroplastů, otestované a seřazené",
      h1: "Nejlepší značky spodního prádla bez mikroplastů",
      description:
        "Po sporu s Thinx kvůli PFAS — klidný průvodce značkami spodního prádla, jejichž materiály se opravdu dají ověřit.",
    },
    no: {
      title: "Mikroplastfrie undertøysmerker, testet og rangert",
      h1: "Beste mikroplastfrie undertøysmerker",
      description:
        "Etter PFAS-saken mot Thinx, en rolig guide til undertøysmerker der materialene faktisk lar seg verifisere.",
    },
  },
  "non-toxic-kitchen-guide": {
    de: {
      title:
        "Der vollständige Leitfaden zur schadstoff­armen Küche, nach Priorität",
      h1: "Der vollständige Leitfaden zur schadstoff­armen Küche",
      description:
        "Alles, was es in der Küche zu tauschen lohnt, geordnet nach Wirkung. Kochgeschirr, Wasser, Aufbewahrung, Klein­geräte, Utensilien – die vollständige Prioritäten­liste.",
    },
    fr: {
      title:
        "Le guide complet de la cuisine non toxique\u202F: tout ce qu’il faut changer, par priorité",
      h1: "Le guide complet de la cuisine non toxique",
      description:
        "Tout ce qui mérite d’être changé en cuisine, classé par impact. Ustensiles, eau, stockage, petit électroménager, accessoires — la liste de priorités complète.",
    },
    it: {
      title: "La guida completa alla cucina non tossica, per priorità",
      h1: "La guida completa alla cucina non tossica",
      description:
        "Tutto ciò che vale la pena sostituire in cucina, ordinato per impatto. Pentole, acqua, conservazione, piccoli elettrodomestici, utensili — la lista completa delle priorità.",
    },
    es: {
      title: "Guía completa de la cocina sin tóxicos, por orden de prioridad",
      h1: "Guía completa de la cocina sin tóxicos",
      description:
        "Todo lo que merece sustituirse en la cocina, ordenado por impacto. Menaje, agua, conservación, pequeños electrodomésticos, utensilios — la lista de prioridades completa.",
    },
    nl: {
      title: "De volledige gids voor de giftvrije keuken, op prioriteit",
      h1: "De volledige gids voor de giftvrije keuken",
      description:
        "Alles wat in de keuken vervangen mag worden, geordend op impact. Kookgerei, water, opslag, klein huishoudelijk, gereedschap — de complete prioriteitenlijst.",
    },
    pl: {
      title: "Kompletny przewodnik po kuchni bez toksyn, według priorytetu",
      h1: "Kompletny przewodnik po kuchni bez toksyn",
      description:
        "Wszystko, co warto wymienić w kuchni, ułożone według wpływu. Garnki, woda, przechowywanie, małe AGD, akcesoria — pełna lista priorytetów.",
    },
    sv: {
      title: "Den fullständiga guiden till det giftfria köket, i prioritetsordning",
      h1: "Den fullständiga guiden till det giftfria köket",
      description:
        "Allt som är värt att byta i köket, ordnat efter effekt. Köksredskap, vatten, förvaring, småelektronik, redskap — hela prioriteringslistan.",
    },
    pt: {
      title: "O guia completo da cozinha sem tóxicos, por ordem de prioridade",
      h1: "O guia completo da cozinha sem tóxicos",
      description:
        "Tudo o que vale a pena trocar na cozinha, ordenado por impacto. Utensílios, água, conservação, pequenos eletrodomésticos, acessórios — a lista de prioridades completa.",
    },
    ro: {
      title: "Ghidul complet al bucătăriei fără toxine, în ordinea priorităților",
      h1: "Ghidul complet al bucătăriei fără toxine",
      description:
        "Tot ce merită schimbat în bucătărie, ordonat după impact. Ustensile, apă, depozitare, mici electrocasnice, accesorii — lista completă a priorităților.",
    },
    cs: {
      title: "Kompletní průvodce netoxickou kuchyní, podle priorit",
      h1: "Kompletní průvodce netoxickou kuchyní",
      description:
        "Vše, co se v kuchyni vyplatí vyměnit, seřazené podle dopadu. Nádobí, voda, skladování, drobné spotřebiče, pomůcky — kompletní seznam priorit.",
    },
    no: {
      title: "Den fullstendige guiden til det giftfrie kjøkkenet, etter prioritet",
      h1: "Den fullstendige guiden til det giftfrie kjøkkenet",
      description:
        "Alt det er verdt å bytte ut på kjøkkenet, ordnet etter effekt. Kjøkkenredskaper, vann, oppbevaring, småelektrisk, redskap — hele prioritetslisten.",
    },
  },
  "microplastics-and-edcs-guide": {
    de: {
      title: "Der vollständige Leitfaden zu Mikroplastik und EDCs",
      h1: "Der vollständige Leitfaden zu Mikroplastik und hormonell wirksamen Stoffen",
      description:
        "Was Mikroplastik und EDCs sind, woher sie kommen, was die Forschung tatsächlich sagt – und was sich daraus ableiten lässt, ohne Panik.",
    },
    fr: {
      title:
        "Le guide complet des microplastiques et des perturbateurs endocriniens",
      h1: "Le guide complet des microplastiques et des perturbateurs endocriniens",
      description:
        "Ce que sont les microplastiques et les perturbateurs endocriniens, d’où ils viennent, ce que dit réellement la science et ce que l’on peut en faire — sans céder à la panique.",
    },
    it: {
      title: "La guida completa ai microplastici e agli interferenti endocrini",
      h1: "La guida completa ai microplastici e agli interferenti endocrini",
      description:
        "Cosa sono microplastici e interferenti endocrini, da dove vengono, cosa dice davvero la ricerca — e cosa farne, senza allarmismi.",
    },
    es: {
      title: "Guía completa de microplásticos y disruptores endocrinos",
      h1: "Guía completa de microplásticos y disruptores endocrinos",
      description:
        "Qué son los microplásticos y los disruptores endocrinos, de dónde vienen, qué dice realmente la ciencia — y qué hacer al respecto, sin alarmismos.",
    },
    nl: {
      title: "De volledige gids over microplastics en hormoonverstoorders",
      h1: "De volledige gids over microplastics en hormoonverstoorders",
      description:
        "Wat microplastics en hormoonverstoorders zijn, waar ze vandaan komen, wat het onderzoek werkelijk zegt — en wat ermee te doen, zonder paniek.",
    },
    pl: {
      title: "Kompletny przewodnik po mikroplastiku i substancjach EDC",
      h1: "Kompletny przewodnik po mikroplastiku i substancjach zaburzających gospodarkę hormonalną",
      description:
        "Czym są mikroplastik i EDC, skąd się biorą, co naprawdę mówi nauka — i co z tym zrobić, bez paniki.",
    },
    sv: {
      title: "Den fullständiga guiden om mikroplaster och hormonstörare",
      h1: "Den fullständiga guiden om mikroplaster och hormonstörande ämnen",
      description:
        "Vad mikroplaster och hormonstörare är, varifrån de kommer, vad forskningen faktiskt säger — och vad man kan göra med det, utan panik.",
    },
    pt: {
      title: "O guia completo sobre microplásticos e disruptores endócrinos",
      h1: "O guia completo sobre microplásticos e disruptores endócrinos",
      description:
        "O que são os microplásticos e os disruptores endócrinos, de onde vêm, o que diz realmente a ciência — e o que fazer com isso, sem pânico.",
    },
    ro: {
      title: "Ghidul complet al microplasticelor și disruptorilor endocrini",
      h1: "Ghidul complet al microplasticelor și disruptorilor endocrini",
      description:
        "Ce sunt microplasticele și disruptorii endocrini, de unde vin, ce spune cu adevărat știința — și ce poți face cu asta, fără panică.",
    },
    cs: {
      title: "Kompletní průvodce mikroplasty a endokrinními disruptory",
      h1: "Kompletní průvodce mikroplasty a endokrinními disruptory",
      description:
        "Co jsou mikroplasty a endokrinní disruptory, odkud se berou, co skutečně říká věda — a co s tím, bez paniky.",
    },
    no: {
      title: "Den fullstendige guiden om mikroplast og hormonforstyrrere",
      h1: "Den fullstendige guiden om mikroplast og hormonforstyrrende stoffer",
      description:
        "Hva mikroplast og hormonforstyrrere er, hvor de kommer fra, hva forskningen faktisk sier — og hva man kan gjøre med det, uten panikk.",
    },
  },
  "teflon-pfas-truth": {
    de: {
      title: "Die Wahrheit über Teflon und PFAS in Antihaft-Pfannen",
      h1: "Die Wahrheit über Teflon und PFAS in Antihaft-Pfannen",
      description:
        "Teflon, PFAS, PFOA: Was tatsächlich in Ihrer Antihaft-Pfanne steckt, was die Belege zur Belastung zeigen – und wann ein Austausch sinnvoll ist.",
    },
    fr: {
      title: "La vérité sur le Téflon et les PFAS dans les poêles antiadhésives",
      h1: "La vérité sur le Téflon et les PFAS dans les poêles antiadhésives",
      description:
        "Téflon, PFAS, PFOA\u202F: ce qu’il y a vraiment dans votre poêle antiadhésive, ce que disent les données sur l’exposition et quand le remplacement vaut la peine.",
    },
    it: {
      title: "La verità sul Teflon e sulle PFAS nelle padelle antiaderenti",
      h1: "La verità sul Teflon e sulle PFAS nelle padelle antiaderenti",
      description:
        "Teflon, PFAS, PFOA: cosa c'è davvero nella vostra padella antiaderente, cosa dicono i dati sull'esposizione — e quando vale la pena sostituirla.",
    },
    es: {
      title: "La verdad sobre el Teflón y los PFAS en las sartenes antiadherentes",
      h1: "La verdad sobre el Teflón y los PFAS en las sartenes antiadherentes",
      description:
        "Teflón, PFAS, PFOA: lo que realmente hay en su sartén antiadherente, lo que dicen los datos de exposición — y cuándo merece la pena sustituirla.",
    },
    nl: {
      title: "De waarheid over Teflon en PFAS in antiaanbakpannen",
      h1: "De waarheid over Teflon en PFAS in antiaanbakpannen",
      description:
        "Teflon, PFAS, PFOA: wat er werkelijk in uw antiaanbakpan zit, wat de gegevens over blootstelling laten zien — en wanneer vervanging zin heeft.",
    },
    pl: {
      title: "Prawda o Teflonie i PFAS w patelniach z powłoką nieprzywierającą",
      h1: "Prawda o Teflonie i PFAS w patelniach z powłoką nieprzywierającą",
      description:
        "Teflon, PFAS, PFOA: co naprawdę jest w Twojej patelni z powłoką, co mówią dane o ekspozycji — i kiedy wymiana ma sens.",
    },
    sv: {
      title: "Sanningen om teflon och PFAS i nonstickpannor",
      h1: "Sanningen om teflon och PFAS i nonstickpannor",
      description:
        "Teflon, PFAS, PFOA: vad som faktiskt finns i din nonstickpanna, vad data om exponering visar — och när det är värt att byta.",
    },
    pt: {
      title: "A verdade sobre o teflon e os PFAS nas frigideiras antiaderentes",
      h1: "A verdade sobre o teflon e os PFAS nas frigideiras antiaderentes",
      description:
        "Teflon, PFAS, PFOA: o que está realmente na sua frigideira antiaderente, o que dizem os dados de exposição — e quando vale a pena substituí-la.",
    },
    ro: {
      title: "Adevărul despre Teflon și PFAS din tigăile antiaderente",
      h1: "Adevărul despre Teflon și PFAS din tigăile antiaderente",
      description:
        "Teflon, PFAS, PFOA: ce se află cu adevărat în tigaia ta antiaderentă, ce arată datele despre expunere — și când merită s-o înlocuiești.",
    },
    cs: {
      title: "Pravda o teflonu a PFAS v nepřilnavých pánvích",
      h1: "Pravda o teflonu a PFAS v nepřilnavých pánvích",
      description:
        "Teflon, PFAS, PFOA: co skutečně je ve vaší nepřilnavé pánvi, co ukazují data o expozici — a kdy se vyplatí výměna.",
    },
    no: {
      title: "Sannheten om teflon og PFAS i slippbelagte panner",
      h1: "Sannheten om teflon og PFAS i slippbelagte panner",
      description:
        "Teflon, PFAS, PFOA: hva som faktisk finnes i den slippbelagte pannen din, hva eksponeringsdataene viser — og når det lønner seg å bytte den ut.",
    },
  },
  "cast-iron-vs-ceramic-vs-stainless": {
    de: {
      title:
        "Gusseisen vs. Keramik vs. Edelstahl: Was ist tatsächlich am sichersten?",
      h1: "Gusseisen vs. Keramik vs. Edelstahl: was ist tatsächlich am sichersten?",
      description:
        "Ein ruhiger, belegter Vergleich der drei wichtigsten schadstoff­armen Kochgeschirr­materialien – mit einer Empfehlung für jeden Anwendungsfall.",
    },
    fr: {
      title:
        "Fonte, céramique ou inox\u202F: lequel est vraiment le plus sûr\u202F?",
      h1: "Fonte, céramique ou inox\u202F: lequel est vraiment le plus sûr\u202F?",
      description:
        "Un comparatif posé et sourcé des trois principaux matériaux d’ustensiles non toxiques, avec un verdict pour chaque usage.",
    },
    it: {
      title: "Ghisa, ceramica o acciaio inox: quale è davvero il più sicuro?",
      h1: "Ghisa, ceramica o acciaio inox: quale è davvero il più sicuro?",
      description:
        "Un confronto sobrio e documentato dei tre principali materiali per pentole non tossiche — con un verdetto per ciascun uso.",
    },
    es: {
      title: "Hierro fundido, cerámica o acero inoxidable: ¿qué es realmente más seguro?",
      h1: "Hierro fundido, cerámica o acero inoxidable: ¿qué es realmente más seguro?",
      description:
        "Un comparativo sereno y documentado de los tres principales materiales de menaje sin tóxicos — con veredicto para cada uso.",
    },
    nl: {
      title: "Gietijzer, keramiek of roestvast staal: wat is werkelijk het veiligst?",
      h1: "Gietijzer, keramiek of roestvast staal: wat is werkelijk het veiligst?",
      description:
        "Een rustige, onderbouwde vergelijking van de drie belangrijkste giftvrije pannenmaterialen — met een oordeel per toepassing.",
    },
    pl: {
      title: "Żeliwo, ceramika czy stal nierdzewna: co naprawdę jest najbezpieczniejsze?",
      h1: "Żeliwo, ceramika czy stal nierdzewna: co naprawdę jest najbezpieczniejsze?",
      description:
        "Spokojne, udokumentowane porównanie trzech głównych materiałów na garnki bez toksyn — z werdyktem dla każdego zastosowania.",
    },
    sv: {
      title: "Gjutjärn, keramik eller rostfritt stål: vad är egentligen säkrast?",
      h1: "Gjutjärn, keramik eller rostfritt stål: vad är egentligen säkrast?",
      description:
        "En lugn, källbelagd jämförelse av de tre viktigaste giftfria köksmaterialen — med ett utlåtande för varje användning.",
    },
    pt: {
      title: "Ferro fundido, cerâmica ou inox: o que é, de facto, mais seguro?",
      h1: "Ferro fundido, cerâmica ou inox: o que é, de facto, mais seguro?",
      description:
        "Uma comparação calma e documentada dos três principais materiais de utensílios sem tóxicos — com um veredito para cada utilização.",
    },
    ro: {
      title: "Fontă, ceramică sau inox: care este cu adevărat cel mai sigur?",
      h1: "Fontă, ceramică sau inox: care este cu adevărat cel mai sigur?",
      description:
        "O comparație așezată și documentată a celor trei materiale principale pentru ustensile fără toxine — cu un verdict pentru fiecare utilizare.",
    },
    cs: {
      title: "Litina, keramika nebo nerez: co je opravdu nejbezpečnější?",
      h1: "Litina, keramika nebo nerez: co je opravdu nejbezpečnější?",
      description:
        "Klidné, doložené srovnání tří hlavních materiálů netoxického nádobí — s verdiktem pro každé použití.",
    },
    no: {
      title: "Støpejern, keramikk eller rustfritt stål: hva er egentlig tryggest?",
      h1: "Støpejern, keramikk eller rustfritt stål: hva er egentlig tryggest?",
      description:
        "En rolig, kildebelagt sammenligning av de tre viktigste giftfrie kjøkkenmaterialene — med en dom for hver bruk.",
    },
  },
  "brita-vs-berkey-vs-aquatru": {
    de: {
      title:
        "Brita vs. Berkey vs. AquaTru: Schwerkraft- gegen Auftischfilter",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: drei Filter, drei verschiedene Aufgaben. Hier ist der ehrliche Vergleich mit den Schadstoff­daten.",
    },
    fr: {
      title:
        "Brita, Berkey ou AquaTru\u202F: filtre par gravité contre filtre de comptoir",
      h1: "Brita, Berkey ou AquaTru",
      description:
        "Brita, Berkey, AquaTru\u202F: trois filtres, trois usages distincts. Le comparatif honnête, données sur les contaminants à l’appui.",
    },
    it: {
      title: "Brita vs. Berkey vs. AquaTru: filtro a gravità contro filtro da banco",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: tre filtri, tre usi diversi. Il confronto onesto con i dati sui contaminanti.",
    },
    es: {
      title: "Brita vs. Berkey vs. AquaTru: filtro por gravedad o de encimera",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: tres filtros, tres usos distintos. La comparativa honesta con los datos de contaminantes.",
    },
    nl: {
      title: "Brita vs. Berkey vs. AquaTru: zwaartekracht- tegen aanrechtfilter",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: drie filters, drie verschillende taken. Een eerlijke vergelijking met de gegevens over contaminanten.",
    },
    pl: {
      title: "Brita kontra Berkey kontra AquaTru: grawitacyjny czy nablatowy",
      h1: "Brita kontra Berkey kontra AquaTru",
      description:
        "Brita, Berkey, AquaTru: trzy filtry, trzy różne zadania. Uczciwe porównanie z danymi o zanieczyszczeniach.",
    },
    sv: {
      title: "Brita mot Berkey mot AquaTru: gravitations- mot bänkfilter",
      h1: "Brita mot Berkey mot AquaTru",
      description:
        "Brita, Berkey, AquaTru: tre filter, tre olika uppgifter. Den ärliga jämförelsen, med data om kontaminanter.",
    },
    pt: {
      title: "Brita vs. Berkey vs. AquaTru: filtro por gravidade contra filtro de bancada",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: três filtros, três funções diferentes. A comparação honesta, com os dados de contaminantes.",
    },
    ro: {
      title: "Brita vs. Berkey vs. AquaTru: filtru gravitațional contra filtru de blat",
      h1: "Brita vs. Berkey vs. AquaTru",
      description:
        "Brita, Berkey, AquaTru: trei filtre, trei utilizări diferite. Comparația onestă, cu datele despre contaminanți.",
    },
    cs: {
      title: "Brita versus Berkey versus AquaTru: gravitační vs. nástolný filtr",
      h1: "Brita versus Berkey versus AquaTru",
      description:
        "Brita, Berkey, AquaTru: tři filtry, tři různá použití. Poctivé srovnání s daty o kontaminantech.",
    },
    no: {
      title: "Brita mot Berkey mot AquaTru: tyngdekraft- mot benkfilter",
      h1: "Brita mot Berkey mot AquaTru",
      description:
        "Brita, Berkey, AquaTru: tre filtre, tre ulike oppgaver. Den ærlige sammenligningen, med data om forurensninger.",
    },
  },
  "what-are-microplastics": {
    de: {
      title: "Was sind Mikroplastik? Eine verständliche Einführung",
      h1: "Was sind Mikroplastik?",
      description:
        "Mikroplastik sind Kunststoff­fragmente unter 5 mm. Hier steht, woraus sie bestehen, woher sie kommen und was die Datenlage zur menschlichen Gesundheit ruhig betrachtet sagt.",
    },
    fr: {
      title:
        "Que sont les microplastiques\u202F? Un explicatif en français clair",
      h1: "Que sont les microplastiques\u202F?",
      description:
        "Les microplastiques sont de petits fragments de plastique inférieurs à 5\u202Fmm. Voici de quoi ils sont faits, d’où ils viennent et ce que disent calmement les données sur la santé humaine.",
    },
    it: {
      title: "Che cosa sono i microplastici? Una spiegazione semplice",
      h1: "Che cosa sono i microplastici?",
      description:
        "I microplastici sono frammenti di plastica inferiori ai 5 mm. Ecco di cosa sono fatti, da dove provengono e cosa dicono con calma i dati sulla salute umana.",
    },
    es: {
      title: "¿Qué son los microplásticos? Un explicativo en castellano claro",
      h1: "¿Qué son los microplásticos?",
      description:
        "Los microplásticos son fragmentos de plástico menores de 5 mm. Aquí, de qué están hechos, de dónde vienen y qué dicen serenamente los datos sobre la salud humana.",
    },
    nl: {
      title: "Wat zijn microplastics? Een heldere uitleg",
      h1: "Wat zijn microplastics?",
      description:
        "Microplastics zijn plasticfragmenten van minder dan 5 mm. Hier staat waaruit ze bestaan, waar ze vandaan komen en wat de gegevens over de menselijke gezondheid rustig zeggen.",
    },
    pl: {
      title: "Czym jest mikroplastik? Wyjaśnienie po polsku",
      h1: "Czym jest mikroplastik?",
      description:
        "Mikroplastik to fragmenty tworzyw sztucznych mniejsze niż 5 mm. Tutaj: z czego się składa, skąd pochodzi i co spokojnie mówią dane o ludzkim zdrowiu.",
    },
    sv: {
      title: "Vad är mikroplaster? En enkel förklaring",
      h1: "Vad är mikroplaster?",
      description:
        "Mikroplaster är plastfragment under 5 mm. Här är vad de består av, var de kommer ifrån och vad data lugnt säger om människors hälsa.",
    },
    pt: {
      title: "O que são os microplásticos? Um explicativo em português claro",
      h1: "O que são os microplásticos?",
      description:
        "Os microplásticos são fragmentos de plástico com menos de 5 mm. Aqui ficam o que são feitos, de onde vêm e o que dizem calmamente os dados sobre a saúde humana.",
    },
    ro: {
      title: "Ce sunt microplasticele? O explicație simplă",
      h1: "Ce sunt microplasticele?",
      description:
        "Microplasticele sunt fragmente de plastic mai mici de 5 mm. Iată din ce sunt făcute, de unde provin și ce spun, calm, datele privind sănătatea umană.",
    },
    cs: {
      title: "Co jsou mikroplasty? Srozumitelný úvod",
      h1: "Co jsou mikroplasty?",
      description:
        "Mikroplasty jsou plastové fragmenty menší než 5 mm. Tady je, z čeho se skládají, odkud pocházejí a co klidně říkají data o lidském zdraví.",
    },
    no: {
      title: "Hva er mikroplast? En enkel forklaring",
      h1: "Hva er mikroplast?",
      description:
        "Mikroplast er plastfragmenter under 5 mm. Her finner du hva de består av, hvor de kommer fra og hva dataene rolig sier om menneskers helse.",
    },
  },
  "12-things-to-throw-out-of-your-kitchen": {
    de: {
      title: "12 Dinge, die dieses Wochenende aus Ihrer Küche fliegen sollten",
      h1: "12 Dinge, die dieses Wochenende aus Ihrer Küche fliegen sollten",
      description:
        "Die Küchen-Checkliste: 12 Gegenstände, die sich zu ersetzen lohnen, nach Priorität, mit jeweils einem Satz Begründung und einem Satz Ersatz.",
    },
    fr: {
      title: "12 choses à sortir de votre cuisine ce week-end",
      h1: "12 choses à sortir de votre cuisine ce week-end",
      description:
        "La liste de l’audit cuisine\u202F: 12 objets à remplacer, par ordre de priorité, avec une raison et une alternative en une ligne pour chacun.",
    },
    it: {
      title: "12 cose da buttare via dalla cucina questo fine settimana",
      h1: "12 cose da buttare via dalla cucina questo fine settimana",
      description:
        "La checklist della cucina: 12 oggetti che vale la pena sostituire, in ordine di priorità, con una riga di motivazione e una di sostituto per ciascuno.",
    },
    es: {
      title: "12 cosas que sacar de su cocina este fin de semana",
      h1: "12 cosas que sacar de su cocina este fin de semana",
      description:
        "La lista de la auditoría de cocina: 12 objetos que merece sustituir, por orden de prioridad, con una línea de motivo y una de alternativa para cada uno.",
    },
    nl: {
      title: "12 dingen die dit weekend uit uw keuken mogen",
      h1: "12 dingen die dit weekend uit uw keuken mogen",
      description:
        "De keuken-auditlijst: 12 voorwerpen die het waard zijn om te vervangen, op prioriteit, met telkens één regel reden en één regel vervanger.",
    },
    pl: {
      title: "12 rzeczy, które w ten weekend warto wynieść z kuchni",
      h1: "12 rzeczy, które w ten weekend warto wynieść z kuchni",
      description:
        "Lista audytu kuchennego: 12 przedmiotów wartych wymiany, w kolejności priorytetu, każdy z jednym zdaniem powodu i jednym zdaniem alternatywy.",
    },
    sv: {
      title: "12 saker du kan slänga ur köket i helgen",
      h1: "12 saker du kan slänga ur köket i helgen",
      description:
        "Köksgranskningens lista: 12 föremål som är värda att byta ut, i prioritetsordning, med en rad skäl och en rad ersättare för var och en.",
    },
    pt: {
      title: "12 coisas para tirar da sua cozinha este fim de semana",
      h1: "12 coisas para tirar da sua cozinha este fim de semana",
      description:
        "A lista da auditoria da cozinha: 12 objetos que vale a pena substituir, por ordem de prioridade, com uma linha de motivo e uma de alternativa para cada.",
    },
    ro: {
      title: "12 lucruri pe care să le scoți din bucătărie acest weekend",
      h1: "12 lucruri pe care să le scoți din bucătărie acest weekend",
      description:
        "Lista auditului de bucătărie: 12 obiecte care merită schimbate, în ordinea priorității, fiecare cu un rând de motiv și un rând de înlocuitor.",
    },
    cs: {
      title: "12 věcí, které tento víkend mají vypadnout z vaší kuchyně",
      h1: "12 věcí, které tento víkend mají vypadnout z vaší kuchyně",
      description:
        "Kuchyňský audit: 12 předmětů, které stojí za výměnu, seřazené podle priorit, s jednou větou důvodu a jednou větou náhrady ke každému.",
    },
    no: {
      title: "12 ting du kan kaste ut av kjøkkenet i helgen",
      h1: "12 ting du kan kaste ut av kjøkkenet i helgen",
      description:
        "Kjøkkengjennomgangens liste: 12 ting som er verdt å bytte, etter prioritet, med én linje begrunnelse og én linje erstatter for hver.",
    },
  },
};
