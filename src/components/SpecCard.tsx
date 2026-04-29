type Props = {
  label: string;
  value: string;
  unit: string;
  delay?: string;
};

export function SpecCard({ label, value, unit, delay = "0s" }: Props) {
  return (
    <div
      className="glass rounded-2xl p-5 w-56 relative overflow-hidden animate-float-slow"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-60" />
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <div className="size-1.5 rounded-full bg-neon animate-pulse-neon" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-foreground tabular-nums">
          {value}
        </span>
        <span className="text-xs font-mono text-neon">{unit}</span>
      </div>
      <div className="mt-3 h-px w-full bg-white/5">
        <div className="h-full w-3/4 bg-neon/60" />
      </div>
    </div>
  );
}
