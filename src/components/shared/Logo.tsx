import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-xl font-semibold text-foreground hover:text-accent transition-colors"
      aria-label={`${SITE.name} - Home`}
    >
      {SITE.name}
    </Link>
  );
}
