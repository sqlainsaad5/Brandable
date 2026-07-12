"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
] as const;

type Props = {
  email: string;
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
};

export function AdminShell({ email, signOutAction, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        View store
      </Link>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#F3EDE2] text-foreground">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md lg:hidden">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-foreground/5"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/admin/products" className="flex items-center gap-2">
          <Logo variant="mobile" wrapLink={false} />
          <span className="font-display text-sm font-semibold tracking-tight">
            Admin
          </span>
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)] flex-col border-r border-border bg-background p-4 shadow-hard">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo variant="mobile" wrapLink={false} />
                <div>
                  <p className="font-display text-sm font-semibold">BRANDABLE</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Admin
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-foreground/5"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {nav}
            <p className="mt-auto truncate pt-6 text-xs text-muted">{email}</p>
          </aside>
        </div>
      )}

      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-background px-4 py-6 lg:flex">
          <Link href="/admin/products" className="mb-8 flex items-center gap-3 px-2">
            <Logo variant="header" wrapLink={false} />
            <div>
              <p className="font-display text-base font-semibold tracking-tight">
                BRANDABLE
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Admin
              </p>
            </div>
          </Link>
          {nav}
          <div className="mt-auto border-t border-border pt-4">
            <p className="mb-3 truncate px-2 text-xs text-muted" title={email}>
              {email}
            </p>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
