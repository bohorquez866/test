import { MovieGridSkeleton } from "@/components/movie-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function WatchlistSkeleton() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6"
      aria-busy="true"
      aria-label="Loading watchlist"
    >
      <div className="mb-10 space-y-3">
        <Skeleton className="h-10 w-48 rounded-2xl" />
        <Skeleton className="h-4 w-72 max-w-full rounded-full" />
      </div>
      <MovieGridSkeleton count={6} />
    </section>
  );
}
