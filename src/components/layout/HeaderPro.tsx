"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { Logo } from "@/components/shared/Logo";
import { NavigationPro } from "./NavigationPro";
import { MobileMenuPro } from "./MobileMenuPro";
import { HeaderSearch } from "./HeaderSearch";
import { cn } from "@/lib/utils/cn";

export function HeaderPro() {
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const totalItems = useCartStore((s) => s.totalItems());
  const scrollY = useScrollPosition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrolled = mounted && scrollY > 20;
  const cartCount = mounted ? totalItems : 0;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/90 shadow-soft backdrop-blur-xl"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground hover:text-primary md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 rounded-md text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-2.5"
            aria-label="BRANDABLE - Home"
          >
            <Logo variant="header" wrapLink={false} />
            <span className="hidden truncate font-display text-lg font-bold tracking-tight xs:inline sm:text-xl">
              BRANDABLE
            </span>
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 md:gap-6">
            <NavigationPro />
            <div className="hidden sm:block md:block">
              <HeaderSearch />
            </div>
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-primary"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenuPro />
    </>
  );
}
