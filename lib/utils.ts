import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CONFIG } from '@/constants/config';

// Shadcn className utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price in BDT
export function formatPrice(amount: number): string {
  return `${CONFIG.CURRENCY}${amount.toLocaleString('bn-BD')}`;
}

// Calculate discount percentage
export function discountPercent(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

// Effective price (discounted or original)
export function effectivePrice(product: {
  price: number;
  discountPrice?: number | null;
}): number {
  return product.discountPrice ?? product.price;
}

// Truncate text
export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

// Stock status
export function stockStatus(stock: number): {
  label: string;
  color: string;
  available: boolean;
} {
  if (stock === 0) return { label: 'স্টক শেষ', color: 'destructive', available: false };
  if (stock <= 5) return { label: `মাত্র ${stock}টি বাকি`, color: 'warning', available: true };
  return { label: 'স্টকে আছে', color: 'success', available: true };
}

// Slugify
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}

// Generate order number
export function generateOrderNumber(): string {
  return `DB${Date.now().toString().slice(-8)}`;
}

// Format date in Bengali
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
