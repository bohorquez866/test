import { cookies } from "next/headers";

export const VISITOR_COOKIE = "marquee_visitor";

export async function readVisitorId() {
  const store = await cookies();
  return store.get(VISITOR_COOKIE)?.value ?? null;
}

export async function ensureVisitorId() {
  const store = await cookies();
  const existing = store.get(VISITOR_COOKIE)?.value;
  if (existing) return existing;

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
