'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/store/toastStore';
import type { RegisterFormData } from '@/types';

const registerSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
  passwordConfirm: z.string(),
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다').max(20, '닉네임은 20자 이하여야 합니다'),
}).refine((d) => d.password === d.passwordConfirm, {
  message: '비밀번호가 일치하지 않아요',
  path: ['passwordConfirm'],
});

export function RegisterForm() {
  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    /* 닉네임 중복 검사 */
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('nickname', data.nickname)
      .maybeSingle();

    if (existing) {
      setError('nickname', { message: '이미 사용 중인 닉네임이에요' });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { nickname: data.nickname } },
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        setError('email', { message: '이미 사용 중인 이메일이에요' });
      } else {
        toast.error('회원가입 중 오류가 발생했어요.');
      }
      return;
    }

    toast.success('가입 완료! 환영해요 🎉');
    router.push('/feed');
    router.refresh();
  };

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className='block text-sm font-bold mb-1.5' style={{ color: 'var(--color-text-body)' }}>
        {label}
      </label>
      {children}
      {error && <p className='mt-1 text-xs' style={{ color: 'var(--color-accent)' }}>{error}</p>}
    </div>
  );

  const inputStyle = (hasError: boolean) => ({
    background: 'var(--color-bg)',
    border: `2px solid ${hasError ? 'var(--color-accent)' : 'var(--color-border)'}`,
    color: 'var(--color-text-body)',
  });

  return (
    <div
      className='w-full max-w-sm rounded-3xl p-8'
      style={{
        background: 'var(--color-surface)',
        border: '2.5px solid var(--color-text-body)',
        boxShadow: '6px 8px 0 var(--color-text-body)',
      }}
    >
      <div className='text-center mb-8'>
        <Link href='/feed'>
          <h1 className='text-3xl font-black' style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
            PLAY<span style={{ color: 'var(--color-primary-dark)' }}>FULL</span>
          </h1>
        </Link>
        <p className='text-sm mt-1' style={{ color: 'var(--color-text-muted)' }}>함께 시작해요!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
        <Field id='nickname' label='닉네임' error={errors.nickname?.message}>
          <input
            id='nickname' type='text' autoComplete='nickname'
            {...register('nickname')} placeholder='멋진 닉네임을 입력하세요'
            className='w-full rounded-xl px-4 py-3 text-sm outline-none'
            style={inputStyle(!!errors.nickname)}
          />
        </Field>

        <Field id='email' label='이메일' error={errors.email?.message}>
          <input
            id='email' type='email' autoComplete='email'
            {...register('email')} placeholder='hello@example.com'
            className='w-full rounded-xl px-4 py-3 text-sm outline-none'
            style={inputStyle(!!errors.email)}
          />
        </Field>

        <Field id='password' label='비밀번호' error={errors.password?.message}>
          <div className='relative'>
            <input
              id='password' type={showPw ? 'text' : 'password'} autoComplete='new-password'
              {...register('password')} placeholder='6자 이상 입력하세요'
              className='w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none'
              style={inputStyle(!!errors.password)}
            />
            <button type='button' onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
              className='absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100'>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Field id='passwordConfirm' label='비밀번호 확인' error={errors.passwordConfirm?.message}>
          <div className='relative'>
            <input
              id='passwordConfirm' type={showPwC ? 'text' : 'password'} autoComplete='new-password'
              {...register('passwordConfirm')} placeholder='비밀번호를 다시 입력하세요'
              className='w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none'
              style={inputStyle(!!errors.passwordConfirm)}
            />
            <button type='button' onClick={() => setShowPwC(!showPwC)}
              aria-label={showPwC ? '비밀번호 확인 숨기기' : '비밀번호 확인 표시'}
              className='absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100'>
              {showPwC ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <button
          type='submit' disabled={loading}
          className='w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm transition-all active:scale-95 disabled:opacity-60'
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-text-body)',
            border: '2px solid var(--color-text-body)',
            boxShadow: '3px 3px 0 var(--color-text-body)',
          }}
        >
          <UserPlus size={16} />
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <p className='mt-6 text-center text-sm' style={{ color: 'var(--color-text-muted)' }}>
        이미 계정이 있나요?{' '}
        <Link href='/login' className='font-bold' style={{ color: 'var(--color-accent)' }}>로그인</Link>
      </p>
    </div>
  );
}
