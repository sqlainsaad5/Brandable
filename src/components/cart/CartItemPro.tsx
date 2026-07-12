"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore, type CartItem } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { isPlaceholderImage } from "@/lib/utils/productImage";

type CartItemProProps = {
  item: CartItem;
};

export function CartItemPro({ item }: CartItemProProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const showImage = item.image && !isPlaceholderImage(item.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-3 border-b border-border py-4 sm:gap-4"
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-placeholder">
        {showImage ? (
          <Image
            src={item.image}
            alt={`${item.name} in cart`}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-foreground sm:text-base">{item.name}</h4>
        {(item.size || item.color) && (
          <p className="mt-0.5 text-xs text-muted">
            {[item.size, item.color].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-1 text-sm font-medium text-primary">
          {formatPrice(item.price)}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:bg-foreground/5"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:bg-foreground/5"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted transition-colors hover:text-red-600"
        aria-label={`Remove ${item.name} from cart`}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
