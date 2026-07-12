import type { Metadata } from "next";

/**
 * WhatsApp / Facebook OG image.
 * Query `v=` busts share-preview cache after image updates.
 */
export const OG_IMAGE = {
  url: "/og-image.jpg?v=3",
  width: 1200,
  height: 630,
  type: "image/jpeg" as const,
  alt: "BRANDABLE — Women's Western Wear",
};

export const defaultOgImages: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [OG_IMAGE];

export const defaultTwitterImages = [OG_IMAGE.url];
