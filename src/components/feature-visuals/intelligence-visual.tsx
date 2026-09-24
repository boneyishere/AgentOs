import { ParticleView } from "@/lib/motion/particles/particle-view";

// Lane order and colours match the scene's ramp: lane 0 (top) → lane 2 (bottom).
const TAGS = [
  { label: "Sales intent", top: "25%", color: "var(--accent)" },
  { label: "Positive sentiment", top: "50%", color: "var(--iris)" },
  { label: "Qualified lead", top: "75%", color: "var(--amber)" },
];

export function IntelligenceVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="intelligence" className={className}>
      <span className="absolute left-0 top-0 text-xs text-foreground-muted">Raw transcript</span>
      {TAGS.map(({ label, top, color }) => (
        <span
          key={label}
          className="absolute right-0 inline-flex -translate-y-1/2 items-center gap-2 whitespace-nowrap text-xs text-foreground"
          style={{ top }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </span>
      ))}
    </ParticleView>
  );
}
