import { cookies } from "next/headers";

export const VISITOR_COOKIE = "marquee_visitor";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isVisitorId(value: string | undefined | null): value is string {
  return Boolean(value && UUID_RE.test(value));
}

export async function readVisitorId() {
  const store = await cookies();
  const value = store.get(VISITOR_COOKIE)?.value;
  return isVisitorId(value) ? value : null;
}

export async function ensureVisitorId() {
  const store = await cookies();
  const existing = store.get(VISITOR_COOKIE)?.value;
  if (isVisitorId(existing)) return existing;

  const id = crypto.randomUUID();
  store.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });
  return id;
}
