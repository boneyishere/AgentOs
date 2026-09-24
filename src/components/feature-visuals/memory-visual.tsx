import { ParticleView } from "@/lib/motion/particles/particle-view";

export function MemoryVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="memory" className={className}>
      <span className="absolute bottom-0 right-0 text-xs text-foreground-muted">3 earlier calls</span>
    </ParticleView>
  );
}
