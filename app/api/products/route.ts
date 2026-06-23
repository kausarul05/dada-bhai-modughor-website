import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productFilterSchema } from '@/lib/validators';
import { Prisma } from '@prisma/client';

// GET /api/products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams.entries());
    const filters = productFilterSchema.parse(params);

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(filters.category && {
        category: { slug: filters.category },
      }),
      ...(filters.search && {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { nameBn: { contains: filters.search, mode: 'insensitive' } },
          { tags: { has: filters.search } },
        ],
      }),
      ...(filters.minPrice !== undefined || filters.maxPrice !== undefined
        ? {
            price: {
              ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
              ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
            },
          }
        : {}),
      ...(filters.rating && { rating: { gte: filters.rating } }),
      ...(filters.inStock && { stock: { gt: 0 } }),
      // exclude a product (for related)
      ...(params.exclude && { NOT: { id: params.exclude } }),
      // featured filter
      ...(params.isFeatured === 'true' && { isFeatured: true }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      filters.sort === 'price_asc'
        ? { price: 'asc' }
        : filters.sort === 'price_desc'
        ? { price: 'desc' }
        : filters.sort === 'rating'
        ? { rating: 'desc' }
        : filters.sort === 'best_seller'
        ? { isBestSeller: 'desc' }
        : { createdAt: 'desc' };

    const skip = (filters.page - 1) * filters.limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: filters.limit,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json(
      { success: false, message: 'পণ্য লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// POST /api/products  [Admin only — auth middleware add করবেন]
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        price: parseFloat(body.price),
        discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
      },
      include: { category: true },
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/products]', error);
    return NextResponse.json(
      { success: false, message: 'পণ্য তৈরি করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
