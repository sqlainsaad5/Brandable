"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md" role="banner">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 text-foreground hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={cn("md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md", mobileOpen ? "block" : "hidden")}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href} className="block py-3 text-base" onClick={() => setMobileOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
