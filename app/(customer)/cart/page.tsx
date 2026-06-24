'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, ArrowRight, Truck, Tag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { CONFIG } from '@/constants/config';
import { ROUTES } from '@/constants/routes';

export default function CartPage() {
  const {
    items, removeItem, updateQuantity,
    totalPrice, shippingCost, grandTotal, clearCart,
  } = useCartStore();

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const total    = totalPrice();
  const shipping = shippingCost();
  const grand    = grandTotal();
  const freeShippingLeft = CONFIG.FREE_SHIPPING_THRESHOLD - total;

  function handleCoupon() {
    if (coupon.toUpperCase() === 'DADA10') {
      setCouponApplied(true);
      toast.success('কুপন কোড প্রয়োগ হয়েছে! ১০% ছাড় পেয়েছেন 🎉');
    } else {
      toast.error('কুপন কোড সঠিক নয়');
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F2E8D5] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EAE0CB]">
            <ShoppingCart size={40} className="text-[#C8860A]" />
          </div>
          <h2 className="font-display text-xl font-bold text-[#1C1008]">কার্ট খালি আছে</h2>
          <p className="text-sm text-[#7A6748]">পছন্দের পণ্য কার্টে যোগ করুন</p>
          <Link href="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-honey"
            style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
            শপিং শুরু করুন →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-6xl px-4 py-6">

        <h1 className="font-display text-2xl font-bold text-[#1C1008] mb-6">
          আমার কার্ট ({items.length}টি পণ্য)
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* ── Left: Cart Items ── */}
          <div className="flex flex-col gap-3">

            {/* Free shipping progress */}
            {freeShippingLeft > 0 && (
              <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={16} className="text-[#C8860A]" />
                  <p className="text-sm text-[#1C1008]">
                    আরো <strong className="text-[#C8860A]">{formatPrice(freeShippingLeft)}</strong> কেনাকাটা করলে ফ্রি ডেলিভারি!
                  </p>
                </div>
                <div className="h-2 rounded-full bg-[#EAE0CB] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F4B942] to-[#C8860A] transition-all"
                    style={{ width: `${Math.min((total / CONFIG.FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }} />
                </div>
              </div>
            )}
            {freeShippingLeft <= 0 && (
              <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-3">
                <Truck size={16} className="text-green-600" />
                <p className="text-sm font-medium text-green-700">🎉 আপনি ফ্রি ডেলিভারি পাচ্ছেন!</p>
              </div>
            )}

            {/* Items */}
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] divide-y divide-[#EAE0CB]">
              {items.map(item => {
                const price = item.discountPrice ?? item.price;
                return (
                  <div key={item.productId} className="flex gap-3 p-4">
                    {/* Image */}
                    <Link href={ROUTES.PRODUCT(item.productId)} className="shrink-0">
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[#EAE0CB]">
                        <Image src={item.image} alt={item.nameBn} fill className="object-cover" sizes="80px" />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-sm font-semibold text-[#1C1008] line-clamp-2">
                          {item.nameBn}
                        </p>
                        <button
                          onClick={() => {
                            removeItem(item.productId);
                            toast.success('পণ্য সরানো হয়েছে');
                          }}
                          className="shrink-0 rounded-lg p-1 text-[#7A6748] hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-[#7A6748]">{item.unit}</p>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-1.5 rounded-lg border border-[#D9CEBC] bg-[#EAE0CB] p-0.5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold hover:bg-[#D9CEBC] disabled:opacity-40 transition-colors">
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold hover:bg-[#D9CEBC] disabled:opacity-40 transition-colors">
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <span className="font-bold text-[#C8860A]">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear cart */}
            <button
              onClick={() => {
                clearCart();
                toast.success('কার্ট খালি করা হয়েছে');
              }}
              className="self-start text-xs text-[#7A6748] hover:text-red-500 underline transition-colors">
              কার্ট খালি করুন
            </button>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="flex flex-col gap-4">

            {/* Coupon */}
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4">
              <p className="text-sm font-semibold text-[#1C1008] mb-3 flex items-center gap-2">
                <Tag size={15} className="text-[#C8860A]" /> কুপন কোড
              </p>
              {couponApplied ? (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2">
                  <span className="text-sm font-medium text-green-700">✓ DADA10 প্রয়োগ হয়েছে — ১০% ছাড়</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="কুপন কোড লিখুন"
                    className="flex-1 rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-3 py-2 text-sm placeholder:text-[#7A6748] focus:outline-none focus:border-[#C8860A] focus:ring-1 focus:ring-[#C8860A]"
                    onKeyDown={e => e.key === 'Enter' && handleCoupon()}
                  />
                  <button
                    onClick={handleCoupon}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                    প্রয়োগ
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4">
              <h2 className="font-display text-base font-bold text-[#1C1008] mb-4">
                অর্ডার সারসংক্ষেপ
              </h2>

              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#7A6748]">সাবটোটাল</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>কুপন ছাড় (১০%)</span>
                    <span>-{formatPrice(total * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#7A6748]">ডেলিভারি চার্জ</span>
                  <span className={shipping === 0 ? 'font-medium text-green-600' : 'font-medium'}>
                    {shipping === 0 ? 'বিনামূল্যে' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="my-1 border-t border-[#D9CEBC]" />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-[#1C1008]">সর্বমোট</span>
                  <span className="text-[#C8860A]">
                    {formatPrice(couponApplied ? grand - (total * 0.1) : grand)}
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              <Link href={ROUTES.CHECKOUT}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-honey transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                অর্ডার করুন <ArrowRight size={16} />
              </Link>

              <Link href="/shop"
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border border-[#D9CEBC] py-3 text-sm font-medium text-[#7A6748] hover:bg-[#EAE0CB] transition-colors">
                শপিং চালিয়ে যান
              </Link>

              {/* Trust */}
              <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#7A6748]">
                <span>✓ নিরাপদ পেমেন্ট গেটওয়ে</span>
                <span>✓ ৭ দিনের রিটার্ন গ্যারান্টি</span>
                <span>✓ ১০০% বিশুদ্ধ পণ্যের নিশ্চয়তা</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}