import { ParticleView } from "@/lib/motion/particles/particle-view";

export function VoiceVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="voice" className={className}>
      <span className="absolute left-0 top-0 text-xs text-foreground-muted">Inbound call</span>
    </ParticleView>
  );
}
