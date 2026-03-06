"use client";

import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore, type CartItem } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";

type CartItemProProps = {
  item: CartItem;
};

export function CartItemPro({ item }: CartItemProProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-4 border-b border-white/10"
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
        {(item.size || item.color) && (
          <p className="text-xs text-muted mt-0.5">
            {[item.size, item.color].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="text-sm text-accent font-medium mt-1">{formatPrice(item.price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="h-8 w-8 rounded border border-white/20 flex items-center justify-center text-foreground hover:bg-white/5"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="h-8 w-8 rounded border border-white/20 flex items-center justify-center text-foreground hover:bg-white/5"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="p-2 text-muted hover:text-red-400 transition-colors shrink-0"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
