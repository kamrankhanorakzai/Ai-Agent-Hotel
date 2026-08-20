import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { kind: "bot" | "user" | "err"; text: string };

const SUGGESTIONS = [
  "What rooms are available in Lahore this weekend?",
  "What's the cheapest room across all 3 hotels?",
  "Does the Islamabad hotel have hill views?",
  "What services can I add to my booking?",
];

const WELCOME: Msg = {
  kind: "bot",
  text: "Welcome to Pearl Collection. I can help with rooms, rates, amenities and services across all three houses — Peshawar, Lahore and Islamabad.",
};

function formatted(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i} className="whitespace-pre-wrap">
        {part}
      </span>
    ),
  );
}

export function ChatWidget({
  open,
  onOpenChange,
  activeHotel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeHotel: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const sessionId = useRef<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy, open]);

  const getSessionId = () => {
    if (!sessionId.current) {
      sessionId.current = `hotel-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
    }
    return sessionId.current;
  };

  async function send(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || busy) return;

    setShowSuggestions(false);
    setMessages((m) => [...m, { kind: "user", text }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: getSessionId(), activeHotel }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setMessages((m) => [
          ...m,
          { kind: "err", text: data.error ?? "The front desk is unavailable right now." },
        ]);
      } else {
        setMessages((m) => [...m, { kind: "bot", text: data.reply! }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { kind: "err", text: "We couldn't reach the front desk. Please try again shortly." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-forest text-primary-foreground shadow-[var(--shadow-lift)] ring-1 ring-gold/40 transition hover:bg-forest-deep"
      >
        {!open && (
          <span className="pulse-ring pointer-events-none absolute inset-0 rounded-full border border-gold" />
        )}
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <div
        className={`fixed bottom-24 right-4 z-50 flex w-[min(92vw,25rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lift)] transition-all duration-300 sm:right-6 ${
          open
            ? "pointer-events-auto max-h-[34rem] opacity-100"
            : "pointer-events-none max-h-0 translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3 bg-forest px-5 py-4 text-primary-foreground">
          <div>
            <div className="flex items-center gap-2 font-display text-lg">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Front Desk
            </div>
            <p className="mt-0.5 text-xs text-primary-foreground/70">
              Rooms, rates and availability across 3 houses
            </p>
          </div>
          <button onClick={() => onOpenChange(false)} aria-label="Close chat" className="opacity-80 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={bodyRef} className="flex max-h-80 min-h-56 flex-col gap-3 overflow-y-auto bg-background px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.kind === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-forest px-4 py-2.5 text-sm text-primary-foreground"
                  : m.kind === "err"
                    ? "max-w-[90%] rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
                    : "max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed text-foreground"
              }
            >
              {m.kind === "user" ? m.text : formatted(m.text)}
            </div>
          ))}

          {busy && (
            <div className="flex w-16 items-center justify-center gap-1 rounded-2xl border border-border bg-surface px-3 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="typing-dot h-1.5 w-1.5 rounded-full bg-gold-deep"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}

          {showSuggestions && (
            <div className="mt-1 space-y-2">
              <p className="text-eyebrow">Try asking</p>
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="block w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-xs text-muted-foreground transition hover:border-gold hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 border-t border-border bg-surface px-3 py-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Ask about rooms, rates, availability…"
            className="max-h-24 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <button
            onClick={() => void send()}
            disabled={busy}
            aria-label="Send message"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-deep text-primary-foreground transition hover:bg-gold disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
