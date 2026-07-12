/**
 * Product image helpers.
 * Local /images/* and Supabase Storage / Unsplash count as real images.
 * Only empty URLs and classic placeholder hosts use the Shirt fallback.
 */

const PLACEHOLDER_HOSTS = [
  "placehold.co",
  "via.placeholder.com",
  "placeholder.com",
];

export function isPlaceholderImage(src?: string | null): boolean {
  if (!src || !src.trim()) return true;
  const value = src.trim();

  if (
    value.startsWith("/images/") ||
    value.startsWith("/products/") ||
    value.includes(".supabase.co/storage/") ||
    value.includes("images.unsplash.com")
  ) {
    return false;
  }

  try {
    const host = value.startsWith("http") ? new URL(value).hostname : "";
    return PLACEHOLDER_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/** Prefer gallery images; fall back to main image; skip pure placeholders when a better src exists. */
export function getProductGallery(product: {
  image: string;
  images?: string[] | null;
}): string[] {
  const fromGallery = (product.images ?? []).filter(
    (src) => src && !isPlaceholderImage(src)
  );
  if (fromGallery.length > 0) return fromGallery;
  if (product.image && !isPlaceholderImage(product.image)) {
    return [product.image];
  }
  // Keep original image if that's all we have (may still be placeholder)
  return product.image ? [product.image] : [];
}
