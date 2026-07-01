import { fetchPosts } from '@/services/postsService';
import { PostCard } from '@/components/common/PostCard';
import Link from 'next/link';

export async function SearchResults({ query }: { query: string }) {
  if (!query.trim()) {
    return (
      <div className='py-20 text-center'>
        <span className='text-5xl mb-4 block'>🔍</span>
        <p className='text-sm' style={{ color: 'var(--color-text-muted)' }}>검색어를 입력해주세요</p>
      </div>
    );
  }

  const { data: posts } = await fetchPosts({ search: query, sort: 'recent' });

  if (!posts?.length) {
    return (
      <div className='py-20 text-center'>
        <span className='text-5xl mb-4 block'>😅</span>
        <p className='font-bold mb-1' style={{ color: 'var(--color-text-body)' }}>검색 결과가 없어요</p>
        <p className='text-sm mb-6' style={{ color: 'var(--color-text-muted)' }}>다른 키워드로 검색해보세요</p>
        <Link href='/feed'
          className='rounded-2xl px-6 py-3 font-bold text-sm'
          style={{ background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }}>
          피드 보기
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
    </div>
  );
}
