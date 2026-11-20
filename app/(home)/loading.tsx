import { MovieGridSkeleton } from "@/components/movie-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl items-end gap-10 px-4 pt-10 pb-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:pt-14">
        <div className="order-2 space-y-5 lg:order-1">
          <Skeleton className="h-4 w-28 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-[92%] max-w-xl rounded-2xl" />
            <Skeleton className="h-10 w-[70%] max-w-lg rounded-2xl" />
          </div>
          <div className="space-y-2 pt-1">
            <Skeleton className="h-4 w-full max-w-md rounded-full" />
            <Skeleton className="h-4 w-[80%] max-w-sm rounded-full" />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Skeleton className="h-4 w-14 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <Skeleton className="mt-2 h-11 w-36 rounded-full" />
        </div>
        <Skeleton className="order-1 aspect-[2/3] w-full justify-self-stretch rounded-3xl sm:max-w-60 sm:justify-self-start lg:order-2 lg:justify-self-end" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-9 w-64 rounded-2xl" />
          <Skeleton className="h-4 w-80 max-w-full rounded-full" />
        </div>
        <MovieGridSkeleton />
      </div>
    </>
  );
}
