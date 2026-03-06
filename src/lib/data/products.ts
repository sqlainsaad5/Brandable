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

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Silk Midi Dress",
    slug: "silk-midi-dress",
    price: 4999,
    image: "https://placehold.co/400x533/141416/666?text=Dress",
    images: ["https://placehold.co/800x1066/141416/666?text=1", "https://placehold.co/800x1066/141416/888?text=2"],
    description: "Elegant silk midi dress with a flattering fit.",
    badge: "New",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#0A0A0A" }, { name: "Gold", hex: "#C6A45C" }],
  },
  {
    id: "2",
    name: "Structured Blazer",
    slug: "structured-blazer",
    price: 6499,
    image: "https://placehold.co/400x533/141416/666?text=Blazer",
    category: "outerwear",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Navy", hex: "#1e3a5f" }, { name: "Camel", hex: "#c19a6b" }],
  },
  {
    id: "3",
    name: "High-Waist Trousers",
    slug: "high-waist-trousers",
    price: 3499,
    image: "https://placehold.co/400x533/141416/666?text=Trousers",
    badge: "Bestseller",
    category: "bottoms",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#0A0A0A" }, { name: "White", hex: "#FAFAFA" }],
  },
  {
    id: "4",
    name: "Lace Top",
    slug: "lace-top",
    price: 2799,
    image: "https://placehold.co/400x533/141416/666?text=Top",
    category: "tops",
    sizes: ["S", "M", "L"],
    colors: [{ name: "Ivory", hex: "#FFFFF0" }, { name: "Black", hex: "#0A0A0A" }],
  },
  {
    id: "5",
    name: "Wide-Leg Jumpsuit",
    slug: "wide-leg-jumpsuit",
    price: 5299,
    image: "https://placehold.co/400x533/141416/666?text=Jumpsuit",
    category: "bottoms",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Black", hex: "#0A0A0A" }],
  },
  {
    id: "6",
    name: "Embroidered Kurti",
    slug: "embroidered-kurti",
    price: 3299,
    image: "https://placehold.co/400x533/141416/666?text=Kurti",
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Teal", hex: "#008080" }, { name: "Maroon", hex: "#800020" }],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProducts(filters?: { category?: string; filter?: string }): Product[] {
  let list = [...MOCK_PRODUCTS];
  if (filters?.category) {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters?.filter === "new") {
    list = list.filter((p) => p.badge === "New");
  }
  return list;
}
