import type { Database } from './database';

/* ── Supabase Row types ────────────────────────────────── */
export type UserRow       = { id: string; email: string; created_at: string };
export type ProfileRow    = Database['public']['Tables']['profiles']['Row'];
export type CategoryRow   = Database['public']['Tables']['categories']['Row'];
export type PostRow       = Database['public']['Tables']['posts']['Row'];
export type PostImageRow  = Database['public']['Tables']['post_images']['Row'];
export type LikeRow       = Database['public']['Tables']['likes']['Row'];
export type CommentRow    = Database['public']['Tables']['comments']['Row'];
export type NotificationRow = Database['public']['Tables']['notifications']['Row'];

/* ── Enriched types (joins) ────────────────────────────── */
export interface Post extends PostRow {
  profiles: Pick<ProfileRow, 'nickname' | 'avatar_url'>;
  categories: Pick<CategoryRow, 'name' | 'slug'> | null;
  post_images: PostImageRow[];
  is_liked?: boolean;
}

export interface Comment extends CommentRow {
  profiles: Pick<ProfileRow, 'nickname' | 'avatar_url'>;
  replies?: Comment[];
}

export interface Notification extends NotificationRow {
  actor: Pick<ProfileRow, 'nickname' | 'avatar_url'>;
  post: Pick<PostRow, 'title' | 'thumbnail_url'> | null;
}

/* ── Form types ────────────────────────────────────────── */
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface PostFormData {
  title: string;
  content: string;
  category_id: number | null;
  images: File[];
}

export interface ProfileFormData {
  nickname: string;
  bio: string;
  avatar: File | null;
}

/* ── UI types ──────────────────────────────────────────── */
export type CategorySlug = 'all' | 'popular' | 'recent' | 'photos' | 'free' | 'notice';

export interface ToastOptions {
  id?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: PaginationMeta;
}

export type { Database };
