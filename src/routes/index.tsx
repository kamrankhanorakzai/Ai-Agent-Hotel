import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, Star, X } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";
import { AMENITIES, HOTELS, REVIEWS, SERVICES } from "@/lib/hotels";
import { ChatWidget } from "@/components/ChatWidget";

const TITLE = "Pearl Collection — Luxury Hotels in Peshawar, Lahore & Islamabad";
const DESCRIPTION =
  "Three independently-run luxury hotels in Peshawar, Lahore and Islamabad. Eighteen room types, one quiet standard, one front desk.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#properties", label: "Hotels" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5 text-gold-deep">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < count ? "currentColor" : "none"} strokeWidth={1.4} />
      ))}
    </span>
  );
}

function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? HOTELS : HOTELS.filter((h) => h.id === filter);

  const select = (id: string) => {
    setFilter(id);
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="hidden items-center justify-between bg-forest-deep px-6 py-2 text-xs tracking-wide text-primary-foreground/80 md:flex lg:px-10">
        <span className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" /> One front desk for three houses · open 24 hours
        </span>
        <span className="flex gap-6">
          {HOTELS.map((h) => (
            <span key={h.id}>
              {h.city} · {h.phone}
            </span>
          ))}
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-forest/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="leading-none">
            <span className="block font-display text-2xl text-primary-foreground">Pearl Collection</span>
            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Peshawar · Lahore · Islamabad
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-primary-foreground/85 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-gold">
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="hidden rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-forest-deep sm:block"
            >
              Ask the front desk
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-primary-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-forest-deep/95 p-8 backdrop-blur lg:hidden">
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="ml-auto block text-gold">
            <X className="h-6 w-6" />
          </button>
          <div className="mt-10 flex flex-col gap-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-primary-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Pearl Collection hotel facade lit at dusk"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-forest-deep/40" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <div className="fade-up max-w-2xl">
            <p className="text-eyebrow rule-gold">Est. 2018 · Pakistan</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              Three cities.
              <br />
              One <span className="gold-gradient-text italic">quiet standard</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Pearl Collection runs three independently-run houses in Peshawar, Lahore and Islamabad — the same front
              desk, the same standard of care, three different cities to wake up in.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#properties"
                className="rounded-full bg-gold px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-forest-deep shadow-[var(--shadow-gold)] transition hover:bg-gold-deep hover:text-primary-foreground"
              >
                Browse the houses
              </a>
              <button
                onClick={() => setChatOpen(true)}
                className="rounded-full border border-primary-foreground/40 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:border-gold hover:text-gold"
              >
                Chat with the front desk
              </button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-primary-foreground/70">
              <Stars count={5} />
              4.6 average across three properties
            </div>
          </div>

          {/* Signature switcher */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {HOTELS.map((h) => (
              <button
                key={h.id}
                onClick={() => select(h.id)}
                className={`hairline-frame rounded-2xl border p-5 text-left backdrop-blur transition ${
                  filter === h.id
                    ? "border-gold bg-forest/80"
                    : "border-primary-foreground/15 bg-forest-deep/50 hover:border-gold/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{h.city}</p>
                    <p className="mt-1 font-display text-xl text-primary-foreground">{h.name}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] ${
                      h.available ? "bg-gold-pale text-gold-deep" : "bg-primary-foreground/15 text-primary-foreground/70"
                    }`}
                  >
                    {h.available ? "Rooms open" : "Limited"}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <p className="font-display text-2xl text-primary-foreground">
                    ${h.from}
                    <span className="ml-1 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground/60">
                      /night from
                    </span>
                  </p>
                  <span className="text-sm text-gold">★ {h.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-eyebrow rule-gold">The collection</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Pick a city, then pick a room</h2>
          <p className="mt-4 text-muted-foreground">
            Every house keeps its own character. Select one and the rooms below filter to match — the front desk always
            knows which one you're asking about.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {HOTELS.map((h) => (
            <article
              key={h.id}
              onClick={() => select(h.id)}
              className={`surface-card group cursor-pointer overflow-hidden ${filter === h.id ? "border-gold" : ""}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={h.image}
                  alt={`${h.name} in ${h.city}`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-forest-deep/85 px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-gold">
                  {h.tag}
                </span>
              </div>
              <div className="p-7">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-deep">{h.city}</p>
                <h3 className="mt-2 font-display text-2xl">{h.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                  <p className="font-display text-2xl">
                    ${h.from}
                    <span className="ml-1 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      /night from
                    </span>
                  </p>
                  <span className="flex items-center gap-1.5 text-sm text-gold-deep">
                    <Star className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} /> {h.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-eyebrow rule-gold">Rooms &amp; rates</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Eighteen room types, one quiet standard
            </h2>
            <p className="mt-4 text-muted-foreground">
              Rates are per night, base price before seasonal adjustments. Ask the front desk for live availability on
              your dates.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[{ id: "all", city: "All houses" }, ...HOTELS].map((h) => (
              <button
                key={h.id}
                onClick={() => setFilter(h.id)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  filter === h.id
                    ? "border-forest bg-forest text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-gold hover:text-foreground"
                }`}
              >
                {h.city}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.flatMap((h) =>
              h.rooms.map((r) => (
                <article key={`${h.id}-${r.name}`} className="surface-card overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={h.image}
                      alt={`${r.name} room at ${h.name}`}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
                    <span className="absolute left-4 top-4 font-display text-lg text-gold">{r.tier}</span>
                    <span className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.18em] text-primary-foreground/85">
                      {h.city}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl">{r.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                    <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                      <p className="font-display text-xl">
                        ${r.price}
                        <span className="ml-1 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                          /night
                        </span>
                      </p>
                      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Sleeps {r.sleeps}
                      </span>
                    </div>
                  </div>
                </article>
              )),
            )}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="bg-forest py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-eyebrow rule-gold text-gold">In every room, every city</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              What's already there when you arrive
            </h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {AMENITIES.map((a) => (
              <div
                key={a}
                className="flex items-center gap-3 border-b border-primary-foreground/15 pb-4 text-sm text-primary-foreground/85"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-eyebrow rule-gold">Add to your stay</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Hotel services</h2>
          <p className="mt-4 text-muted-foreground">
            Available at all three houses — request through the front desk chat or at check-in.
          </p>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {SERVICES.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-6 py-6 transition hover:bg-surface">
              <div>
                <h3 className="font-display text-xl">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <p className="font-display text-xl text-gold-deep">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-eyebrow rule-gold">From recent stays</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">What guests said</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.who} className="surface-card p-8">
                <Stars count={r.stars} />
                <blockquote className="mt-5 font-display text-xl leading-snug">"{r.quote}"</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {r.who} — <span className="text-gold-deep">{r.where}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="hairline-frame rounded-3xl bg-forest-deep px-8 py-16 text-center text-primary-foreground">
          <p className="text-eyebrow rule-gold text-gold">Reservations</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Have dates in mind?</h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/75">
            Tell the front desk which city and they'll check what's open across the collection.
          </p>
          <button
            onClick={() => setChatOpen(true)}
            className="mt-9 rounded-full bg-gold px-9 py-3.5 text-xs uppercase tracking-[0.2em] text-forest-deep shadow-[var(--shadow-gold)] transition hover:bg-gold-deep hover:text-primary-foreground"
          >
            Start a conversation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-forest-deep py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <h3 className="font-display text-2xl">Pearl Collection</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Three independently-run houses in Peshawar, Lahore and Islamabad. Open since 2018.
            </p>
          </div>
          {HOTELS.map((h) => (
            <div key={h.id}>
              <h4 className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{h.city}</h4>
              <p className="mt-3 text-sm text-primary-foreground/70">{h.address}</p>
              <a
                href={`tel:${h.phone.replace(/[^+\d]/g, "")}`}
                className="mt-1 block text-sm text-primary-foreground/85 hover:text-gold"
              >
                {h.phone}
              </a>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-primary-foreground/10 px-6 pt-6 text-xs text-primary-foreground/60 lg:px-10">
          <span>© 2026 Pearl Collection. Demo content for testing purposes.</span>
          <a href="mailto:info@pearlcollection.com" className="hover:text-gold">
            info@pearlcollection.com
          </a>
        </div>
      </footer>

      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} activeHotel={filter} />
    </div>
  );
}
