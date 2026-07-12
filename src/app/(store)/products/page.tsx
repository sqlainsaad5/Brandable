import type { Metadata } from "next";
import { getProducts } from "@/lib/data/products";
import { ProductCardPro } from "@/components/products/ProductCardPro";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductsGrid } from "./ProductsGrid";
import { defaultOgImages } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse all women's western wear at BRANDABLE — dresses, tops, bottoms and new arrivals. Shop our online clothing store in Pakistan with Cash on Delivery.",
  openGraph: {
    title: "Shop All Products | BRANDABLE",
    description:
      "Browse women's western wear — dresses, tops, bottoms and new arrivals from BRANDABLE Pakistan.",
    images: defaultOgImages,
  },
};

type Props = {
  searchParams: { category?: string; filter?: string; q?: string };
};

export default async function ProductsPage({ searchParams }: Props) {
  const category = searchParams.category;
  const filter = searchParams.filter;
  const q = searchParams.q;
  const products = await getProducts({ category, filter, q });

  const title =
    q?.trim()
      ? `Search: “${q.trim()}”`
      : filter === "new"
        ? "New Arrivals"
        : category
          ? `${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : "All Products";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <FadeIn>
        <h1 className="mb-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mb-10 text-muted">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </FadeIn>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCardPro key={product.id} product={product} />
        ))}
      </ProductsGrid>
      {products.length === 0 && (
        <p className="py-16 text-center text-muted">No products found.</p>
      )}
    </div>
  );
}
