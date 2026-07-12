import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { formatPrice } from "@/lib/utils/formatPrice";
import {
  ORDER_STATUSES,
  type Order,
  type OrderStatus,
} from "@/lib/orders/types";
import { cn } from "@/lib/utils/cn";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { status?: string };
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-accent-brass/15 text-accent-brass",
  confirmed: "bg-primary/10 text-primary",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage({ searchParams }: Props) {
  await requireAdmin();
  const supabase = await createClient();

  const statusFilter = searchParams.status;
  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (statusFilter && ORDER_STATUSES.includes(statusFilter as OrderStatus)) {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  const orders = (data ?? []) as Order[];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-brass">
          Fulfillment
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-muted">
          {orders.length} order{orders.length === 1 ? "" : "s"}
          {statusFilter ? ` · ${statusFilter}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={cn(
            "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium capitalize transition-colors",
            !statusFilter
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface text-muted hover:text-foreground"
          )}
        >
          All
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={cn(
              "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium capitalize transition-colors",
              statusFilter === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted hover:text-foreground"
            )}
          >
            {s}
          </Link>
        ))}
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message.includes("relation") || error.code === "42P01"
            ? "Orders table missing. Run supabase/orders.sql in the SQL Editor."
            : error.message}
        </p>
      )}

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-[#F8F4EC]/60 text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right"> </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-[#F8F4EC]/40"
                >
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted">
                    {new Date(order.created_at).toLocaleString("en-PK", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-foreground">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-muted">{order.customer_phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-muted">{order.customer_city}</td>
                  <td className="px-4 py-3.5 font-medium">
                    {formatPrice(Number(order.total))}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize",
                        statusStyles[order.status] ?? statusStyles.pending
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex min-h-10 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary hover:bg-primary/10"
                    >
                      View
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !error && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-muted">
                    No orders yet. New COD orders will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
