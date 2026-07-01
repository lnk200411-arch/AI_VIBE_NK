'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MyPageContent } from '@/features/mypage/MyPageContent';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import type { ProfileRow } from '@/types';

export default function MyPage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }

    const supabase = createClient();
    supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => {
      setProfile(data);
    });
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return <MyPageContent userId={user.id} initialProfile={profile} />;
}
