import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <SectionWrapper id="process" className="bg-surface/30">
      <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl text-center">
        How it works
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
        A clear process so you always know what to expect.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map(({ step, title, description }) => (
          <div key={step} className="relative">
            <div className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-background"
                aria-hidden
              >
                {step}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {title}
              </h3>
            </div>
            <p className="mt-2 ml-16 text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
