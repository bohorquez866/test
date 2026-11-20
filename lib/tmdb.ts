import {
  toDetail,
  toSummary,
  type MovieDetail,
  type MovieSummary,
} from "@/lib/movies";

const BASE = "https://api.themoviedb.org/3";

function readToken() {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "Missing TMDB_ACCESS_TOKEN. Add a TMDB API key or v4 read access token to .env and restart the server.",
    );
  }
  return token;
}

function tmdbRequest(path: string, params?: Record<string, string>) {
  const token = readToken();
  const url = new URL(`${BASE}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = { accept: "application/json" };
  if (token.includes(".")) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    url.searchParams.set("api_key", token);
  }

  return fetch(url, { headers, next: { revalidate: 60 * 60 } });
}

async function tmdb<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const response = await tmdbRequest(path, params);
  if (!response.ok) {
    throw new Error(
      `TMDB request failed (${response.status}). Check the token and try again.`,
    );
  }
  return response.json() as Promise<T>;
}

export async function trendingMovies(page = 1): Promise<MovieSummary[]> {
  const data = await tmdb<{ results: Parameters<typeof toSummary>[0][] }>(
    "/trending/movie/day",
    { page: String(page) },
  );
  return data.results.map(toSummary);
}

export async function movieDetail(id: number): Promise<MovieDetail | null> {
  const response = await tmdbRequest(`/movie/${id}`, {
    append_to_response: "credits",
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(
      `TMDB request failed (${response.status}). Check the token and try again.`,
    );
  }

  return toDetail(await response.json());
}

export async function searchMovies(query: string): Promise<MovieSummary[]> {
  const data = await tmdb<{ results: Parameters<typeof toSummary>[0][] }>(
    "/search/movie",
    {
      query,
      include_adult: "false",
    },
  );
  return data.results.map(toSummary);
}
