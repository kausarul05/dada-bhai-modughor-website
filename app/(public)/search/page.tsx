import { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CONFIG } from '@/constants/config';
import { Prisma } from '@prisma/client';

interface SearchPageProps {
  searchParams: { q?: string; page?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  return { title: `"${searchParams.q || ''}" এর ফলাফল` };
}

async function SearchResults({ q, page }: { q: string; page: number }) {
  const limit = CONFIG.PRODUCTS_PER_PAGE;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    OR: [
      { name: { contains: q, mode: 'insensitive' } },
      { nameBn: { contains: q, mode: 'insensitive' } },
      { tags: { has: q } },
    ],
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, include: { category: true }, skip, take: limit }),
    prisma.product.count({ where }),
  ]);

  return (
    <>
      <SectionHeader
        title={`"${q}" এর জন্য ফলাফল`}
        subtitle={`${total}টি পণ্য পাওয়া গেছে`}
      />
      <ProductGrid products={products as any} columns={4} />
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams.q?.trim() || '';
  const page = Number(searchParams.page || 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {!q ? (
        <p className="py-16 text-center text-muted-foreground">
          কী খুঁজছেন লিখুন…
        </p>
      ) : (
        <Suspense fallback={<ProductGrid products={[]} loading columns={4} />}>
          <SearchResults q={q} page={page} />
        </Suspense>
      )}
    </div>
  );
}
