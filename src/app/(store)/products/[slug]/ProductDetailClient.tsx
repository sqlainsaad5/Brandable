"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const images = product.images ?? [product.image];
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      slug: product.slug,
      size: selectedSize,
      color: selectedColor?.name,
    });
    setCartOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                    activeImage === i ? "border-accent" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className="inline-block rounded bg-accent px-2 py-0.5 text-xs font-semibold text-background mb-2">
              {product.badge}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {product.name}
          </h1>
          <p className="text-2xl text-accent font-semibold mt-2">
            {formatPrice(product.price)}
          </p>
          {product.description && (
            <p className="text-muted mt-4">{product.description}</p>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                      selectedColor?.name === c.name ? "border-accent ring-2 ring-accent/30" : "border-white/20"
                    )}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "min-w-[44px] py-2 px-4 rounded-lg border text-sm font-medium transition-colors",
                      selectedSize === s
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/20 text-foreground hover:border-white/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-white/20">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-12 w-12 flex items-center justify-center text-foreground hover:bg-white/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="h-12 w-12 flex items-center justify-center text-foreground hover:bg-white/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-accent text-background font-semibold hover:bg-accent-hover transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              type="button"
              className="h-12 w-12 rounded-lg border border-white/20 flex items-center justify-center text-foreground hover:border-accent hover:text-accent"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <Link
            href="/products"
            className="inline-block mt-6 text-sm text-muted hover:text-foreground"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
}
