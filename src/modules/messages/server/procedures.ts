import { z } from "zod";

import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

export const messagesRouter = createTRPCRouter({
    create: baseProcedure
        .input(
            z.object({
                value: z.string().min(1, "Message is required"),
            })
        )
        .mutation(async ({ input }) => {
            const message = await prisma.message.create({
                data: {
                    content: input.value,
                    role: "USER",
                    type: "RESULT",
                },
            });

            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                },
            });

            return message;
        }),
    getMany: baseProcedure
        .query(async () => {
            const messages = await prisma.message.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });

            return messages;
        }),
});
