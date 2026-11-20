import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { movieDetail, searchMovies, trendingMovies } from "@/lib/tmdb";
import { baseProcedure, createTRPCRouter } from "@/lib/trpc/init";
import { ensureVisitorId } from "@/lib/visitor";

export const appRouter = createTRPCRouter({
  trending: baseProcedure
    .input(z.object({ page: z.number().int().min(1).max(20).default(1) }))
    .query(({ input }) => trendingMovies(input.page)),

  movie: baseProcedure
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

  search: baseProcedure
    .input(z.object({ query: z.string().trim().min(1).max(80) }))
    .query(({ input }) => searchMovies(input.query)),

  watchlist: createTRPCRouter({
    list: baseProcedure.query(async ({ ctx }) => {
      if (!ctx.visitorId) return [];
      return prisma.watchlistItem.findMany({
        where: { visitorId: ctx.visitorId },
        orderBy: { createdAt: "desc" },
      });
    }),

    ids: baseProcedure.query(async ({ ctx }) => {
      if (!ctx.visitorId) return [] as number[];
      const rows = await prisma.watchlistItem.findMany({
        where: { visitorId: ctx.visitorId },
        select: { tmdbId: true },
      });
      return rows.map((row) => row.tmdbId);
    }),

    toggle: baseProcedure
      .input(
        z.object({
          tmdbId: z.number().int().positive(),
          title: z.string().min(1).max(300),
          posterPath: z.string().nullable(),
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
