'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WriteForm } from '@/features/posts/WriteForm';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import type { CategoryRow } from '@/types';

export default function WritePage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [categories, setCategories] = useState<Pick<CategoryRow, 'id' | 'name' | 'slug'>[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
      return;
    }
    const supabase = createClient();
    supabase.from('categories').select('id, name, slug').order('sort_order').then(({ data }) => {
      if (data) setCategories(data);
    });
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return <WriteForm userId={user.id} categories={categories} />;
}
