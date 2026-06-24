import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Hind_Siliguri } from 'next/font/google';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CONFIG } from '@/constants/config';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: CONFIG.APP_NAME,
    template: `%s | ${CONFIG.APP_NAME}`,
  },
  description: CONFIG.APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.variable} ${hindSiliguri.variable} bg-page`}>
        <Navbar />
        <main className="min-h-screen pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <CartDrawer />
        <Toaster
          position="top-center"
          toastOptions={{ style: { fontFamily: 'var(--font-hind-siliguri)' } }}
        />
      </body>
    </html>
  );
}