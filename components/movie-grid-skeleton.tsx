import { Skeleton } from "@/components/ui/skeleton";

export function MovieGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="flex flex-col rounded-2xl border border-border/80 bg-card p-3 shadow-sm"
        >
          <Skeleton className="aspect-[2/3] w-full rounded-xl ring-0" />
          <div className="flex flex-1 flex-col gap-3 px-1 pt-4 pb-1">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[88%] rounded-full" />
              <Skeleton className="h-5 w-[62%] rounded-full" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full rounded-full" />
              <Skeleton className="h-3.5 w-[85%] rounded-full" />
            </div>
            <Skeleton className="mt-auto h-11 w-full rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}
