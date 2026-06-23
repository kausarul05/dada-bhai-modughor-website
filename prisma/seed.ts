// Prisma v7 earlyAccess mode fix
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const honey = await prisma.category.upsert({
    where: { slug: 'honey' },
    update: {},
    create: {
      name: 'Honey',
      nameBn: 'মধু',
      slug: 'honey',
      description: 'Pure natural honey from Sundarbans and flower gardens',
      sortOrder: 1,
      isActive: true,
    },
  });

  const nuts = await prisma.category.upsert({
    where: { slug: 'nuts' },
    update: {},
    create: {
      name: 'Nuts',
      nameBn: 'বাদাম',
      slug: 'nuts',
      description: 'Premium quality cashews, walnuts, almonds and more',
      sortOrder: 2,
      isActive: true,
    },
  });

  const dates = await prisma.category.upsert({
    where: { slug: 'dates' },
    update: {},
    create: {
      name: 'Dates',
      nameBn: 'খেজুর',
      slug: 'dates',
      description: 'Premium Ajwa, Medjool and other varieties of dates',
      sortOrder: 3,
      isActive: true,
    },
  });

  const ghee = await prisma.category.upsert({
    where: { slug: 'ghee' },
    update: {},
    create: {
      name: 'Ghee',
      nameBn: 'ঘি',
      slug: 'ghee',
      description: 'Pure desi cow ghee',
      sortOrder: 4,
      isActive: true,
    },
  });

  console.log('✅ Categories created');

  const products = [
    {
      name: 'Sundarban Pure Honey',
      nameBn: 'সুন্দরবনের বিশুদ্ধ মধু',
      slug: 'sundarban-pure-honey',
      description: 'Pure raw honey collected directly from the mangrove forests of Sundarbans.',
      descriptionBn: 'সুন্দরবনের গহীন জঙ্গল থেকে সংগ্রহ করা বিশুদ্ধ কাঁচা মধু।',
      price: 850,
      discountPrice: 750,
      sku: 'HNY-001',
      stock: 50,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      categoryId: honey.id,
      tags: ['মধু', 'সুন্দরবন', 'বিশুদ্ধ'],
      rating: 4.9,
      reviewCount: 128,
    },
    {
      name: 'Mustard Flower Honey',
      nameBn: 'সরিষা ফুলের মধু',
      slug: 'mustard-flower-honey',
      description: 'Light golden honey collected from mustard flower fields.',
      descriptionBn: 'সরিষা ফুলের মৌসুমে সংগ্রহ করা হালকা সোনালি রঙের মধু।',
      price: 650,
      discountPrice: null,
      sku: 'HNY-002',
      stock: 35,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
      isFeatured: true,
      isBestSeller: false,
      isActive: true,
      categoryId: honey.id,
      tags: ['মধু', 'সরিষা'],
      rating: 4.7,
      reviewCount: 64,
    },
    {
      name: 'Premium Cashew Nuts',
      nameBn: 'প্রিমিয়াম কাজু বাদাম',
      slug: 'premium-cashew-nuts',
      description: 'W240 grade whole cashew nuts, crunchy and fresh.',
      descriptionBn: 'W240 গ্রেডের পূর্ণ কাজু বাদাম। মুচমুচে, তাজা ও পুষ্টিগুণে ভরপুর।',
      price: 1200,
      discountPrice: 1050,
      sku: 'NUT-001',
      stock: 40,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1596591868231-05e808f082b4?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1596591868231-05e808f082b4?w=400',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      categoryId: nuts.id,
      tags: ['বাদাম', 'কাজু'],
      rating: 4.8,
      reviewCount: 96,
    },
    {
      name: 'Walnut Kernels',
      nameBn: 'আখরোট বাদাম',
      slug: 'walnut-kernels',
      description: 'Premium walnut kernels rich in omega-3 fatty acids.',
      descriptionBn: 'ওমেগা-৩ ফ্যাটি অ্যাসিড সমৃদ্ধ আখরোট বাদাম।',
      price: 980,
      discountPrice: null,
      sku: 'NUT-002',
      stock: 30,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1563412885-139e4045ec52?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400',
      isFeatured: false,
      isBestSeller: true,
      isActive: true,
      categoryId: nuts.id,
      tags: ['বাদাম', 'আখরোট'],
      rating: 4.6,
      reviewCount: 54,
    },
    {
      name: 'Ajwa Dates',
      nameBn: 'আজওয়া খেজুর',
      slug: 'ajwa-dates',
      description: 'Premium Ajwa dates from Madinah.',
      descriptionBn: 'মদিনা মুনাওয়ারার বিখ্যাত আজওয়া খেজুর।',
      price: 2200,
      discountPrice: 1999,
      sku: 'DT-001',
      stock: 25,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1600626329741-2e5d01ae52cc?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1600626329741-2e5d01ae52cc?w=400',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      categoryId: dates.id,
      tags: ['খেজুর', 'আজওয়া'],
      rating: 5.0,
      reviewCount: 142,
    },
    {
      name: 'Medjool Dates',
      nameBn: 'মেডজুল খেজুর',
      slug: 'medjool-dates',
      description: 'King of dates, large soft and caramel-flavored.',
      descriptionBn: 'খেজুরের রাজা মেডজুল।',
      price: 1800,
      discountPrice: 1650,
      sku: 'DT-002',
      stock: 30,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
      isFeatured: true,
      isBestSeller: false,
      isActive: true,
      categoryId: dates.id,
      tags: ['খেজুর', 'মেডজুল'],
      rating: 4.9,
      reviewCount: 88,
    },
    {
      name: 'Pure Desi Cow Ghee',
      nameBn: 'খাঁটি দেশি গাভীর ঘি',
      slug: 'pure-desi-cow-ghee',
      description: 'Hand-churned pure ghee from grass-fed desi cows.',
      descriptionBn: 'দেশি গাভীর দুধ থেকে তৈরি খাঁটি ঘি।',
      price: 1500,
      discountPrice: 1350,
      sku: 'GHE-001',
      stock: 15,
      weight: 500,
      unit: '৫০০গ্রাম',
      images: ['https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600'],
      thumbnailImage: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      categoryId: ghee.id,
      tags: ['ঘি', 'দেশি'],
      rating: 4.9,
      reviewCount: 76,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`  ✓ ${product.nameBn}`);
  }

  console.log(`\n✅ ${products.length} products seeded`);
  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });