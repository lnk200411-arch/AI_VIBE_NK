'use client';

import { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { addComment, deleteComment } from '@/services/commentsService';
import { toast } from '@/store/toastStore';
import { useRouter } from 'next/navigation';
import type { Comment } from '@/types';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
  userId?: string;
}

export function CommentSection({ postId, initialComments, userId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) { toast.info('로그인 후 댓글을 작성할 수 있어요.'); return; }
    if (!content.trim()) return;

    setSubmitting(true);
    const { data, error } = await addComment({ postId, userId, content: content.trim() });
    setSubmitting(false);

    if (error || !data) { toast.error('댓글 작성에 실패했어요.'); return; }
    setComments((prev) => [...prev, data]);
    setContent('');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteComment(id);
    if (error) { toast.error('댓글 삭제에 실패했어요.'); return; }
    setComments((prev) => prev.filter((c) => c.id !== id));
    toast.success('댓글이 삭제되었어요.');
    router.refresh();
  };

  return (
    <section aria-label='댓글'>
      <h2 className='text-lg font-black mb-6' style={{ color: 'var(--color-text-body)' }}>
        댓글 {comments.length}
      </h2>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className='flex gap-3 mb-8'>
        <div
          className='flex flex-1 items-center gap-2 rounded-2xl px-4 py-2.5'
          style={{
            background: 'var(--color-bg)',
            border: '2px solid var(--color-border)',
          }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent); } }}
            placeholder={userId ? '댓글을 입력하세요 (Enter로 전송)' : '로그인 후 댓글을 작성할 수 있어요'}
            rows={1}
            className='flex-1 bg-transparent text-sm resize-none outline-none'
            style={{ color: 'var(--color-text-body)' }}
          />
        </div>
        <button
          type='submit'
          disabled={submitting || !content.trim()}
          aria-label='댓글 전송'
          className='rounded-2xl px-4 py-2.5 font-bold transition-all active:scale-95 disabled:opacity-40'
          style={{
            background: 'var(--color-primary)',
            border: '2px solid var(--color-text-body)',
            boxShadow: '2px 2px 0 var(--color-text-body)',
            color: 'var(--color-text-body)',
          }}
        >
          <Send size={16} />
        </button>
      </form>

      {/* Comments List */}
      <ul className='space-y-1' aria-label='댓글 목록'>
        {comments.length === 0 ? (
          <li className='py-8 text-center text-sm' style={{ color: 'var(--color-text-muted)' }}>
            첫 번째 댓글을 남겨보세요 💬
          </li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className='flex gap-3 py-4' style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div
                className='h-8 w-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold'
                style={{ background: 'var(--color-primary)', border: '1.5px solid var(--color-text-body)', color: 'var(--color-text-body)' }}
              >
                {comment.profiles?.avatar_url
                  ? <img src={comment.profiles.avatar_url} alt='' className='h-full w-full object-cover' />
                  : comment.profiles?.nickname?.[0]?.toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between mb-1'>
                  <span className='text-sm font-bold' style={{ color: 'var(--color-text-body)' }}>
                    {comment.profiles?.nickname}
                  </span>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs' style={{ color: 'var(--color-text-muted)' }}>
                      {new Date(comment.created_at).toLocaleDateString('ko-KR')}
                    </span>
                    {userId === comment.user_id && (
                      <button onClick={() => handleDelete(comment.id)} aria-label='댓글 삭제'
                        className='opacity-40 hover:opacity-100 transition-opacity'>
                        <Trash2 size={13} style={{ color: 'var(--color-accent)' }} />
                      </button>
                    )}
                  </div>
                </div>
                <p className='text-sm leading-relaxed whitespace-pre-wrap' style={{ color: 'var(--color-text-body)' }}>
                  {comment.content}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
