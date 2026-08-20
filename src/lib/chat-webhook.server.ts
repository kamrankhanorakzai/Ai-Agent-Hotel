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

function pickReply(data: unknown, depth = 0): string {
  if (typeof data === "string") return data;
  if (depth > 4) return "";
  if (Array.isArray(data) && data.length) return pickReply(data[0], depth + 1);
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["reply", "output", "text", "message", "answer", "content"]) {
      if (typeof obj[key] === "string" && (obj[key] as string).trim()) return obj[key] as string;
    }
    for (const key of ["body", "json", "data", "result", "response"]) {
      if (obj[key] && typeof obj[key] === "object") {
        const nested = pickReply(obj[key], depth + 1);
        if (nested.trim()) return nested;
      }
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
