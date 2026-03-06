import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
