"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shirt, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";
import { isPlaceholderImage } from "@/lib/utils/productImage";

type ProductCardProProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCardPro({ product, priority = false }: ProductCardProProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const showPlaceholder = imgFailed || isPlaceholderImage(product.image);
  const alt = `${product.name}${product.category ? ` ${product.category}` : ""} — women's western wear from BRANDABLE`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
    setCartOpen(true);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-shadow hover:shadow-medium">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        {showPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center bg-placeholder">
            <Shirt className="h-10 w-10 text-accent-brass/70" aria-hidden />
            <span className="sr-only">{product.name} image coming soon</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            quality={70}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        )}

        {product.badge && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-accent-rose px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:text-[11px]">
            {product.badge}
          </span>
        )}

        {/* Price shown under card on mobile; swing tag on sm+ to avoid crowding */}
        <span
          className={cn(
            "pointer-events-none absolute right-2 top-2 z-10 hidden origin-top-right sm:inline-block",
            "rounded-sm bg-accent-brass px-2 py-1 text-[10px] font-semibold text-white shadow-soft md:text-[11px]",
            "rotate-[-6deg] opacity-90 transition-all duration-300",
            "group-hover:rotate-[-3deg] group-hover:opacity-100 group-hover:shadow-medium",
            "before:absolute before:-top-1 before:right-2 before:h-2 before:w-2 before:rotate-45 before:bg-accent-brass"
          )}
          aria-hidden
        >
          {formatPrice(product.price)}
        </span>

        {/* Always visible on touch; hover-reveal on desktop */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-2 opacity-100 transition-transform duration-300 ease-out sm:translate-y-full sm:p-3 sm:opacity-100 sm:group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md bg-primary px-2 py-2 text-xs font-semibold text-primary-foreground shadow-medium transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:min-h-11 sm:gap-2 sm:py-2.5 sm:text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="sm:inline">Add</span>
            <span className="hidden sm:inline"> to Cart</span>
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 font-display text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base md:text-lg">
          <Link
            href={`/products/${product.slug}`}
            className="focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 font-sans text-sm font-medium text-accent-brass">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
