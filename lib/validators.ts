import { z } from 'zod';

export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  inStock: z.coerce.boolean().optional(),
  search: z.string().max(100).optional(),
  sort: z
    .enum(['newest', 'price_asc', 'price_desc', 'rating', 'best_seller'])
    .optional()
    .default('newest'),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(48).optional().default(12),
});

export const addToCartSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().min(1).max(99),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export const addressSchema = z.object({
  name: z.string().min(2, 'নাম লিখুন'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'),
  division: z.string().min(1, 'বিভাগ সিলেক্ট করুন'),
  district: z.string().min(1, 'জেলা সিলেক্ট করুন'),
  upazila: z.string().min(1, 'উপজেলা লিখুন'),
  area: z.string().optional(),
  address: z.string().min(5, 'পূর্ণ ঠিকানা লিখুন'),
});

export const loginSchema = z.object({
  email: z.string().email('সঠিক ইমেইল দিন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর হতে হবে'),
  email: z.string().email('সঠিক ইমেইল দিন'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন').optional(),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'পাসওয়ার্ড মিলছে না',
  path: ['confirmPassword'],
});
