"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useTRPC } from "@/trpc/client";

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job started");
    },
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => invoke.mutate({ value })} className="cursor-pointer">
          Invoke Background Job
        </Button>
    </div>
  );
};

export default Page;
