import { ParticleView } from "@/lib/motion/particles/particle-view";

// Node centres match the scene's layout: evenly spaced across 78% of each half-width.
const NODES = [
  { label: "Agent", left: "10%" },
  { label: "Calendar", left: "36.67%" },
  { label: "CRM", left: "63.33%" },
  { label: "Done", left: "90%" },
];

export function ActionsVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="actions" className={className}>
      {NODES.map(({ label, left }, i) => (
        <span
          key={label}
          className={`absolute top-[calc(50%+2rem)] -translate-x-1/2 whitespace-nowrap text-xs ${
            i === NODES.length - 1 ? "text-foreground" : "text-foreground-muted"
          }`}
          style={{ left }}
        >
          {label}
        </span>
      ))}
    </ParticleView>
  );
}
