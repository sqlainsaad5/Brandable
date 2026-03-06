import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/5 bg-surface"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start">
            <Logo variant="footer" />
            <span className="mt-2 font-display text-lg font-semibold text-foreground">
              {SITE.name}
            </span>
            <p className="mt-1 text-sm text-muted max-w-xs">
              {SITE.tagline}
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-sm text-muted">
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
