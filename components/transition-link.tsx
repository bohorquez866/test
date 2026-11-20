"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, type ComponentProps, type MouseEvent } from "react";

import {
  addTransitionType,
  startTransition,
} from "@/lib/react-view-transition";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  transitionType?: "nav-forward" | "nav-back";
};

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink(
  { href, transitionType = "nav-forward", onClick, replace, ...props },
  ref,
) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = typeof href === "string" ? href : href.pathname;
    if (!url || url.startsWith("http") || url.startsWith("mailto:")) return;

    event.preventDefault();
    startTransition(() => {
      addTransitionType(transitionType);
      if (replace) router.replace(url);
      else router.push(url);
    });
  }

  return (
    <Link
      ref={ref}
      href={href}
      replace={replace}
      onClick={handleClick}
      {...props}
    />
  );
});
