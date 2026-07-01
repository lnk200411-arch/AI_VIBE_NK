'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const categories = [
  { label: '전체', slug: 'all', href: '/feed' },
  { label: '🔥 인기글', slug: 'popular', href: '/feed?category=popular' },
  { label: '✨ 최신글', slug: 'recent', href: '/feed?category=recent' },
  { label: '📷 사진', slug: 'photos', href: '/feed?category=photos' },
  { label: '💬 자유게시판', slug: 'free', href: '/feed?category=free' },
  { label: '📌 공지사항', slug: 'notice', href: '/feed?category=notice' },
];

function NavigationInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'all';

  const isActive = (slug: string) => {
    if (slug === 'all') return pathname === '/feed' && !searchParams.get('category');
    return currentCategory === slug;
  };

  return (
    <nav
      aria-label='카테고리'
      className='sticky top-16 z-40 w-full overflow-x-auto'
      style={{ background: 'var(--color-surface)', borderBottom: '2px solid var(--color-border)' }}
    >
      <ul className='flex items-center gap-1 px-4 md:px-8 mx-auto max-w-[1440px] py-2 whitespace-nowrap'>
        {categories.map((cat) => {
          const active = isActive(cat.slug);
          return (
            <li key={cat.slug}>
              <Link
                href={cat.href}
                aria-current={active ? 'page' : undefined}
                className='inline-block rounded-2xl px-4 py-1.5 text-sm font-medium transition-all'
                style={
                  active
                    ? {
                        background: 'var(--color-primary)',
                        color: 'var(--color-text-body)',
                        border: '2px solid var(--color-text-body)',
                        boxShadow: '2px 2px 0 var(--color-text-body)',
                        fontWeight: 700,
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--color-text-muted)',
                        border: '2px solid transparent',
                      }
                }
              >
                {cat.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Navigation() {
  return (
    <Suspense fallback={<div className='h-10 sticky top-16 z-40' style={{ background: 'var(--color-surface)' }} />}>
      <NavigationInner />
    </Suspense>
  );
}
