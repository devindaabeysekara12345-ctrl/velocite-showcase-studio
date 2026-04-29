import heroCar from "@/assets/hero-car.jpg";
import { SpecCard } from "./SpecCard";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden grid-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 size-[600px] rounded-full bg-neon/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-[500px] rounded-full bg-neon/5 blur-[120px] pointer-events-none" />

      {/* Car backdrop */}
      <img
        src={heroCar}
        alt="VELOCITÉ Aether GT-X hypercar in matte black with cyan rim lighting"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover hero-mask opacity-90 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 pt-32 sm:pt-40 pb-16 sm:pb-20 min-h-screen flex flex-col">
        {/* Top meta */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 animate-fade-in">
          <div className="h-px w-10 sm:w-12 bg-neon" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neon">
            MMXXVI / Series 01
          </span>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left: title */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <h1 className="font-display font-bold leading-[0.85] tracking-tighter">
              <span className="block text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground mb-4 sm:mb-6">
                The Aether
              </span>
              <span className="block text-[clamp(3.5rem,14vw,12rem)] text-glow">
                GT‑X
              </span>
              <span className="block text-[clamp(1.5rem,5vw,4rem)] text-muted-foreground font-light italic">
                Cinq‑cent‑onze
              </span>
            </h1>

            <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 sm:pt-4">
              A hand‑forged carbon monocoque wrapped around a tri‑motor
              powertrain. 511 units. Zero compromises. Built where physics ends
              and obsession begins.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4">
              <button className="group bg-neon text-neon-foreground px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform neon-glow">
                Reserve Yours
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/80 hover:text-neon transition-colors">
                Watch Film
              </button>
            </div>
          </div>

          {/* Right: floating spec cards */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:flex lg:flex-col lg:items-end gap-3 sm:gap-5">
            <SpecCard label="Power" value="1,200" unit="HP" delay="0s" />
            <SpecCard label="Top Speed" value="248" unit="MPH" delay="1s" />
            <SpecCard label="Range" value="412" unit="MI" delay="2s" />
          </div>
        </div>

        {/* Bottom telemetry strip */}
        <div className="mt-10 sm:mt-12 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground border-t border-white/5 pt-5 sm:pt-6 gap-3">
          <span className="hidden sm:inline">↓ Scroll to explore</span>
          <span className="sm:hidden">↓ Scroll</span>
          <div className="hidden md:flex items-center gap-6">
            <span>0–60 <span className="text-neon">1.9s</span></span>
            <span>Torque <span className="text-neon">1,050 Nm</span></span>
            <span>Weight <span className="text-neon">1,420 kg</span></span>
          </div>
          <span>EN / FR</span>
        </div>
      </div>
    </section>
  );
}
