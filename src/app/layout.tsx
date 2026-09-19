import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Codely is an AI agent platform for real-time voice and chat conversations. Give your business AI agents that understand intent, use your knowledge, remember context, and take real action.";

export const metadata: Metadata = {
  metadataBase: new URL("https://codely.ai"),
  title: {
    default: "Codely — Conversations your business can act on.",
    template: "%s — Codely",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Codely",
    title: "Codely — Conversations your business can act on.",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Codely — Conversations your business can act on.",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
