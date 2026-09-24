import type { LucideIcon } from "lucide-react";

export type CoverColor = "indigo" | "violet" | "pink" | "mint";

const COVER_GRADIENTS: Record<CoverColor, string> = {
  indigo: "var(--stat-indigo-soft)",
  violet: "var(--stat-violet-soft)",
  pink: "var(--stat-pink-soft)",
  mint: "var(--stat-mint-soft)",
};

export function ResourceCover({
  color,
  icon: Icon,
  className = "",
}: {
  color: CoverColor;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `linear-gradient(120deg, ${COVER_GRADIENTS[color]}, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-8 w-8 text-foreground/25" strokeWidth={1.5} />
      </div>
    </div>
  );
}
