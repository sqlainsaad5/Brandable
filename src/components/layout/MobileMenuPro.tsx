"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useUIStore } from "@/lib/store/uiStore";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { name: "New Arrivals", href: "/products?filter=new" },
  { name: "Dresses", href: "/products?category=dresses" },
  { name: "Tops", href: "/products?category=tops" },
  { name: "Bottoms", href: "/products?category=bottoms" },
  { name: "Outerwear", href: "/products?category=outerwear" },
  { name: "Accessories", href: "/products?category=accessories" },
];

export function MobileMenuPro() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const close = () => setOpen(false);
  const openCart = () => {
    setOpen(false);
    setCartOpen(true);
  };

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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-background border-l border-white/10 shadow-hard md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Logo variant="mobile" />
              <button
                type="button"
                onClick={close}
                className="p-2 text-foreground hover:text-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-auto p-6">
              <ul className="space-y-1">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className={cn(
                        "block py-3 text-lg font-medium text-foreground hover:text-accent transition-colors"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-6 border-t border-white/10 flex gap-3">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/20 text-foreground"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
              <button
                type="button"
                onClick={openCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-background font-medium"
              >
                <ShoppingBag className="h-5 w-5" />
                Cart {totalItems > 0 ? `(${totalItems})` : ""}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
