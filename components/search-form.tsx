"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEBOUNCE_MS = 350;

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = defaultValue ?? searchParams.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);
  const skipDebounce = useRef(false);

  useEffect(() => {
    skipDebounce.current = true;
    setValue(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (skipDebounce.current) {
      skipDebounce.current = false;
      return;
    }

    const id = window.setTimeout(() => {
      const trimmed = value.trim().slice(0, 80);
      const target =
        trimmed.length > 0
          ? `/search?q=${encodeURIComponent(trimmed)}`
          : "/search";

      if (trimmed.length === 0) {
        if (pathname.startsWith("/search") && searchParams.has("q")) {
          router.replace(target);
        }
        return;
      }

      const current =
        pathname === "/search"
          ? `/search?q=${encodeURIComponent(urlQuery.trim())}`
          : null;
      if (current === target) return;
      router.replace(target);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [value, pathname, router, searchParams, urlQuery]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim().slice(0, 80);
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <search className="w-full lg:max-w-sm">
      <form
        action="/search"
        method="get"
        role="search"
        aria-label="Search movies"
        onSubmit={onSubmit}
        className="flex w-full items-center gap-2"
      >
        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <Input
          id="movie-search"
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search titles…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="search"
          maxLength={80}
          className="h-11 rounded-full bg-card px-4 text-base"
        />
        <Button
          type="submit"
          size="icon-lg"
          aria-label="Search"
          className="shrink-0"
        >
          <Search aria-hidden="true" className="size-5" strokeWidth={2.25} />
        </Button>
      </form>
    </search>
  );
}
