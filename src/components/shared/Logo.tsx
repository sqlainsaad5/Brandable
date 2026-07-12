"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LOGO_CIRCLE = {
  header: "w-9 h-9 sm:w-10 sm:h-10 md:w-[45px] md:h-[45px]",
  footer: "w-12 h-12 sm:w-[60px] sm:h-[60px]",
  mobile: "w-10 h-10",
  hero: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
} as const;

export type LogoVariant = keyof typeof LOGO_CIRCLE;

export interface LogoProps {
  variant?: LogoVariant;
  wrapLink?: boolean;
  className?: string;
}

export function Logo({ variant = "header", wrapLink = true, className }: LogoProps) {
  const [logoError, setLogoError] = useState(false);
  const circleSize = LOGO_CIRCLE[variant];

  const circle = (
    <span
      className={cn(
        "relative inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-border bg-transparent transition-all duration-300 ease-out",
        "hover:border-primary hover:shadow-[0_4px_12px_rgba(20,61,43,0.15)]",
        circleSize,
        className
      )}
    >
      {logoError ? (
        <span className="px-0.5 text-center font-display text-[0.6em] font-bold leading-none text-foreground">
          B
        </span>
      ) : (
        <Image
          src="/images/logo.png"
          alt={`${SITE.name} logo`}
          fill
          sizes="96px"
          className="object-cover object-center scale-110"
          onError={() => setLogoError(true)}
        />
      )}
    </span>
  );

  if (wrapLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${SITE.name} - Home`}
      >
        {circle}
      </Link>
    );
  }

  return circle;
}
