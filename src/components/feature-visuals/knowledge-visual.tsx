import { ParticleView } from "@/lib/motion/particles/particle-view";

const LABEL = "absolute bottom-0 -translate-x-1/2 whitespace-nowrap text-xs text-foreground-muted";

export function KnowledgeVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="knowledge" className={className}>
      <span className={`${LABEL} left-1/4`}>Your docs</span>
      <span className={`${LABEL} left-[76%]`}>Agent</span>
    </ParticleView>
  );
}
