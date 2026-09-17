import { Bot, Sparkles } from "lucide-react";

export function ChatWidgetMockup() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="rounded-xl border border-border bg-background shadow-lg">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Website Chat Widget</p>
            <p className="text-xs text-foreground-muted">
              Understands intent &middot; uses your knowledge base
            </p>
          </div>
        </div>

        <div className="space-y-3 px-4 py-4">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface px-3 py-2 text-sm">
            Hi! What plans do you offer for a team of 10?
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
            For a 10-person team I&apos;d recommend our Team plan — it
            includes shared knowledge bases and priority support. Want me to
            connect you with sales?
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Lead qualified
            </span>
            <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground-muted">
              Classified: Sales
            </span>
          </div>
        </div>

        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs text-foreground-muted">
            Type a message&hellip;
            <span className="rounded-md bg-foreground px-2 py-1 text-background">
              Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
