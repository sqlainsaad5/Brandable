"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = [
  { name: "Dresses", href: "/products?category=dresses", image: "https://placehold.co/600x400/1a1a1a/888?text=Dresses", span: "row-span-2" },
  { name: "Tops", href: "/products?category=tops", image: "https://placehold.co/400x200/1a1a1a/888?text=Tops", span: "" },
  { name: "Bottoms", href: "/products?category=bottoms", image: "https://placehold.co/400x200/1a1a1a/888?text=Bottoms", span: "" },
  { name: "New Arrivals", href: "/products?filter=new", image: "https://placehold.co/800x200/1a1a1a/C6A45C?text=New+Arrivals", span: "col-span-2" },
];

function CategoryCard({ cat, i }: { cat: (typeof CATEGORIES)[0]; i: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-card border border-white/15 bg-surface min-h-[200px]",
        cat.span || "row-span-1"
      )}
    >
      <Link href={cat.href} className="block h-full min-h-[200px] group">
        <div className="absolute inset-0 bg-surface relative">
          {!imgError ? (
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-accent/20" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {cat.name}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryMasonry() {
  return (
    <section id="lookbook" className="py-section-lg" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="categories-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
