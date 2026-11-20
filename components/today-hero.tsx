import Image from "next/image";

import { PosterFrame } from "@/components/poster-frame";
import { Rating } from "@/components/rating";
import { TransitionLink } from "@/components/transition-link";
import { Button } from "@/components/ui/button";
import { tmdbImage } from "@/lib/images";
import { yearOf, type MovieSummary } from "@/lib/movies";

export function TodayHero({ movie }: { movie: MovieSummary }) {
  const poster = tmdbImage(movie.posterPath ?? movie.backdropPath, "poster");
  const blurb = movie.overview.split(". ").slice(0, 1).join(". ");

  return (
    <section className="mx-auto grid w-full max-w-6xl items-end gap-6 px-4 pt-6 pb-2 sm:gap-8 sm:px-6 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:gap-12 lg:pt-12">
      <div className="order-2 space-y-4 lg:order-1 lg:space-y-5">
        <p className="text-sm font-semibold text-primary">Today&apos;s pull</p>
        <h1 className="max-w-2xl font-heading text-[1.85rem] text-balance leading-[1.15] sm:text-5xl sm:leading-tight line-clamp-2 lg:text-[3.25rem]">
          {movie.title}
        </h1>
        {blurb ? (
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {blurb}
          </p>
        ) : null}
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground tabular-nums">
          <span>{yearOf(movie.releaseDate)}</span>
          <Rating value={movie.voteAverage} />
        </p>
        <Button asChild size="lg" className="w-fit px-6">
          <TransitionLink
            href={`/movies/${movie.id}`}
            transitionType="nav-forward"
          >
            See the film
          </TransitionLink>
        </Button>
      </div>
      <PosterFrame
        movieId={movie.id}
        className="order-1 aspect-[2/3] w-full justify-self-stretch rounded-3xl border border-border bg-card shadow-sm sm:max-w-60 sm:justify-self-start lg:order-2 lg:max-w-none lg:w-full lg:justify-self-stretch lg:rounded-2xl lg:shadow-md"
      >
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 320px"
            className="object-cover"
          />
        ) : (
          <p className="grid h-full place-items-center px-3 text-center text-sm text-muted-foreground">
            No poster
          </p>
        )}
      </PosterFrame>
    </section>
  );
}
