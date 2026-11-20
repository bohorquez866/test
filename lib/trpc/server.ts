import "server-only";

import { cache } from "react";

import { createCallerFactory, createTRPCContext } from "@/lib/trpc/init";
import { makeQueryClient } from "@/lib/trpc/query-client";
import { appRouter } from "@/lib/trpc/router";

export const getQueryClient = cache(makeQueryClient);

const createCaller = createCallerFactory(appRouter);

/** Server-side procedure caller for React Server Components. */
export const caller = createCaller(createTRPCContext);
