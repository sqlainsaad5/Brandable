export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
};

export type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  notes: string | null;
};

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Hyderabad",
  "Gujranwala",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Other",
] as const;
