"use client";

import { Check } from "lucide-react";
import { useTypingPulse } from "@/lib/motion/use-field-motion";

const BARS = [0.55, 0.9, 0.7, 0.85];

/**
 * Codely's text field. On focus an accent line traces around the border and
 * the label floats up. A tiny four-bar voice waveform reacts to every
 * keystroke (the agent "listening"), and once the value is valid it morphs
 * into a check. Errors turn the field rose. The trace and label are CSS
 * transitions, so reduced motion simply lands on the end state.
 */
export function SignalField({
  id,
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  optional = false,
  valid = false,
  error,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  valid?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
}) {
  const [barsRef, pulse] = useTypingPulse<HTMLSpanElement>();
  const invalid = Boolean(error);

  const fieldClass = `peer block w-full resize-none bg-transparent px-4 text-[15px] text-foreground outline-none ${
    multiline ? "min-h-[132px] pb-3 pt-8" : "h-[60px] pb-2 pt-6"
  }`;

  return (
    <div>
      <div
        data-invalid={invalid || undefined}
        data-valid={valid || undefined}
        className="signal-field relative rounded-xl border border-border bg-background transition-[border-color,box-shadow] duration-300"
      >
        <svg aria-hidden="true" className="sf-trace pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <rect className="sf-rect" pathLength={1} x="0" y="0" width="100%" height="100%" rx="12" ry="12" />
        </svg>

        {multiline ? (
          <textarea
            id={id}
            value={value}
            placeholder=" "
            rows={4}
            aria-invalid={invalid}
            onChange={(e) => {
              onChange(e.target.value);
              pulse();
            }}
            className={fieldClass}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            placeholder=" "
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={invalid}
            onChange={(e) => {
              onChange(e.target.value);
              pulse();
            }}
            className={fieldClass}
          />
        )}

        <label
          htmlFor={id}
          className={`sf-label pointer-events-none absolute left-4 origin-left text-[15px] text-foreground-muted transition-all duration-300 ease-out ${
            multiline ? "top-5" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {label}
          {optional && <span className="ml-1.5 text-foreground-muted/70">(optional)</span>}
        </label>

        <span
          ref={barsRef}
          aria-hidden="true"
          className={`absolute right-4 flex h-4 items-center gap-[2.5px] ${multiline ? "top-5" : "top-1/2 -translate-y-1/2"}`}
        >
          <span className="sf-bars flex h-full items-center gap-[2.5px] transition-opacity duration-300">
            {BARS.map((h, i) => (
              <span
                key={i}
                data-bar
                className="sf-bar w-[2.5px] rounded-full bg-foreground/20 transition-colors duration-300"
                style={{ height: 14 * h, transform: "scaleY(0.22)" }}
              />
            ))}
          </span>
          <span className="sf-check absolute inset-0 flex items-center justify-center">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </span>
        </span>
      </div>
      {error && <p className="mt-2 text-xs text-rose">{error}</p>}
    </div>
  );
}
