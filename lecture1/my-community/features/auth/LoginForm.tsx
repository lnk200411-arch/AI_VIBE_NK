'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/store/toastStore';
import type { LoginFormData } from '@/types';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      toast.error('이메일 또는 비밀번호가 올바르지 않아요.');
      return;
    }

    toast.success('로그인 성공! 반가워요 😊');
    router.push('/feed');
    router.refresh();
  };

  return (
    <div
      className='w-full max-w-sm rounded-3xl p-8'
      style={{
        background: 'var(--color-surface)',
        border: '2.5px solid var(--color-text-body)',
        boxShadow: '6px 8px 0 var(--color-text-body)',
      }}
    >
      {/* Header */}
      <div className='text-center mb-8'>
        <Link href='/feed' className='inline-block'>
          <h1
            className='text-3xl font-black'
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
          >
            PLAY<span style={{ color: 'var(--color-primary-dark)' }}>FULL</span>
          </h1>
        </Link>
        <p className='text-sm mt-1' style={{ color: 'var(--color-text-muted)' }}>
          다시 만나서 반가워요!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
        {/* Email */}
        <div>
          <label htmlFor='email' className='block text-sm font-bold mb-1.5' style={{ color: 'var(--color-text-body)' }}>
            이메일
          </label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            {...register('email')}
            placeholder='hello@example.com'
            className='w-full rounded-xl px-4 py-3 text-sm outline-none transition-all'
            style={{
              background: 'var(--color-bg)',
              border: `2px solid ${errors.email ? 'var(--color-accent)' : 'var(--color-border)'}`,
              color: 'var(--color-text-body)',
            }}
          />
          {errors.email && (
            <p className='mt-1 text-xs' style={{ color: 'var(--color-accent)' }}>{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor='password' className='block text-sm font-bold mb-1.5' style={{ color: 'var(--color-text-body)' }}>
            비밀번호
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              {...register('password')}
              placeholder='비밀번호를 입력하세요'
              className='w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all'
              style={{
                background: 'var(--color-bg)',
                border: `2px solid ${errors.password ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: 'var(--color-text-body)',
              }}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
              className='absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100'
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1 text-xs' style={{ color: 'var(--color-accent)' }}>{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className='w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm transition-all active:scale-95 disabled:opacity-60'
          style={{
            background: 'var(--color-accent)',
            color: '#fff',
            border: '2px solid var(--color-text-body)',
            boxShadow: '3px 3px 0 var(--color-text-body)',
          }}
        >
          <LogIn size={16} />
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p className='mt-6 text-center text-sm' style={{ color: 'var(--color-text-muted)' }}>
        아직 계정이 없나요?{' '}
        <Link href='/register' className='font-bold' style={{ color: 'var(--color-accent)' }}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
