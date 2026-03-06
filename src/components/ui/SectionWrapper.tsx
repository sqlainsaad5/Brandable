import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
};

export function SectionWrapper({
  id,
  className,
  children,
  as: Component = "section",
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={cn(
        "py-16 md:py-24",
        "mx-auto max-w-6xl px-6",
        className
      )}
    >
      {children}
    </Component>
  );
}
