"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useUIStore } from "@/lib/store/uiStore";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { NavigationPro } from "./NavigationPro";
import { MobileMenuPro } from "./MobileMenuPro";
import { cn } from "@/lib/utils/cn";

export function HeaderPro() {
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const scrollY = useScrollPosition();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrolled = mounted && scrollY > 20;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-soft"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-accent"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            BRANDABLE
          </Link>

          <NavigationPro />
        </div>
      </header>
      <MobileMenuPro />
    </>
  );
}
