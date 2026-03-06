import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
        404
      </h1>
      <p className="mt-4 text-muted">
        This page doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          Back to {SITE.name}
        </Button>
      </div>
    </div>
  );
}
