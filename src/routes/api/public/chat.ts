import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const bodySchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().min(1).max(120),
  activeHotel: z.string().min(1).max(60).default("all"),
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = bodySchema.safeParse(await request.json());
        } catch {
          return json({ error: "Invalid request body." }, 400);
        }
        if (!parsed.success) {
          return json({ error: "Invalid request body." }, 400);
        }

        const { relayChatMessage } = await import("@/lib/chat-webhook.server");
        const result = await relayChatMessage(parsed.data);

        if (!result.ok) {
          return json({ error: result.error }, result.status);
        }
        return json({ reply: result.reply });
      },
    },
  },
});
