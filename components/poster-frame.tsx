import type { ReactNode } from "react";
import { cn } from "cn";

import { ViewTransition } from "@/lib/react-view-transition";

type PosterFrameProps = {
  movieId: number;
  className?: string;
  children: ReactNode;
};

/** Shared poster morph between board cards and the film page. */
export function PosterFrame({
  movieId,
  className,
  children,
}: PosterFrameProps) {
  return (
    <ViewTransition name={`poster-${movieId}`} share="morph" default="none">
      <div className={cn("relative overflow-hidden bg-muted", className)}>
        {children}
      </div>
    </ViewTransition>
  );
}
