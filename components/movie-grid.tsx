import { MovieCard } from "@/components/movie-card";
import type { MovieSummary } from "@/lib/movies";

export function MovieGrid({
  movies,
  savedIds,
}: {
  movies: MovieSummary[];
  savedIds: number[];
}) {
  const saved = new Set(savedIds);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {movies.map((movie) => (
          <li key={movie.id} className="min-w-0">
            <MovieCard movie={movie} saved={saved.has(movie.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
