import type { Metadata } from "next";

import { MovieGrid } from "@/components/movie-grid";
import { Notice } from "@/components/notice";
import { PageTransition } from "@/components/page-transition";
import type { MovieSummary } from "@/lib/movies";
import { caller } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Watchlist" };

export default async function WatchlistPage() {
  try {
    const items = await caller.watchlist.list();
    const movies: MovieSummary[] = items.map((item) => ({
      id: item.tmdbId,
      title: item.title,
      overview: "",
      posterPath: item.posterPath,
      backdropPath: null,
      releaseDate: "",
      voteAverage: 0,
    }));

    if (movies.length === 0) {
      return (
        <PageTransition>
          <Notice
            title="Your watchlist is empty"
            body="Save a film from today's board and it will wait here, in this browser."
            action={{ href: "/", label: "See today's films" }}
          />
        </PageTransition>
      );
    }

    return (
      <PageTransition>
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-heading text-4xl text-balance">Watchlist</h1>
          <p className="mt-3 mb-10 text-muted-foreground">
            Saved on this browser. Remove a title with Saved.
          </p>
          <MovieGrid
            movies={movies}
            savedIds={movies.map((movie) => movie.id)}
          />
        </section>
      </PageTransition>
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The watchlist could not be loaded.";
    return (
      <Notice
        title="Watchlist unavailable"
        body={message}
        action={{ href: "/watchlist", label: "Try again" }}
      />
    );
  }
}
