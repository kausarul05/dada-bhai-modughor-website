'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

interface WishlistItem {
  productId: string;
  name: string;
  nameBn: string;
  price: number;
  discountPrice?: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          if (state.items.some((i) => i.productId === product.id)) return state;
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                nameBn: product.nameBn,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.thumbnailImage,
                slug: product.slug,
              },
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      toggle: (product) => {
        const { isWishlisted, addItem, removeItem } = get();
        isWishlisted(product.id) ? removeItem(product.id) : addItem(product);
      },

      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),

      clear: () => set({ items: [] }),
    }),
    { name: 'dada-bhai-wishlist', version: 1 }
  )
);
