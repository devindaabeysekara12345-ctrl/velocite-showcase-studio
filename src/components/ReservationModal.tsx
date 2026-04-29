import { useEffect, useState } from "react";
import { z } from "zod";
import type { Car } from "@/data/cars";

const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(160, "Email is too long"),
  trim: z.enum(["Standard", "Performance", "Atelier Bespoke"]),
  exterior: z.enum(["Nero Carbonio", "Argento Liquido", "Verde Velocità", "Bianco Modena"]),
  interior: z.enum(["Onyx Leather", "Bone Alcantara", "Forest Suede", "Carbon Twill"]),
  delivery: z.enum(["EU", "UK", "USA", "MENA", "APAC"]),
  notes: z.string().trim().max(500, "Notes must be under 500 characters").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the atelier terms" }),
  }),
});

type ReservationData = z.infer<typeof reservationSchema>;
type FormErrors = Partial<Record<keyof ReservationData, string>>;

const trims = ["Standard", "Performance", "Atelier Bespoke"] as const;
const exteriors = ["Nero Carbonio", "Argento Liquido", "Verde Velocità", "Bianco Modena"] as const;
const interiors = ["Onyx Leather", "Bone Alcantara", "Forest Suede", "Carbon Twill"] as const;
const deliveries = ["EU", "UK", "USA", "MENA", "APAC"] as const;

type Props = {
  car: Car;
  open: boolean;
  onClose: () => void;
};

export function ReservationModal({ car, open, onClose }: Props) {
  const isWaitlist = car.status === "Sold Out";
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reservationId, setReservationId] = useState<string>("");

  // Reset state when re-opened
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
      setSubmitting(false);
    }
  }, [open]);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      trim: String(fd.get("trim") ?? ""),
      exterior: String(fd.get("exterior") ?? ""),
      interior: String(fd.get("interior") ?? ""),
      delivery: String(fd.get("delivery") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      consent: fd.get("consent") === "on",
    };

    const result = reservationSchema.safeParse(raw);
    if (!result.success) {
      const next: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ReservationData;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    // Simulate atelier handoff. Real persistence/email can be wired to Lovable Cloud later.
    await new Promise((r) => setTimeout(r, 900));
    const id = `VLC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setReservationId(id);
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl glass border border-white/10 animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
              {isWaitlist ? "Join Waitlist" : "Reserve Your"}
            </div>
            <h2 id="reservation-title" className="font-display text-xl font-bold tracking-tight mt-0.5">
              {car.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="size-9 rounded-full border border-white/15 hover:border-neon hover:text-neon flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <SuccessState car={car} reservationId={reservationId} isWaitlist={isWaitlist} onClose={onClose} />
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
            {/* Identity */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  maxLength={80}
                  required
                  autoComplete="name"
                  className={inputClass(errors.name)}
                  placeholder="Enzo Ferrari"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  maxLength={160}
                  required
                  autoComplete="email"
                  className={inputClass(errors.email)}
                  placeholder="you@domain.com"
                />
              </Field>
            </div>

            <Divider label="Configuration" />

            <Field label="Trim" error={errors.trim}>
              <RadioGroup name="trim" options={trims} defaultValue="Standard" />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Exterior" error={errors.exterior}>
                <select name="exterior" defaultValue={exteriors[0]} className={inputClass()}>
                  {exteriors.map((o) => (
                    <option key={o} value={o} className="bg-background">{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Interior" error={errors.interior}>
                <select name="interior" defaultValue={interiors[0]} className={inputClass()}>
                  {interiors.map((o) => (
                    <option key={o} value={o} className="bg-background">{o}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Delivery Region" error={errors.delivery}>
              <RadioGroup name="delivery" options={deliveries} defaultValue="EU" />
            </Field>

            <Field label="Notes for the atelier (optional)" error={errors.notes}>
              <textarea
                name="notes"
                maxLength={500}
                rows={3}
                className={inputClass(errors.notes) + " resize-none"}
                placeholder="Bespoke requests, commission references, delivery preferences…"
              />
            </Field>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 size-4 accent-[oklch(0.88_0.22_155)] cursor-pointer"
              />
              <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                I understand this is a non‑binding {isWaitlist ? "waitlist registration" : "reservation"} and a member of the VELOCITÉ atelier will contact me within 48 hours to confirm specification and deposit.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-destructive font-mono uppercase tracking-wider -mt-3">
                {errors.consent}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Deposit
                </div>
                <div className="font-display text-lg font-bold text-neon">
                  {isWaitlist ? "—" : "€25,000"}
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-neon text-neon-foreground px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform neon-glow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Submitting…"
                  : isWaitlist
                    ? "Join Waitlist →"
                    : "Reserve Yours →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessState({
  car,
  reservationId,
  isWaitlist,
  onClose,
}: {
  car: Car;
  reservationId: string;
  isWaitlist: boolean;
  onClose: () => void;
}) {
  return (
    <div className="p-8 text-center space-y-6 animate-fade-in">
      <div className="mx-auto size-16 rounded-full bg-neon/15 flex items-center justify-center neon-glow">
        <svg className="size-7 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-display text-3xl font-bold tracking-tight">
          {isWaitlist ? "You're on the list." : "Reservation received."}
        </h3>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          The VELOCITÉ atelier in Modena has acknowledged your{" "}
          {isWaitlist ? "interest in" : "reservation for"} the{" "}
          <span className="text-foreground font-semibold">{car.name}</span>. A
          private client director will contact you within 48 hours.
        </p>
      </div>

      <div className="glass rounded-xl p-4 inline-block mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Reference
        </div>
        <div className="font-mono text-lg text-neon tracking-wider">{reservationId}</div>
      </div>

      <button
        onClick={onClose}
        className="block mx-auto font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-white/15 hover:border-neon hover:text-neon transition-colors"
      >
        Close
      </button>
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
    <div className="space-y-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive font-mono uppercase tracking-wider">
          {error}
        </p>
      )}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function RadioGroup({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: readonly string[];
  defaultValue: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className="relative cursor-pointer group"
        >
          <input
            type="radio"
            name={name}
            value={o}
            defaultChecked={o === defaultValue}
            className="peer sr-only"
          />
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] px-3.5 py-2.5 rounded-full border border-white/15 text-muted-foreground transition-all peer-checked:bg-neon peer-checked:text-neon-foreground peer-checked:border-neon group-hover:text-foreground peer-checked:group-hover:text-neon-foreground">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors",
    error
      ? "border-destructive/60 focus:border-destructive"
      : "border-white/10 focus:border-neon focus:bg-white/[0.07]",
  ].join(" ");
}
