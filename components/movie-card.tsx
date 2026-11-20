import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/rating";
import { WatchlistButton } from "@/components/watchlist-button";
import { tmdbImage } from "@/lib/images";
import { yearOf, type MovieSummary } from "@/lib/movies";

type MovieCardProps = {
  movie: MovieSummary;
  saved: boolean;
};

export function MovieCard({ movie, saved }: MovieCardProps) {
  const poster = tmdbImage(movie.posterPath, "poster");

  return (
    <article className="movie-card flex h-full flex-col rounded-2xl border border-border/80 bg-card p-3 shadow-sm">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <p className="grid h-full place-items-center px-3 text-center text-sm text-muted-foreground">
            No poster
          </p>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-1 pt-4 pb-1">
        <h3 className="font-heading text-xl leading-tight text-balance">
          <Link href={`/movies/${movie.id}`} className="card-link">
            {movie.title}
          </Link>
        </h3>
        {movie.releaseDate || movie.voteAverage > 0 ? (
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground tabular-nums">
            {movie.releaseDate ? (
              <span>{yearOf(movie.releaseDate)}</span>
            ) : null}
            <Rating value={movie.voteAverage} />
          </p>
        ) : null}
        {movie.overview ? (
          <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {movie.overview}
          </p>
        ) : null}
        <div className="mt-auto pt-3">
          <WatchlistButton
            tmdbId={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            saved={saved}
          />
        </div>
      </div>
    </article>
  );
}
