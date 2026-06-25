import { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { Pagination } from '@/components/ui/Pagination';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'সব পণ্য',
  description: 'প্রাকৃতিক ও অর্গানিক পণ্যের সম্পূর্ণ সংগ্রহ',
};

const LIMIT = 12;

interface ShopPageProps {
  searchParams: Promise<Record<string, string>>;
}

async function ShopContent({ searchParams }: { searchParams: Record<string, string> }) {
  const page     = Math.max(1, Number(searchParams.page || 1));
  const sort     = searchParams.sort || 'newest';
  const category = searchParams.category || '';
  const search   = searchParams.search || '';
  const minPrice = Number(searchParams.minPrice || 0);
  const maxPrice = Number(searchParams.maxPrice || 99999);
  const rating   = Number(searchParams.rating || 0);
  const inStock  = searchParams.inStock === 'true';

  const where: any = { isActive: true };
  if (category) where.category = { slug: category };
  if (search)   where.OR = [
    { name:   { contains: search, mode: 'insensitive' } },
    { nameBn: { contains: search, mode: 'insensitive' } },
    { tags: { has: search } },
  ];
  if (minPrice > 0 || maxPrice < 99999) {
    where.price = {};
    if (minPrice > 0)     where.price.gte = minPrice;
    if (maxPrice < 99999) where.price.lte = maxPrice;
  }
  if (rating)  where.rating = { gte: rating };
  if (inStock) where.stock  = { gt: 0 };

  const orderBy: any =
    sort === 'price_asc'   ? { price: 'asc' }
    : sort === 'price_desc'  ? { price: 'desc' }
    : sort === 'rating'      ? { rating: 'desc' }
    : sort === 'best_seller' ? { isBestSeller: 'desc' }
    : { createdAt: 'desc' };

  const skip = (page - 1) * LIMIT;

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where, orderBy, skip, take: LIMIT,
      include: { category: true },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
    }),
  ]);

  const totalPages = Math.ceil(total / LIMIT);

  // Active filter chips
  const activeFilters: { label: string; key: string }[] = [];
  if (category) {
    const cat = categories.find(c => c.slug === category);
    if (cat) activeFilters.push({ label: cat.nameBn, key: 'category' });
  }
  if (minPrice > 0 || maxPrice < 99999)
    activeFilters.push({ label: `৳${minPrice}–${maxPrice === 99999 ? '∞' : '৳' + maxPrice}`, key: 'price' });
  if (rating)  activeFilters.push({ label: `${rating}★+`, key: 'rating' });
  if (inStock) activeFilters.push({ label: 'স্টকে আছে', key: 'inStock' });
  if (search)  activeFilters.push({ label: `"${search}"`, key: 'search' });

  return (
    <>
      {/* ── Mobile: top bar (filter button + sort) ── */}
      <div className="flex items-center justify-between gap-3 mb-4 md:hidden">
        <ProductFilters categories={categories as any} mobileOnly />
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-xs text-[#7A6748]">{total}টি পণ্য</span>
          <ProductSort />
        </div>
      </div>

      {/* Active filter chips — mobile */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 md:hidden">
          {activeFilters.map(f => (
            <span key={f.key}
              className="inline-flex items-center rounded-full border border-[#C8860A]/30 bg-[#C8860A]/10 px-2.5 py-0.5 text-xs font-medium text-[#C8860A]">
              {f.label}
            </span>
          ))}
        </div>
      )}

      {/* ── Desktop: sidebar + content ── */}
      <div className="flex gap-6">
        {/* Desktop sidebar only */}
        <ProductFilters categories={categories as any} desktopOnly />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Desktop top bar */}
          <div className="hidden md:flex items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-[#7A6748]">
                <strong className="text-[#1C1008]">{total}</strong>টি পণ্য পাওয়া গেছে
              </p>
              {activeFilters.map(f => (
                <span key={f.key}
                  className="inline-flex items-center rounded-full border border-[#C8860A]/30 bg-[#C8860A]/10 px-2.5 py-0.5 text-xs font-medium text-[#C8860A]">
                  {f.label}
                </span>
              ))}
            </div>
            <ProductSort />
          </div>

          <ProductGrid products={products as any} columns={3} />

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                searchParams={searchParams}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb items={[{ label: 'শপ' }]} />

        <div className="mt-3 mb-5">
          <h1 className="font-display text-xl font-bold text-[#1C1008] md:text-3xl">
            {params.category
              ? `${params.category} পণ্য সমূহ`
              : params.search
              ? `"${params.search}" এর ফলাফল`
              : 'সব পণ্য'}
          </h1>
          <p className="mt-0.5 text-xs text-[#7A6748] md:text-sm">
            প্রাকৃতিক ও অর্গানিক পণ্যের সম্পূর্ণ সংগ্রহ
          </p>
        </div>

        <Suspense fallback={
          <ProductGrid products={[]} loading columns={3} skeletonCount={6} />
        }>
          <ShopContent searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}