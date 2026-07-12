import type { Product } from "@/lib/data/products";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

/** Schema.org Product JSON-LD for rich results (currency: PKR). */
export function ProductJsonLd({ product }: { product: Product }) {
  const images = [
    ...(product.images?.filter(Boolean) ?? []),
    product.image,
  ].filter((src, index, arr): src is string => Boolean(src) && arr.indexOf(src) === index);

  const absoluteImages = images.map((image) =>
    image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`
  );

  if (absoluteImages.length === 0) {
    absoluteImages.push(`${siteUrl}/og-image.jpg`);
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      `Shop ${product.name} at BRANDABLE — women's western wear online in Pakistan.`,
    image: absoluteImages,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "BRANDABLE",
    },
    category: product.category || "Women's Clothing",
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: "PKR",
      price: Number(product.price).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "BRANDABLE",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Escape < to prevent breaking out of the script tag if product text is hostile
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
