import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Notice({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-heading text-4xl text-balance">{title}</h1>
      <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
        {body}
      </p>
      {action ? (
        <Button asChild size="lg" className="mt-6 px-6">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}
