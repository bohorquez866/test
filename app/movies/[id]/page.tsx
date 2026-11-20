import Image from "next/image";
import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";

import { Notice } from "@/components/notice";
import { PageTransition } from "@/components/page-transition";
import { PosterFrame } from "@/components/poster-frame";
import { Rating } from "@/components/rating";
import { TransitionLink } from "@/components/transition-link";
import { WatchlistButton } from "@/components/watchlist-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { tmdbImage } from "@/lib/images";
import { runtimeLabel, yearOf } from "@/lib/movies";
import { movieDetail } from "@/lib/tmdb";
import { caller } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movieId = Number((await params).id);
  if (!Number.isInteger(movieId) || movieId <= 0) return { title: "Film" };
  try {
    const movie = await movieDetail(movieId);
    return { title: movie?.title ?? "Film" };
  } catch {
    return { title: "Film" };
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  if (!Number.isInteger(movieId) || movieId <= 0) notFound();

  try {
    const [movie, savedIds] = await Promise.all([
      caller.movie({ id: movieId }),
      caller.watchlist.ids(),
    ]);
    const poster = tmdbImage(movie.posterPath, "poster");
    const length = runtimeLabel(movie.runtime);

    return (
      <PageTransition>
        <article className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
          <PosterFrame
            movieId={movie.id}
            className="aspect-[2/3] rounded-2xl border border-border bg-card"
          >
            {poster ? (
              <Image
                src={poster}
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="240px"
                className="object-cover"
              />
            ) : (
              <p className="grid h-full place-items-center text-sm text-muted-foreground">
                No poster
              </p>
            )}
          </PosterFrame>
          <div>
            <p className="text-sm text-muted-foreground">
              <TransitionLink
                href="/"
                transitionType="nav-back"
                className="underline-offset-4 hover:underline"
              >
                Today
              </TransitionLink>
              <span aria-hidden="true"> / </span>
              Film
            </p>
            <h1
              tabIndex={-1}
              className="mt-2 font-heading text-5xl text-balance leading-none outline-none"
            >
              {movie.title}
            </h1>
            {movie.tagline ? (
              <p className="mt-3 text-lg text-muted-foreground">
                {movie.tagline}
              </p>
            ) : null}
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground tabular-nums">
              <span>
                {yearOf(movie.releaseDate)}
                {length ? ` · ${length}` : ""}
              </span>
              <Rating value={movie.voteAverage} />
            </p>
            {movie.genres.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <li key={genre}>
                    <Badge variant="outline" className="rounded-full px-3">
                      {genre}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed">
              {movie.overview || "No synopsis yet."}
            </p>
            <div className="mt-6 w-fit min-w-40">
              <WatchlistButton
                tmdbId={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                saved={savedIds.includes(movie.id)}
              />
            </div>
            {movie.cast.length > 0 ? (
              <section className="mt-10">
                <Separator className="mb-8" />
                <h2 className="font-heading text-3xl text-balance">Cast</h2>
                <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
                  {movie.cast.map((person) => {
                    const photo = tmdbImage(person.profilePath, "poster");
                    return (
                      <li
                        key={person.id}
                        className="reveal-on-scroll space-y-3"
                      >
                        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
                          {photo ? (
                            <Image
                              src={photo}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 50vw, 220px"
                              className="object-cover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                        <p className="line-clamp-2 text-sm font-medium">
                          {person.name}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {person.character}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
      </PageTransition>
    );
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") notFound();
    return (
      <Notice
        title="Film unavailable"
        body="This film could not be loaded. Check your connection and try again."
        action={{ href: "/", label: "Back to today" }}
      />
    );
  }
}
