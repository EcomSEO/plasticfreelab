import { Eyebrow } from "./editorial/Eyebrow";
import { Monogram } from "./editorial/Monogram";

type Role = {
  letter: string;
  title: string;
  bio: string;
  tone: "sage" | "forest" | "terracotta" | "stone";
};

const ROLES: Role[] = [
  {
    letter: "R",
    title: "The Research Lead",
    bio: "Reads the primary literature. Cites the trial, not the press release. Disagreement with the consensus only shows up when the data earns it.",
    tone: "sage",
  },
  {
    letter: "T",
    title: "The Household Testing Lead",
    bio: "Cooks on every pan for a month. Weighs every bottle. Measures every claim. Tools and notebooks outnumber the opinions.",
    tone: "terracotta",
  },
  {
    letter: "M",
    title: "The Medical Reviewer",
    bio: "Flags YMYL claims. Confirms no fearmongering made it past the edit. The person who quietly removes the scary sentence.",
    tone: "forest",
  },
  {
    letter: "S",
    title: "The Sourcing Lead",
    bio: "Reads spec sheets. Triangulates manufacturer claims with third-party test data. Names the brands we reject, and says why.",
    tone: "stone",
  },
];

/**
 * EditorialBoard — trust signal / E-E-A-T block.
 * Four named roles, each with a monogram, role label, bio, and sage rule.
 */
export function EditorialBoard() {
  return (
    <section
      className="editorial-board border-b border-forest/10"
      data-reveal
      aria-labelledby="editorial-board-title"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="editorial-board__head">
          <Eyebrow tone="sage">How we report · Who reports it</Eyebrow>
          <h2
            id="editorial-board-title"
            className="font-serif text-3xl md:text-4xl text-forest mt-3 leading-tight"
            data-balance
          >
            The editorial board.
          </h2>
          <p className="editorial-board__lede">
            Four chairs at the table. Each one can kill a sentence we can&apos;t
            defend.
          </p>
        </div>

        <div className="editorial-board__grid">
          {ROLES.map((r) => (
            <article key={r.letter} className="editorial-board__card">
              <Monogram size={72} letters={r.letter} tone={r.tone} />
              <h3 className="editorial-board__role">{r.title}</h3>
              <p className="editorial-board__bio">{r.bio}</p>
              <span className="editorial-board__rule" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
