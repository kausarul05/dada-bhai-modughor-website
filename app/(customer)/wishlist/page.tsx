'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem, isInCart } = useCartStore();

  function handleAddToCart(item: typeof items[0]) {
    addItem({
      productId: item.productId,
      name: item.name,
      nameBn: item.nameBn,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1,
      stock: 99,
      unit: 'পিস',
    });
    toast.success(`${item.nameBn} কার্টে যোগ হয়েছে 🛒`);
  }

  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-4xl px-4 py-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#1C1008]">
              আমার উইশলিস্ট
            </h1>
            <p className="text-sm text-[#7A6748]">{items.length}টি পণ্য সেভ করা আছে</p>
          </div>
          {items.length > 0 && (
            <Link href="/shop"
              className="text-sm font-medium text-[#C8860A] hover:underline flex items-center gap-1">
              শপিং চালিয়ে যান <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAE0CB]">
              <Heart size={36} className="text-[#C8860A]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[#1C1008]">
                উইশলিস্ট খালি আছে
              </h3>
              <p className="mt-1 text-sm text-[#7A6748]">
                পছন্দের পণ্যে ❤️ চাপলে এখানে সেভ হবে
              </p>
            </div>
            <Link href="/shop"
              className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-honey"
              style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
              পণ্য দেখুন →
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(item => {
              const price = item.discountPrice ?? item.price;
              const inCart = isInCart(item.productId);
              return (
                <div key={item.productId}
                  className="group flex flex-col rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] overflow-hidden shadow-card hover:shadow-card-hover transition-all">

                  {/* Image */}
                  <Link href={ROUTES.PRODUCT(item.slug)} className="relative block overflow-hidden bg-[#EAE0CB]" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={item.image}
                      alt={item.nameBn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-3 p-3">
                    <Link href={ROUTES.PRODUCT(item.slug)}>
                      <p className="font-display text-sm font-semibold text-[#1C1008] line-clamp-2 hover:text-[#C8860A] transition-colors">
                        {item.nameBn}
                      </p>
                    </Link>

                    <div>
                      <span className="font-bold text-[#C8860A]">{formatPrice(price)}</span>
                      {item.discountPrice && (
                        <span className="ml-2 text-xs text-[#7A6748] line-through">{formatPrice(item.price)}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
                        style={{
                          background: inCart
                            ? '#2D6A4F'
                            : 'linear-gradient(135deg,#F4B942,#C8860A)'
                        }}>
                        <ShoppingCart size={13} />
                        {inCart ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                      </button>
                      <button
                        onClick={() => {
                          removeItem(item.productId);
                          toast.success('উইশলিস্ট থেকে সরানো হয়েছে');
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] text-[#7A6748] hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}