import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Brandable—our mission, values, and how we help brands stand out.",
};

export default function AboutPage() {
  return <AboutContent />;
}
