import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[slug]
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug, isActive: true },
      include: {
        category: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'পণ্য পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('[GET /api/products/[slug]]', error);
    return NextResponse.json(
      { success: false, message: 'সমস্যা হয়েছে, আবার চেষ্টা করুন' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[slug]  [Admin]
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const product = await prisma.product.update({
      where: { slug: params.slug },
      data: {
        ...body,
        price: body.price ? parseFloat(body.price) : undefined,
        discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
      },
      include: { category: true },
    });
    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json(
      { success: false, message: 'আপডেট করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[slug]  [Admin]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.product.update({
      where: { slug: params.slug },
      data: { isActive: false }, // soft delete
    });
    return NextResponse.json({ success: true, message: 'পণ্য মুছে ফেলা হয়েছে' });
  } catch {
    return NextResponse.json(
      { success: false, message: 'মুছতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
