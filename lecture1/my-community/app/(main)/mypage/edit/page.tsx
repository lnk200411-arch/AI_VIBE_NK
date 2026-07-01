'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileEditForm } from '@/features/mypage/ProfileEditForm';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import type { ProfileRow } from '@/types';

export default function ProfileEditPage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }

    const supabase = createClient();
    supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => {
      setProfile(data);
      setReady(true);
    });
  }, [user, isLoading, router]);

  if (!ready || !user) return null;

  return <ProfileEditForm userId={user.id} initialProfile={profile} />;
}
