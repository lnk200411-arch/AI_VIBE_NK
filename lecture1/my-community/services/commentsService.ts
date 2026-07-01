import { createClient } from '@/lib/supabase/client';
import type { Comment, ApiResponse } from '@/types';

const COMMENT_SELECT = `
  id, post_id, user_id, parent_id, content, created_at, updated_at,
  profiles!comments_user_id_fkey(nickname, avatar_url)
`;

export async function fetchComments(postId: string): Promise<ApiResponse<Comment[]>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('comments')
    .select(COMMENT_SELECT)
    .eq('post_id', postId)
    .is('parent_id', null)
    .order('created_at', { ascending: true });

  if (error) return { data: null, error: error.message };
  return { data: data as unknown as Comment[], error: null };
}

export async function addComment(payload: {
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
}): Promise<ApiResponse<Comment>> {
  const supabase = createClient();
  const { postId, userId, content, parentId } = payload;

  const { data, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, user_id: userId, content, parent_id: parentId ?? null })
    .select(COMMENT_SELECT)
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as unknown as Comment, error: null };
}

export async function deleteComment(id: string): Promise<ApiResponse<null>> {
  const supabase = createClient();
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) return { data: null, error: error.message };
  return { data: null, error: null };
}
