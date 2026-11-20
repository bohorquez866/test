const POSTER_SIZE = "w500";
const BACKDROP_SIZE = "w1280";

export function tmdbImage(path: string | null, size: "poster" | "backdrop" = "poster") {
  if (!path) return null;
  const width = size === "backdrop" ? BACKDROP_SIZE : POSTER_SIZE;
  return `https://image.tmdb.org/t/p/${width}${path}`;
}
