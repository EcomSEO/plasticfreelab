export function DotRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center gap-3 text-sage/40 ${className}`}
    >
      <span className="h-px flex-1 bg-sage/25" />
      <span className="h-1 w-1 rounded-full bg-sage/70" />
      <span className="h-1 w-1 rounded-full bg-sage/50" />
      <span className="h-1 w-1 rounded-full bg-sage/70" />
      <span className="h-px flex-1 bg-sage/25" />
    </div>
  );
}

export function ThinRule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-forest/10 ${className}`} />;
}

export function LabRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-sage" />
      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
      <span className="h-px flex-1 bg-sage/25" />
    </div>
  );
}
