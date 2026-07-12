import type { Metadata } from "next";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductSlider3D } from "@/components/home/ProductSlider3D";
import { CategoryMasonry } from "@/components/home/CategoryMasonry";
import { NewsletterPopup } from "@/components/home/NewsletterPopup";
import { getProducts } from "@/lib/data/products";
import { defaultOgImages, defaultTwitterImages } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "BRANDABLE | Premium Women's Western Wear in Pakistan",
  },
  description:
    "Shop women's western wear online in Pakistan at BRANDABLE. Discover premium dresses, tops and curated styles — order with Cash on Delivery nationwide.",
  openGraph: {
    title: "BRANDABLE | Premium Women's Western Wear in Pakistan",
    description:
      "Shop women's western wear online in Pakistan at BRANDABLE. Premium dresses, tops and curated styles with Cash on Delivery.",
    images: defaultOgImages,
  },
  twitter: {
    images: defaultTwitterImages,
  },
};

export default async function StoreHomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 5);

  return (
    <>
      <HeroCinematic />
      <TrustBar />
      <ProductSlider3D products={featured} />
      <CategoryMasonry />
      <NewsletterPopup />
    </>
  );
}
