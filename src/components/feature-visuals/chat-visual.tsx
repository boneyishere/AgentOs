import { ParticleView } from "@/lib/motion/particles/particle-view";

const LABEL = "absolute text-xs text-foreground-muted";

export function ChatVisual({ className = "h-44 sm:h-52" }: { className?: string }) {
  return (
    <ParticleView mode="chat" className={className}>
      <span className={`${LABEL} bottom-0 left-0`}>Customer</span>
      <span className={`${LABEL} right-0 top-0`}>Agent</span>
    </ParticleView>
  );
}
