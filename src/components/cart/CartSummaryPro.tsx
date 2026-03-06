"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";

export function CartSummaryPro() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  if (items.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-4 mt-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-muted mt-1">Shipping & taxes calculated at checkout.</p>
      <Link
        href="/checkout"
        onClick={() => setCartOpen(false)}
        className={cn(
          "mt-4 block w-full py-3 rounded-lg text-center font-medium",
          "bg-accent text-background hover:bg-accent-hover transition-colors",
          "shadow-medium"
        )}
      >
        Checkout
      </Link>
    </div>
  );
}
