import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';
import type { ProfileRow } from '@/types';

interface AuthState {
  user: User | null;
  profile: ProfileRow | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: ProfileRow | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () => set({ user: null, profile: null, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
