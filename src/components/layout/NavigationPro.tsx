"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = [
  { name: "New Arrivals", href: "/products?filter=new", badge: "New" },
  { name: "Dresses", href: "/products?category=dresses" },
  { name: "Tops", href: "/products?category=tops" },
  { name: "Bottoms", href: "/products?category=bottoms" },
  { name: "Outerwear", href: "/products?category=outerwear" },
  { name: "Accessories", href: "/products?category=accessories" },
];

export function NavigationPro() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  return (
    <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
      {CATEGORIES.map((cat) => (
        <div
          key={cat.name}
          className="relative"
          onMouseEnter={() => setOpenMenu(cat.name)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <Link
            href={cat.href}
            className={cn(
              "flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors py-6",
              openMenu === cat.name && "text-accent"
            )}
          >
            {cat.name}
            {cat.badge && (
              <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">
                {cat.badge}
              </span>
            )}
            <ChevronDown className="h-3.5 w-3.5" />
          </Link>
          {openMenu === cat.name && (
            <div className="absolute left-0 top-full pt-0 z-50 w-64 rounded-b-lg border border-t-0 border-white/10 bg-background/95 backdrop-blur-xl shadow-hard py-4">
              <div className="px-4 space-y-1">
                <Link
                  href={cat.href}
                  className="block py-2 text-sm text-muted hover:text-foreground"
                >
                  View all
                </Link>
                <Link
                  href={`${cat.href}&sort=newest`}
                  className="block py-2 text-sm text-muted hover:text-foreground"
                >
                  New in
                </Link>
                <Link
                  href={`${cat.href}&sort=price-asc`}
                  className="block py-2 text-sm text-muted hover:text-foreground"
                >
                  Price: Low to High
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="p-2 text-foreground hover:text-accent transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="relative p-2 text-foreground hover:text-accent transition-colors"
          aria-label="Open cart"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-background text-[10px] font-semibold flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
