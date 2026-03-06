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
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background border-l border-white/10 shadow-hard flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Your Cart ({items.length})
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="p-2 text-foreground hover:text-accent transition-colors rounded"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    onClick={() => setCartOpen(false)}
                    className="text-accent font-medium hover:underline"
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
              <div className="p-6 border-t border-white/10">
                <CartSummaryPro />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
