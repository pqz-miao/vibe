import { z } from "zod";

import { inngest } from "@/inngest/client";

import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
    invoke: baseProcedure
        .input(
            z.object({
                value: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await inngest.send({
                name: "test/hello.world",
                data: {
                    value: input.value,
                },
            });
        }),
    hello: baseProcedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query(async ({ input }) => {
            return { greeting: `hello ${input.text}` };
        }),
});

export type AppRouter = typeof appRouter;
