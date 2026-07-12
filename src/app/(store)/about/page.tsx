import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
import { defaultOgImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the people behind BRANDABLE and our mission to bring premium women's western wear to Pakistan — quality fashion, thoughtfully curated.",
  openGraph: {
    title: "About Us | BRANDABLE",
    description:
      "Learn about BRANDABLE — an online clothing store for women's western wear in Pakistan.",
    images: defaultOgImages,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
