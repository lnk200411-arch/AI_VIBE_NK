'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/store/toastStore';
import type { PostRow, CategoryRow } from '@/types';
import Link from 'next/link';

interface EditFormProps {
  post: PostRow;
  categories: Pick<CategoryRow, 'id' | 'name' | 'slug'>[];
  userId: string;
}

export function EditForm({ post, categories }: EditFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [categoryId, setCategoryId] = useState<number | null>(post.category_id);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    if (!title.trim()) { toast.error('제목을 입력해주세요.'); return; }
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .update({ title: title.trim(), content: content.trim(), category_id: categoryId })
      .eq('id', post.id);

    setSaving(false);
    if (error) { toast.error('수정에 실패했어요.'); return; }
    toast.success('수정되었어요!');
    router.push(`/posts?id=${post.id}`);
    router.refresh();
  };

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-black' style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-body)' }}>
          게시글 수정
        </h1>
        <Link href={`/posts?id=${post.id}`} aria-label='취소'
          className='rounded-xl p-2 opacity-50 hover:opacity-100 transition-opacity'>
          <X size={20} />
        </Link>
      </div>

      <div className='space-y-5'>
        {/* Category */}
        <div className='flex flex-wrap gap-2'>
          <button type='button' onClick={() => setCategoryId(null)}
            className='rounded-2xl px-4 py-1.5 text-sm font-bold transition-all'
            style={categoryId === null
              ? { background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }
              : { background: 'transparent', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            없음
          </button>
          {categories.map((cat) => (
            <button key={cat.id} type='button' onClick={() => setCategoryId(cat.id)}
              className='rounded-2xl px-4 py-1.5 text-sm font-bold transition-all'
              style={categoryId === cat.id
                ? { background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', boxShadow: '2px 2px 0 var(--color-text-body)', color: 'var(--color-text-body)' }
                : { background: 'transparent', border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              {cat.name}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor='title' className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>제목</label>
          <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100}
            className='w-full rounded-xl px-4 py-3 text-sm font-bold outline-none'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }} />
        </div>

        <div>
          <label htmlFor='content' className='block text-sm font-bold mb-2' style={{ color: 'var(--color-text-body)' }}>본문</label>
          <textarea id='content' value={content} onChange={(e) => setContent(e.target.value)}
            rows={12}
            className='w-full rounded-xl px-4 py-3 text-sm outline-none resize-none leading-relaxed'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }} />
        </div>

        <div className='flex gap-3 pt-2'>
          <Link href={`/posts?id=${post.id}`}
            className='flex-1 flex items-center justify-center rounded-2xl py-3 font-bold text-sm transition-all hover:opacity-80'
            style={{ border: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            취소
          </Link>
          <button onClick={handleSave} disabled={saving}
            className='flex-[2] flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm transition-all active:scale-95 disabled:opacity-60'
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
              border: '2px solid var(--color-text-body)',
              boxShadow: '3px 3px 0 var(--color-text-body)',
            }}>
            <Save size={16} />
            {saving ? '저장 중...' : '수정 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}
