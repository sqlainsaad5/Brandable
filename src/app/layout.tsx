import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandable.in"),
  title: { default: "BRANDABLE | Women's Western Wear", template: "BRANDABLE | %s" },
  description: "Premium women's western wear. Discover curated collections for the modern woman.",
  openGraph: {
    title: "BRANDABLE | Women's Western Wear",
    description: "Premium women's western wear. Discover curated collections.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BRANDABLE" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
