import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailSkeleton() {
  return (
    <article className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
      <Skeleton className="aspect-[2/3] w-full rounded-2xl ring-0" />

      <div className="min-w-0 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-[85%] max-w-xl rounded-2xl" />
            <Skeleton className="h-12 w-[55%] max-w-md rounded-2xl" />
          </div>
          <Skeleton className="h-5 w-48 rounded-full" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>

        <div className="max-w-2xl space-y-2.5 pt-1">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-[96%] rounded-full" />
          <Skeleton className="h-4 w-[88%] rounded-full" />
          <Skeleton className="h-4 w-[72%] rounded-full" />
        </div>

        <Skeleton className="h-11 w-40 rounded-full" />

        <div className="pt-4">
          <Skeleton className="mb-8 h-px w-full rounded-none opacity-60" />
          <Skeleton className="mb-6 h-9 w-28 rounded-2xl" />
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <li key={index} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full rounded-xl ring-0" />
                <Skeleton className="h-4 w-[70%] rounded-full" />
                <Skeleton className="h-3.5 w-[55%] rounded-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
