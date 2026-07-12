-- COD Orders table + RLS
-- Run in Supabase → SQL Editor → Run
--
-- Security model:
--   anon/authenticated → INSERT only (place COD orders)
--   authenticated      → SELECT / UPDATE / DELETE (admin dashboard)
--   anon               → NO SELECT (cannot read other customers' PII)
--
-- App note: placeOrder inserts with a server-generated UUID and does NOT
-- use .select() afterward, because anon has no SELECT policy.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  customer_city text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null,
  total numeric not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  notes text
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

drop policy if exists "Public can insert orders" on public.orders;
create policy "Public can insert orders"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated can select orders" on public.orders;
create policy "Authenticated can select orders"
  on public.orders
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update orders" on public.orders;
create policy "Authenticated can update orders"
  on public.orders
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete orders" on public.orders;
create policy "Authenticated can delete orders"
  on public.orders
  for delete
  to authenticated
  using (true);
