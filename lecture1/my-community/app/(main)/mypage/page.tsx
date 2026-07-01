import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MyPageContent } from '@/features/mypage/MyPageContent';

export const metadata = { title: '마이페이지' };

export default async function MyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/mypage');

  const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

  return <MyPageContent userId={user.id} initialProfile={profile} />;
}
