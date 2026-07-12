"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Pencil, Trash2, Plus } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { createProduct, updateProduct, deleteProduct } from "../actions";
import { formatPrice } from "@/lib/utils/formatPrice";
import { isPlaceholderImage } from "@/lib/utils/productImage";
import { cn } from "@/lib/utils/cn";

type Props = { products: Product[] };

const emptyForm = {
  name: "",
  slug: "",
  price: "",
  image: "",
  images: "",
  description: "",
  badge: "",
  category: "",
  sizes: "",
  colors: "",
};

const fieldClass =
  "w-full min-h-11 rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AdminProductsClient({ products }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);

  function startEdit(product: Product) {
    setEditing(product);
    setShowForm(true);
    setForm({
      name: product.name,
      slug: product.slug,
      price: String(product.price),
      image: product.image,
      images: (product.images ?? []).join(", "),
      description: product.description ?? "",
      badge: product.badge ?? "",
      category: product.category ?? "",
      sizes: (product.sizes ?? []).join(", "),
      colors: product.colors
        ? product.colors.map((c) => `${c.name}:${c.hex}`).join(", ")
        : "",
    });
    setFilePreview(null);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setForm(emptyForm);
    setFilePreview(null);
    setShowForm(false);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFilePreview(null);
      return;
    }
    setFilePreview(URL.createObjectURL(file));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    if (!String(formData.get("slug") || "").trim() && form.name) {
      formData.set("slug", slugFromName(form.name));
    }

    startTransition(async () => {
      const result = editing
        ? await updateProduct(formData)
        : await createProduct(formData);
      if (result?.error) {
        setMessage(result.error);
        return;
      }
      setMessage(editing ? "Product updated." : "Product created.");
      resetForm();
      formEl.reset();
      router.refresh();
    });
  }

  function onDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const formData = new FormData();
    formData.set("id", id);
    startTransition(async () => {
      const result = await deleteProduct(formData);
      if (result?.error) setMessage(result.error);
      else {
        setMessage("Product deleted.");
        router.refresh();
      }
      if (editing?.id === id) resetForm();
    });
  }

  const previewSrc =
    filePreview ||
    (form.image && !isPlaceholderImage(form.image) ? form.image : null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-brass">
            Catalog
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted">
            {products.length} item{products.length === 1 ? "" : "s"} in your store
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (showForm && !editing) resetForm();
            else {
              setEditing(null);
              setForm(emptyForm);
              setShowForm(true);
              setMessage(null);
            }
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          {showForm && !editing ? "Close form" : "Add product"}
        </button>
      </div>

      {message && (
        <p
          className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground"
          role="status"
        >
          {message}
        </p>
      )}

      {showForm && (
        <section className="rounded-card border border-border bg-surface p-5 shadow-soft sm:p-6">
          <h2 className="mb-5 font-display text-lg font-semibold text-foreground">
            {editing ? `Edit · ${editing.name}` : "New product"}
          </h2>
          <form
            onSubmit={onSubmit}
            className="grid gap-4 sm:grid-cols-2"
            encType="multipart/form-data"
          >
            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Product image
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-8 transition-colors hover:border-primary/40">
                <ImagePlus className="h-6 w-6 text-muted" aria-hidden />
                <span className="text-sm text-muted">
                  Click to upload JPG / PNG / WebP (max 5 MB)
                </span>
                <input
                  name="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={onFileChange}
                  className="sr-only"
                />
              </label>
            </div>

            {previewSrc && (
              <div className="sm:col-span-2">
                <div className="relative h-44 w-36 overflow-hidden rounded-lg border border-border bg-placeholder">
                  <Image
                    src={previewSrc}
                    alt={`${form.name || "Product"} image preview`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {(
              [
                ["name", "Name", "text", true],
                ["slug", "Slug (auto if empty)", "text", false],
                ["price", "Price (PKR)", "number", true],
                ["category", "Category", "text", false],
                ["badge", "Badge (New / Bestseller)", "text", false],
                ["sizes", "Sizes (comma-separated)", "text", false],
                ["colors", "Colors (Name:#hex)", "text", false],
                ["description", "Description", "text", false],
              ] as const
            ).map(([key, label, type, required]) => (
              <label
                key={key}
                className={cn(
                  "block text-sm",
                  key === "description" && "sm:col-span-2"
                )}
              >
                <span className="mb-1.5 block font-medium text-foreground">
                  {label}
                </span>
                {key === "description" ? (
                  <textarea
                    name={key}
                    required={required}
                    value={form[key]}
                    rows={3}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className={cn(fieldClass, "min-h-[88px] resize-y")}
                  />
                ) : (
                  <input
                    name={key}
                    type={type}
                    required={required}
                    value={form[key]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm((prev) => {
                        const next = { ...prev, [key]: value };
                        if (key === "name" && !editing && !prev.slug) {
                          next.slug = slugFromName(value);
                        }
                        return next;
                      });
                    }}
                    className={fieldClass}
                  />
                )}
              </label>
            ))}

            <input type="hidden" name="image" value={form.image} />
            <input type="hidden" name="images" value={form.images} />

            <div className="flex flex-wrap gap-2 pt-2 sm:col-span-2">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
              >
                {pending ? "Saving…" : editing ? "Update product" : "Add product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-card border border-border bg-surface shadow-soft">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">
            All products
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-[#F8F4EC]/60 text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Badge</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-[#F8F4EC]/40"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-placeholder">
                        {!isPlaceholderImage(product.image) ? (
                          <Image
                            src={product.image}
                            alt={`${product.name} thumbnail`}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-[10px] text-muted">
                            —
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="truncate text-xs text-muted">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">
                    {product.category ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    {product.badge ? (
                      <span className="inline-flex rounded-full bg-accent-rose/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent-rose">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted hover:bg-primary/10 hover:text-primary"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        disabled={pending}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-muted">
                    No products yet. Add your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
