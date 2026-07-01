'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchResults } from '@/features/search/SearchResults';
import { PostCardSkeleton } from '@/components/common/Skeleton';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  return (
    <div className='mx-auto max-w-[1440px] px-4 md:px-8 py-8'>
      <h1 className='text-xl font-black mb-2' style={{ color: 'var(--color-text-body)' }}>
        검색 결과
      </h1>
      {query && (
        <p className='text-sm mb-6' style={{ color: 'var(--color-text-muted)' }}>
          <span className='font-bold' style={{ color: 'var(--color-accent)' }}>"{query}"</span>에 대한 검색 결과
        </p>
      )}
      <SearchResults query={query} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className='mx-auto max-w-[1440px] px-4 md:px-8 py-8'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
