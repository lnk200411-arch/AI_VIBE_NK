import { WriteForm } from '@/features/posts/WriteForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = { title: '글쓰기' };

export default async function WritePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/write');

  const { data: categories } = await supabase.from('categories').select('id, name, slug').order('sort_order');

  return <WriteForm userId={user.id} categories={categories ?? []} />;
}
