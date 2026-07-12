"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
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
    <div className="border-t border-border pt-4 mt-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-muted mt-1">Free shipping · Cash on delivery</p>
      <Link
        href="/checkout"
        onClick={() => setCartOpen(false)}
        className={cn(
          "mt-4 flex min-h-12 w-full items-center justify-center rounded-md py-3 text-center font-medium",
          "bg-primary text-primary-foreground transition-colors hover:bg-primary-hover",
          "shadow-medium"
        )}
      >
        Checkout
      </Link>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
        <Lock className="h-3.5 w-3.5 text-primary" aria-hidden />
        Secure Checkout
      </p>
    </div>
  );
}
