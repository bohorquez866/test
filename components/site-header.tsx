import { Suspense } from "react";

import Link from "next/link";

import { SearchForm } from "@/components/search-form";
import { SiteNav } from "@/components/site-nav";
import { Skeleton } from "@/components/ui/skeleton";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-heading text-[1.75rem] leading-none tracking-tight text-foreground sm:text-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Marquee
          </Link>
          <SiteNav />
        </div>
        <Suspense
          fallback={
            <div className="flex w-full gap-2 lg:max-w-sm">
              <Skeleton className="h-11 flex-1 rounded-full" />
              <Skeleton className="size-11 shrink-0 rounded-full" />
            </div>
          }
        >
          <SearchForm />
        </Suspense>
      </div>
    </header>
  );
}
