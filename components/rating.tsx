export function Rating({ value }: { value: number }) {
  if (value <= 0) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground tabular-nums">
      {value.toFixed(1)}
      <span className="sr-only"> average rating</span>
    </span>
  );
}
