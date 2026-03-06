import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-surface/50 p-6 transition-colors hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}
