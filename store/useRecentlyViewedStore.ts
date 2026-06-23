'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentItem {
  productId: string;
  name: string;
  nameBn: string;
  price: number;
  discountPrice?: number;
  image: string;
  slug: string;
  viewedAt: number;
}

interface RecentlyViewedStore {
  items: RecentItem[];
  addItem: (item: Omit<RecentItem, 'viewedAt'>) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const filtered = state.items.filter((i) => i.productId !== item.productId);
          const updated = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, 10);
          return { items: updated };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: 'dada-bhai-recently-viewed', version: 1 }
  )
);
