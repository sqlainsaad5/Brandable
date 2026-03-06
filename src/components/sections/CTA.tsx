import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CTA_SECTION } from "@/lib/constants";

export function CTA() {
  return (
    <SectionWrapper className="bg-surface/50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          {CTA_SECTION.headline}
        </h2>
        <p className="mt-4 text-muted">{CTA_SECTION.subhead}</p>
        <div className="mt-8">
          <Button href={CTA_SECTION.ctaHref} variant="primary" size="default">
            {CTA_SECTION.cta}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
