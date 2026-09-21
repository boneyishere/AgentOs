import { forwardRef } from "react";

export const Container = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(function Container({ className = "", children }, ref) {
  return (
    <div ref={ref} className={`mx-auto max-w-[1400px] px-6 ${className}`}>
      {children}
    </div>
  );
});
