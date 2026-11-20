import { Suspense } from "react";

import Link from "next/link";

import { SearchForm } from "@/components/search-form";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border bg-background pt-[env(safe-area-inset-top)]"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading text-3xl leading-none text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Marquee
          </Link>
          <SiteNav />
        </div>
        <Suspense fallback={<div className="h-11 w-full lg:max-w-sm" />}>
          <SearchForm />
        </Suspense>
      </div>
    </header>
  );
}
