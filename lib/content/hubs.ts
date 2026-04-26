import type { Locale } from "@/i18n/routing";

export type LocaleHub = {
  name?: string;
  shortName?: string;
  oneLiner?: string;
  thesis?: string;
};

export type Hub = {
  slug: string;
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
  i18n?: Partial<Record<Locale, LocaleHub>>;
};

export const hubs: Hub[] = [
  {
    slug: "microplastics-and-edcs",
    name: "Microplastics & EDCs",
    shortName: "Microplastics",
    oneLiner:
      "The science, in plain English. What's actually known, what's still debated, and what to do about it.",
    thesis:
      "Microplastics and endocrine-disrupting chemicals are the foundational concept readers need to understand before any specific swap makes sense. This hub educates, the others act.",
    i18n: {
      de: {
        name: "Mikroplastik & EDCs",
        shortName: "Mikroplastik",
        oneLiner:
          "Die Forschung, verständlich erklärt. Was tatsächlich bekannt ist, was weiterhin offen ist und was sich daraus ableiten lässt.",
        thesis:
          "Mikroplastik und hormonell wirksame Stoffe sind das Grund­konzept, das Lesende einordnen müssen, bevor ein konkreter Wechsel überhaupt Sinn ergibt. Diese Rubrik klärt auf, die anderen handeln.",
      },
      fr: {
        name: "Microplastiques & PE",
        shortName: "Microplastiques",
        oneLiner:
          "La science, en français clair. Ce qui est établi, ce qui reste débattu et ce que cela implique au quotidien.",
        thesis:
          "Les microplastiques et les perturbateurs endocriniens forment le cadre que les lectrices doivent saisir avant qu’un changement précis ait du sens. Cette rubrique éclaire, les autres agissent.",
      },
      it: {
        name: "Microplastici e IE",
        shortName: "Microplastici",
        oneLiner:
          "La scienza, in italiano chiaro. Cosa è davvero accertato, cosa è ancora dibattuto e cosa farne nel quotidiano.",
        thesis:
          "I microplastici e gli interferenti endocrini sono il quadro che le lettrici devono cogliere prima che un cambiamento concreto abbia senso. Questa rubrica chiarisce, le altre agiscono.",
      },
      es: {
        name: "Microplásticos y disruptores endocrinos",
        shortName: "Microplásticos",
        oneLiner:
          "La ciencia, en castellano claro. Lo que se sabe de verdad, lo que sigue en debate y qué se puede hacer al respecto.",
        thesis:
          "Los microplásticos y los disruptores endocrinos son el marco que la lectora debe captar antes de que cualquier cambio concreto tenga sentido. Esta sección explica, las otras actúan.",
      },
      nl: {
        name: "Microplastics & hormoonverstoorders",
        shortName: "Microplastics",
        oneLiner:
          "De wetenschap, in helder Nederlands. Wat werkelijk vaststaat, wat nog ter discussie ligt en wat ermee te doen.",
        thesis:
          "Microplastics en hormoonverstorende stoffen vormen het kader dat de lezeres moet vatten voordat een concrete wissel zin heeft. Deze rubriek licht toe, de andere handelen.",
      },
      pl: {
        name: "Mikroplastik i substancje EDC",
        shortName: "Mikroplastik",
        oneLiner:
          "Nauka po polsku, jasno. Co naprawdę wiadomo, co pozostaje przedmiotem sporu i co z tym zrobić.",
        thesis:
          "Mikroplastik i substancje zaburzające gospodarkę hormonalną stanowią ramę, którą czytelniczka musi pojąć, zanim konkretna zamiana nabierze sensu. Ten dział wyjaśnia, pozostałe działają.",
      },
      sv: {
        name: "Mikroplaster och hormonstörare",
        shortName: "Mikroplaster",
        oneLiner:
          "Vetenskapen, på enkel svenska. Vad som faktiskt är klarlagt, vad som fortfarande debatteras och vad det innebär i praktiken.",
        thesis:
          "Mikroplaster och hormonstörande ämnen är den ram läsaren behöver fatta innan ett konkret byte får mening. Den här avdelningen upplyser, de andra agerar.",
      },
      pt: {
        name: "Microplásticos e disruptores endócrinos",
        shortName: "Microplásticos",
        oneLiner:
          "A ciência, em português claro. O que está realmente estabelecido, o que continua em debate e o que fazer com isso.",
        thesis:
          "Os microplásticos e os disruptores endócrinos formam o quadro que a leitora precisa de captar antes que uma troca concreta faça sentido. Esta secção esclarece, as outras agem.",
      },
      ro: {
        name: "Microplastice și disruptori endocrini",
        shortName: "Microplastice",
        oneLiner:
          "Știința, în română limpede. Ce se cunoaște cu adevărat, ce rămâne în dezbatere și ce putem face cu asta.",
        thesis:
          "Microplasticele și disruptorii endocrini sunt cadrul pe care cititoarea trebuie să-l prindă înainte ca o schimbare concretă să capete sens. Această secțiune clarifică, celelalte acționează.",
      },
      cs: {
        name: "Mikroplasty a endokrinní disruptory",
        shortName: "Mikroplasty",
        oneLiner:
          "Věda srozumitelně. Co je doopravdy známé, o čem se stále vede debata a co s tím.",
        thesis:
          "Mikroplasty a endokrinní disruptory tvoří rámec, který musí čtenářka pochopit dřív, než konkrétní výměna získá smysl. Tato rubrika vysvětluje, ostatní jednají.",
      },
      no: {
        name: "Mikroplast og hormonforstyrrere",
        shortName: "Mikroplast",
        oneLiner:
          "Vitenskapen, på enkel norsk. Hva som virkelig er etablert, hva som fortsatt diskuteres og hva man kan gjøre med det.",
        thesis:
          "Mikroplast og hormonforstyrrende stoffer er rammen leseren må fatte før et konkret bytte gir mening. Denne avdelingen opplyser, de andre handler.",
      },
    },
  },
  {
    slug: "non-toxic-kitchen",
    name: "Non-Toxic Kitchen",
    shortName: "Kitchen",
    oneLiner:
      "The highest-impact swaps in your home, ranked by how much they matter. Cookware, water, storage, the works.",
    thesis:
      "The kitchen is the highest-impact room for non-toxic swaps. Readers come here ready to act. This hub is action-oriented, comparison-heavy, money-page-dense.",
    i18n: {
      de: {
        name: "Schadstoffarme Küche",
        shortName: "Küche",
        oneLiner:
          "Die wirksamsten Wechsel im Haushalt, geordnet nach Bedeutung. Kochgeschirr, Wasser, Aufbewahrung – das ganze Sortiment.",
        thesis:
          "Die Küche ist der Raum mit der größten Wirkung für schadstoff­arme Wechsel. Lesende kommen hierher mit Handlungs­absicht. Diese Rubrik ist umsetzungsorientiert, vergleichs­stark und dicht an Kauf­empfehlungen.",
      },
      fr: {
        name: "Cuisine non toxique",
        shortName: "Cuisine",
        oneLiner:
          "Les changements à plus fort impact dans le foyer, classés par importance. Ustensiles, eau, stockage — tout y est.",
        thesis:
          "La cuisine est la pièce qui rend le plus pour des changements non toxiques. Les lectrices y viennent prêtes à agir. Cette rubrique est tournée vers l’action, riche en comparatifs et dense en pages d’achat.",
      },
      it: {
        name: "Cucina non tossica",
        shortName: "Cucina",
        oneLiner:
          "I cambiamenti a maggior impatto in casa, ordinati per importanza. Pentole, acqua, conservazione — il pacchetto completo.",
        thesis:
          "La cucina è la stanza dove i cambiamenti non tossici rendono di più. Le lettrici arrivano qui pronte ad agire. Questa rubrica è orientata all'azione, ricca di confronti e densa di pagine d'acquisto.",
      },
      es: {
        name: "Cocina sin tóxicos",
        shortName: "Cocina",
        oneLiner:
          "Los cambios de mayor impacto en su casa, ordenados por importancia. Menaje, agua, conservación — todo el conjunto.",
        thesis:
          "La cocina es la habitación donde los cambios sin tóxicos rinden más. La lectora llega aquí dispuesta a actuar. Esta sección está orientada a la acción, llena de comparativas y densa en páginas de compra.",
      },
      nl: {
        name: "Giftvrije keuken",
        shortName: "Keuken",
        oneLiner:
          "De wisselingen met de grootste impact in huis, geordend op belang. Kookgerei, water, opslag — het hele pakket.",
        thesis:
          "De keuken is het vertrek waar giftvrije wisselingen de grootste opbrengst geven. Lezers komen hier met de wil tot handelen. Deze rubriek is actiegericht, vergelijkingsrijk en dicht aan koopadviezen.",
      },
      pl: {
        name: "Kuchnia bez toksyn",
        shortName: "Kuchnia",
        oneLiner:
          "Zmiany o największym wpływie w domu, uszeregowane według znaczenia. Naczynia, woda, przechowywanie — komplet.",
        thesis:
          "Kuchnia to pomieszczenie, w którym zamiany bez toksyn dają największy zwrot. Czytelniczki przychodzą tu gotowe do działania. Ten dział jest nastawiony na działanie, gęsty od porównań i rekomendacji zakupowych.",
      },
      sv: {
        name: "Giftfritt kök",
        shortName: "Kök",
        oneLiner:
          "Hemmets bytena med störst effekt, ordnade efter vikt. Köksredskap, vatten, förvaring — hela paletten.",
        thesis:
          "Köket är rummet där giftfria byten ger störst utdelning. Läsarna kommer hit redo att agera. Den här avdelningen är handlingsinriktad, full av jämförelser och köpsidor.",
      },
      pt: {
        name: "Cozinha sem tóxicos",
        shortName: "Cozinha",
        oneLiner:
          "As mudanças com maior impacto em casa, ordenadas pela importância. Utensílios, água, conservação — tudo o resto.",
        thesis:
          "A cozinha é o compartimento onde as trocas sem tóxicos rendem mais. As leitoras chegam aqui prontas para agir. Esta secção está virada para a ação, cheia de comparações e densa em páginas de compra.",
      },
      ro: {
        name: "Bucătărie fără toxine",
        shortName: "Bucătărie",
        oneLiner:
          "Schimbările cu cel mai mare impact din casă, ordonate după importanță. Ustensile, apă, depozitare — tot pachetul.",
        thesis:
          "Bucătăria este camera în care schimbările fără toxine dau cele mai bune rezultate. Cititoarele vin aici gata să acționeze. Această secțiune este orientată spre acțiune, plină de comparații și densă de pagini de cumpărare.",
      },
      cs: {
        name: "Netoxická kuchyně",
        shortName: "Kuchyně",
        oneLiner:
          "Doma nejúčinnější výměny, seřazené podle významu. Nádobí, voda, skladování — celý balík.",
        thesis:
          "Kuchyň je místnost, kde netoxické výměny přinášejí největší užitek. Čtenářky sem chodí připravené jednat. Tato rubrika je orientovaná na akci, plná srovnání a hustá nákupními tipy.",
      },
      no: {
        name: "Giftfritt kjøkken",
        shortName: "Kjøkken",
        oneLiner:
          "Hjemmets viktigste bytter, ordnet etter betydning. Kjøkkenredskaper, vann, oppbevaring — hele settet.",
        thesis:
          "Kjøkkenet er rommet der giftfrie bytter gir størst uttelling. Leserne kommer hit klare for å handle. Denne avdelingen er handlingsrettet, full av sammenligninger og tette kjøpssider.",
      },
    },
  },
  {
    slug: "non-toxic-personal-care",
    name: "Personal Care",
    shortName: "Personal Care",
    oneLiner:
      "Shampoo to sunscreen, the calm truth about what's in your bathroom and what's worth replacing.",
    thesis:
      "Personal care products sit on skin for hours a day. This hub separates the swaps that matter from the marketing claims that don't.",
    i18n: {
      de: {
        name: "Körperpflege",
        shortName: "Körperpflege",
        oneLiner:
          "Vom Shampoo bis zur Sonnencreme – die ruhige Wahrheit darüber, was im Bad steht und was sich zu ersetzen lohnt.",
        thesis:
          "Körperpflege­produkte verbleiben stundenlang täglich auf der Haut. Diese Rubrik trennt die Wechsel, die zählen, von den Werbe­versprechen, die es nicht tun.",
      },
      fr: {
        name: "Hygiène et soins",
        shortName: "Hygiène",
        oneLiner:
          "Du shampoing à la crème solaire, la vérité posée sur ce qui occupe la salle de bains et ce qui mérite d’être remplacé.",
        thesis:
          "Les produits d’hygiène restent des heures sur la peau, chaque jour. Cette rubrique sépare les changements qui comptent des promesses marketing qui ne tiennent pas.",
      },
      it: {
        name: "Igiene e cosmesi",
        shortName: "Igiene",
        oneLiner:
          "Dallo shampoo alla crema solare, la verità sobria su cosa c'è in bagno e cosa vale la pena sostituire.",
        thesis:
          "I prodotti per l'igiene restano ore sulla pelle, ogni giorno. Questa rubrica separa i cambiamenti che contano dalle promesse di marketing che non reggono.",
      },
      es: {
        name: "Higiene y cosmética",
        shortName: "Higiene",
        oneLiner:
          "Del champú al protector solar, la verdad serena sobre lo que ocupa su baño y lo que merece sustituirse.",
        thesis:
          "Los productos de higiene permanecen horas en la piel, cada día. Esta sección separa los cambios que cuentan de las promesas de marketing que no se sostienen.",
      },
      nl: {
        name: "Persoonlijke verzorging",
        shortName: "Verzorging",
        oneLiner:
          "Van shampoo tot zonnebrand, de rustige waarheid over wat in uw badkamer staat en wat het waard is om te vervangen.",
        thesis:
          "Verzorgingsproducten blijven uren per dag op de huid. Deze rubriek scheidt de wisselingen die ertoe doen van marketingbeloftes die geen stand houden.",
      },
      pl: {
        name: "Pielęgnacja",
        shortName: "Pielęgnacja",
        oneLiner:
          "Od szamponu po krem z filtrem — spokojna prawda o tym, co stoi w łazience i co warto wymienić.",
        thesis:
          "Produkty pielęgnacyjne pozostają godzinami na skórze każdego dnia. Ten dział oddziela zamiany, które mają znaczenie, od obietnic marketingowych, które się nie bronią.",
      },
      sv: {
        name: "Hud och hygien",
        shortName: "Hygien",
        oneLiner:
          "Från schampo till solskydd — den lugna sanningen om vad som står i ditt badrum och vad som är värt att byta.",
        thesis:
          "Hudvårds- och hygienprodukter ligger timmar på huden, varje dag. Den här avdelningen skiljer ut de byten som spelar roll från de marknadslöften som inte håller.",
      },
      pt: {
        name: "Higiene e cosmética",
        shortName: "Higiene",
        oneLiner:
          "Do champô ao protetor solar — a verdade calma sobre o que está na sua casa de banho e o que vale a pena trocar.",
        thesis:
          "Os produtos de higiene ficam horas sobre a pele, todos os dias. Esta secção separa as trocas que contam das promessas de marketing que não se aguentam.",
      },
      ro: {
        name: "Igienă și cosmetică",
        shortName: "Igienă",
        oneLiner:
          "De la șampon la crema de soare — adevărul așezat despre ce stă în baia dumneavoastră și ce merită schimbat.",
        thesis:
          "Produsele de igienă rămân ore întregi pe piele, în fiecare zi. Această secțiune separă schimbările care contează de promisiunile de marketing care nu se susțin.",
      },
      cs: {
        name: "Hygiena a kosmetika",
        shortName: "Hygiena",
        oneLiner:
          "Od šamponu po opalovací krém — klidná pravda o tom, co máte v koupelně a co stojí za výměnu.",
        thesis:
          "Hygienické přípravky zůstávají na kůži hodiny denně. Tato rubrika odděluje výměny, které mají význam, od marketingových slibů, jež neobstojí.",
      },
      no: {
        name: "Hud og hygiene",
        shortName: "Hygiene",
        oneLiner:
          "Fra sjampo til solkrem — den rolige sannheten om hva som står på badet og hva som er verdt å bytte.",
        thesis:
          "Hudpleie- og hygieneprodukter ligger timesvis på huden, hver dag. Denne avdelingen skiller ut byttene som teller fra markedsføringsløftene som ikke holder.",
      },
    },
  },
  {
    slug: "non-toxic-home",
    name: "Home Environment",
    shortName: "Home",
    oneLiner:
      "Mattresses, cleaning products, air quality, and the quiet exposures you never think about.",
    thesis:
      "Indoor air is two to five times more polluted than outdoor air. Your mattress, your cleaning supplies, and your flooring are usually why. This hub covers the environment you actually live in.",
    i18n: {
      de: {
        name: "Wohnumgebung",
        shortName: "Wohnen",
        oneLiner:
          "Matratzen, Reinigungs­mittel, Raumluft – und die leisen Belastungen, an die niemand denkt.",
        thesis:
          "Innenraum­luft ist zwei- bis fünfmal stärker belastet als die Außenluft. In aller Regel sind Matratze, Reinigungs­mittel und Bodenbelag die Ursache. Diese Rubrik widmet sich der Umgebung, in der Sie tatsächlich leben.",
      },
      fr: {
        name: "Environnement intérieur",
        shortName: "Maison",
        oneLiner:
          "Matelas, produits ménagers, qualité de l’air — et les expositions discrètes auxquelles personne ne pense.",
        thesis:
          "L’air intérieur est deux à cinq fois plus pollué que l’air extérieur. Votre matelas, vos produits ménagers et vos revêtements en sont le plus souvent la cause. Cette rubrique traite de l’environnement où vous vivez vraiment.",
      },
      it: {
        name: "Ambiente domestico",
        shortName: "Casa",
        oneLiner:
          "Materassi, prodotti per la pulizia, qualità dell'aria — e le esposizioni silenziose a cui non si pensa.",
        thesis:
          "L'aria interna è da due a cinque volte più inquinata di quella esterna. Materasso, detersivi e pavimenti sono di solito la ragione. Questa rubrica si occupa dell'ambiente in cui vivete davvero.",
      },
      es: {
        name: "Entorno doméstico",
        shortName: "Hogar",
        oneLiner:
          "Colchones, productos de limpieza, calidad del aire — y las exposiciones discretas en las que nadie piensa.",
        thesis:
          "El aire interior está de dos a cinco veces más contaminado que el exterior. Su colchón, sus productos de limpieza y su suelo suelen ser el motivo. Esta sección se ocupa del entorno en el que realmente vive.",
      },
      nl: {
        name: "Woonomgeving",
        shortName: "Wonen",
        oneLiner:
          "Matrassen, schoonmaakmiddelen, luchtkwaliteit — en de stille blootstellingen waar niemand bij stilstaat.",
        thesis:
          "Binnenlucht is twee tot vijf keer meer vervuild dan buitenlucht. Uw matras, uw schoonmaakmiddelen en uw vloer zijn doorgaans de reden. Deze rubriek behandelt de omgeving waarin u werkelijk leeft.",
      },
      pl: {
        name: "Środowisko domowe",
        shortName: "Dom",
        oneLiner:
          "Materace, środki czystości, jakość powietrza — i ciche ekspozycje, o których nikt nie myśli.",
        thesis:
          "Powietrze w pomieszczeniach jest od dwóch do pięciu razy bardziej zanieczyszczone niż na zewnątrz. Materac, środki czystości i podłogi to najczęstsze powody. Ten dział zajmuje się otoczeniem, w którym naprawdę mieszkacie.",
      },
      sv: {
        name: "Hemmiljö",
        shortName: "Hemmet",
        oneLiner:
          "Madrasser, rengöringsmedel, luftkvalitet — och de tysta exponeringar ingen tänker på.",
        thesis:
          "Inomhusluften är två till fem gånger mer förorenad än utomhusluften. Din madrass, dina rengöringsmedel och dina golv är oftast skälet. Den här avdelningen handlar om miljön där du faktiskt lever.",
      },
      pt: {
        name: "Ambiente doméstico",
        shortName: "Casa",
        oneLiner:
          "Colchões, produtos de limpeza, qualidade do ar — e as exposições silenciosas em que ninguém pensa.",
        thesis:
          "O ar interior é duas a cinco vezes mais poluído do que o exterior. O seu colchão, os seus produtos de limpeza e o seu pavimento são, em regra, a causa. Esta secção trata do ambiente onde realmente vive.",
      },
      ro: {
        name: "Mediul de acasă",
        shortName: "Acasă",
        oneLiner:
          "Saltele, produse de curățenie, calitatea aerului — și expunerile tăcute la care nu se gândește nimeni.",
        thesis:
          "Aerul din interior este de două până la cinci ori mai poluat decât cel exterior. Salteaua, produsele de curățenie și podelele dumneavoastră sunt, de regulă, cauza. Această secțiune se ocupă de mediul în care chiar trăiți.",
      },
      cs: {
        name: "Domácí prostředí",
        shortName: "Domov",
        oneLiner:
          "Matrace, čisticí prostředky, kvalita vzduchu — a tichá expozice, na niž nikdo nemyslí.",
        thesis:
          "Vnitřní vzduch bývá dvakrát až pětkrát znečištěnější než vnější. Vaše matrace, vaše čisticí prostředky a vaše podlahy jsou obvykle důvodem. Tato rubrika se věnuje prostředí, ve kterém skutečně žijete.",
      },
      no: {
        name: "Hjemmemiljø",
        shortName: "Hjemmet",
        oneLiner:
          "Madrasser, vaskemidler, luftkvalitet — og de stille eksponeringene ingen tenker på.",
        thesis:
          "Inneluften er to til fem ganger mer forurenset enn uteluften. Madrassen, vaskemidlene og gulvene dine er som regel grunnen. Denne avdelingen handler om miljøet du faktisk lever i.",
      },
    },
  },
  {
    slug: "non-toxic-clothing-and-textiles",
    name: "Clothing & Textiles",
    shortName: "Clothing",
    oneLiner:
      "Microplastics, PFAS in clothes, and the textile supply chain, with the brands worth buying.",
    thesis:
      "Synthetic fabrics shed microplastics every wash and many carry PFAS from the factory. This hub covers what's in your wardrobe and which brands have done the work.",
    i18n: {
      de: {
        name: "Kleidung & Textilien",
        shortName: "Textilien",
        oneLiner:
          "Mikroplastik, PFAS in Kleidung und die Liefer­kette der Textilindustrie – mit den Marken, die ihre Hausaufgaben gemacht haben.",
        thesis:
          "Synthetische Textilien geben bei jedem Waschgang Mikroplastik ab; viele tragen schon ab Werk PFAS. Diese Rubrik beschäftigt sich damit, was in Ihrem Kleiderschrank steckt – und welche Marken die Arbeit gemacht haben.",
      },
      fr: {
        name: "Vêtements & textiles",
        shortName: "Textile",
        oneLiner:
          "Microplastiques, PFAS dans les vêtements et chaîne d’approvisionnement textile — avec les marques qui ont fait le travail.",
        thesis:
          "Les tissus synthétiques relâchent des microplastiques à chaque lavage et beaucoup portent des PFAS dès l’usine. Cette rubrique examine ce qui occupe votre garde-robe — et les marques qui ont fait le travail.",
      },
      it: {
        name: "Abbigliamento e tessili",
        shortName: "Abbigliamento",
        oneLiner:
          "Microplastici, PFAS nei vestiti e filiera tessile — con i marchi che hanno fatto il lavoro.",
        thesis:
          "I tessuti sintetici rilasciano microplastici a ogni lavaggio e molti portano PFAS già dalla fabbrica. Questa rubrica esamina ciò che occupa il vostro armadio — e i marchi che hanno fatto il lavoro.",
      },
      es: {
        name: "Ropa y textiles",
        shortName: "Ropa",
        oneLiner:
          "Microplásticos, PFAS en la ropa y cadena de suministro textil — con las marcas que han hecho los deberes.",
        thesis:
          "Los tejidos sintéticos liberan microplásticos en cada lavado y muchos llevan PFAS de fábrica. Esta sección examina lo que ocupa su armario — y las marcas que han hecho el trabajo.",
      },
      nl: {
        name: "Kleding en textiel",
        shortName: "Kleding",
        oneLiner:
          "Microplastics, PFAS in kleding en de textielketen — met de merken die hun werk hebben gedaan.",
        thesis:
          "Synthetische stoffen geven bij elke wasbeurt microplastics af; veel ervan dragen al uit de fabriek PFAS. Deze rubriek onderzoekt wat in uw garderobe hangt — en welke merken het werk hebben gedaan.",
      },
      pl: {
        name: "Odzież i tekstylia",
        shortName: "Odzież",
        oneLiner:
          "Mikroplastik, PFAS w ubraniach i łańcuch dostaw — z markami, które odrobiły lekcję.",
        thesis:
          "Tkaniny syntetyczne uwalniają mikroplastik przy każdym praniu, a wiele już z fabryki niesie PFAS. Ten dział sprawdza, co wisi w Państwa szafie — i które marki odrobiły lekcję.",
      },
      sv: {
        name: "Kläder och textil",
        shortName: "Kläder",
        oneLiner:
          "Mikroplaster, PFAS i kläder och textilkedjan — med märkena som gjort jobbet.",
        thesis:
          "Syntetiska tyger avger mikroplaster vid varje tvätt och många bär PFAS redan från fabriken. Den här avdelningen granskar det som hänger i din garderob — och märkena som har gjort jobbet.",
      },
      pt: {
        name: "Vestuário e têxteis",
        shortName: "Vestuário",
        oneLiner:
          "Microplásticos, PFAS no vestuário e cadeia de fornecimento têxtil — com as marcas que fizeram o trabalho.",
        thesis:
          "Os tecidos sintéticos libertam microplásticos em cada lavagem e muitos trazem PFAS desde a fábrica. Esta secção analisa o que ocupa o seu guarda-roupa — e as marcas que fizeram o trabalho.",
      },
      ro: {
        name: "Îmbrăcăminte și textile",
        shortName: "Textile",
        oneLiner:
          "Microplastice, PFAS în haine și lanțul de aprovizionare — cu mărcile care și-au făcut temele.",
        thesis:
          "Țesăturile sintetice eliberează microplastice la fiecare spălare, iar multe poartă PFAS încă din fabrică. Această secțiune analizează ce se află în garderoba dumneavoastră — și mărcile care și-au făcut temele.",
      },
      cs: {
        name: "Oděvy a textil",
        shortName: "Oděvy",
        oneLiner:
          "Mikroplasty, PFAS v oblečení a textilní dodavatelský řetězec — se značkami, které odvedly práci.",
        thesis:
          "Syntetické tkaniny uvolňují mikroplasty při každém praní a mnohé nesou PFAS už z továrny. Tato rubrika probírá, co máte v šatníku — a značky, které odvedly práci.",
      },
      no: {
        name: "Klær og tekstil",
        shortName: "Klær",
        oneLiner:
          "Mikroplast, PFAS i klær og tekstilkjeden — med merkene som har gjort jobben.",
        thesis:
          "Syntetiske stoffer slipper mikroplast ved hver vask, og mange bærer PFAS allerede fra fabrikken. Denne avdelingen ser på hva som henger i garderoben din — og merkene som har gjort jobben.",
      },
    },
  },
];

export function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}

/** Locale-aware accessor for a hub field. Falls back to English if absent. */
export function tHub(hub: Hub | undefined, locale: Locale): {
  name: string;
  shortName: string;
  oneLiner: string;
  thesis: string;
} {
  if (!hub) {
    return { name: "", shortName: "", oneLiner: "", thesis: "" };
  }
  const t = hub.i18n?.[locale];
  return {
    name: t?.name ?? hub.name,
    shortName: t?.shortName ?? hub.shortName,
    oneLiner: t?.oneLiner ?? hub.oneLiner,
    thesis: t?.thesis ?? hub.thesis,
  };
}
