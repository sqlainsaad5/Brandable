# BRANDABLE

Next.js storefront for women's western wear (Pakistan, PKR, Cash on Delivery).

## Stack

- Next.js 14 (App Router)
- Supabase (products, orders, auth, storage)
- Tailwind CSS + Framer Motion

## Local setup

1. Copy env template:

```bash
cp .env.example .env.local
```

2. Fill in Supabase keys from Project Settings → API.

3. In Supabase SQL Editor, run:

- `supabase/schema.sql`
- `supabase/orders.sql`
- optionally `supabase/security-hardening.sql`

4. Create a public Storage bucket named `product-images`.

5. Create one admin user in Authentication → Users, then **disable public signups**.

6. Install and run:

```bash
npm install
npm run dev
```

## Vercel deploy checklist

1. Import the GitHub repo into Vercel (Framework: Next.js).
2. Set Environment Variables (Production):

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes |
| `NEXT_PUBLIC_SITE_URL` | Yes — your live URL, e.g. `https://brandable.in` (no trailing slash) |

3. Deploy.
4. **Turn off Vercel Deployment Protection** for Production (otherwise WhatsApp/Facebook cannot read OG tags).
5. Smoke test: home → product → checkout COD → confirmation → `/admin/login` → orders.

## WhatsApp / OG preview

Share image is `public/og-image.jpg` (1200×630). After deploy, if an old preview appears, refresh via [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
