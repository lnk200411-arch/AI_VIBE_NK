'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';

type NotifActor = { nickname: string; avatar_url: string | null } | null;
type NotifPost = { id: string; title: string } | null;
interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  is_read: boolean;
  created_at: string;
  actor: NotifActor;
  post: NotifPost;
}

const ICONS = { like: Heart, comment: MessageCircle, follow: Bell } as const;
const MESSAGES = {
  like: '님이 내 게시글을 좋아해요',
  comment: '님이 댓글을 남겼어요',
  follow: '님이 팔로우했어요',
} as const;

export default function NotificationsPage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('notifications')
        .select(`
          id, type, is_read, created_at,
          actor:profiles!notifications_actor_id_fkey(nickname, avatar_url),
          post:posts(id, title)
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(50);
      return (data ?? []) as unknown as Notification[];
    },
    enabled: !!user,
  });

  const markAllRead = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [user, queryClient]);

  useEffect(() => {
    if (!isLoading && !user) { router.replace('/login'); return; }
    if (user) markAllRead();
  }, [user, isLoading, router, markAllRead]);

  if (isLoading || !user) return null;

  return (
    <div className='mx-auto max-w-lg px-4 py-8'>
      <h1 className='text-xl font-black mb-6 flex items-center gap-2' style={{ color: 'var(--color-text-body)' }}>
        <Bell size={22} style={{ color: 'var(--color-accent)' }} /> 알림
      </h1>

      {!notifications?.length ? (
        <div className='py-20 text-center'>
          <Bell size={40} className='mx-auto mb-3 opacity-30' />
          <p className='text-sm' style={{ color: 'var(--color-text-muted)' }}>아직 알림이 없어요</p>
        </div>
      ) : (
        <ul className='space-y-2'>
          {notifications.map((n) => {
            const Icon = ICONS[n.type] ?? Bell;
            return (
              <li key={n.id}>
                <Link
                  href={n.post ? `/posts?id=${n.post.id}` : '#'}
                  className='flex items-center gap-3 rounded-2xl p-4 transition-all hover:opacity-80'
                  style={{
                    background: n.is_read ? 'var(--color-surface)' : 'var(--color-primary-50, #f0fce8)',
                    border: '2px solid var(--color-border)',
                  }}
                >
                  <div
                    className='h-10 w-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center font-bold'
                    style={{ background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', color: 'var(--color-text-body)' }}
                  >
                    {n.actor?.avatar_url
                      ? <img src={n.actor.avatar_url} alt='' className='h-full w-full object-cover' />
                      : n.actor?.nickname?.[0]?.toUpperCase()}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm leading-snug' style={{ color: 'var(--color-text-body)' }}>
                      <span className='font-bold'>{n.actor?.nickname}</span>
                      {MESSAGES[n.type]}
                    </p>
                    {n.post && (
                      <p className='text-xs truncate mt-0.5' style={{ color: 'var(--color-text-muted)' }}>
                        {n.post.title}
                      </p>
                    )}
                  </div>
                  <Icon size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
