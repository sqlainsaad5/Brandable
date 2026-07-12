"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders/types";

export async function updateOrderStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;

  if (!id || !ORDER_STATUSES.includes(status)) {
    return;
  }

  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
