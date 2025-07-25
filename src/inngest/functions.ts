import {
    openai,
    createAgent
} from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event }) => {
        const codeAgent = createAgent({
            name: "code-agent",
            system: "You are an expert next.js developer. You write readable, maintainable code. You writ simple Next.js & React snippets.",
            // model: openai({ model: "gpt-4o" }),
            model: openai({ model: "gpt-4o", baseUrl: "https://yunwu.ai/v1" }),
        });

        const { output } = await codeAgent.run(
            `Write the following snippet: ${event.data.value}`,
        );

        return { output };
    },
);
