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
    <p className="text-sm text-charcoal/60">
      By {author} · Updated {formatted} · {readingTime} min read
    </p>
  );
}
