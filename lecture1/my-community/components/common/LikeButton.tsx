'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/store/toastStore';
import { useRouter } from 'next/navigation';

/**
 * LikeButton 컴포넌트
 * @param {string} postId - 게시글 ID [Required]
 * @param {number} likeCount - 초기 좋아요 수 [Required]
 * @param {boolean} isLiked - 현재 좋아요 여부 [Required]
 */
interface LikeButtonProps {
  postId: string;
  likeCount: number;
  isLiked: boolean;
}

export function LikeButton({ postId, likeCount, isLiked: initialLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(likeCount);
  const [animating, setAnimating] = useState(false);
  const { user } = useAuthStore();
  const supabase = createClient();
  const router = useRouter();

  const handleLike = async () => {
    if (!user) {
      toast.info('로그인 후 좋아요를 누를 수 있어요!');
      router.push('/login');
      return;
    }

    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    const newLiked = !liked;
    setLiked(newLiked);
    setCount((prev) => (newLiked ? prev + 1 : prev - 1));

    if (newLiked) {
      await supabase.from('likes').insert({ user_id: user.id, post_id: postId });
    } else {
      await supabase.from('likes').delete().match({ user_id: user.id, post_id: postId });
    }
  };

  return (
    <button
      onClick={handleLike}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      aria-pressed={liked}
      className='flex items-center gap-2 rounded-2xl px-5 py-2.5 font-bold text-sm transition-all active:scale-95'
      style={{
        background: liked ? '#FEF0EC' : 'var(--color-surface)',
        border: `2px solid ${liked ? 'var(--color-accent)' : 'var(--color-border)'}`,
        color: liked ? 'var(--color-accent)' : 'var(--color-text-muted)',
        boxShadow: liked ? '2px 2px 0 var(--color-accent)' : '2px 2px 0 var(--color-border)',
      }}
    >
      <AnimatePresence mode='wait'>
        <motion.span
          key={animating ? 'anim' : 'idle'}
          animate={animating ? { scale: [1, 1.5, 0.85, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Heart
            size={18}
            className={liked ? 'fill-current' : ''}
          />
        </motion.span>
      </AnimatePresence>
      <span>{count}</span>
    </button>
  );
}
