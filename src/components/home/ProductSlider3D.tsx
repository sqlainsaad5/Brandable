"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { formatPrice } from "@/lib/utils/formatPrice";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge?: string;
};

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Silk Midi Dress", slug: "silk-midi-dress", price: 4999, image: "https://placehold.co/400x533/141416/666?text=Dress", badge: "New" },
  { id: "2", name: "Structured Blazer", slug: "structured-blazer", price: 6499, image: "https://placehold.co/400x533/141416/666?text=Blazer" },
  { id: "3", name: "High-Waist Trousers", slug: "high-waist-trousers", price: 3499, image: "https://placehold.co/400x533/141416/666?text=Trousers", badge: "Bestseller" },
  { id: "4", name: "Lace Top", slug: "lace-top", price: 2799, image: "https://placehold.co/400x533/141416/666?text=Top" },
  { id: "5", name: "Wide-Leg Jumpsuit", slug: "wide-leg-jumpsuit", price: 5299, image: "https://placehold.co/400x533/141416/666?text=Jumpsuit" },
];

function ProductCard3D({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]));

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
      className="relative rounded-card overflow-hidden bg-surface border border-white/10 shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="block aspect-[3/4] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-background">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-4" style={{ transform: "translateZ(12px)" }}>
        <h3 className="font-display font-semibold text-foreground">{product.name}</h3>
        <p className="text-accent font-medium mt-1">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
}

export function ProductSlider3D() {
  return (
    <section className="py-section-lg overflow-hidden" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="featured-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Featured
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard3D key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
