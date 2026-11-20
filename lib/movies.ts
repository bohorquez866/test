export type MovieSummary = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
};

export type MovieDetail = MovieSummary & {
  tagline: string | null;
  runtime: number | null;
  genres: string[];
  cast: CastMember[];
};

type TmdbListMovie = {
  id: number;
  title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
};

type TmdbDetail = TmdbListMovie & {
  tagline?: string | null;
  runtime?: number | null;
  genres?: { name: string }[];
  credits?: {
    cast?: {
      id: number;
      name: string;
      character?: string;
      profile_path?: string | null;
    }[];
  };
};

export function toSummary(movie: TmdbListMovie): MovieSummary {
  return {
    id: movie.id,
    title: movie.title?.trim() || "Untitled",
    overview: movie.overview?.trim() ?? "",
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    releaseDate: movie.release_date ?? "",
    voteAverage: movie.vote_average ?? 0,
  };
}

export function toDetail(movie: TmdbDetail): MovieDetail {
  return {
    ...toSummary(movie),
    tagline: movie.tagline?.trim() || null,
    runtime: movie.runtime ?? null,
    genres: (movie.genres ?? []).map((genre) => genre.name),
    cast: (movie.credits?.cast ?? []).slice(0, 8).map((person) => ({
      id: person.id,
      name: person.name,
      character: person.character?.trim() || "Cast",
      profilePath: person.profile_path ?? null,
    })),
  };
}

export function yearOf(releaseDate: string) {
  return releaseDate.slice(0, 4) || "Unreleased";
}

export function runtimeLabel(minutes: number | null) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}
