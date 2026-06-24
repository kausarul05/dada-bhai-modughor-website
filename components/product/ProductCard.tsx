'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn, formatPrice, discountPercent, effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import type { Product } from '@/types/product';

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem, isInCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const price      = effectivePrice(product);
  const hasDiscount = !!product.discountPrice;
  const pct        = hasDiscount ? discountPercent(product.price, product.discountPrice!) : 0;
  const wishlisted  = isWishlisted(product.id);
  const inCart      = isInCart(product.id);
  const outOfStock  = product.stock === 0;

  function handleCart(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id, name: product.name, nameBn: product.nameBn,
      price: product.price, discountPrice: product.discountPrice,
      image: product.thumbnailImage, quantity: 1,
      stock: product.stock, unit: product.unit,
    });
    toast.success(`${product.nameBn} কার্টে যোগ হয়েছে 🛒`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product);
    toast.success(wishlisted ? 'উইশলিস্ট থেকে সরানো হয়েছে' : '❤️ উইশলিস্টে যোগ হয়েছে');
  }

  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden border border-[#D9CEBC] bg-[#FAF4E8] transition-all duration-300 hover:-translate-y-1.5',
        'shadow-card hover:shadow-card-hover',
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#EAE0CB]" style={{ aspectRatio: '1/1' }}>
        <Image
          src={product.thumbnailImage}
          alt={product.nameBn}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        />

        {/* Top-left badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
              -{pct}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow"
              style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
              বেস্ট
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button onClick={handleWishlist}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110">
          <Heart size={14}
            className={cn(wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500')} />
        </button>

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow">
              স্টক শেষ
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-3 gap-2">
        {/* Name */}
        <p className="font-display text-sm font-semibold leading-snug line-clamp-2 text-[#1C1008]">
          {product.nameBn}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10}
                className={i < Math.round(product.rating)
                  ? 'fill-[#C8860A] text-[#C8860A]'
                  : 'fill-[#D9CEBC] text-[#D9CEBC]'} />
            ))}
          </div>
          <span className="text-[10px] text-[#7A6748]">({product.reviewCount})</span>
        </div>

        {/* Stock warning */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-[10px] font-medium text-red-500">
            মাত্র {product.stock}টি বাকি!
          </p>
        )}

        {/* Price row */}
        <div className="mt-auto flex items-end justify-between pt-1">
          <div>
            <div className="font-bold text-[#C8860A] text-base leading-none">
              {formatPrice(price)}
            </div>
            {hasDiscount && (
              <div className="text-[11px] text-[#7A6748] line-through">
                {formatPrice(product.price)}
              </div>
            )}
            <div className="text-[10px] text-[#7A6748]">/{product.unit}</div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleCart}
            disabled={outOfStock}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shadow',
              inCart
                ? 'bg-[#2D6A4F] text-white'
                : 'text-white shadow-honey'
            )}
            style={!inCart ? { background: 'linear-gradient(135deg,#F4B942,#C8860A)' } : {}}
            aria-label="কার্টে যোগ করুন">
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </Link>
  );
}