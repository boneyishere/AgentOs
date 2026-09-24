import type { Metadata } from "next";
import { Geist, Stack_Sans_Text } from "next/font/google";
import { SmoothScroll } from "@/lib/motion/smooth-scroll";
import { SpotlightTracker } from "@/lib/motion/spotlight";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const stackSansText = Stack_Sans_Text({
  variable: "--font-stack-sans-text",
  subsets: ["latin"],
});

const SITE_TITLE = "Codely | The AI front desk that never clocks out";
const SITE_DESCRIPTION =
  "Codely answers your calls and chats, remembers every customer, and books, updates, and follows up inside the tools your business already uses.";

export const metadata: Metadata = {
  metadataBase: new URL("https://codely.ai"),
  title: {
    default: SITE_TITLE,
    template: "%s | Codely",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Codely",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${geistSans.variable} ${stackSansText.variable}`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <SmoothScroll />
        <SpotlightTracker />
        {children}
      </body>
    </html>
  );
}
