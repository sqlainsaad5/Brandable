"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import type { Product } from "@/lib/data/products";

type ProductCardProProps = {
  product: Product;
};

export function ProductCardPro({ product }: ProductCardProProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]));
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative rounded-card overflow-hidden bg-surface border border-white/10 shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="block aspect-[3/4] relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-background">
            {product.badge}
          </span>
        )}
        <div
          className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateZ(12px)" }}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-lg border border-white/20 bg-background/80 flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="p-4" style={{ transform: "translateZ(12px)" }}>
        <h3 className="font-display font-semibold text-foreground">{product.name}</h3>
        <p className="text-accent font-medium mt-1">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
}
