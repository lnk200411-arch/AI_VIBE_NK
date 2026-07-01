import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { EditForm } from '@/features/posts/EditForm';

export const metadata = { title: '게시글 수정' };

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
  if (!post || post.user_id !== user.id) notFound();

  const { data: categories } = await supabase.from('categories').select('id, name, slug').order('sort_order');

  return <EditForm post={post} categories={categories ?? []} userId={user.id} />;
}
