"use client";

import { Button } from "@/components/ui/button";

export default function HomeError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-heading text-4xl text-balance">
        Today&apos;s board is unavailable
      </h1>
      <p className="mt-3 text-pretty text-muted-foreground">
        The film list did not load. Try the request again.
      </p>
      <Button type="button" size="lg" onClick={reset} className="mt-6 px-6">
        Try again
      </Button>
    </div>
  );
}
