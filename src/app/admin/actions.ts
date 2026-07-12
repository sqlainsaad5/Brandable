"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024;

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function parseSizes(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseColors(value: string): { name: string; hex: string }[] {
  const trimmed = value.trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed) as { name: string; hex: string }[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Colors: "Black:#221F1B, Rose:#B8776D"
  }
  return trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [name, hex] = part.split(":").map((s) => s.trim());
      return { name: name || "Color", hex: hex || "#000000" };
    });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function uploadImageFile(
  formData: FormData,
  slug: string
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) {
    return {};
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Please upload an image file (JPG, PNG, or WebP)." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 5 MB." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Please log in as admin before uploading." };
  }

  const admin = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${slugify(slug) || "product"}/${Date.now()}.${safeExt}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

function formToProduct(formData: FormData, imageUrl: string) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const price = Number(formData.get("price"));
  const description = String(formData.get("description") ?? "").trim() || null;
  const badge = String(formData.get("badge") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "").trim() || null;
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const colors = parseColors(String(formData.get("colors") ?? ""));
  const imagesRaw = String(formData.get("images") ?? "").trim();
  const extraImages = imagesRaw
    ? imagesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const images = [imageUrl, ...extraImages.filter((u) => u !== imageUrl)];

  return {
    name,
    slug,
    price,
    image: imageUrl,
    images,
    description,
    badge,
    category,
    sizes,
    colors,
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const slug = String(formData.get("slug") ?? "").trim();
  const uploaded = await uploadImageFile(formData, slug || "product");
  if (uploaded.error) return { error: uploaded.error };

  const imageUrl =
    uploaded.url || String(formData.get("image") ?? "").trim();

  if (!imageUrl) {
    return { error: "Please upload a product image (or paste an image URL)." };
  }

  const product = formToProduct(formData, imageUrl);
  if (!product.name || !product.slug || Number.isNaN(product.price)) {
    return { error: "Name, slug, and price are required." };
  }

  const { error } = await supabase.from("products").insert(product);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  return { success: true };
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing product id." };

  const slug = String(formData.get("slug") ?? "").trim();
  const uploaded = await uploadImageFile(formData, slug || id);
  if (uploaded.error) return { error: uploaded.error };

  const imageUrl =
    uploaded.url || String(formData.get("image") ?? "").trim();

  if (!imageUrl) {
    return { error: "Please upload a product image (or keep the existing URL)." };
  }

  const product = formToProduct(formData, imageUrl);
  if (!product.name || !product.slug || Number.isNaN(product.price)) {
    return { error: "Name, slug, and price are required." };
  }

  const { error } = await supabase.from("products").update(product).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  return { success: true };
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing product id." };

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  return { success: true };
}
