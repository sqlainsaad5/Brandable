import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface/50 p-6 transition-colors hover:border-border",
        className
      )}
    >
      {children}
    </div>
  );
}
