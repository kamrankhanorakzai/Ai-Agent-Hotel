/**
 * Server-only chat relay config.
 *
 * The n8n webhook URL never reaches the browser: this module is server-only
 * (blocked from client bundles by its `.server.ts` filename) and the browser
 * only ever talks to `/api/public/chat`.
 *
 * Set N8N_WEBHOOK_URL as an environment variable (Lovable secret, or a Vercel
 * Project Environment Variable) to override the fallback below.
 */
const FALLBACK_WEBHOOK_URL = "https://n8n-postgres.aiconsultix.com/webhook/Hotel-boat";

export function getWebhookUrl(): string {
  return process.env["N8N_WEBHOOK_URL"] || FALLBACK_WEBHOOK_URL;
}

function pickReply(data: unknown): string {
  if (typeof data === "string") return data;
  if (Array.isArray(data) && data.length) return pickReply(data[0]);
  if (data && typeof data === "object") {
    for (const key of ["reply", "output", "text", "message", "answer"]) {
      const value = (data as Record<string, unknown>)[key];
      if (typeof value === "string") return value;
    }
  }
  return "";
}

export async function relayChatMessage(payload: {
  message: string;
  sessionId: string;
  activeHotel: string;
}): Promise<{ ok: true; reply: string } | { ok: false; error: string; status: number }> {
  const url = getWebhookUrl();
  if (!url) {
    return { ok: false, error: "The chat isn't connected yet.", status: 503 };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: "The front desk service is temporarily unavailable. Please try again in a moment.",
        status: 502,
      };
    }

    const raw = await res.text();
    let reply = "";
    try {
      reply = pickReply(JSON.parse(raw));
    } catch {
      reply = raw;
    }

    if (!reply.trim()) {
      return {
        ok: false,
        error: "The front desk returned an empty response. Please try again shortly.",
        status: 502,
      };
    }

    return { ok: true, reply: reply.trim() };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the front desk service. Please try again in a few minutes.",
      status: 502,
    };
  }
}
