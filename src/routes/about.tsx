import { createFileRoute, Link } from "@tanstack/react-router";
import atmosphere from "@/assets/about-atmosphere.jpg";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VELOCITÉ" },
      { name: "description", content: "Founded 2014 in Modena. VELOCITÉ engineers obsessive performance machines for a generation that refuses ordinary." },
      { property: "og:title", content: "About — VELOCITÉ" },
      { property: "og:description", content: "A decade of obsessive engineering. Meet the atelier behind the marque." },
      { property: "og:image", content: atmosphere },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "2014", label: "Founded", sub: "Modena, Italy" },
  { value: "184", label: "Engineers", sub: "Across 12 disciplines" },
  { value: "27", label: "Models shipped", sub: "Every one hand-finished" },
  { value: "9", label: "Le Mans entries", sub: "3 class podiums" },
];

const chapters = [
  {
    year: "2014",
    title: "A garage in Modena",
    body: "Founders Elena Ricci and Mateo Vance leave Maranello with a single conviction — that performance had become a spreadsheet. The first VELOCITÉ chassis is welded by hand in a 200m² workshop on Via Emilia.",
  },
  {
    year: "2017",
    title: "The APEX prototype",
    body: "A 1,040hp track weapon laps the Nordschleife in 6:42 — privately, unannounced. Three orders are placed before a press release ever exists.",
  },
  {
    year: "2021",
    title: "Scuderia program",
    body: "VELOCITÉ enters endurance racing as a constructor. The works AETHER GTE finishes second in class at Le Mans on debut.",
  },
  {
    year: "2026",
    title: "The next decade",
    body: "Forty new patents filed. A second atelier opens in Stuttgart. The marque remains independent — and unrepentantly obsessed.",
  },
];

const team = [
  { name: "Elena Ricci", role: "Co-founder, Chief Designer" },
  { name: "Mateo Vance", role: "Co-founder, Powertrain" },
  { name: "Hiroshi Tanaka", role: "Director, Aerodynamics" },
  { name: "Lena Sørensen", role: "Head of Vehicle Dynamics" },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={atmosphere}
            alt=""
            width={1920}
            height={1080}
            className="size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/60 to-[#0a0a0c]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-1.5 rounded-full bg-neon animate-pulse-neon" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
              Chapter 00 — The Atelier
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] max-w-5xl">
            Built by hand.
            <br />
            <span className="text-neon text-glow">Driven by obsession.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            VELOCITÉ is an independent atelier of 184 engineers, fabricators and dreamers
            who refuse to accept that the modern supercar must be a committee decision.
            Every machine that leaves Modena carries a single signature — ours.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#0a0a0c] p-8 md:p-10 group hover:bg-surface transition-colors"
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-neon text-glow">
                  {s.value}
                </div>
                <div className="mt-4 text-sm font-mono uppercase tracking-widest text-foreground">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">
                Chapter 01 — Provenance
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
                A decade of refusing the ordinary.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Four moments that defined the marque — from a single welder in Modena
              to a constructor on the grid at La Sarthe.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <div className="space-y-16">
              {chapters.map((c, i) => (
                <div
                  key={c.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-16 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 size-4 rounded-full bg-neon shadow-[0_0_24px_oklch(0.88_0.22_155)]" />
                  <div className="md:w-1/2 pl-10 md:pl-0 md:px-12">
                    <div className="glass rounded p-8 hover:border-neon/30 transition-colors">
                      <div className="font-mono text-xs uppercase tracking-widest text-neon mb-3">
                        {c.year}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        {c.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">
            Chapter 02 — The Hands
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-16 max-w-3xl leading-tight">
            The few who sign every car.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-[#0a0a0c] p-8 group hover:bg-surface transition-colors"
              >
                <div className="aspect-square mb-6 bg-gradient-to-br from-surface to-[#0a0a0c] relative overflow-hidden rounded">
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl font-bold text-white/5 group-hover:text-neon/20 transition-colors">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-neon animate-pulse-neon" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Modena · IT
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Step inside the <span className="text-neon text-glow">garage</span>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Six machines. Each one engineered without compromise. Each one waiting.
          </p>
          <Link
            to="/garage"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full bg-neon text-neon-foreground font-mono text-sm uppercase tracking-widest hover:scale-105 transition-transform neon-glow"
          >
            Enter the Garage →
          </Link>
        </div>
      </section>
    </div>
  );
}
