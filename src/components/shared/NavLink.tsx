"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded",
        isActive ? "text-primary" : "text-muted hover:text-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
