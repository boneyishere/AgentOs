export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-[9px] ${className}`}>
      {children}
    </div>
  );
}
