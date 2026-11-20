import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import { tmdbImage } from "@/lib/images";
import { yearOf, type MovieSummary } from "@/lib/movies";

export function TodayHero({ movie }: { movie: MovieSummary }) {
  const poster = tmdbImage(movie.posterPath ?? movie.backdropPath, "poster");
  const blurb = movie.overview.split(". ").slice(0, 1).join(". ");

  return (
    <section className="mx-auto grid w-full max-w-6xl items-end gap-8 px-4 pt-8 pb-2 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:pt-12">
      <div className="order-2 lg:order-1">
        <p className="text-sm font-medium text-primary">Today&apos;s pull</p>
        <h1 className="mt-3 max-w-2xl font-heading text-3xl text-balance leading-tight sm:text-5xl line-clamp-2">
          {movie.title}
        </h1>
        {blurb ? (
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {blurb}
          </p>
        ) : null}
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground tabular-nums">
          <span>{yearOf(movie.releaseDate)}</span>
          <Rating value={movie.voteAverage} />
        </p>
        <Button asChild size="lg" className="mt-6 w-fit px-6">
          <Link href={`/movies/${movie.id}`}>See the film</Link>
        </Button>
      </div>
      <div className="relative order-1 aspect-[2/3] w-full max-w-60 justify-self-start overflow-hidden rounded-2xl border border-border bg-card lg:order-2 lg:justify-self-end">
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
          <p className="grid h-full place-items-center px-3 text-center text-sm text-muted-foreground">
            No poster
          </p>
        )}
      </div>
    </section>
  );
}
