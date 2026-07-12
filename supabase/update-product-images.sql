-- Update product images to local /public assets
-- 1) Put files in: public/images/products/
-- 2) Match filenames below (or edit paths)
-- 3) Run in Supabase → SQL Editor

update public.products
set image = '/images/products/silk-midi-dress.jpg',
    images = array['/images/products/silk-midi-dress.jpg']
where slug = 'silk-midi-dress';

update public.products
set image = '/images/products/structured-blazer.jpg',
    images = array['/images/products/structured-blazer.jpg']
where slug = 'structured-blazer';

update public.products
set image = '/images/products/high-waist-trousers.jpg',
    images = array['/images/products/high-waist-trousers.jpg']
where slug = 'high-waist-trousers';

update public.products
set image = '/images/products/lace-top.jpg',
    images = array['/images/products/lace-top.jpg']
where slug = 'lace-top';

update public.products
set image = '/images/products/wide-leg-jumpsuit.jpg',
    images = array['/images/products/wide-leg-jumpsuit.jpg']
where slug = 'wide-leg-jumpsuit';

update public.products
set image = '/images/products/embroidered-kurti.jpg',
    images = array['/images/products/embroidered-kurti.jpg']
where slug = 'embroidered-kurti';
