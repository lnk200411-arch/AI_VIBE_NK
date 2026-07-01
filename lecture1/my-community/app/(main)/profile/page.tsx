'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { PostCard } from '@/components/common/PostCard';
import { PostCardSkeleton } from '@/components/common/Skeleton';
import { User } from 'lucide-react';
import type { Post, ProfileRow } from '@/types';

function ProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const supabase = createClient();

  const { data: profile, isLoading: profileLoading } = useQuery<ProfileRow | null>({
    queryKey: ['profile', id],
    queryFn: async () => {
      const { data } = await supabase.from('profiles').select('*').eq('user_id', id).single();
      return data;
    },
    enabled: !!id,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['userPosts', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('posts')
        .select('*, profiles!posts_user_id_fkey(nickname, avatar_url), categories(name, slug), post_images(id, url, sort_order)')
        .eq('user_id', id)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      return (data ?? []) as unknown as Post[];
    },
    enabled: !!id,
  });

  if (!id) return (
    <div className='flex flex-col items-center justify-center py-24'>
      <span className='text-5xl mb-3'>👤</span>
      <p className='font-bold' style={{ color: 'var(--color-text-body)' }}>사용자 ID가 없어요</p>
    </div>
  );

  if (profileLoading) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-8'>
        <div className='skeleton h-32 w-full rounded-3xl mb-6' />
        <div className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!profile) return (
    <div className='flex flex-col items-center justify-center py-24'>
      <span className='text-5xl mb-3'>👤</span>
      <p className='font-bold' style={{ color: 'var(--color-text-body)' }}>존재하지 않는 사용자입니다.</p>
    </div>
  );

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-5'
        style={{ background: 'var(--color-surface)', border: '2.5px solid var(--color-text-body)', boxShadow: '5px 6px 0 var(--color-text-body)' }}>
        <div className='h-20 w-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-2xl font-black'
          style={{ background: 'var(--color-primary)', border: '3px solid var(--color-text-body)', color: 'var(--color-text-body)' }}>
          {profile.avatar_url
            ? <img src={profile.avatar_url} alt='' className='h-full w-full object-cover' />
            : <User size={36} />}
        </div>
        <div className='text-center sm:text-left'>
          <h1 className='text-xl font-black mb-1' style={{ color: 'var(--color-text-body)' }}>{profile.nickname}</h1>
          <p className='text-sm' style={{ color: 'var(--color-text-muted)' }}>{profile.bio ?? '아직 자기소개가 없어요'}</p>
          <p className='text-xs mt-2' style={{ color: 'var(--color-text-muted)' }}>게시글 {posts?.length ?? 0}개</p>
        </div>
      </div>

      <h2 className='text-base font-black mb-4' style={{ color: 'var(--color-text-body)' }}>{profile.nickname}님의 게시글</h2>
      {postsLoading ? (
        <div className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      ) : posts?.length ? (
        <div className='grid grid-cols-2 gap-4'>
          {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
        </div>
      ) : (
        <p className='text-center py-12 text-sm' style={{ color: 'var(--color-text-muted)' }}>아직 작성한 게시글이 없어요</p>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className='mx-auto max-w-2xl px-4 py-8'>
        <div className='skeleton h-32 w-full rounded-3xl mb-6' />
        <div className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
