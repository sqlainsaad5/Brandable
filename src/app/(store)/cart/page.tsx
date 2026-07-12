"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { CartItemPro } from "@/components/cart/CartItemPro";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="mb-6 font-display text-2xl font-bold text-foreground sm:mb-8 sm:text-3xl">
        Your Cart
      </h1>
      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-6 text-muted">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <CartItemPro key={item.id} item={item} />
          ))}
          <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <div className="w-full sm:w-auto sm:text-right">
              <p className="text-muted">Subtotal</p>
              <p className="text-2xl font-semibold text-foreground">
                {formatPrice(subtotal)}
              </p>
              <Link
                href="/checkout"
                className="mt-4 flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary-hover sm:inline-flex sm:w-auto"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted sm:justify-end">
                <Lock className="h-3.5 w-3.5 text-primary" aria-hidden />
                Secure Checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
