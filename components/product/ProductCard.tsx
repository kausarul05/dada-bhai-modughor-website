'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/Rating';
import { StockBadge } from '@/components/ui/StockBadge';
import { cn, formatPrice, discountPercent, effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
  layout?: 'grid' | 'list';
}

export function ProductCard({ product, className, layout = 'grid' }: ProductCardProps) {
  const { addItem, isInCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const price = effectivePrice(product);
  const hasDiscount = !!product.discountPrice;
  const pct = hasDiscount ? discountPercent(product.price, product.discountPrice!) : 0;
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const outOfStock = product.stock === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.thumbnailImage,
      quantity: 1,
      stock: product.stock,
      unit: product.unit,
    });
    toast.success(`${product.nameBn} কার্টে যোগ হয়েছে`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product);
    toast.success(
      wishlisted ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'উইশলিস্টে যোগ হয়েছে'
    );
  }

  if (layout === 'list') {
    return (
      <Link
        href={ROUTES.PRODUCT(product.slug)}
        className={cn(
          'group flex gap-4 rounded-xl border border-border bg-surface p-3 shadow-sm transition-shadow hover:shadow-md',
          className
        )}
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={product.thumbnailImage}
            alt={product.nameBn}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="font-display text-sm font-medium line-clamp-2">{product.nameBn}</p>
            <Rating value={product.rating} showCount count={product.reviewCount} className="mt-1" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-primary">{formatPrice(price)}</span>
              {hasDiscount && (
                <span className="ml-1.5 text-xs text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={handleAddToCart} disabled={outOfStock}>
              <ShoppingCart size={14} />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-honey overflow-hidden',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.thumbnailImage}
          alt={product.nameBn}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
              -{pct}%
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-primary text-white text-xs px-1.5 py-0.5">
              বেস্ট সেলার
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm transition-transform hover:scale-110"
          aria-label="উইশলিস্টে যোগ করুন"
        >
          <Heart
            size={15}
            className={cn(
              'transition-colors',
              wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'
            )}
          />
        </button>

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-md bg-white px-3 py-1 text-xs font-medium text-gray-800">
              স্টক শেষ
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="font-display text-sm font-medium leading-snug line-clamp-2 text-foreground">
          {product.nameBn}
        </p>

        <Rating value={product.rating} showCount count={product.reviewCount} />

        <StockBadge stock={product.stock} />

        {/* Price + Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <span className="text-base font-bold text-primary">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="ml-1 text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <p className="text-xs text-muted-foreground">/{product.unit}</p>
          </div>

          <Button
            size="icon"
            className={cn(
              'h-9 w-9 rounded-lg transition-all',
              inCart ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'
            )}
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label="কার্টে যোগ করুন"
          >
            <ShoppingCart size={15} className="text-white" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
