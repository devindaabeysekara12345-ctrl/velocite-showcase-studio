import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VELOCITÉ" },
      { name: "description", content: "Reserve a private viewing at the Modena atelier. Speak directly with the team behind every VELOCITÉ machine." },
      { property: "og:title", content: "Contact — VELOCITÉ" },
      { property: "og:description", content: "Book a private viewing or speak with the atelier directly." },
    ],
  }),
  component: ContactPage,
});

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(160, "Email is too long"),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30, "Phone is too long"),
  model: z.enum(["Aether", "Apex", "Noir", "Zephyr", "Monolith", "Soleil", "Undecided"]),
  date: z.string().min(1, "Pick a preferred date"),
  time: z.enum(["Morning", "Afternoon", "Evening"]),
  message: z.string().trim().max(500, "Message must be under 500 characters").optional(),
});

type BookingData = z.infer<typeof bookingSchema>;
type FormErrors = Partial<Record<keyof BookingData, string>>;

const models = ["Aether", "Apex", "Noir", "Zephyr", "Monolith", "Soleil", "Undecided"] as const;
const times = ["Morning", "Afternoon", "Evening"] as const;

function ContactPage() {
  const [form, setForm] = useState<Partial<BookingData>>({ model: "Undecided", time: "Morning" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const update = <K extends keyof BookingData>(k: K, v: BookingData[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fe: FormErrors = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof BookingData;
        fe[k] = i.message;
      });
      setErrors(fe);
      return;
    }
    const ref = `VLC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setSubmitted(ref);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0c]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-1.5 rounded-full bg-neon animate-pulse-neon" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
              Chapter 03 — Atelier Access
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] max-w-5xl">
            Speak with the <span className="text-neon text-glow">atelier</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Book a private viewing in Modena. Three machines per day. By appointment only.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-lg p-8 md:p-10">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-neon">
                    Form 01 — Private Viewing
                  </div>
                  <h2 className="font-display text-3xl font-bold mt-2">Reserve your slot</h2>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Response within 24h
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="size-16 rounded-full bg-neon/10 border border-neon/40 flex items-center justify-center mx-auto mb-6">
                    <span className="text-neon text-2xl">✓</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Booking received</h3>
                  <p className="text-muted-foreground mb-6">
                    A concierge will confirm your viewing within 24 hours.
                  </p>
                  <div className="inline-flex items-center gap-3 glass rounded px-5 py-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Reference
                    </span>
                    <span className="font-mono text-neon">{submitted}</span>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        setSubmitted(null);
                        setForm({ model: "Undecided", time: "Morning" });
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Book another viewing →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Full name" error={errors.name}>
                      <input
                        type="text"
                        maxLength={80}
                        value={form.name ?? ""}
                        onChange={(e) => update("name", e.target.value)}
                        className="vlc-input"
                        placeholder="Elena Ricci"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        maxLength={160}
                        value={form.email ?? ""}
                        onChange={(e) => update("email", e.target.value)}
                        className="vlc-input"
                        placeholder="you@domain.com"
                      />
                    </Field>
                  </div>

                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      maxLength={30}
                      value={form.phone ?? ""}
                      onChange={(e) => update("phone", e.target.value)}
                      className="vlc-input"
                      placeholder="+39 059 000 000"
                    />
                  </Field>

                  <Field label="Model of interest" error={errors.model}>
                    <div className="flex flex-wrap gap-2">
                      {models.map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => update("model", m)}
                          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors ${
                            form.model === m
                              ? "bg-neon text-neon-foreground border-neon"
                              : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Preferred date" error={errors.date}>
                      <input
                        type="date"
                        value={form.date ?? ""}
                        onChange={(e) => update("date", e.target.value)}
                        className="vlc-input"
                      />
                    </Field>
                    <Field label="Time of day" error={errors.time}>
                      <div className="flex gap-2">
                        {times.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => update("time", t)}
                            className={`flex-1 px-3 py-2.5 rounded text-xs font-mono uppercase tracking-widest border transition-colors ${
                              form.time === t
                                ? "bg-neon text-neon-foreground border-neon"
                                : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <Field label="Message (optional)" error={errors.message}>
                    <textarea
                      rows={4}
                      maxLength={500}
                      value={form.message ?? ""}
                      onChange={(e) => update("message", e.target.value)}
                      className="vlc-input resize-none"
                      placeholder="Tell us anything we should know before your visit…"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded bg-neon text-neon-foreground font-mono text-sm uppercase tracking-widest hover:scale-[1.01] transition-transform neon-glow"
                  >
                    Request Viewing →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard label="Atelier" title="Modena, Italy">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Via Emilia Est 1140
                <br />
                41122 Modena (MO)
                <br />
                Italia
              </p>
              <div className="mt-5 aspect-video rounded overflow-hidden border border-white/10 relative bg-surface">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="size-3 rounded-full bg-neon mx-auto animate-pulse-neon shadow-[0_0_20px_oklch(0.88_0.22_155)]" />
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                      44.6471° N · 10.9252° E
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard label="Direct Line" title="+39 059 0000 124">
              <p className="text-sm text-muted-foreground">
                Concierge — Mon–Sat, 09:00–19:00 CET
              </p>
              <a
                href="mailto:atelier@velocite.it"
                className="mt-3 inline-block text-sm text-neon hover:underline"
              >
                atelier@velocite.it
              </a>
            </InfoCard>

            <InfoCard label="Hours" title="By appointment">
              <ul className="space-y-2 text-sm">
                <Row k="Mon — Fri" v="09:00 — 19:00" />
                <Row k="Saturday" v="10:00 — 17:00" />
                <Row k="Sunday" v="Closed" />
              </ul>
            </InfoCard>
          </div>
        </div>
      </section>

      <style>{`
        .vlc-input {
          width: 100%;
          background: oklch(1 0 0 / 0.03);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 0.25rem;
          padding: 0.75rem 1rem;
          color: var(--color-foreground);
          font-size: 0.875rem;
          transition: border-color .15s, background .15s;
        }
        .vlc-input:focus {
          outline: none;
          border-color: oklch(0.88 0.22 155 / 0.6);
          background: oklch(1 0 0 / 0.05);
        }
        .vlc-input::placeholder { color: oklch(0.65 0.015 270 / 0.6); }
        input[type="date"].vlc-input { color-scheme: dark; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </div>
      {children}
      {error && <div className="mt-1.5 text-xs text-destructive">{error}</div>}
    </label>
  );
}

function InfoCard({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-lg p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-neon mb-2">
        {label}
      </div>
      <h3 className="font-display text-2xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between border-b border-white/5 pb-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-mono text-xs text-foreground">{v}</span>
    </li>
  );
}
