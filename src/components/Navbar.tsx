import { Link } from "@tanstack/react-router";

const links = [
  { label: "Garage", to: "/garage" as const },
  { label: "Features", to: "/" as const },
  { label: "About", to: "/" as const },
  { label: "Shop", to: "/" as const },
];

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <nav className="glass rounded-full px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-2 rounded-full bg-neon animate-pulse-neon shadow-[0_0_12px_oklch(0.88_0.22_155)]" />
            <span className="font-display font-bold text-lg tracking-[0.2em]">
              VELOCITÉ
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
                  activeProps={{ className: "px-4 py-2 text-sm text-neon rounded-full bg-white/5" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full bg-neon text-neon-foreground hover:scale-105 transition-transform">
            Configure
          </button>
        </nav>
      </div>
    </header>
  );
}
