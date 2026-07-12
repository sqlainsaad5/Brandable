import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { OG_IMAGE } from "@/lib/seo";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }

  const description =
    product.description?.slice(0, 155) ||
    `Shop ${product.name} at BRANDABLE — premium women's western wear online in Pakistan. Cash on Delivery available.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | BRANDABLE`,
      description,
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
              alt: `${product.name}${product.category ? ` — ${product.category}` : ""} women's western wear`,
            },
          ]
        : [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | BRANDABLE`,
      description,
      images: product.image ? [product.image] : [OG_IMAGE.url],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} />
    </>
  );
}
