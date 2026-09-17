import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentOS — One AI Brain. Multiple Channels.",
  description:
    "AgentOS is an AI agent platform for customer support, sales, and communication. Build chat and voice agents powered by one shared brain — knowledge, models, memory, and tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
