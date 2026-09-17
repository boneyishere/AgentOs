import { Mic, PhoneCall } from "lucide-react";

const BARS = [6, 14, 9, 20, 12, 24, 10, 18, 8, 15, 22, 11, 7, 16, 9];

export function VoiceCallMockup() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="rounded-xl border border-border bg-background p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PhoneCall className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Inbound call</p>
              <p className="text-xs text-foreground-muted">
                00:42 &middot; real-time speech
              </p>
            </div>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary">
            <Mic className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-5 flex h-14 items-end gap-1">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-primary/70"
              style={{ height: `${h * 2}px` }}
            />
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
          <p className="text-foreground-muted">
            <span className="font-medium text-foreground">Caller:</span>{" "}
            &ldquo;I&apos;d like to book an appointment for next week.&rdquo;
          </p>
          <p className="text-foreground-muted">
            <span className="font-medium text-foreground">AgentOS:</span>{" "}
            &ldquo;I have Tuesday at 10 AM or Thursday at 3 PM open —
            which works better?&rdquo;
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground">
            Appointment Booking
          </span>
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground-muted">
            Sentiment: Positive
          </span>
        </div>
      </div>
    </div>
  );
}
