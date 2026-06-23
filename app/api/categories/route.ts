import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
    });
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json(
      { success: false, message: 'ক্যাটাগরি লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// POST /api/categories  [Admin]
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = await prisma.category.create({ data: body });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: 'ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
