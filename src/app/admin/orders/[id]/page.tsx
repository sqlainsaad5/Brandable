import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { formatPrice } from "@/lib/utils/formatPrice";
import {
  ORDER_STATUSES,
  type Order,
  type OrderItem,
  type OrderStatus,
} from "@/lib/orders/types";
import { updateOrderStatus } from "../actions";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, Phone, MapPin, StickyNote } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-accent-brass/15 text-accent-brass",
  confirmed: "bg-primary/10 text-primary",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrderDetailPage({ params }: Props) {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !data) notFound();
  const order = data as Order;
  const items = (order.items ?? []) as OrderItem[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All orders
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Order {order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {new Date(order.created_at).toLocaleString("en-PK", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1.5 text-sm font-semibold capitalize",
            statusStyles[order.status]
          )}
        >
          {order.status}
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-5 shadow-soft sm:p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Customer</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="mt-0.5 text-base font-medium">{order.customer_name}</dd>
            </div>
            <div className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="mt-0.5 font-medium">
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="hover:text-primary"
                  >
                    {order.customer_phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-muted">Address</dt>
                <dd className="mt-0.5 font-medium leading-relaxed">
                  {order.customer_address}, {order.customer_city}
                </dd>
              </div>
            </div>
            {order.notes && (
              <div className="flex gap-2">
                <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <dt className="text-muted">Notes</dt>
                  <dd className="mt-0.5 font-medium">{order.notes}</dd>
                </div>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-card border border-border bg-surface p-5 shadow-soft sm:p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Update status
          </h2>
          <p className="mb-4 text-sm text-muted">
            Mark progress as you confirm, ship, or deliver this COD order.
          </p>
          <form action={updateOrderStatus} className="flex flex-wrap gap-2">
            <input type="hidden" name="id" value={order.id} />
            {ORDER_STATUSES.map((s) => (
              <button
                key={s}
                type="submit"
                name="status"
                value={s}
                disabled={order.status === s}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium capitalize transition-colors",
                  order.status === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:text-primary disabled:opacity-50"
                )}
              >
                {s}
              </button>
            ))}
          </form>
        </div>
      </section>

      <section className="rounded-card border border-border bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Items</h2>
        <ul className="divide-y divide-border">
          {items.map((item, idx) => (
            <li
              key={`${item.product_id}-${idx}`}
              className="flex justify-between gap-3 py-3 text-sm first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-muted">
                  Qty {item.quantity}
                  {item.size ? ` · Size ${item.size}` : ""}
                  {item.color ? ` · ${item.color}` : ""}
                </p>
              </div>
              <p className="shrink-0 font-medium">
                {formatPrice(Number(item.price) * Number(item.quantity))}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
          <span>Total (COD)</span>
          <span className="text-primary">{formatPrice(Number(order.total))}</span>
        </div>
      </section>
    </div>
  );
}
