import { Eyebrow } from "./editorial/Eyebrow";

type QA = { q: string; a: string };

const ENTRIES: QA[] = [
  {
    q: "Which swap are we testing in April?",
    a: "Glass water bottles — borosilicate vs soda-lime vs stainless, weighed, dropped, temperature-shocked. Results publish in the May dispatch.",
  },
  {
    q: "What brand are we rejecting this month?",
    a: "One marketed as PFAS-free whose own MSDS lists a fluoropolymer coating. We'll name it when the full write-up lands, with the filing.",
  },
  {
    q: "A reader asked: is our water filter pick outdated?",
    a: "The 2024 NSF updates don't change our top recommendation. The runner-up slot is under review — expect a refresh note by end of month.",
  },
  {
    q: "What's the next investigation?",
    a: "Non-toxic mattresses. We've opened the spec sheets for five brands and started reaching out for third-party test data. Publication target: June.",
  },
  {
    q: "How do we handle a manufacturer that asks us to retest?",
    a: "We retest on our bench, not theirs. If their data contradicts ours, we publish both, name the disagreement, and let the reader see the work.",
  },
  {
    q: "Do affiliate links change our rankings?",
    a: "They never have. Commissions fund the testing; they don't buy placement. Anything a brand sends us unsolicited goes into the give-away pile, not the review.",
  },
];

/**
 * LabNotebook — editorial Q&A block, "From the lab notebook".
 * Short, dialogue-style. Questions in Fraunces italic, answers in Inter.
 */
export function LabNotebook() {
  return (
    <section
      className="lab-notebook border-b border-forest/10"
      data-reveal
      aria-labelledby="lab-notebook-title"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="lab-notebook__head">
          <Eyebrow tone="terracotta">From the lab notebook</Eyebrow>
          <h2
            id="lab-notebook-title"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            What we&apos;re{" "}
            <span className="font-instrument italic text-terracotta">
              working on
            </span>
            .
          </h2>
        </div>

        <dl className="lab-notebook__list">
          {ENTRIES.map((e, i) => (
            <div key={i} className="lab-notebook__item">
              <dt className="lab-notebook__q">
                <span className="lab-notebook__marker" aria-hidden>
                  Q.
                </span>
                <span>{e.q}</span>
              </dt>
              <dd className="lab-notebook__a">
                <span className="lab-notebook__marker lab-notebook__marker--a" aria-hidden>
                  A.
                </span>
                <span>{e.a}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
