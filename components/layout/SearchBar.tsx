'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';

import { useDebounce } from '@/hooks/useDebounce';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { productService } from '@/services/productService';
import { formatPrice, effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ className, placeholder = 'মধু, বাদাম, ঘি... খুঁজুন' }: SearchBarProps) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 350);

  useOutsideClick(wrapRef, () => setOpen(false));

  // Fetch suggestions
  useState(() => {
    if (debounced.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    productService
      .getSuggestions(debounced)
      .then((data) => {
        setSuggestions(data);
        setOpen(true);
      })
      .finally(() => setLoading(false));
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Search
            size={16}
            className="absolute left-3 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder={placeholder}
            className="w-full rounded-full border border-border bg-muted/40 py-2 pl-9 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {loading ? (
            <Loader2
              size={14}
              className="absolute right-3 animate-spin text-muted-foreground"
            />
          ) : query ? (
            <button
              type="button"
              onClick={() => { setQuery(''); setSuggestions([]); setOpen(false); }}
              className="absolute right-3 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-xl border border-border bg-white shadow-lg overflow-hidden">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={ROUTES.PRODUCT(product.slug)}
              onClick={() => { setOpen(false); setQuery(''); }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={product.thumbnailImage}
                  alt={product.nameBn}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.nameBn}</p>
                <p className="text-xs text-primary font-semibold">
                  {formatPrice(effectivePrice(product))}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 border-t border-border px-3 py-2.5 text-xs text-primary hover:bg-muted/30"
          >
            <Search size={12} />
            "{query}" এর জন্য সব ফলাফল দেখুন
          </Link>
        </div>
      )}
    </div>
  );
}
