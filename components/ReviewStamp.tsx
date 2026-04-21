export function ReviewStamp({
  updatedAt,
  readingTime,
  author = "The PlasticFreeLab Team",
}: {
  updatedAt: string;
  readingTime: number;
  author?: string;
}) {
  const formatted = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <p className="flex flex-wrap items-center gap-2 text-[13px] text-stone">
      <span className="font-serif text-forest">By {author}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-sage/60" />
      <span>Updated {formatted}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-sage/60" />
      <span className="tnum">{readingTime} min read</span>
    </p>
  );
}
