/** Canonical public site origin (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(
      /\/$/,
      ""
    )}`;
  }

  // Fallback only — set NEXT_PUBLIC_SITE_URL in production
  return "https://brandable.in";
}
