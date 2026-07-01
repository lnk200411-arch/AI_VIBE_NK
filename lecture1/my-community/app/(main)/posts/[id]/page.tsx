import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { fetchPostById } from '@/services/postsService';
import { fetchComments } from '@/services/commentsService';
import { LikeButton } from '@/components/common/LikeButton';
import { CommentSection } from '@/features/comments/CommentSection';
import Link from 'next/link';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import type { Metadata } from 'next';
import { DeletePostButton } from '@/features/posts/DeletePostButton';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await fetchPostById(id, user?.id);
  return { title: data?.title ?? '게시글' };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: post } = await fetchPostById(id, user?.id);
  if (!post) notFound();

  const { data: comments } = await fetchComments(id);
  const isOwner = user?.id === post.user_id;

  const images = [
    ...(post.thumbnail_url ? [{ url: post.thumbnail_url, sort_order: 0 }] : []),
    ...(post.post_images ?? []).filter((img) => img.url !== post.thumbnail_url),
  ];

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      {/* Back */}
      <Link
        href='/feed'
        className='inline-flex items-center gap-2 mb-6 text-sm font-bold transition-opacity hover:opacity-70'
        style={{ color: 'var(--color-text-muted)' }}
      >
        <ArrowLeft size={16} /> 피드로 돌아가기
      </Link>

      {/* Main image */}
      {images[0] && (
        <div className='rounded-3xl overflow-hidden mb-6'
          style={{ border: '2.5px solid var(--color-text-body)', boxShadow: '4px 6px 0 var(--color-text-body)' }}>
          <img src={images[0].url} alt={post.title} className='w-full object-cover max-h-[480px]' />
        </div>
      )}

      {/* Header */}
      <div className='mb-6'>
        {post.categories && (
          <span
            className='inline-block rounded-full px-3 py-1 text-xs font-bold mb-3'
            style={{ background: 'var(--color-primary)', border: '1.5px solid var(--color-text-body)', color: 'var(--color-text-body)' }}
          >
            {post.categories.name}
          </span>
        )}
        <h1 className='text-2xl md:text-3xl font-black leading-tight mb-4' style={{ color: 'var(--color-text-body)' }}>
          {post.title}
        </h1>

        {/* Author & Actions */}
        <div className='flex items-center justify-between flex-wrap gap-3'>
          <div className='flex items-center gap-3'>
            <Link href={`/profile/${post.user_id}`}
              className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
              <div
                className='h-10 w-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm'
                style={{ background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', color: 'var(--color-text-body)' }}
              >
                {post.profiles?.avatar_url
                  ? <img src={post.profiles.avatar_url} alt='' className='h-full w-full object-cover' />
                  : post.profiles?.nickname?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className='text-sm font-bold' style={{ color: 'var(--color-text-body)' }}>{post.profiles?.nickname}</p>
                <p className='text-xs' style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </Link>
          </div>

          {isOwner && (
            <div className='flex items-center gap-2'>
              <Link href={`/edit/${post.id}`}
                className='flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold transition-all hover:opacity-80'
                style={{ border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <Pencil size={14} /> 수정
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '2px dashed var(--color-border)', margin: '24px 0' }} />

      {/* Content */}
      <div
        className='prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap text-[15px] mb-8'
        style={{ color: 'var(--color-text-body)' }}
      >
        {post.content}
      </div>

      {/* Extra images */}
      {images.length > 1 && (
        <div className='grid grid-cols-2 gap-3 mb-8'>
          {images.slice(1).map((img, i) => (
            <div key={i} className='rounded-2xl overflow-hidden'
              style={{ border: '2px solid var(--color-border)' }}>
              <img src={img.url} alt={`추가 이미지 ${i + 1}`} className='w-full object-cover aspect-square' loading='lazy' />
            </div>
          ))}
        </div>
      )}

      {/* Like */}
      <div className='flex justify-center mb-10'>
        <LikeButton postId={post.id} likeCount={post.like_count} isLiked={post.is_liked ?? false} />
      </div>

      <hr style={{ border: 'none', borderTop: '2px solid var(--color-border)', margin: '0 0 32px' }} />

      {/* Comments */}
      <CommentSection postId={post.id} initialComments={comments ?? []} userId={user?.id} />
    </div>
  );
}
