'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { CONFIG } from '@/constants/config';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
  shippingCost: () => number;
  grandTotal: () => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            const newQty = Math.min(existing.quantity + item.quantity, item.stock);
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: newQty } : i
              ),
              isDrawerOpen: true,
            };
          }
          return { items: [...state.items, item], isDrawerOpen: true };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(Math.max(1, quantity), i.stock) }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => {
          const price = i.discountPrice ?? i.price;
          return sum + price * i.quantity;
        }, 0),

      shippingCost: () => {
        const total = get().totalPrice();
        return total >= CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CONFIG.SHIPPING_COST;
      },

      grandTotal: () => get().totalPrice() + get().shippingCost(),

      isInCart: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: 'dada-bhai-cart', version: 1 }
  )
);
