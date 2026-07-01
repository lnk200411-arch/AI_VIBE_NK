import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bell, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: '알림' };

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: notifications } = await supabase
    .from('notifications')
    .select(`
      id, type, is_read, created_at,
      actor:profiles!notifications_actor_id_fkey(nickname, avatar_url),
      post:posts(id, title)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  /* 알림 전체 읽음 처리 */
  await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);

  const icons = { like: Heart, comment: MessageCircle, follow: Bell };
  const messages = {
    like: '님이 내 게시글을 좋아해요',
    comment: '님이 댓글을 남겼어요',
    follow: '님이 팔로우했어요',
  };

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
        <ul className='space-y-1'>
          {notifications.map((n: Record<string, unknown>) => {
            const type = n.type as keyof typeof icons;
            const Icon = icons[type] ?? Bell;
            const actor = n.actor as { nickname: string; avatar_url: string } | null;
            const post = n.post as { id: string; title: string } | null;

            return (
              <li key={String(n.id)}>
                <Link
                  href={post ? `/posts/${post.id}` : '#'}
                  className='flex items-center gap-3 rounded-2xl p-4 transition-all hover:opacity-80'
                  style={{
                    background: n.is_read ? 'var(--color-surface)' : 'var(--color-primary-50)',
                    border: '2px solid var(--color-border)',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    className='h-10 w-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center font-bold'
                    style={{ background: 'var(--color-primary)', border: '2px solid var(--color-text-body)', color: 'var(--color-text-body)' }}
                  >
                    {actor?.avatar_url
                      ? <img src={actor.avatar_url} alt='' className='h-full w-full object-cover' />
                      : actor?.nickname?.[0]?.toUpperCase()}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm leading-snug' style={{ color: 'var(--color-text-body)' }}>
                      <span className='font-bold'>{actor?.nickname}</span>
                      {messages[type]}
                    </p>
                    {post && <p className='text-xs truncate mt-0.5' style={{ color: 'var(--color-text-muted)' }}>{post.title}</p>}
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
