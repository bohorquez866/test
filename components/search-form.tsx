"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const query = useSearchParams().get("q") ?? "";
  const value = defaultValue ?? query;

  return (
    <search className="w-full lg:max-w-sm">
      <form
        action="/search"
        method="get"
        role="search"
        aria-label="Search movies"
        className="flex w-full gap-2"
      >
        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <Input
          id="movie-search"
          name="q"
          type="search"
          key={value}
          defaultValue={value}
          placeholder="Search titles…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="search"
          required
          minLength={1}
          maxLength={80}
          className="h-11 rounded-full bg-card px-4 text-base"
        />
        <Button type="submit" size="lg" className="min-w-11 px-5">
          Search
        </Button>
      </form>
    </search>
  );
}
