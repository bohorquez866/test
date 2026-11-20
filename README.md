# Marquee

A movie discovery board. Today’s trending films come from TMDB. Open a title for the synopsis and cast, search the catalog, and save films to a watchlist stored for this browser.

## Stack

Next.js (App Router), tRPC, ShadCN on Radix, Prisma, SQLite locally.

## Setup

1. Create a free TMDB account and copy an API key (or a v4 read access token) from [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
2. Copy `.env.example` to `.env` and set `TMDB_ACCESS_TOKEN`.
3. Install and create the database:

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

The database is Supabase Postgres. `DATABASE_URL` is the transaction pooler (port 6543). `DIRECT_URL` is the session pooler (port 5432) and is what Prisma uses for `db push`. Set both, plus `TMDB_ACCESS_TOKEN`, in `.env` and on Vercel.

Send the live URL to francisco@tryordinal.com and add [francistogram](https://github.com/francistogram) to the GitHub repository.
