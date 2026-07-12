import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ORDER_CONFIRM_COOKIE } from "@/lib/orders/constants";
import type { Order, OrderItem } from "@/lib/orders/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/utils/formatPrice";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: { orderId?: string };
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function CheckoutConfirmationPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;
  if (!orderId || !UUID_RE.test(orderId)) redirect("/checkout");

  const confirmCookie = cookies().get(ORDER_CONFIRM_COOKIE)?.value;
  const canViewDetails = confirmCookie === orderId;

  let order: Order | null = null;

  // Only fetch PII when the same browser that placed the order presents the cookie.
  // Prevents IDOR: guessing/sharing an orderId alone is not enough.
  if (canViewDetails) {
    try {
      const admin = createAdminClient();
      const { data } = await admin
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();
      order = data as Order | null;
    } catch {
      order = null;
    }
  }

  const shortRef = orderId.slice(0, 8).toUpperCase();
  const items = (order?.items ?? []) as OrderItem[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 md:py-20">
      <div className="rounded-card border border-border bg-surface p-8 text-center shadow-soft md:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Order confirmed
        </h1>
        <p className="mt-3 text-muted">
          Thank you for shopping with BRANDABLE. Your Cash on Delivery order is
          in.
        </p>
        <p className="mt-4 inline-block rounded-md border border-border bg-background px-4 py-2 font-mono text-sm text-foreground">
          Order ref: <span className="font-semibold text-primary">{shortRef}</span>
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          We&apos;ll call you shortly to confirm your order before dispatch.
          Please keep your phone available.
        </p>

        {order && (
          <div className="mt-8 border-t border-border pt-6 text-left">
            <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
              What you ordered
            </h2>
            <ul className="space-y-2 text-sm">
              {items.map((item, idx) => (
                <li
                  key={`${item.product_id}-${idx}`}
                  className="flex justify-between gap-3"
                >
                  <span className="text-muted">
                    {item.name}
                    {item.size ? ` · ${item.size}` : ""}
                    {item.color ? ` · ${item.color}` : ""} × {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(Number(item.price) * Number(item.quantity))}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-3 font-semibold text-foreground">
              <span>Total (COD)</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Deliver to: {order.customer_name}, {order.customer_address},{" "}
              {order.customer_city}
            </p>
          </div>
        )}

        {!order && (
          <p className="mt-8 text-sm text-muted">
            Save your order ref above. We have your details and will contact you
            soon.
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-md border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
