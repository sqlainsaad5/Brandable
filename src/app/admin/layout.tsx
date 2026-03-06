import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-white/10 p-6 flex flex-col gap-4">
        <Link href="/admin" className="font-display font-bold text-foreground">
          BRANDABLE Admin
        </Link>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="text-sm text-muted hover:text-foreground">Dashboard</Link>
          <Link href="/admin/products" className="text-sm text-muted hover:text-foreground">Products</Link>
          <Link href="/admin/orders" className="text-sm text-muted hover:text-foreground">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
