import { MovieGrid } from "@/components/movie-grid";
import { Notice } from "@/components/notice";
import { PageTransition } from "@/components/page-transition";
import { TodayHero } from "@/components/today-hero";
import { caller } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const [movies, savedIds] = await Promise.all([
      caller.trending({ page: 1 }),
      caller.watchlist.ids(),
    ]);
    const [lead, ...rest] = movies;

    if (!lead) {
      return (
        <Notice
          title="Nothing is trending yet"
          body="TMDB did not return a daily board. Check the connection and try again."
          action={{ href: "/", label: "Reload" }}
        />
      );
    }

    return (
      <PageTransition>
        <TodayHero movie={lead} />
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-heading text-4xl text-balance">
            Also trending today
          </h2>
          <p className="mt-3 mb-10 max-w-lg text-pretty text-muted-foreground">
            The rest of today&apos;s board. Open a poster to read the film, or
            save it for later.
          </p>
          <MovieGrid movies={rest} savedIds={savedIds} />
        </section>
      </PageTransition>
    );
  } catch {
    return (
      <Notice
        title="Today's board is unavailable"
        body="The daily board could not be loaded. Check your connection and try again."
        action={{ href: "/", label: "Try again" }}
      />
    );
  }
}
