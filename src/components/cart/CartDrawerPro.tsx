"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { CartItemPro } from "./CartItemPro";
import { CartSummaryPro } from "./CartSummaryPro";

export function CartDrawerPro() {
  const open = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-full flex-col border-l border-border bg-background shadow-hard sm:max-w-md"
          >
            <div className="flex items-center justify-between border-b border-border p-4 sm:p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Your Cart ({items.length})
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded text-foreground transition-colors hover:text-primary"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    onClick={() => setCartOpen(false)}
                    className="text-primary font-medium hover:underline"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-0">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItemPro key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
                <CartSummaryPro />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
