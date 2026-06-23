// ─── Cart ───────────────────────────────────────────────
export interface CartItem {
  productId: string;
  name: string;
  nameBn: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  unit: string;
}

// ─── User ───────────────────────────────────────────────
export interface User {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

// ─── Address ────────────────────────────────────────────
export interface Address {
  id: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  area?: string;
  address: string;
  isDefault: boolean;
}

// ─── Order ──────────────────────────────────────────────
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED' | 'FAILED';

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  notes?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  nameBn: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

// ─── Review ─────────────────────────────────────────────
export interface Review {
  id: string;
  userId: string;
  user: { name?: string; avatar?: string };
  productId: string;
  rating: number;
  comment?: string;
  images: string[];
  isVerified: boolean;
  createdAt: string;
}

// ─── API Response ────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
