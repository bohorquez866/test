# Marquee — agent notes

Daily film discovery board. Trending titles come from TMDB; visitors can search, open a film, and save a browser-scoped watchlist.

## Docs

| Doc                      | When to open                                     |
| ------------------------ | ------------------------------------------------ |
| [DESIGN.md](./DESIGN.md) | UI, layout, typography, color, or component work |
| [README.md](./README.md) | Setup, env vars, deploy                          |

## Stack

Next.js 15 App Router · tRPC 11 (`@trpc/tanstack-react-query`) · TanStack Query · Prisma (Postgres) · ShadCN/Radix · Tailwind v4 · Zod · SuperJSON · TMDB API

## Layout

```text
app/                  routes + loading/error UI
app/api/trpc/[trpc]/  tRPC fetch handler
components/           UI (site chrome, movies, shadcn in ui/)
lib/trpc/             init, router, client provider, RSC caller
lib/tmdb.ts           TMDB client
lib/visitor.ts        visitor cookie for watchlist identity
prisma/               WatchlistItem schema
```

## Conventions

### Data & API

- Server Components call procedures through `caller` from `lib/trpc/server.ts`.
- Client Components use `useTRPC()` plus TanStack `useQuery` / `useMutation` with `queryOptions` / `mutationOptions` — not the classic `@trpc/react-query` hooks.
- Add procedures on `appRouter` in `lib/trpc/router.ts`; keep init helpers in `lib/trpc/init.ts`.
- Watchlist identity is the `marquee_visitor` httpOnly cookie (`lib/visitor.ts`), not a logged-in user.

### UI

- Follow [DESIGN.md](./DESIGN.md). Reuse `components/ui/*` before inventing new primitives.
- Brand wordmark and film titles use `font-heading` (Fraunces). Body/UI use `font-sans` (DM Sans).
- Prefer Server Components; mark `"use client"` only for interactivity (mutations, search form, providers).

### Env

- `TMDB_ACCESS_TOKEN` — TMDB API access
- `DATABASE_URL` — Prisma (pooler)
- `DIRECT_URL` — Prisma migrations / `db push`

## Commands

```bash
npm run dev        # Next.js (turbopack)
npm run build      # production build
npm run db:setup   # prisma generate + db push
npm run lint
```
