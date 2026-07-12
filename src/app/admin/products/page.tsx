import { getProducts } from "@/lib/data/products";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { AdminProductsClient } from "./AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getProducts();
  return <AdminProductsClient products={products} />;
}
