'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, X } from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';
import { createPost } from '@/services/postsService';
import { toast } from '@/store/toastStore';
import type { CategoryRow } from '@/types';

interface WriteFormProps {
  userId: string;
  categories: Pick<CategoryRow, 'id' | 'name' | 'slug'>[];
}

export function WriteForm({ userId, categories }: WriteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('제목을 입력해주세요.'); return; }
    if (!content.trim()) { toast.error('본문을 입력해주세요.'); return; }

    setSubmitting(true);
    const { data, error } = await createPost({ userId, title, content, categoryId, images });
    setSubmitting(false);

    if (error || !data) { toast.error('게시글 등록에 실패했어요.'); return; }
    toast.success('게시글이 등록되었어요! 🎉');
    router.push(`/posts?id=${data.id}`);
    router.refresh();
  };

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-black' style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-body)' }}>
          새 게시글 ✏️
        </h1>
        <button onClick={() => router.back()} aria-label='취소'
          className='rounded-xl p-2 opacity-50 hover:opacity-100 transition-opacity'>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* Category */}
        <div>
          <label className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>
            카테고리
          </label>
          <div className='flex flex-wrap gap-2'>
            <button type='button' onClick={() => setCategoryId(null)}
              className='rounded-2xl px-4 py-1.5 text-sm font-bold transition-all'
              style={categoryId === null
                ? { background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }
                : { background: 'transparent', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }
              }>
              없음
            </button>
            {categories.map((cat) => (
              <button key={cat.id} type='button' onClick={() => setCategoryId(cat.id)}
                className='rounded-2xl px-4 py-1.5 text-sm font-bold transition-all'
                style={categoryId === cat.id
                  ? { background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }
                  : { background: 'transparent', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }
                }>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor='title' className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>
            제목 <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder='멋진 제목을 입력하세요'
            maxLength={100}
            className='w-full rounded-xl px-4 py-3 text-sm font-bold outline-none'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }}
          />
          <p className='text-right text-xs mt-1' style={{ color: 'var(--color-text-muted)' }}>
            {title.length}/100
          </p>
        </div>

        {/* Content */}
        <div>
          <label htmlFor='content' className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>
            본문 <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <textarea
            id='content' value={content} onChange={(e) => setContent(e.target.value)}
            placeholder='자유롭게 이야기를 나눠요!'
            rows={10}
            className='w-full rounded-xl px-4 py-3 text-sm outline-none resize-none leading-relaxed'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }}
          />
        </div>

        {/* Images */}
        <div>
          <label className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>
            이미지 (선택)
          </label>
          <ImageUpload files={images} onChange={setImages} maxFiles={10} />
        </div>

        {/* Actions */}
        <div className='flex gap-3 pt-2'>
          <button type='button' onClick={() => router.back()}
            className='flex-1 rounded-2xl py-3 font-bold text-sm transition-all hover:opacity-80'
            style={{ border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            취소
          </button>
          <button type='submit' disabled={submitting}
            className='flex-[2] flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm transition-all active:scale-95 disabled:opacity-60'
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
              border: '2px solid var(--color-text-body)',
              boxShadow: '3px 3px 0 var(--color-text-body)',
            }}>
            <Send size={16} />
            {submitting ? '등록 중...' : '게시글 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
