'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/store/toastStore';
import { useAuthStore } from '@/store/authStore';
import type { ProfileRow } from '@/types';

interface ProfileEditFormProps {
  userId: string;
  initialProfile: ProfileRow | null;
}

export function ProfileEditForm({ userId, initialProfile }: ProfileEditFormProps) {
  const [nickname, setNickname] = useState(initialProfile?.nickname ?? '');
  const [bio, setBio] = useState(initialProfile?.bio ?? '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialProfile?.avatar_url ?? '');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const { setProfile } = useAuthStore();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!nickname.trim()) { toast.error('닉네임을 입력해주세요.'); return; }
    setSaving(true);

    let avatarUrl = initialProfile?.avatar_url ?? null;

    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop();
      const path = `${userId}/avatar.${ext}`;
      const { data: up, error: upErr } = await supabase.storage.from('profiles').upload(path, avatarFile, { upsert: true });
      if (upErr) { toast.error('이미지 업로드에 실패했어요.'); setSaving(false); return; }
      const { data: { publicUrl } } = supabase.storage.from('profiles').getPublicUrl(up.path);
      avatarUrl = publicUrl;
    }

    const { data: updated, error } = await supabase
      .from('profiles')
      .update({ nickname: nickname.trim(), bio: bio.trim() || null, avatar_url: avatarUrl })
      .eq('user_id', userId)
      .select('*')
      .single();

    setSaving(false);

    if (error) { toast.error('저장에 실패했어요.'); return; }
    setProfile(updated);
    toast.success('프로필이 수정되었어요!');
    router.push('/mypage');
    router.refresh();
  };

  return (
    <div className='mx-auto max-w-md px-4 py-8'>
      <div className='flex items-center gap-3 mb-6'>
        <Link href='/mypage' className='opacity-50 hover:opacity-100 transition-opacity' aria-label='뒤로가기'>
          <ArrowLeft size={20} />
        </Link>
        <h1 className='text-xl font-black' style={{ color: 'var(--color-text-body)' }}>프로필 수정</h1>
      </div>

      <div
        className='rounded-3xl p-6 space-y-5'
        style={{
          background: 'var(--color-surface)',
          border: '2.5px solid var(--color-text-body)',
          boxShadow: '5px 6px 0 var(--color-text-body)',
        }}
      >
        {/* Avatar */}
        <div className='flex flex-col items-center gap-3'>
          <div
            className='relative h-24 w-24 rounded-full overflow-hidden cursor-pointer group'
            style={{ border: '3px solid var(--color-text-body)' }}
            onClick={() => fileRef.current?.click()}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt='프로필 사진' className='h-full w-full object-cover' />
            ) : (
              <div className='h-full w-full flex items-center justify-center text-3xl font-black'
                style={{ background: 'var(--color-primary)', color: 'var(--color-text-body)' }}>
                {nickname?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Camera size={24} className='text-white' />
            </div>
          </div>
          <button
            type='button' onClick={() => fileRef.current?.click()}
            className='text-sm font-bold'
            style={{ color: 'var(--color-accent)' }}
          >
            사진 변경
          </button>
          <input ref={fileRef} type='file' accept='image/*' className='hidden' onChange={handleAvatarChange} />
        </div>

        {/* Nickname */}
        <div>
          <label htmlFor='nickname' className='block text-sm font-bold mb-1.5' style={{ color: 'var(--color-text-body)' }}>
            닉네임
          </label>
          <input
            id='nickname' type='text' value={nickname} maxLength={20}
            onChange={(e) => setNickname(e.target.value)}
            className='w-full rounded-xl px-4 py-3 text-sm outline-none'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }}
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor='bio' className='block text-sm font-bold mb-1.5' style={{ color: 'var(--color-text-body)' }}>
            자기소개
          </label>
          <textarea
            id='bio' value={bio} maxLength={150}
            onChange={(e) => setBio(e.target.value)}
            placeholder='나를 소개해보세요 (선택)'
            rows={3}
            className='w-full rounded-xl px-4 py-3 text-sm outline-none resize-none'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-body)' }}
          />
          <p className='text-right text-xs mt-1' style={{ color: 'var(--color-text-muted)' }}>{bio.length}/150</p>
        </div>

        <button
          onClick={handleSave} disabled={saving}
          className='w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm transition-all active:scale-95 disabled:opacity-60'
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-text-body)',
            border: '2px solid var(--color-text-body)',
            boxShadow: '3px 3px 0 var(--color-text-body)',
          }}
        >
          <Save size={16} />
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
}
