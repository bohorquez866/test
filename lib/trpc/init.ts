import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { clientIpFromRequest, takeToken } from "@/lib/rate-limit";
import { readVisitorId } from "@/lib/visitor";

type CreateContextOptions = {
  req?: Request;
};

export const createTRPCContext = async (opts: CreateContextOptions = {}) => {
  return {
    visitorId: await readVisitorId(),
    clientIp: opts.req ? clientIpFromRequest(opts.req) : null,
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    transformer: superjson,
  });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

function rateLimitMiddleware(limit: number, windowMs: number, name: string) {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.clientIp) return next();

    const result = takeToken(`${name}:${ctx.clientIp}`, limit, windowMs);
    if (!result.ok) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Wait a moment and try again.",
      });
    }

    return next();
  });
}

/** Default HTTP limit for watchlist reads and other client queries. */
export const publicProcedure = baseProcedure.use(
  rateLimitMiddleware(60, 60_000, "public"),
);

/** Mutations: keep spam off the watchlist cookie/DB path. */
export const mutationProcedure = baseProcedure.use(
  rateLimitMiddleware(30, 60_000, "mutation"),
);
