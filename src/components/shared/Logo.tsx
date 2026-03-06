"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LOGO_CIRCLE = {
  header: "w-10 h-10 md:w-[45px] md:h-[45px]",   // 40px mobile, 45px desktop
  footer: "w-[60px] h-[60px]",
  mobile: "w-10 h-10",                            // 40px
  hero: "w-20 h-20 sm:w-24 sm:h-24",              // 80px mobile, 96px desktop
} as const;

export type LogoVariant = keyof typeof LOGO_CIRCLE;

export interface LogoProps {
  variant?: LogoVariant;
  /** Wrap in link to home (default true for header/footer/mobile, false for hero if you wrap elsewhere) */
  wrapLink?: boolean;
  className?: string;
}

export function Logo({ variant = "header", wrapLink = true, className }: LogoProps) {
  const [logoError, setLogoError] = useState(false);
  const circleSize = LOGO_CIRCLE[variant];

  const circle = (
    <span
      className={cn(
        "relative inline-flex flex-shrink-0 items-center justify-center rounded-full overflow-hidden",
        "bg-transparent",
        "border border-black/[0.05] hover:border-[#C6A45C] hover:shadow-[0_4px_12px_rgba(198,164,92,0.15)]",
        "transition-all duration-300 ease-out",
        circleSize,
        className
      )}
    >
      {logoError ? (
        <span className="font-display text-[0.6em] font-bold text-foreground leading-none text-center px-0.5">
          B
        </span>
      ) : (
        <img
          src="/images/logo.png"
          alt={SITE.name}
          className="h-[100%] w-[100%] object-contain object-center"
          onError={() => setLogoError(true)}
        />
      )}
    </span>
  );

  if (wrapLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
        aria-label={`${SITE.name} - Home`}
      >
        {circle}
      </Link>
    );
  }

  return circle;
}
