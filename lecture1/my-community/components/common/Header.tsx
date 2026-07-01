'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenLine, Bell, User, Search, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/store/toastStore';

export function Header() {
  const { user, profile } = useAuthStore();
  const router = useRouter();
  const supabase = createClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('로그아웃 되었습니다.');
    router.push('/');
    router.refresh();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className='sticky top-0 z-50 w-full'
      style={{
        background: 'var(--color-surface)',
        borderBottom: '2.5px solid var(--color-text-body)',
        boxShadow: '0 2px 0 rgba(58,42,26,0.06)',
      }}
    >
      <div className='mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8'>
        {/* Logo */}
        <Link
          href='/'
          className='font-display text-xl tracking-tight transition-opacity hover:opacity-75 shrink-0'
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}
          aria-label='PLAYFUL COMMUNITY 홈'
        >
          PLAY<span style={{ color: 'var(--color-primary-dark)' }}>FULL</span>
        </Link>

        {/* Desktop Search */}
        {searchOpen ? (
          <form
            onSubmit={handleSearch}
            className='hidden md:flex flex-1 mx-6 items-center gap-2 rounded-2xl px-4 py-2'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-primary)' }}
          >
            <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
            <input
              autoFocus
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='검색어를 입력하세요'
              className='flex-1 bg-transparent text-sm outline-none'
              style={{ color: 'var(--color-text-body)', fontFamily: 'var(--font-sans)' }}
            />
            <button
              type='button'
              onClick={() => setSearchOpen(false)}
              aria-label='검색 닫기'
              className='opacity-60 hover:opacity-100'
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <div className='hidden md:block' />
        )}

        {/* Desktop Nav Actions */}
        <nav className='hidden md:flex items-center gap-2' aria-label='주요 기능'>
          {!searchOpen && (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label='검색'
              className='rounded-xl p-2 transition-colors hover:opacity-75'
              style={{ color: 'var(--color-text-body)' }}
            >
              <Search size={20} />
            </button>
          )}

          {user ? (
            <>
              <Link
                href='/write'
                aria-label='글쓰기'
                className='flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all hover:opacity-85'
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-text-body)',
                  border: '2px solid var(--color-text-body)',
                  boxShadow: '3px 3px 0 var(--color-text-body)',
                }}
              >
                <PenLine size={16} />
                글쓰기
              </Link>
              <Link
                href='/notifications'
                aria-label='알림'
                className='relative rounded-xl p-2 transition-colors hover:opacity-75'
                style={{ color: 'var(--color-text-body)' }}
              >
                <Bell size={20} />
              </Link>
              <Link
                href='/mypage'
                aria-label='마이페이지'
                className='flex h-9 w-9 items-center justify-center rounded-full overflow-hidden transition-opacity hover:opacity-80'
                style={{ border: '2.5px solid var(--color-text-body)' }}
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.nickname} className='h-full w-full object-cover' />
                ) : (
                  <User size={18} style={{ color: 'var(--color-text-body)' }} />
                )}
              </Link>
              <button
                onClick={handleLogout}
                aria-label='로그아웃'
                className='rounded-xl p-2 opacity-50 transition-opacity hover:opacity-100'
                style={{ color: 'var(--color-text-body)' }}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='rounded-2xl px-4 py-2 text-sm font-bold transition-all hover:opacity-80'
                style={{
                  border: '2px solid var(--color-text-body)',
                  color: 'var(--color-text-body)',
                }}
              >
                로그인
              </Link>
              <Link
                href='/register'
                className='rounded-2xl px-4 py-2 text-sm font-bold transition-all hover:opacity-85'
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  border: '2px solid var(--color-text-body)',
                  boxShadow: '3px 3px 0 var(--color-text-body)',
                }}
              >
                회원가입
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className='md:hidden rounded-xl p-2'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className='md:hidden border-t-2 px-4 py-4 flex flex-col gap-3'
          style={{ borderColor: 'var(--color-text-body)', background: 'var(--color-surface)' }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className='flex items-center gap-2 rounded-xl px-3 py-2'
            style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)' }}>
            <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='검색'
              className='flex-1 bg-transparent text-sm outline-none'
            />
          </form>

          {user ? (
            <>
              <Link href='/write' onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 rounded-xl px-4 py-3 font-bold text-sm'
                style={{ background: 'var(--color-primary)', border: '2px solid var(--color-text-body)' }}>
                <PenLine size={16} /> 글쓰기
              </Link>
              <Link href='/notifications' onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 px-4 py-2 text-sm'>
                <Bell size={16} /> 알림
              </Link>
              <Link href='/mypage' onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 px-4 py-2 text-sm'>
                <User size={16} /> 마이페이지
              </Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className='flex items-center gap-2 px-4 py-2 text-sm opacity-60'>
                <LogOut size={16} /> 로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href='/login' onClick={() => setMobileMenuOpen(false)}
                className='text-center rounded-xl px-4 py-3 font-bold text-sm'
                style={{ border: '2px solid var(--color-text-body)' }}>
                로그인
              </Link>
              <Link href='/register' onClick={() => setMobileMenuOpen(false)}
                className='text-center rounded-xl px-4 py-3 font-bold text-sm'
                style={{ background: 'var(--color-accent)', color: '#fff', border: '2px solid var(--color-text-body)' }}>
                회원가입
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
