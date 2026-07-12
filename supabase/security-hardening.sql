-- BRANDABLE security hardening / RLS verification
-- Run in Supabase → SQL Editor after schema.sql + orders.sql
-- Safe to re-run (idempotent policy drops/creates)

-- ========== PRODUCTS ==========
alter table if exists public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- ========== ORDERS ==========
-- If this errors with "relation does not exist", run supabase/orders.sql first.

alter table if exists public.orders enable row level security;

drop policy if exists "Public can insert orders" on public.orders;
create policy "Public can insert orders"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);

-- IMPORTANT: no SELECT for anon — customers must not read other people's orders
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

-- ========== VERIFY (read-only) ==========
-- Lists current policies for products + orders
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('products', 'orders')
order by tablename, cmd, policyname;

-- Confirm RLS is enabled
select c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('products', 'orders');
