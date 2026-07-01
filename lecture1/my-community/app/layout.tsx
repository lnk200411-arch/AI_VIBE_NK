import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/common/Providers';
import { Toaster } from '@/components/common/Toaster';

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PLAYFUL COMMUNITY',
    template: '%s | PLAYFUL COMMUNITY',
  },
  description: '자유롭게 공유하고, 가볍게 소통하며, 즐겁게 머무르는 커뮤니티',
  keywords: ['커뮤니티', '소통', '공유', '갤러리'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={notoSans.variable} suppressHydrationWarning>
      <body className='min-h-screen antialiased' style={{ background: 'var(--color-bg)' }}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
