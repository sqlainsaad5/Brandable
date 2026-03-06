"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/data/products";
import { ProductCardPro } from "@/components/products/ProductCardPro";
import { FadeIn } from "@/components/animations/FadeIn";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const filter = searchParams.get("filter") ?? undefined;

  const products = useMemo(
    () => getProducts({ category, filter }),
    [category, filter]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <FadeIn>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          {filter === "new" ? "New Arrivals" : category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "All Products"}
        </h1>
        <p className="text-muted mb-10">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </FadeIn>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06 },
          },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductCardPro product={product} />
          </motion.div>
        ))}
      </motion.div>
      {products.length === 0 && (
        <p className="text-center text-muted py-16">No products found.</p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12"><div className="h-8 w-48 bg-surface rounded animate-pulse mb-10" /><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-surface rounded-card animate-pulse" />)}</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
