"use client";

import Link from "next/link";
import { ProductCardPro } from "@/components/products/ProductCardPro";
import type { Product } from "@/lib/data/products";

export function ProductSlider3D({ products }: { products: Product[] }) {
  return (
    <section
      className="py-20 md:py-24"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-brass">
            Curated picks
          </p>
          <h2
            id="featured-heading"
            className="font-display text-3xl font-semibold text-foreground md:text-4xl"
          >
            Featured
          </h2>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted">No products yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, i) => (
              <ProductCardPro
                key={product.id}
                product={product}
                priority={i < 2}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
