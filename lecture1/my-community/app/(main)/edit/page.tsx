'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { EditForm } from '@/features/posts/EditForm';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import type { PostRow, CategoryRow } from '@/types';

function EditContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [post, setPost] = useState<PostRow | null>(null);
  const [categories, setCategories] = useState<Pick<CategoryRow, 'id' | 'name' | 'slug'>[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading || !id) return;
    if (!user) { router.replace('/login'); return; }

    const supabase = createClient();
    Promise.all([
      supabase.from('posts').select('*').eq('id', id).single(),
      supabase.from('categories').select('id, name, slug').order('sort_order'),
    ]).then(([{ data: postData }, { data: catData }]) => {
      if (!postData || postData.user_id !== user.id) { router.replace('/feed'); return; }
      setPost(postData as PostRow);
      setCategories(catData ?? []);
      setReady(true);
    });
  }, [id, user, isLoading, router]);

  if (!ready || !post || !user) return null;

  return <EditForm post={post} categories={categories} userId={user.id} />;
}

export default function EditPage() {
  return (
    <Suspense fallback={null}>
      <EditContent />
    </Suspense>
  );
}
