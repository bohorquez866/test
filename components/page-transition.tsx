"use client";

import type { ReactNode } from "react";

import { ViewTransition } from "@/lib/react-view-transition";

/** Hierarchical board → film transitions; lateral nav stays quiet. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "fade-in",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "fade-out",
      }}
      default="none"
    >
      <div className="contents">{children}</div>
    </ViewTransition>
  );
}
