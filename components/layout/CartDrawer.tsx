'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, X, Truck } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice, effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { CONFIG } from '@/constants/config';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    shippingCost,
    grandTotal,
  } = useCartStore();

  const total = totalPrice();
  const shipping = shippingCost();
  const grand = grandTotal();
  const freeShippingRemaining = CONFIG.FREE_SHIPPING_THRESHOLD - total;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <ShoppingCart size={18} className="text-primary" />
            আমার কার্ট
            {totalItems() > 0 && (
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                {totalItems()}টি পণ্য
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState
              icon={ShoppingCart}
              title="কার্ট খালি আছে"
              description="পছন্দের পণ্য কার্টে যোগ করুন"
              actionLabel="শপিং করুন"
              actionHref={ROUTES.SHOP}
            />
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            {freeShippingRemaining > 0 && (
              <div className="bg-primary/5 px-4 py-2.5">
                <p className="text-xs text-primary">
                  <Truck size={12} className="mr-1 inline" />
                  আরো{' '}
                  <strong>{formatPrice(freeShippingRemaining)}</strong> কেনাকাটা করলে
                  বিনামূল্যে ডেলিভারি পাবেন!
                </p>
                <div className="mt-1.5 h-1 rounded-full bg-primary/20">
                  <div
                    className="h-1 rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.min((total / CONFIG.FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const itemPrice = item.discountPrice ?? item.price;
                  return (
                    <div key={item.productId} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.nameBn}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-1">
                          <p className="font-display text-sm font-medium leading-tight line-clamp-2">
                            {item.nameBn}
                          </p>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                            aria-label="সরিয়ে দিন"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <QuantitySelector
                            value={item.quantity}
                            max={item.stock}
                            onChange={(q) => updateQuantity(item.productId, q)}
                            size="sm"
                          />
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(itemPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-border px-4 py-4">
              <div className="mb-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সাবটোটাল</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ডেলিভারি</span>
                  <span className={shipping === 0 ? 'text-secondary font-medium' : ''}>
                    {shipping === 0 ? 'বিনামূল্যে' : formatPrice(shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>মোট</span>
                  <span className="text-primary">{formatPrice(grand)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild className="w-full" onClick={closeDrawer}>
                  <Link href={ROUTES.CHECKOUT}>অর্ডার করুন →</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                  onClick={closeDrawer}
                >
                  <Link href={ROUTES.CART}>কার্ট দেখুন</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
