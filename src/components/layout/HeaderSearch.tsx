"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    setOpen(false);
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-primary"
        aria-label="Search products"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-11 max-w-[min(100vw-8rem,14rem)] items-center gap-1 rounded-md border border-border bg-surface px-2"
      role="search"
    >
      <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
      <input
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        autoFocus
        className="w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
        aria-label="Search products"
      />
      <button
        type="button"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted hover:text-foreground"
        aria-label="Close search"
        onClick={() => {
          setOpen(false);
          setQuery("");
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </form>
  );
}
