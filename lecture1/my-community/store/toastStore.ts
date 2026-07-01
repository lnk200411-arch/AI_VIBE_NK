import { create } from 'zustand';
import type { ToastOptions } from '@/types';

interface ToastState {
  toasts: (ToastOptions & { id: string })[];
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (options) => {
    const id = options.id ?? String(++toastId);
    set((state) => ({ toasts: [...state.toasts, { ...options, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, options.duration ?? 3500);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearAll: () => set({ toasts: [] }),
}));

export const toast = {
  success: (message: string) =>
    useToastStore.getState().addToast({ type: 'success', message }),
  error: (message: string) =>
    useToastStore.getState().addToast({ type: 'error', message }),
  info: (message: string) =>
    useToastStore.getState().addToast({ type: 'info', message }),
  warning: (message: string) =>
    useToastStore.getState().addToast({ type: 'warning', message }),
};
