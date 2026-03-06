"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-accent hover:underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex gap-4 mb-10">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              step === s ? "bg-accent text-background" : "bg-surface text-muted hover:text-foreground"
            )}
          >
            {s === 1 ? "Details" : s === 2 ? "Shipping" : "Payment"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          {step === 1 && (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-lg bg-accent py-3 font-semibold text-background hover:bg-accent-hover"
              >
                Continue
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Address"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full rounded-lg bg-accent py-3 font-semibold text-background hover:bg-accent-hover"
              >
                Continue to payment
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-muted text-sm">Payment integration (Razorpay) can be added here.</p>
              <button
                type="button"
                className="w-full rounded-lg bg-accent py-3 font-semibold text-background hover:bg-accent-hover"
              >
                Place order
              </button>
            </div>
          )}
        </div>
        <div className="rounded-card border border-white/10 bg-surface/50 p-6 h-fit">
          <h2 className="font-display font-semibold text-foreground mb-4">Order summary</h2>
          <ul className="space-y-2 mb-4">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between text-sm">
                <span className="text-muted">{i.name} × {i.quantity}</span>
                <span className="text-foreground">{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-white/10">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
