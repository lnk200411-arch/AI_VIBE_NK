import { fetchPosts } from '@/services/postsService';
import { PostCard } from '@/components/common/PostCard';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

interface FeedGridProps {
  category?: string;
  page: number;
}

export async function FeedGrid({ category, page }: FeedGridProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const sort = category === 'popular' ? 'popular' : 'recent';
  const { data: posts, meta } = await fetchPosts({ page, category, sort });

  if (!posts || posts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-center'>
        <span className='text-6xl mb-4'>📭</span>
        <p className='text-lg font-bold' style={{ color: 'var(--color-text-body)' }}>
          아직 게시글이 없어요
        </p>
        <p className='text-sm mt-1 mb-6' style={{ color: 'var(--color-text-muted)' }}>
          첫 번째 게시글을 작성해보세요!
        </p>
        {user && (
          <Link
            href='/write'
            className='rounded-2xl px-6 py-3 font-bold text-sm'
            style={{
              background: 'var(--color-primary)',
              border: '2px solid var(--color-text-body)',
              boxShadow: '3px 3px 0 var(--color-text-body)',
              color: 'var(--color-text-body)',
            }}
          >
            글쓰기 ✏️
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 mt-10'>
          {Array.from({ length: meta.totalPages }).map((_, i) => {
            const p = i + 1;
            const isActive = p === meta.page;
            const href = `/feed?${category ? `category=${category}&` : ''}page=${p}`;
            return (
              <Link
                key={p}
                href={href}
                aria-label={`${p} 페이지`}
                aria-current={isActive ? 'page' : undefined}
                className='h-9 w-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all'
                style={
                  isActive
                    ? {
                        background: 'var(--color-primary)',
                        border: '2px solid var(--color-text-body)',
                        boxShadow: '2px 2px 0 var(--color-text-body)',
                        color: 'var(--color-text-body)',
                      }
                    : {
                        background: 'var(--color-surface)',
                        border: '2px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }
                }
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
