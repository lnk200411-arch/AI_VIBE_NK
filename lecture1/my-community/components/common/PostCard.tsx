'use client';

import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Post } from '@/types';

/** 게시글 카드 컴포넌트
 * @param {Post} post - 게시글 데이터 [Required]
 * @param {number} index - 애니메이션 딜레이용 인덱스 [Optional, 기본값: 0]
 */
interface PostCardProps {
  post: Post;
  index?: number;
}

const STICKER_ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2];

export function PostCard({ post, index = 0 }: PostCardProps) {
  const rotation = STICKER_ROTATIONS[index % STICKER_ROTATIONS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, rotate: rotation * 0.3, transition: { duration: 0.2 } }}
      className='group relative cursor-pointer'
    >
      <Link href={`/posts/${post.id}`} aria-label={post.title}>
        <div
          className='overflow-hidden rounded-2xl'
          style={{
            background: 'var(--color-surface)',
            border: '2.5px solid var(--color-text-body)',
            boxShadow: '4px 5px 0 var(--color-text-body)',
            transition: 'box-shadow 0.2s ease',
          }}
        >
          {/* Thumbnail */}
          {post.thumbnail_url ? (
            <div className='relative aspect-[4/3] w-full overflow-hidden'>
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                loading='lazy'
              />
              {/* Category Badge */}
              {post.categories && (
                <span
                  className='absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold'
                  style={{
                    background: 'var(--color-primary)',
                    border: '1.5px solid var(--color-text-body)',
                    color: 'var(--color-text-body)',
                  }}
                >
                  {post.categories.name}
                </span>
              )}
            </div>
          ) : (
            <div
              className='aspect-[4/3] w-full flex items-center justify-center'
              style={{ background: 'var(--color-primary-50)' }}
            >
              <span className='text-4xl opacity-30 select-none'>✏️</span>
            </div>
          )}

          {/* Content */}
          <div className='p-4'>
            <h2
              className='line-clamp-2 text-sm font-bold leading-tight mb-2'
              style={{ color: 'var(--color-text-body)' }}
            >
              {post.title}
            </h2>
            <p
              className='line-clamp-2 text-xs leading-relaxed mb-3'
              style={{ color: 'var(--color-text-muted)' }}
            >
              {post.content.replace(/<[^>]*>/g, '')}
            </p>

            {/* Footer */}
            <div className='flex items-center justify-between'>
              {/* Author */}
              <div className='flex items-center gap-2 min-w-0'>
                <div
                  className='h-6 w-6 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold'
                  style={{
                    background: 'var(--color-primary)',
                    border: '1.5px solid var(--color-text-body)',
                    color: 'var(--color-text-body)',
                  }}
                >
                  {post.profiles?.avatar_url ? (
                    <img src={post.profiles.avatar_url} alt='' className='h-full w-full object-cover' />
                  ) : (
                    post.profiles?.nickname?.[0]?.toUpperCase() ?? '?'
                  )}
                </div>
                <span className='truncate text-xs' style={{ color: 'var(--color-text-muted)' }}>
                  {post.profiles?.nickname ?? '익명'}
                </span>
              </div>

              {/* Stats */}
              <div className='flex items-center gap-3 text-xs shrink-0' style={{ color: 'var(--color-text-muted)' }}>
                <span className='flex items-center gap-1'>
                  <Heart size={12} className={post.is_liked ? 'fill-red-500 text-red-500' : ''} />
                  {post.like_count}
                </span>
                <span className='flex items-center gap-1'>
                  <MessageCircle size={12} />
                  {post.comment_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
