import { Shield, RotateCcw, BadgeCheck, Truck } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: RotateCcw, label: "Easy 7-Day Returns" },
  { icon: BadgeCheck, label: "Quality Guaranteed" },
  { icon: Truck, label: "Fast Delivery" },
] as const;

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      className="border-y border-border bg-surface"
      aria-label="Store trust signals"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-4 py-5 md:grid-cols-4 md:gap-4 md:py-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-2.5 md:justify-center"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary sm:h-4 sm:w-4" aria-hidden />
              <span className="text-xs font-medium leading-snug tracking-wide text-foreground sm:text-[13px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
