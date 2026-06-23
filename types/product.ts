export interface Product {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string;
  descriptionBn?: string;
  price: number;
  discountPrice?: number;
  sku: string;
  stock: number;
  weight?: number;
  unit: string;
  images: string[];
  thumbnailImage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  categoryId: string;
  category: Category;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  _count?: { products: number };
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  search?: string;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

export type ProductSort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'rating'
  | 'best_seller';

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
