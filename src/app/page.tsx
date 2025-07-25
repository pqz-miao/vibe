"use client";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { useTRPC } from "@/trpc/client";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions());

  return (
    <div className="p-4 max-w-7xl mx-auto">
        <Button onClick={() => invoke.mutate({ text: "Antonio" })} className="cursor-pointer">
          Invoke Background Job
        </Button>
    </div>
  );
};

export default Page;
