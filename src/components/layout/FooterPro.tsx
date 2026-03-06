"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const FOOTER_LINKS = {
  Shop: [
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Dresses", href: "/products?category=dresses" },
    { label: "Tops", href: "/products?category=tops" },
    { label: "Bottoms", href: "/products?category=bottoms" },
  ],
  Help: [
    { label: "Contact", href: "/contact" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
};

const SOCIAL = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function FooterPro() {
  return (
    <footer className="border-t border-white/10 bg-surface/50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-start">
            <Logo variant="footer" />
            <span className="mt-2 font-display text-lg font-bold text-foreground">
              BRANDABLE
            </span>
            <p className="mt-2 text-sm text-muted max-w-xs">
              Premium women&apos;s western wear. Curated for the modern woman.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© {new Date().getFullYear()} BRANDABLE. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
