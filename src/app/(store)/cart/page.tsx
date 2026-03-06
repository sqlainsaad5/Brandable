"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { CartItemPro } from "@/components/cart/CartItemPro";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-background hover:bg-accent-hover"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <CartItemPro key={item.id} item={item} />
          ))}
          <div className="border-t border-white/10 pt-6 flex justify-end">
            <div className="text-right">
              <p className="text-muted">Subtotal</p>
              <p className="text-2xl font-semibold text-foreground">{formatPrice(subtotal)}</p>
              <Link
                href="/checkout"
                className="mt-4 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-background hover:bg-accent-hover"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
