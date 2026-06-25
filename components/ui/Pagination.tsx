import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string>;
  basePath?: string;
}

function buildUrl(page: number, searchParams: Record<string, string> = {}, basePath = '/shop') {
  const p = new URLSearchParams(searchParams);
  p.set('page', String(page));
  return `${basePath}?${p.toString()}`;
}

export function Pagination({ currentPage, totalPages, searchParams = {}, basePath = '/shop' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);
  const sorted = Array.from(pages).sort((a, b) => a - b);

  return (
    <nav className="flex items-center gap-1.5" aria-label="পৃষ্ঠা নেভিগেশন">
      <Link
        href={buildUrl(currentPage - 1, searchParams, basePath)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9CEBC] bg-[#FAF4E8] text-sm transition-colors hover:bg-[#EAE0CB] hover:text-[#C8860A]',
          currentPage <= 1 && 'pointer-events-none opacity-40'
        )}
        aria-disabled={currentPage <= 1}>
        <ChevronLeft size={15} />
      </Link>

      {sorted.map((page, i) => {
        const prev = sorted[i - 1];
        const gap = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {gap && (
              <span className="flex h-9 w-9 items-center justify-center text-sm text-[#7A6748]">…</span>
            )}
            <Link
              href={buildUrl(page, searchParams, basePath)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition-all',
                page === currentPage
                  ? 'border-[#C8860A] text-white shadow-honey'
                  : 'border-[#D9CEBC] bg-[#FAF4E8] text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]'
              )}
              style={page === currentPage ? { background: 'linear-gradient(135deg,#F4B942,#C8860A)' } : {}}>
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildUrl(currentPage + 1, searchParams, basePath)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9CEBC] bg-[#FAF4E8] text-sm transition-colors hover:bg-[#EAE0CB] hover:text-[#C8860A]',
          currentPage >= totalPages && 'pointer-events-none opacity-40'
        )}
        aria-disabled={currentPage >= totalPages}>
        <ChevronRight size={15} />
      </Link>
    </nav>
  );
}