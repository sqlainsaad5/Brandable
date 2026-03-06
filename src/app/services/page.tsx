import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICES_LIST } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, visual identity, guidelines, and ongoing support. See how Brandable can help your brand.",
};

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper className="pt-16">
        <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          Services
        </h1>
        <p className="mt-6 max-w-2xl text-muted">
          We offer end-to-end brand building—from strategy and identity to
          guidelines and ongoing support.
        </p>
      </SectionWrapper>
      <SectionWrapper className="bg-surface/30">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES_LIST.map(({ title, description }) => (
            <Card key={title}>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-muted">{description}</p>
              <div className="mt-4">
                <Button href="/contact" variant="secondary" size="small">
                  Get in touch
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
