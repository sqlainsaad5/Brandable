import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { defaultOgImages, defaultTwitterImages } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandable.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BRANDABLE | Premium Women's Western Wear in Pakistan",
    template: "%s | BRANDABLE",
  },
  description:
    "Shop women's western wear online in Pakistan at BRANDABLE. Discover premium dresses, tops and curated styles — order with Cash on Delivery nationwide.",
  keywords: [
    "women's western wear Pakistan",
    "online clothing store Pakistan",
    "dresses Pakistan",
    "BRANDABLE",
  ],
  authors: [{ name: "BRANDABLE" }],
  openGraph: {
    title: "BRANDABLE | Premium Women's Western Wear in Pakistan",
    description:
      "Shop women's western wear online in Pakistan at BRANDABLE. Premium dresses, tops and curated styles with Cash on Delivery.",
    url: siteUrl,
    siteName: "BRANDABLE",
    locale: "en_PK",
    type: "website",
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "BRANDABLE | Women's Western Wear Pakistan",
    description:
      "Shop women's western wear online in Pakistan. Premium dresses, tops and more with Cash on Delivery.",
    images: defaultTwitterImages,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
