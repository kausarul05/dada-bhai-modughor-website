'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Heart, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const { addItem, isInCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const outOfStock = product.stock === 0;
  const wishlisted  = isWishlisted(product.id);
  const inCart      = isInCart(product.id);

  function doAddToCart() {
    addItem({
      productId: product.id, name: product.name, nameBn: product.nameBn,
      price: product.price, discountPrice: product.discountPrice,
      image: product.thumbnailImage, quantity: qty,
      stock: product.stock, unit: product.unit,
    });
    toast.success(`${product.nameBn} কার্টে যোগ হয়েছে 🛒`);
  }

  function handleBuyNow() {
    doAddToCart();
    router.push(ROUTES.CHECKOUT);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[#1C1008]">পরিমাণ</span>
        <div className="flex items-center gap-2 rounded-xl border border-[#D9CEBC] bg-[#FAF4E8] p-1">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#EAE0CB] disabled:opacity-40 transition-colors">
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty(q => Math.min(product.stock, q + 1))}
            disabled={qty >= product.stock}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#EAE0CB] disabled:opacity-40 transition-colors">
            <Plus size={13} />
          </button>
        </div>
        {product.stock > 0 && product.stock <= 10 && (
          <span className="text-xs text-red-500 font-medium">
            মাত্র {product.stock}টি বাকি!
          </span>
        )}
      </div>

      {/* Buttons row */}
      <div className="flex gap-2">
        {/* Add to cart */}
        <button
          onClick={doAddToCart}
          disabled={outOfStock}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed',
            inCart ? 'bg-[#2D6A4F]' : 'shadow-honey'
          )}
          style={!inCart ? { background: 'linear-gradient(135deg,#F4B942,#C8860A)' } : {}}>
          <ShoppingCart size={16} />
          {inCart ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            toggle(product);
            toast.success(wishlisted ? 'উইশলিস্ট থেকে সরানো হয়েছে' : '❤️ উইশলিস্টে যোগ হয়েছে');
          }}
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all hover:scale-105',
            wishlisted
              ? 'border-red-300 bg-red-50 text-red-500'
              : 'border-[#D9CEBC] bg-[#FAF4E8] text-[#7A6748] hover:border-red-300'
          )}>
          <Heart size={18} className={wishlisted ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Buy now */}
      <button
        onClick={handleBuyNow}
        disabled={outOfStock}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#C8860A] py-3 text-sm font-semibold text-[#C8860A] transition-all hover:bg-[#C8860A] hover:text-white disabled:opacity-50">
        <Zap size={16} />
        এখনই কিনুন
      </button>
    </div>
  );
}