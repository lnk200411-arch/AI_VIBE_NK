'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/services/postsService';
import { toast } from '@/store/toastStore';

export function DeletePostButton({ postId }: { postId: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    const { error } = await deletePost(postId);
    if (error) { toast.error('삭제 중 오류가 발생했어요.'); return; }
    toast.success('게시글이 삭제되었어요.');
    router.push('/feed');
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className='flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold transition-all hover:opacity-80'
      style={{
        border: `2px solid ${confirming ? 'var(--color-accent)' : 'var(--color-border)'}`,
        color: confirming ? 'var(--color-accent)' : 'var(--color-text-muted)',
      }}
    >
      <Trash2 size={14} />
      {confirming ? '정말 삭제?' : '삭제'}
    </button>
  );
}
