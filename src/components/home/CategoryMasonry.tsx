"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = [
  {
    name: "Dresses",
    href: "/products?category=dresses",
    bg: "bg-primary",
    text: "text-primary-foreground",
  },
  {
    name: "Tops",
    href: "/products?category=tops",
    bg: "bg-accent-rose",
    text: "text-white",
  },
  {
    name: "Bottoms",
    href: "/products?category=bottoms",
    bg: "bg-accent-brass",
    text: "text-white",
  },
  {
    name: "New Arrivals",
    href: "/products?filter=new",
    bg: "bg-[#D9D2C5]",
    text: "text-foreground",
  },
] as const;

export function CategoryMasonry() {
  return (
    <section
      id="lookbook"
      className="py-20 md:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="categories-heading"
          className="mb-12 text-center font-display text-3xl font-semibold text-foreground md:text-4xl"
        >
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={cat.href}
                aria-label={`Shop ${cat.name} women's western wear`}
                className={cn(
                  "group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card border border-border shadow-soft",
                  "transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  cat.bg
                )}
              >
                <span
                  className={cn(
                    "relative z-10 px-2 text-center font-display text-lg font-semibold tracking-tight sm:px-3 sm:text-2xl md:text-3xl",
                    cat.text
                  )}
                >
                  {cat.name}
                </span>
                <span
                  className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/25"
                  aria-hidden
                />
                <ArrowUpRight
                  className={cn(
                    "absolute bottom-4 right-4 h-5 w-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                    cat.text
                  )}
                  aria-hidden
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
