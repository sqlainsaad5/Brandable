import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  }
>(function Textarea({ label, error, className, id, ...props }, ref) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          "w-full min-h-[120px] rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted resize-y",
          "border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/50",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});
