"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today" },
  { href: "/watchlist", label: "Watchlist" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
      {links.map((link) => {
        const current =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className="inline-flex min-h-10 items-center px-2.5 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-11 sm:px-3 aria-[current=page]:text-primary aria-[current=page]:underline"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
