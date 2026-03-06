import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { TESTIMONIALS, TRUSTED_BY } from "@/lib/constants";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl text-center">
        What people say
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, author, role }) => (
          <Card key={author}>
            <blockquote className="text-sm text-muted leading-relaxed">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <footer className="mt-4">
              <cite className="not-italic font-medium text-foreground">
                {author}
              </cite>
              <span className="text-muted"> — {role}</span>
            </footer>
          </Card>
        ))}
      </div>
      <div className="mt-16 border-t border-white/10 pt-12">
        <p className="text-center text-sm text-muted">Trusted by</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-8">
          {TRUSTED_BY.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-medium text-muted/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
