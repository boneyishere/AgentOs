export function DiamondPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="diamond-grid"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="64" height="64" fill="none" />
          <path
            d="M 0 0 L 64 0 L 64 64 L 0 64 Z"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diamond-grid)" />
    </svg>
  );
}
