-- BRANDABLE: products schema + RLS + seed
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- 1) Products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  price numeric not null,
  image text not null,
  images text[] default '{}',
  description text,
  badge text,
  category text,
  sizes text[] default '{}',
  colors jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_created_at_idx on public.products (created_at desc);

-- 2) Auth approach (recommended for a small store)
-- Do NOT create an admins table.
-- Instead:
--   a) Supabase Dashboard → Authentication → Users → Add user
--   b) Create one admin with email + password
--   c) Use that account at /admin/login
-- Any authenticated user can INSERT/UPDATE/DELETE products (see RLS below).

-- 3) Row Level Security
alter table public.products enable row level security;

-- Public can read all products
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Only authenticated users (your admin) can insert
drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Only authenticated users can update
drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users can delete
drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- 4) Seed: migrate the 6 mock products (idempotent on slug)
insert into public.products (name, slug, price, image, images, description, badge, category, sizes, colors)
values
  (
    'Silk Midi Dress',
    'silk-midi-dress',
    4999,
    'https://placehold.co/400x533/141416/666?text=Dress',
    array[
      'https://placehold.co/800x1066/141416/666?text=1',
      'https://placehold.co/800x1066/141416/888?text=2'
    ],
    'Elegant silk midi dress with a flattering fit.',
    'New',
    'dresses',
    array['XS', 'S', 'M', 'L', 'XL'],
    '[{"name":"Black","hex":"#0A0A0A"},{"name":"Gold","hex":"#C6A45C"}]'::jsonb
  ),
  (
    'Structured Blazer',
    'structured-blazer',
    6499,
    'https://placehold.co/400x533/141416/666?text=Blazer',
    '{}',
    null,
    null,
    'outerwear',
    array['S', 'M', 'L'],
    '[{"name":"Navy","hex":"#1e3a5f"},{"name":"Camel","hex":"#c19a6b"}]'::jsonb
  ),
  (
    'High-Waist Trousers',
    'high-waist-trousers',
    3499,
    'https://placehold.co/400x533/141416/666?text=Trousers',
    '{}',
    null,
    'Bestseller',
    'bottoms',
    array['XS', 'S', 'M', 'L', 'XL'],
    '[{"name":"Black","hex":"#0A0A0A"},{"name":"White","hex":"#FAFAFA"}]'::jsonb
  ),
  (
    'Lace Top',
    'lace-top',
    2799,
    'https://placehold.co/400x533/141416/666?text=Top',
    '{}',
    null,
    null,
    'tops',
    array['S', 'M', 'L'],
    '[{"name":"Ivory","hex":"#FFFFF0"},{"name":"Black","hex":"#0A0A0A"}]'::jsonb
  ),
  (
    'Wide-Leg Jumpsuit',
    'wide-leg-jumpsuit',
    5299,
    'https://placehold.co/400x533/141416/666?text=Jumpsuit',
    '{}',
    null,
    null,
    'bottoms',
    array['XS', 'S', 'M', 'L'],
    '[{"name":"Black","hex":"#0A0A0A"}]'::jsonb
  ),
  (
    'Embroidered Kurti',
    'embroidered-kurti',
    3299,
    'https://placehold.co/400x533/141416/666?text=Kurti',
    '{}',
    null,
    null,
    'tops',
    array['S', 'M', 'L', 'XL'],
    '[{"name":"Teal","hex":"#008080"},{"name":"Maroon","hex":"#800020"}]'::jsonb
  )
on conflict (slug) do nothing;
