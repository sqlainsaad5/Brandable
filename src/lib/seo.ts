import type { Metadata } from "next";

/** Default Open Graph / Twitter share image (WhatsApp-friendly JPG). */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg" as const,
  alt: "BRANDABLE — Women's Western Wear",
};

export const defaultOgImages: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [OG_IMAGE];

export const defaultTwitterImages = [OG_IMAGE.url];
