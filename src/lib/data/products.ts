import { createClient } from "@/lib/supabase/server";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  badge?: string;
  category?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  image: string;
  images: string[] | null;
  description: string | null;
  badge: string | null;
  category: string | null;
  sizes: string[] | null;
  colors: { name: string; hex: string }[] | null;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: typeof row.price === "string" ? Number(row.price) : row.price,
    image: row.image,
    images: row.images ?? undefined,
    description: row.description ?? undefined,
    badge: row.badge ?? undefined,
    category: row.category ?? undefined,
    sizes: row.sizes ?? undefined,
    colors: row.colors ?? undefined,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return undefined;
  return mapRow(data as ProductRow);
}

export async function getProducts(filters?: {
  category?: string;
  filter?: string;
  q?: string;
}): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from("products").select("*").order("created_at", {
    ascending: false,
  });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.filter === "new") {
    query = query.eq("badge", "New");
  }
  if (filters?.q?.trim()) {
    query = query.ilike("name", `%${filters.q.trim()}%`);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return (data as ProductRow[]).map(mapRow);
}
