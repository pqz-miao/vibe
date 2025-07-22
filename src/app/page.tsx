import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { PageView } from "./page-view";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "prefetch" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <PageView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
