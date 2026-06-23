import api from './api';
import type { ProductFilters, ProductListResponse, Product } from '@/types/product';

export const productService = {
  // Get product list with filters
  getProducts: async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.set(key, String(value));
    });
    const { data } = await api.get(`/products?${params.toString()}`);
    return data.data;
  },

  // Get single product by slug
  getProduct: async (slug: string): Promise<Product> => {
    const { data } = await api.get(`/products/${slug}`);
    return data.data;
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    const { data } = await api.get('/products?isFeatured=true&limit=8');
    return data.data.products;
  },

  // Get best sellers
  getBestSellers: async (): Promise<Product[]> => {
    const { data } = await api.get('/products?sort=best_seller&limit=8');
    return data.data.products;
  },

  // Get related products
  getRelated: async (productId: string, categoryId: string): Promise<Product[]> => {
    const { data } = await api.get(
      `/products?category=${categoryId}&limit=6&exclude=${productId}`
    );
    return data.data.products;
  },

  // Search suggestions
  getSuggestions: async (query: string): Promise<Product[]> => {
    const { data } = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
    return data.data;
  },
};
