import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { ABOUT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Brandable—our mission, values, and how we help brands stand out.",
};

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="pt-16">
        <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          {ABOUT.title}
        </h1>
        <p className="mt-6 max-w-2xl text-muted leading-relaxed">
          {ABOUT.mission}
        </p>
      </SectionWrapper>
      <SectionWrapper className="bg-surface/30">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Our values
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ABOUT.values.map(({ title, description }) => (
            <Card key={title}>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
