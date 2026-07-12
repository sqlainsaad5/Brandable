"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { name: "Shop", href: "/products" },
  { name: "New", href: "/products?filter=new" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  function linkIsActive(href: string) {
    const [path, query] = href.split("?");
    if (path === "/products") {
      if (pathname !== "/products" && !pathname.startsWith("/products/")) return false;
      if (query === "filter=new") return pathname === "/products" && filter === "new";
      if (pathname.startsWith("/products/") && pathname !== "/products") return true;
      return pathname === "/products" && filter !== "new";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
      {LINKS.map((link) => {
        const active = linkIsActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "py-6 text-sm font-medium transition-colors hover:text-primary",
              active ? "text-primary" : "text-foreground"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function NavigationPro() {
  return (
    <Suspense
      fallback={
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-6 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      }
    >
      <NavLinks />
    </Suspense>
  );
}
