"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/lib/trpc/client";

type WatchlistButtonProps = {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  saved: boolean;
};

export function WatchlistButton({
  tmdbId,
  title,
  posterPath,
  saved,
}: WatchlistButtonProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const [isSaved, setIsSaved] = useState(saved);

  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  const toggle = useMutation(
    trpc.watchlist.toggle.mutationOptions({
      onMutate: async () => {
        const previous = isSaved;
        const next = !previous;
        setIsSaved(next);
        return { previous, next };
      },
      onSuccess: (result) => {
        setIsSaved(result.saved);
        toast.success(
          result.saved ? `Saved “${title}”` : `Removed “${title}”`,
          {
            description: result.saved
              ? "It is waiting on your watchlist."
              : "It is no longer on your watchlist.",
          },
        );
        router.refresh();
      },
      onError: (_error, _input, context) => {
        if (context) setIsSaved(context.previous);
        toast.error("Could not update the watchlist", {
          description: "Check your connection and try again.",
        });
      },
    }),
  );

  const label = isSaved
    ? `Remove ${title} from watchlist`
    : `Save ${title} to watchlist`;

  return (
    <Button
      type="button"
      variant={isSaved ? "secondary" : "outline"}
      aria-pressed={isSaved}
      aria-label={label}
      aria-busy={toggle.isPending}
      onClick={() => toggle.mutate({ tmdbId, title, posterPath })}
      className="relative z-10 h-11 w-full px-4"
    >
      {isSaved ? "Saved" : "Save"}
    </Button>
  );
}
