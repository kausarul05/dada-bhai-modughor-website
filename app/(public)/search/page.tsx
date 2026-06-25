import { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" এর ফলাফল` : 'সার্চ করুন',
  };
}

const LIMIT = 12;

async function SearchResults({ q, page }: { q: string; page: number }) {
  const where: any = {
    isActive: true,
    OR: [
      { name:        { contains: q, mode: 'insensitive' } },
      { nameBn:      { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { tags: { has: q } },
    ],
  };

  const skip = (page - 1) * LIMIT;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip,
      take: LIMIT,
      orderBy: { rating: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      {/* Result summary */}
      <div className="mb-6 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] px-4 py-3 flex items-center gap-3">
        <Search size={16} className="text-[#C8860A] shrink-0" />
        <p className="text-sm text-[#1C1008]">
          <strong className="text-[#C8860A]">"{q}"</strong> এর জন্য{' '}
          <strong>{total}</strong>টি পণ্য পাওয়া গেছে
        </p>
      </div>

      {/* Products */}
      <ProductGrid products={products as any} columns={4} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchParams={{ q }}
            basePath="/search"
          />
        </div>
      )}
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAE0CB]">
        <Search size={36} className="text-[#C8860A]" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-[#1C1008]">কী খুঁজছেন?</h3>
        <p className="mt-1 text-sm text-[#7A6748]">উপরের সার্চ বারে পণ্যের নাম লিখুন</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {['মধু', 'কাজু বাদাম', 'আজওয়া খেজুর', 'ঘি', 'সুন্দরবন'].map(s => (
          <a key={s} href={`/search?q=${encodeURIComponent(s)}`}
            className="rounded-full border border-[#D9CEBC] bg-[#EAE0CB] px-3 py-1 text-xs font-medium text-[#7A6748] hover:border-[#C8860A] hover:text-[#C8860A] transition-colors">
            {s}
          </a>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageStr } = await searchParams;
  const query = q?.trim() || '';
  const page  = Math.max(1, Number(pageStr || 1));

  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb items={[{ label: 'সার্চ' }]} />

        <div className="mt-3 mb-6">
          <h1 className="font-display text-2xl font-bold text-[#1C1008]">
            {query ? `সার্চ ফলাফল` : 'সার্চ করুন'}
          </h1>
        </div>

        {!query ? (
          <EmptySearch />
        ) : (
          <Suspense fallback={<ProductGrid products={[]} loading columns={4} skeletonCount={8} />}>
            <SearchResults q={query} page={page} />
          </Suspense>
        )}
      </div>
    </div>
  );
}