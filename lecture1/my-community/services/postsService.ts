import { createClient } from '@/lib/supabase/client';
import type { Post, ApiResponse, PaginationMeta } from '@/types';

const PER_PAGE = 20;

const POST_SELECT = `
  id, user_id, category_id, title, content, thumbnail_url,
  view_count, like_count, comment_count, is_published, created_at, updated_at,
  profiles!posts_user_id_fkey(nickname, avatar_url),
  categories(name, slug),
  post_images(id, url, sort_order)
`;

export async function fetchPosts(params: {
  page?: number;
  category?: string;
  userId?: string;
  sort?: 'recent' | 'popular';
  search?: string;
}): Promise<ApiResponse<Post[]>> {
  const supabase = createClient();
  const { page = 1, category, userId, sort = 'recent', search } = params;

  let query = supabase
    .from('posts')
    .select(POST_SELECT, { count: 'exact' })
    .eq('is_published', true)
    .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  if (category && !['all', 'popular', 'recent'].includes(category)) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  if (userId) query = query.eq('user_id', userId);
  if (search) query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);

  if (sort === 'popular' || category === 'popular') {
    query = query.order('like_count', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query;

  if (error) return { data: null, error: error.message };

  const meta: PaginationMeta = {
    page,
    perPage: PER_PAGE,
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / PER_PAGE),
  };

  return { data: data as unknown as Post[], error: null, meta };
}

export async function fetchPostById(id: string, userId?: string): Promise<ApiResponse<Post>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('id', id)
    .single();

  if (error) return { data: null, error: error.message };

  let isLiked = false;
  if (userId) {
    const { data: like } = await supabase
      .from('likes')
      .select('id')
      .match({ user_id: userId, post_id: id })
      .single();
    isLiked = !!like;
  }

  try { await supabase.rpc('increment_view_count', { post_id: id }); } catch { /* 조회수 오류 무시 */ }

  return { data: { ...(data as unknown as Post), is_liked: isLiked }, error: null };
}

export async function createPost(payload: {
  userId: string;
  title: string;
  content: string;
  categoryId: number | null;
  images: File[];
}): Promise<ApiResponse<{ id: string }>> {
  const supabase = createClient();
  const { userId, title, content, categoryId, images } = payload;

  let thumbnailUrl: string | null = null;

  if (images.length > 0) {
    const first = images[0];
    const ext = first.name.split('.').pop();
    const path = `${userId}/${Date.now()}_0.${ext}`;
    const { data: uploaded, error: upErr } = await supabase.storage.from('posts').upload(path, first);
    if (upErr) return { data: null, error: upErr.message };
    const { data: { publicUrl } } = supabase.storage.from('posts').getPublicUrl(uploaded.path);
    thumbnailUrl = publicUrl;
  }

  const { data: post, error: postErr } = await supabase
    .from('posts')
    .insert({ user_id: userId, title, content, category_id: categoryId, thumbnail_url: thumbnailUrl })
    .select('id')
    .single();

  if (postErr) return { data: null, error: postErr.message };

  if (images.length > 1) {
    const extras = images.slice(1);
    const imageRecords = await Promise.all(
      extras.map(async (file, i) => {
        const ext = file.name.split('.').pop();
        const path = `${userId}/${Date.now()}_${i + 1}.${ext}`;
        const { data: up } = await supabase.storage.from('posts').upload(path, file);
        if (!up) return null;
        const { data: { publicUrl } } = supabase.storage.from('posts').getPublicUrl(up.path);
        return { post_id: post.id, url: publicUrl, sort_order: i + 1 };
      })
    );

    const validImages = imageRecords.filter(Boolean) as { post_id: string; url: string; sort_order: number }[];
    if (validImages.length > 0) {
      await supabase.from('post_images').insert(validImages);
    }
  }

  return { data: { id: post.id }, error: null };
}

export async function deletePost(id: string): Promise<ApiResponse<null>> {
  const supabase = createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) return { data: null, error: error.message };
  return { data: null, error: null };
}
