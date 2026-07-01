import { Suspense } from 'react';
import { Navigation } from '@/components/common/Navigation';
import { FeedGrid } from '@/features/posts/FeedGrid';
import { PostCardSkeleton } from '@/components/common/Skeleton';

export const metadata = { title: '피드' };

interface FeedPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const params = await searchParams;

  return (
    <>
      <Navigation />
      <div className='mx-auto max-w-[1440px] px-4 md:px-8 py-8'>
        {/* Hero Banner */}
        <div
          className='mb-8 rounded-3xl px-8 py-10 text-center overflow-hidden relative'
          style={{
            background: 'var(--color-primary)',
            border: '2.5px solid var(--color-text-body)',
            boxShadow: '6px 8px 0 var(--color-text-body)',
          }}
        >
          <div className='absolute inset-0 opacity-10'
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <h1
            className='relative text-4xl md:text-5xl font-black mb-2'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-body)' }}
          >
            PLAYFULL
          </h1>
          <p
            className='relative text-base md:text-lg'
            style={{ fontFamily: 'var(--font-handwriting)', color: 'var(--color-text-body)', fontSize: '1.2rem' }}
          >
            자유롭게 공유하고, 가볍게 소통하며, 즐겁게 머무르는 커뮤니티 ✏️
          </p>
        </div>

        {/* Feed Grid */}
        <Suspense
          key={`${params.category}-${params.page}`}
          fallback={
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
              {Array.from({ length: 8 }).map((_, i) => <PostCardSkeleton key={i} />)}
            </div>
          }
        >
          <FeedGrid category={params.category} page={Number(params.page ?? 1)} />
        </Suspense>
      </div>
    </>
  );
}
