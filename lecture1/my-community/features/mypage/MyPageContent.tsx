'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, FileText, Heart, User } from 'lucide-react';
import { PostCard } from '@/components/common/PostCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/services/postsService';
import { PostCardSkeleton } from '@/components/common/Skeleton';
import type { ProfileRow } from '@/types';

type Tab = 'posts' | 'likes';

interface MyPageContentProps {
  userId: string;
  initialProfile: ProfileRow | null;
}

export function MyPageContent({ userId, initialProfile }: MyPageContentProps) {
  const [tab, setTab] = useState<Tab>('posts');

  const { data: postsRes, isLoading } = useQuery({
    queryKey: ['myPosts', userId, tab],
    queryFn: () => fetchPosts({ userId, sort: 'recent' }),
    enabled: tab === 'posts',
  });

  if (!initialProfile) {
    return (
      <div className='flex flex-col items-center justify-center py-24'>
        <p className='text-sm' style={{ color: 'var(--color-text-muted)' }}>프로필을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      {/* Profile Card */}
      <div
        className='rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-5'
        style={{
          background: 'var(--color-surface)',
          border: '2.5px solid var(--color-text-body)',
          boxShadow: '5px 6px 0 var(--color-text-body)',
        }}
      >
        <div
          className='h-20 w-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-2xl font-black'
          style={{
            background: 'var(--color-primary)',
            border: '3px solid var(--color-text-body)',
            color: 'var(--color-text-body)',
          }}
        >
          {initialProfile.avatar_url
            ? <img src={initialProfile.avatar_url} alt='' className='h-full w-full object-cover' />
            : <User size={36} />
          }
        </div>
        <div className='flex-1 text-center sm:text-left'>
          <h1 className='text-xl font-black mb-1' style={{ color: 'var(--color-text-body)' }}>
            {initialProfile.nickname}
          </h1>
          <p className='text-sm mb-4' style={{ color: 'var(--color-text-muted)' }}>
            {initialProfile.bio ?? '아직 자기소개가 없어요'}
          </p>
          <Link
            href='/mypage/edit'
            className='inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all hover:opacity-80'
            style={{
              border: '2px solid var(--color-text-body)',
              boxShadow: '2px 2px 0 var(--color-text-body)',
              color: 'var(--color-text-body)',
            }}
          >
            <Settings size={14} /> 프로필 수정
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-6'>
        {([['posts', '내 글', FileText], ['likes', '좋아요', Heart]] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className='flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all'
            style={tab === key
              ? { background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }
              : { background: 'transparent', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }
            }
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {postsRes?.data?.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
          {!postsRes?.data?.length && (
            <div className='col-span-2 py-12 text-center text-sm' style={{ color: 'var(--color-text-muted)' }}>
              {tab === 'posts' ? '아직 작성한 글이 없어요' : '아직 좋아요한 글이 없어요'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
