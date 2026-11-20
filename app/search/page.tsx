import type { Metadata } from "next";

import { MovieGrid } from "@/components/movie-grid";
import { Notice } from "@/components/notice";
import { PageTransition } from "@/components/page-transition";
import { caller } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <Notice
        title="Search the board"
        body="Type a title in the search field. Results stay on this page."
      />
    );
  }

  try {
    const [movies, savedIds] = await Promise.all([
      caller.search({ query }),
      caller.watchlist.ids(),
    ]);

    return (
      <PageTransition>
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-4xl text-balance">
            Results for “{query}”
          </h1>
          <p className="mt-3 mb-10 text-muted-foreground">
            {movies.length === 0
              ? "No matching titles."
              : `${movies.length} titles.`}
          </p>
          {movies.length === 0 ? (
            <Notice
              title="No matches"
              body="Try a shorter title or a different spelling."
            />
          ) : (
            <MovieGrid movies={movies} savedIds={savedIds} />
          )}
        </section>
      </PageTransition>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Search could not be completed.";
    return (
      <Notice
        title="Search unavailable"
        body={message}
        action={{ href: "/search", label: "Try again" }}
      />
    );
  }
}
