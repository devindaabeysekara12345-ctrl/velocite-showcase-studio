import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CarCard } from "@/components/CarCard";
import { cars, categories, type CarCategory } from "@/data/cars";

type Filter = "All" | CarCategory;
type Sort = "default" | "power" | "speed" | "price";

export const Route = createFileRoute("/garage")({
  head: () => ({
    meta: [
      { title: "Garage — VELOCITÉ Collection" },
      {
        name: "description",
        content:
          "Explore the full VELOCITÉ collection — hypercars, GTs, roadsters, and heritage restomods. Filter by category and reserve yours.",
      },
      { property: "og:title", content: "Garage — VELOCITÉ Collection" },
      {
        property: "og:description",
        content:
          "The full VELOCITÉ collection. Hypercars, GTs, roadsters, and heritage builds.",
      },
    ],
  }),
  component: GaragePage,
});

function GaragePage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    const list = filter === "All" ? cars : cars.filter((c) => c.category === filter);
    const sorted = [...list];
    if (sort === "power") sorted.sort((a, b) => b.hp - a.hp);
    if (sort === "speed") sorted.sort((a, b) => b.topSpeed - a.topSpeed);
    if (sort === "price")
      sorted.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.]/g, "")) -
          parseFloat(b.price.replace(/[^\d.]/g, "")),
      );
    return sorted;
  }, [filter, sort]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 overflow-hidden grid-bg">
        <div className="absolute top-20 right-0 size-[500px] rounded-full bg-neon/10 blur-[140px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-neon transition-colors"
            >
              ← Home
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
              Garage
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-neon" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
                  The Collection
                </span>
              </div>
              <h1 className="font-display font-bold leading-[0.9] tracking-tighter text-[clamp(3rem,8vw,7rem)]">
                The <span className="italic font-light text-muted-foreground">Garage</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-muted-foreground leading-relaxed">
                Six expressions of the same obsession. Each silhouette
                hand‑built in our Modena atelier, limited by intent — never by
                accident.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Stat label="Models" value={String(cars.length)} />
              <div className="h-12 w-px bg-white/10" />
              <Stat
                label="Total Units"
                value={cars.reduce((s, c) => s + c.units, 0).toLocaleString()}
              />
              <div className="h-12 w-px bg-white/10" />
              <Stat label="Year" value="MMXXVI" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters bar */}
      <section className="sticky top-24 z-40 mx-auto max-w-7xl px-6">
        <div className="glass rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] px-3.5 py-2 rounded-full transition-all ${
                    active
                      ? "bg-neon text-neon-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent font-mono text-[10px] uppercase tracking-[0.2em] text-foreground border-none outline-none cursor-pointer hover:text-neon transition-colors"
            >
              <option value="default" className="bg-background">Featured</option>
              <option value="power" className="bg-background">Power ↓</option>
              <option value="speed" className="bg-background">Top Speed ↓</option>
              <option value="price" className="bg-background">Price ↑</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "model" : "models"} ·{" "}
            <span className="text-neon">{filter}</span>
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="font-display text-2xl text-muted-foreground">
              No models in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Footer strip */}
      <footer className="mx-auto max-w-7xl px-6 py-12 border-t border-white/5 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© MMXXVI VELOCITÉ Atelier · Modena, Italia</span>
          <span>Hand‑built. Limited. Forever.</span>
        </div>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {label}
      </div>
      <div className="font-display text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
