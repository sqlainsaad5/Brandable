"use server";

import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { placeOrderPayloadSchema } from "@/lib/orders/schema";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { ORDER_CONFIRM_COOKIE } from "@/lib/orders/constants";
import type { OrderItem } from "@/lib/orders/types";

export type PlaceOrderInput = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  notes?: string;
  /** Honeypot — leave empty */
  company_website?: string;
  items: OrderItem[];
  subtotal: number;
};

export type PlaceOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function placeOrder(
  input: PlaceOrderInput
): Promise<PlaceOrderResult> {
  const parsed = placeOrderPayloadSchema.safeParse({
    customer_name: input.customer_name,
    customer_phone: input.customer_phone,
    customer_address: input.customer_address,
    customer_city: input.customer_city,
    notes: input.notes ?? "",
    company_website: input.company_website ?? "",
    items: input.items,
    subtotal: input.subtotal,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    // Honeypot tripped — pretend success path isn't available
    if (first?.path?.[0] === "company_website") {
      return { success: false, error: "Unable to place order. Please try again." };
    }
    return { success: false, error: first?.message ?? "Invalid form data." };
  }

  // Silent reject for filled honeypot (schema max(0) already fails above;
  // keep explicit check for clarity)
  if (parsed.data.company_website) {
    return { success: false, error: "Unable to place order. Please try again." };
  }

  const hdrs = headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  const rateKey = `order:${ip}:${parsed.data.customer_phone}`;

  if (!checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60_000 })) {
    return {
      success: false,
      error: "Too many orders from this device. Please wait a few minutes.",
    };
  }

  const subtotal = parsed.data.items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0
  );

  if (Math.abs(subtotal - parsed.data.subtotal) > 1) {
    return { success: false, error: "Cart total mismatch. Please refresh." };
  }

  const total = subtotal;
  const orderId = randomUUID();

  const supabase = await createClient();
  // Insert without .select() — anon has INSERT but not SELECT under RLS
  const { error } = await supabase.from("orders").insert({
    id: orderId,
    customer_name: parsed.data.customer_name,
    customer_phone: parsed.data.customer_phone,
    customer_address: parsed.data.customer_address,
    customer_city: parsed.data.customer_city,
    notes: parsed.data.notes || null,
    items: parsed.data.items,
    subtotal,
    total,
    status: "pending",
  });

  if (error) {
    return {
      success: false,
      error:
        error.message.includes("relation") || error.code === "42P01"
          ? "Orders table not found. Run supabase/orders.sql in the SQL Editor."
          : error.message,
    };
  }

  // Gate confirmation page: only this browser can load order PII for 1 hour
  cookies().set(ORDER_CONFIRM_COOKIE, orderId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  revalidatePath("/admin/orders");
  return { success: true, orderId };
}
