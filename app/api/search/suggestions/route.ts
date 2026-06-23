import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/search/suggestions?q=
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { nameBn: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        nameBn: true,
        slug: true,
        thumbnailImage: true,
        price: true,
        discountPrice: true,
      },
      take: 6,
    });

    return NextResponse.json({ success: true, data: products });
  } catch {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
