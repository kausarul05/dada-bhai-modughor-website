'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { effectivePrice } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const outOfStock = product.stock === 0;
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      nameBn: product.nameBn,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.thumbnailImage,
      quantity,
      stock: product.stock,
      unit: product.unit,
    });
    toast.success(`${product.nameBn} কার্টে যোগ হয়েছে`);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push(ROUTES.CHECKOUT);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">পরিমাণ</span>
        <QuantitySelector
          value={quantity}
          max={product.stock}
          onChange={setQuantity}
          disabled={outOfStock}
        />
        {product.stock > 0 && product.stock <= 10 && (
          <span className="text-xs text-destructive">মাত্র {product.stock}টি বাকি!</span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2">
        <Button
          className={cn(
            'flex-1 gap-2',
            inCart ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'
          )}
          onClick={handleAddToCart}
          disabled={outOfStock}
          size="lg"
        >
          <ShoppingCart size={16} />
          {inCart ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            'h-11 w-11',
            wishlisted && 'border-red-400 bg-red-50 text-red-500'
          )}
          onClick={() => {
            toggle(product);
            toast.success(wishlisted ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'উইশলিস্টে যোগ হয়েছে');
          }}
          aria-label="উইশলিস্ট"
        >
          <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
        </Button>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white"
        onClick={handleBuyNow}
        disabled={outOfStock}
      >
        <Zap size={16} />
        এখনই কিনুন
      </Button>
    </div>
  );
}
