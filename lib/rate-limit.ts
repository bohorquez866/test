import "server-only";

import { headers } from "next/headers";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const MAX_KEYS = 5_000;

export class RateLimitError extends Error {
  readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super("Too many requests. Wait a moment and try again.");
    this.name = "RateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

function prune(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size < MAX_KEYS) return;
  const overflow = buckets.size - Math.floor(MAX_KEYS / 2);
  let removed = 0;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

/** Fixed-window limiter. Returns remaining quota when allowed. */
export function takeToken(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true; remaining: number } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  prune(now);

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false, retryAfterMs: Math.max(0, current.resetAt - now) };
  }

  current.count += 1;
  return { ok: true, remaining: limit - current.count };
}

export function clientIpFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 128);

  return "unknown";
}

async function clientIpFromHeaders(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  return h.get("x-real-ip")?.trim().slice(0, 128) || "unknown";
}

/** Enforce a named per-IP limit using the incoming request headers. */
export async function enforceIpRateLimit(
  name: string,
  limit: number,
  windowMs = 60_000,
) {
  const ip = await clientIpFromHeaders();
  const result = takeToken(`${name}:${ip}`, limit, windowMs);
  if (!result.ok) throw new RateLimitError(result.retryAfterMs);
}
