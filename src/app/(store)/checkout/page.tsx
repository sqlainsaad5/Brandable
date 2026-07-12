"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, Lock } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { checkoutSchema } from "@/lib/orders/schema";
import { PAKISTAN_CITIES } from "@/lib/orders/types";
import { placeOrder } from "./actions";
import { cn } from "@/lib/utils/cn";

const fieldClass =
  "w-full min-h-11 rounded-md border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [customCity, setCustomCity] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 font-display text-2xl font-semibold text-foreground">
          Your cart is empty
        </h1>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center text-primary hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const resolvedCity = city === "Other" ? customCity.trim() : city;
    const parsed = checkoutSchema.safeParse({
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      customer_city: resolvedCity,
      notes,
      company_website: honeypot,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});

    startTransition(async () => {
      const result = await placeOrder({
        customer_name: parsed.data.customer_name,
        customer_phone: parsed.data.customer_phone,
        customer_address: parsed.data.customer_address,
        customer_city: parsed.data.customer_city,
        notes: parsed.data.notes,
        company_website: honeypot,
        subtotal,
        items: items.map((i) => ({
          product_id: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          image: i.image,
        })),
      });

      if (!result.success) {
        setFormError(result.error);
        return;
      }

      clearCart();
      router.push(`/checkout/confirmation?orderId=${result.orderId}`);
    });
  }

  const summary = (
    <aside className="h-fit rounded-card border border-border bg-surface p-5 sm:p-6">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
        Order summary
      </h2>
      <ul className="mb-4 space-y-3">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between gap-3 text-sm">
            <span className="min-w-0 break-words text-muted">
              {i.name}
              {i.size ? ` · ${i.size}` : ""}
              {i.color ? ` · ${i.color}` : ""} × {i.quantity}
            </span>
            <span className="shrink-0 font-medium text-foreground">
              {formatPrice(i.price * i.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Shipping</span>
          <span className="text-primary">Free</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-semibold text-foreground">
          <span>Total (COD)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-foreground sm:mb-8 sm:text-3xl">
        Checkout
      </h1>

      <form
        onSubmit={onSubmit}
        className="relative grid gap-8 md:grid-cols-2 md:gap-10"
        noValidate
      >
        <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Summary first on mobile so total is visible before form */}
        <div className="order-1 md:order-2">{summary}</div>

        <div className="order-2 space-y-5 md:order-1">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
              autoComplete="name"
              required
            />
            {errors.customer_name && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XXXXXXXXX"
              className={fieldClass}
              autoComplete="tel"
              required
            />
            {errors.customer_phone && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
              Full address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className={cn(fieldClass, "min-h-[96px] resize-y")}
              autoComplete="street-address"
              required
            />
            {errors.customer_address && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_address}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={fieldClass}
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {city === "Other" && (
              <input
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                placeholder="Enter your city"
                className={cn(fieldClass, "mt-2")}
                required
              />
            )}
            {errors.customer_city && (
              <p className="mt-1 text-sm text-red-600">{errors.customer_city}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
              Order note <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Landmark, preferred call time…"
              className={cn(fieldClass, "resize-y")}
            />
          </div>

          <div className="rounded-card border border-border bg-surface p-4">
            <p className="mb-2 text-sm font-medium text-foreground">Payment method</p>
            <div className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/5 px-4 py-3">
              <Banknote className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                <p className="text-xs text-muted">Pay when your order arrives.</p>
              </div>
            </div>
          </div>

          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {pending ? "Placing order…" : "Place COD order"}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock className="h-3.5 w-3.5 text-primary" aria-hidden />
            We&apos;ll call to confirm before dispatch
          </p>
        </div>
      </form>
    </div>
  );
}
