import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out cubic
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] bg-[#0a0a0c] flex items-center justify-center transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-neon/10 blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="size-2.5 rounded-full bg-neon animate-pulse-neon shadow-[0_0_16px_oklch(0.88_0.22_155)]" />
          <span className="font-display font-bold text-2xl tracking-[0.3em] text-glow">
            VELOCITÉ
          </span>
        </div>

        <div className="relative h-px w-full bg-white/5 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-neon shadow-[0_0_12px_oklch(0.88_0.22_155)]"
            style={{ width: `${progress}%`, transition: "width 60ms linear" }}
          />
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Calibrating telemetry</span>
          <span className="text-neon tabular-nums">{progress.toString().padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
