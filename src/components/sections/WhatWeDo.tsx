import { Compass, Palette, Layers, BookOpen } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { FEATURES } from "@/lib/constants";

const iconMap = {
  compass: Compass,
  palette: Palette,
  layers: Layers,
  "book-open": BookOpen,
} as const;

export function WhatWeDo() {
  return (
    <SectionWrapper id="what-we-do">
      <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl text-center">
        What we do
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
        From strategy to identity to guidelines—we bring your vision to life.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ title, description, icon }) => {
          const Icon = iconMap[icon as keyof typeof iconMap] ?? Compass;
          return (
            <Card key={title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={20} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
