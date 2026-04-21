export function RankNumeral({ n }: { n: number }) {
  const display = n.toString().padStart(2, "0");
  return <span className="rank-numeral tnum">{display}</span>;
}
