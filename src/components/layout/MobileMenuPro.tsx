"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

const PRIMARY_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const CATEGORY_LINKS = [
  { name: "New Arrivals", href: "/products?filter=new" },
  { name: "Dresses", href: "/products?category=dresses" },
  { name: "Tops", href: "/products?category=tops" },
  { name: "Bottoms", href: "/products?category=bottoms" },
  { name: "Outerwear", href: "/products?category=outerwear" },
  { name: "Accessories", href: "/products?category=accessories" },
];

export function MobileMenuPro() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  useEffect(() => setMounted(true), []);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const cartCount = mounted ? totalItems : 0;

  const close = () => setOpen(false);
  const openCart = () => {
    setOpen(false);
    setCartOpen(true);
  };

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    close();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setQuery("");
  }

  function isActive(href: string) {
    const path = href.split("?")[0];
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-background shadow-hard md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Logo variant="mobile" />
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center text-foreground hover:text-primary"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto px-4 py-4">
              <form onSubmit={handleSearch} className="mb-6" role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3">
                  <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <input
                    id="mobile-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products…"
                    className="h-11 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted"
                  />
                </div>
              </form>

              <nav aria-label="Primary">
                <ul className="space-y-0.5">
                  {PRIMARY_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className={cn(
                          "flex min-h-11 items-center text-lg font-medium transition-colors hover:text-primary",
                          isActive(link.href) ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <p className="mb-2 mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Shop by category
              </p>
              <nav aria-label="Categories">
                <ul className="space-y-0.5">
                  {CATEGORY_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex min-h-11 items-center text-base font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={openCart}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground"
              >
                <ShoppingBag className="h-5 w-5" />
                Cart{cartCount > 0 ? ` (${cartCount})` : ""}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
