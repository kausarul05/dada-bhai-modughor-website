import { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { productFilterSchema } from '@/lib/validators';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { Pagination } from '@/components/ui/Pagination';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CONFIG } from '@/constants/config';
import { Prisma } from '@prisma/client';

export const metadata: Metadata = {
  title: 'সব পণ্য',
  description: 'প্রাকৃতিক ও অর্গানিক পণ্যের সম্পূর্ণ সংগ্রহ',
};

interface ShopPageProps {
  searchParams: Record<string, string>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const filters = productFilterSchema.parse(searchParams);

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(filters.category && { category: { slug: filters.category } }),
    ...(filters.search && {
      OR: [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { nameBn: { contains: filters.search, mode: 'insensitive' } },
      ],
    }),
    ...((filters.minPrice !== undefined || filters.maxPrice !== undefined) && {
      price: {
        ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
        ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
      },
    }),
    ...(filters.rating && { rating: { gte: filters.rating } }),
    ...(filters.inStock && { stock: { gt: 0 } }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters.sort === 'price_asc' ? { price: 'asc' }
    : filters.sort === 'price_desc' ? { price: 'desc' }
    : filters.sort === 'rating' ? { rating: 'desc' }
    : filters.sort === 'best_seller' ? { isBestSeller: 'desc' }
    : { createdAt: 'desc' };

  const skip = (filters.page - 1) * filters.limit;

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: filters.limit,
      include: { category: true },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
    }),
  ]);

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div className="flex gap-6">
      {/* Sidebar filters — desktop only (mobile is inside ProductFilters as Sheet) */}
      <aside className="hidden md:block">
        <ProductFilters categories={categories} />
      </aside>

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile filter button is rendered inside ProductFilters */}
            <div className="md:hidden">
              <ProductFilters categories={categories} />
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{total}</strong>টি পণ্য পাওয়া গেছে
            </p>
          </div>
          <ProductSort />
        </div>

        {/* Grid */}
        <ProductGrid products={products as any} columns={3} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumb items={[{ label: 'শপ' }]} />
      <h1 className="mb-6 font-display text-2xl font-bold md:text-3xl">সব পণ্য</h1>
      <Suspense fallback={<ProductGrid products={[]} loading skeletonCount={12} columns={3} />}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
