"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const LINKS = [
  { label: "Shop", href: "/products" },
  { label: "New", href: "/products?filter=new" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export function FooterPro() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_auto] lg:items-start">
          <div className="flex flex-col items-start">
            <Logo variant="footer" />
            <span className="mt-3 font-display text-xl font-semibold text-foreground">
              BRANDABLE
            </span>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Women&apos;s western wear. Order online, pay on delivery.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:gap-y-2">
              {LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Follow
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} BRANDABLE. Cash on delivery available.
          </p>
        </div>
      </div>
    </footer>
  );
}
