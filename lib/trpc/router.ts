import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { movieDetail, searchMovies, trendingMovies } from "@/lib/tmdb";
import {
  createTRPCRouter,
  mutationProcedure,
  publicProcedure,
} from "@/lib/trpc/init";
import { ensureVisitorId } from "@/lib/visitor";

const tmdbPosterPath = z
  .string()
  .regex(/^\/[A-Za-z0-9._/-]+$/, "Invalid poster path")
  .max(200)
  .nullable();

export const appRouter = createTRPCRouter({
  trending: publicProcedure
    .input(z.object({ page: z.number().int().min(1).max(20).default(1) }))
    .query(({ input }) => trendingMovies(input.page)),

  movie: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const movie = await movieDetail(input.id);
      if (!movie) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "That film is not on TMDB.",
        });
      }
      return movie;
    }),

  search: publicProcedure
    .input(z.object({ query: z.string().trim().min(1).max(80) }))
    .query(({ input }) => searchMovies(input.query)),

  watchlist: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.visitorId) return [];
      return prisma.watchlistItem.findMany({
        where: { visitorId: ctx.visitorId },
        orderBy: { createdAt: "desc" },
      });
    }),

    ids: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.visitorId) return [] as number[];
      const rows = await prisma.watchlistItem.findMany({
        where: { visitorId: ctx.visitorId },
        select: { tmdbId: true },
      });
      return rows.map((row) => row.tmdbId);
    }),

    toggle: mutationProcedure
      .input(
        z.object({
          tmdbId: z.number().int().positive(),
          title: z.string().trim().min(1).max(300),
          posterPath: tmdbPosterPath,
        }),
      )
      .mutation(async ({ input }) => {
        const visitorId = await ensureVisitorId();
        const where = { visitorId_tmdbId: { visitorId, tmdbId: input.tmdbId } };
        const existing = await prisma.watchlistItem.findUnique({ where });

        if (existing) {
          await prisma.watchlistItem.delete({ where });
          return { saved: false };
        }

        await prisma.watchlistItem.create({
          data: {
            visitorId,
            tmdbId: input.tmdbId,
            title: input.title,
            posterPath: input.posterPath,
          },
        });
        return { saved: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
