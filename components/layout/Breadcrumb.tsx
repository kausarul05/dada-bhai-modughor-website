import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb"
      className="flex items-center gap-1 text-xs text-[#7A6748] flex-wrap">
      <Link href="/" className="flex items-center gap-1 hover:text-[#C8860A] transition-colors">
        <Home size={12} /> হোম
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={11} className="text-[#D9CEBC]" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#C8860A] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1C1008] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}