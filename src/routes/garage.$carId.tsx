import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { cars } from "@/data/cars";
import { carDetails } from "@/data/carDetails";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/garage/$carId")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.carId);
    if (!car) throw notFound();
    const detail = carDetails[car.id];
    return { car, detail };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "VELOCITÉ" }] };
    const { car } = loaderData;
    return {
      meta: [
        { title: `${car.name} — VELOCITÉ ${car.series}` },
        { name: "description", content: `${car.name}: ${car.tagline} ${car.hp} HP, ${car.topSpeed} mph. From ${car.price}.` },
        { property: "og:title", content: `${car.name} — VELOCITÉ` },
        { property: "og:description", content: car.tagline },
        { property: "og:image", content: car.image },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Navbar />
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold mb-4">Model not found</h1>
        <p className="text-muted-foreground mb-6">This silhouette does not exist in our atelier.</p>
        <Link
          to="/garage"
          className="inline-block font-mono text-xs uppercase tracking-[0.2em] px-5 py-3 rounded-full bg-neon text-neon-foreground"
        >
          Back to Garage
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen flex items-center justify-center bg-background text-center px-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-3">Something failed</h1>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    </main>
  ),
  component: CarDetailPage,
});

function CarDetailPage() {
  const { car, detail } = Route.useLoaderData();
  const gallery = [car.image, heroCar, car.image];
  const [activeIdx, setActiveIdx] = useState(0);

  // Find prev/next for navigation
  const idx = cars.findIndex((c) => c.id === car.id);
  const prev = cars[(idx - 1 + cars.length) % cars.length];
  const next = cars[(idx + 1) % cars.length];

  const statusStyle =
    car.status === "Available"
      ? "text-neon"
      : car.status === "Reserved"
        ? "text-amber-400"
        : "text-muted-foreground";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-7xl px-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
          <Link to="/" className="text-muted-foreground hover:text-neon transition-colors">Home</Link>
          <span className="text-muted-foreground/40">/</span>
          <Link to="/garage" className="text-muted-foreground hover:text-neon transition-colors">Garage</Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-neon">{car.name}</span>
        </div>
      </section>

      {/* Hero gallery */}
      <section className="relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 size-[600px] rounded-full bg-neon/10 blur-[160px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-start">
          {/* Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass">
              <img
                src={gallery[activeIdx]}
                alt={`${car.name} view ${activeIdx + 1}`}
                width={1920}
                height={1200}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                  {car.series}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 ${statusStyle}`}>
                  <span className="size-1.5 rounded-full bg-current animate-pulse-neon" />
                  {car.status}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-neon to-transparent animate-scan" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                    i === activeIdx
                      ? "border-neon neon-glow"
                      : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${car.name} thumbnail ${i + 1}`}
                    width={400}
                    height={250}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-neon" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                  {car.category} · {car.year}
                </span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.9] text-glow">
                {car.name}
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {car.tagline}
              </p>
            </div>

            {/* Quick stats */}
            <div className="glass rounded-2xl p-5 grid grid-cols-3 gap-4">
              <QuickStat label="Power" value={car.hp.toLocaleString()} unit="HP" />
              <QuickStat label="Top" value={String(car.topSpeed)} unit="MPH" />
              <QuickStat label="0–60" value={car.zeroToSixty.toFixed(1)} unit="S" />
            </div>

            {/* Price + CTA */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Starting from
                  </div>
                  <div className="font-display text-4xl font-bold text-neon mt-1">
                    {car.price}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Production
                  </div>
                  <div className="font-display text-lg font-semibold mt-1">
                    {car.units} <span className="text-xs text-muted-foreground">units</span>
                  </div>
                </div>
              </div>

              <button
                disabled={car.status === "Sold Out"}
                className="w-full bg-neon text-neon-foreground py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform neon-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {car.status === "Sold Out" ? "Join Waitlist" : "Reserve Yours →"}
              </button>
              <button className="w-full border border-white/15 hover:border-neon hover:text-neon py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Description + highlights */}
      {detail && (
        <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-neon" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                The Doctrine
              </span>
            </div>
            <p className="font-display text-2xl lg:text-3xl leading-snug tracking-tight text-foreground/90">
              {detail.description}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="glass rounded-2xl p-6 space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Defining Traits
              </div>
              {detail.highlights.map((h, i) => (
                <div
                  key={h}
                  className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
                >
                  <span className="font-mono text-[10px] text-neon w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spec groups */}
      {detail && (
        <section className="mx-auto max-w-7xl px-6 py-12 border-t border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-neon" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
              Full Specifications
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detail.specGroups.map((group) => (
              <div key={group.title} className="glass rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-neon animate-pulse-neon" />
                  {group.title}
                </h3>
                <dl className="space-y-3">
                  {group.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between gap-3 py-2 border-b border-white/5 last:border-0"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="font-display text-sm font-semibold tabular-nums text-foreground">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-4">
          <PrevNextLink car={prev} direction="prev" />
          <PrevNextLink car={next} direction="next" />
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© MMXXVI VELOCITÉ Atelier · Modena, Italia</span>
          <Link to="/garage" className="hover:text-neon transition-colors">
            ← All Models
          </Link>
        </div>
      </footer>
    </main>
  );
}

function QuickStat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-xl font-bold tabular-nums">{value}</span>
        <span className="font-mono text-[9px] text-neon">{unit}</span>
      </div>
    </div>
  );
}

function PrevNextLink({
  car,
  direction,
}: {
  car: (typeof cars)[number];
  direction: "prev" | "next";
}) {
  return (
    <Link
      to="/garage/$carId"
      params={{ carId: car.id }}
      className={`group relative overflow-hidden glass rounded-2xl p-6 flex items-center gap-5 hover:border-neon/40 transition-all ${
        direction === "next" ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      <img
        src={car.image}
        alt={car.name}
        width={200}
        height={140}
        loading="lazy"
        className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-1">
          {direction === "prev" ? "← Previous" : "Next →"}
        </div>
        <div className="font-display text-xl font-bold group-hover:text-neon transition-colors">
          {car.name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
          {car.category}
        </div>
      </div>
    </Link>
  );
}
