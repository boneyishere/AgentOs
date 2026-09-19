export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 ${className}`}>
      {children}
    </div>
  );
}
