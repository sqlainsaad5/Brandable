"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Shirt, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";
import { getProductGallery, isPlaceholderImage } from "@/lib/utils/productImage";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const images = getProductGallery(product);
  const [activeImage, setActiveImage] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const activeSrc = images[activeImage] ?? product.image;
  const showPlaceholder = imgFailed || isPlaceholderImage(activeSrc);
  const mainAlt = `${product.name}${product.category ? ` — ${product.category}` : ""} women's western wear from BRANDABLE`;

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
    <div className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 sm:pb-12 lg:px-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-3 sm:space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-placeholder">
            {showPlaceholder ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Shirt className="h-14 w-14 text-accent-brass/70" aria-hidden />
                <span className="sr-only">{product.name} image coming soon</span>
              </div>
            ) : (
              <Image
                src={activeSrc}
                alt={mainAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                className="object-cover"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
          {images.length > 1 && !images.every(isPlaceholderImage) && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveImage(i);
                    setImgFailed(false);
                  }}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20",
                    activeImage === i ? "border-primary" : "border-border"
                  )}
                  aria-label={`View ${product.name} image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && (
            <span className="mb-3 inline-block rounded-full bg-accent-rose px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-xl font-semibold text-primary sm:text-2xl">
            {formatPrice(product.price)}
          </p>
          {product.description && (
            <p className="mt-4 text-base leading-relaxed text-muted">{product.description}</p>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-foreground">Color</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      "h-11 w-11 rounded-full border-2 transition-transform hover:scale-105",
                      selectedColor?.name === c.name
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border"
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
              <p className="mb-3 text-sm font-medium text-foreground">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors",
                      selectedSize === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-primary/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop quantity + ATC */}
          <div className="mt-8 hidden items-center gap-3 md:flex md:gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-foreground/5"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center text-foreground hover:bg-foreground/5"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile quantity (sticky bar has ATC) */}
          <div className="mt-8 flex items-center gap-3 md:hidden">
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:bg-foreground/5"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:bg-foreground/5"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <Link
            href="/products"
            className="mt-6 inline-flex min-h-11 items-center text-sm text-muted hover:text-foreground"
          >
            ← Back to products
          </Link>
        </div>
      </div>

      {/* Sticky mobile Add to Cart */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <p className="shrink-0 font-semibold text-primary">{formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 font-semibold text-primary-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
