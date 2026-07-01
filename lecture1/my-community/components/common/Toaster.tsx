'use client';

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';

const icons = {
  success: <CheckCircle size={18} className='text-green-600' />,
  error: <AlertCircle size={18} className='text-red-600' />,
  info: <Info size={18} className='text-blue-500' />,
  warning: <AlertTriangle size={18} className='text-yellow-500' />,
};

const bgColors = {
  success: '#f0fde8',
  error: '#fef0ec',
  info: '#eff6ff',
  warning: '#fffbeb',
};

const borderColors = {
  success: '#7EE85A',
  error: '#E8502A',
  info: '#3b82f6',
  warning: '#f59e0b',
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      className='fixed bottom-6 right-6 z-[9999] flex flex-col gap-2'
      aria-live='polite'
      aria-label='알림'
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role='alert'
          className='animate-toast flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg min-w-[280px] max-w-[360px]'
          style={{
            background: bgColors[toast.type],
            border: `2px solid ${borderColors[toast.type]}`,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {icons[toast.type]}
          <span className='flex-1 text-sm font-medium' style={{ color: 'var(--color-text-body)' }}>
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label='알림 닫기'
            className='opacity-50 hover:opacity-100 transition-opacity'
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
