"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const PageView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: "prefetch" }));

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
};
