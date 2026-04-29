import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Garage", to: "/garage" as const },
  { label: "Features", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
        <nav className="glass rounded-full pl-5 pr-2 sm:pl-6 sm:pr-3 py-2.5 sm:py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="size-2 rounded-full bg-neon animate-pulse-neon shadow-[0_0_12px_oklch(0.88_0.22_155)]" />
            <span className="font-display font-bold text-base sm:text-lg tracking-[0.2em]">
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

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full bg-neon text-neon-foreground hover:scale-105 transition-transform"
            >
              Configure
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden size-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <span className="relative block w-5 h-3">
                <span
                  className={`absolute left-0 right-0 h-px bg-foreground transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-foreground transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 top-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-[#0a0a0c]/90 backdrop-blur-xl" />
        <div
          className="relative pt-28 px-6 pb-10 h-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li
                key={l.label}
                style={{
                  transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                }}
                className={`transform transition-all duration-500 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 border-b border-white/5 font-display text-3xl font-bold hover:text-neon transition-colors"
                  activeProps={{ className: "block py-4 border-b border-white/5 font-display text-3xl font-bold text-neon" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10 space-y-3">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-6 py-4 rounded-full bg-neon text-neon-foreground font-mono text-xs uppercase tracking-widest"
            >
              Reserve a Viewing
            </Link>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
              Modena · Italia
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
