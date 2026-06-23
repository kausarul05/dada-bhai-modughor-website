import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string>;
  basePath?: string;
}

function buildUrl(
  page: number,
  searchParams: Record<string, string> = {},
  basePath = '/shop'
): string {
  const p = new URLSearchParams(searchParams);
  p.set('page', String(page));
  return `${basePath}?${p.toString()}`;
}

export function Pagination({
  currentPage,
  totalPages,
  searchParams = {},
  basePath = '/shop',
}: PaginationProps) {
  // Build page numbers to show: always first, last, current±1
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);
  const sorted = Array.from(pages).sort((a, b) => a - b);

  return (
    <nav className="flex items-center gap-1" aria-label="পৃষ্ঠা নেভিগেশন">
      {/* Prev */}
      <Link
        href={buildUrl(currentPage - 1, searchParams, basePath)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-muted',
          currentPage <= 1 && 'pointer-events-none opacity-40'
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft size={15} />
      </Link>

      {sorted.map((page, i) => {
        const prev = sorted[i - 1];
        const showEllipsis = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">
                …
              </span>
            )}
            <Link
              href={buildUrl(page, searchParams, basePath)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                page === currentPage
                  ? 'border-primary bg-primary text-white'
                  : 'border-border hover:bg-muted'
              )}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {/* Next */}
      <Link
        href={buildUrl(currentPage + 1, searchParams, basePath)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-muted',
          currentPage >= totalPages && 'pointer-events-none opacity-40'
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight size={15} />
      </Link>
    </nav>
  );
}
