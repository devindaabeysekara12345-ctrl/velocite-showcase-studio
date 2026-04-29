import { Link } from "@tanstack/react-router";
import type { Car } from "@/data/cars";

const statusStyle: Record<Car["status"], string> = {
  Available: "text-neon",
  Reserved: "text-amber-400",
  "Sold Out": "text-muted-foreground",
};

export function CarCard({ car, index }: { car: Car; index: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl glass hover:border-neon/40 transition-all duration-500"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link
        to="/garage/$carId"
        params={{ carId: car.id }}
        preload="intent"
        className="absolute inset-0 z-20"
        aria-label={`View ${car.name} details`}
      />
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={car.image}
          alt={`${car.name} — ${car.tagline}`}
          width={1280}
          height={896}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Top meta overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 bg-black/50 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
            {car.series}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5 ${statusStyle[car.status]}`}>
            <span className="size-1.5 rounded-full bg-current animate-pulse-neon" />
            {car.status}
          </span>
        </div>

        {/* Scan line */}
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-neon to-transparent animate-scan" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              {car.name}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {car.year}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {car.tagline}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <Spec label="Power" value={car.hp.toLocaleString()} unit="HP" />
          <Spec label="Top" value={String(car.topSpeed)} unit="MPH" />
          <Spec label="0–60" value={car.zeroToSixty.toFixed(1)} unit="S" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              From
            </div>
            <div className="font-display text-lg font-bold text-neon">
              {car.price}
            </div>
          </div>
          <span
            className="relative z-30 pointer-events-none font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-full border border-white/15 group-hover:border-neon group-hover:text-neon group-hover:bg-neon/5 transition-colors"
          >
            {car.status === "Sold Out" ? "Waitlist →" : "View Model →"}
          </span>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-lg font-semibold tabular-nums">{value}</span>
        <span className="font-mono text-[9px] text-neon">{unit}</span>
      </div>
    </div>
  );
}
