'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';

/**
 * ImageUpload 컴포넌트 — Drag & Drop + Click 업로드
 * @param {File[]} files - 현재 선택된 파일 목록 [Required]
 * @param {function} onChange - 파일 변경 시 콜백 [Required]
 * @param {number} maxFiles - 최대 업로드 개수 [Optional, 기본값: 10]
 */
interface ImageUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ files, onChange, maxFiles = 10 }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const valid = Array.from(newFiles).filter((f) => f.type.startsWith('image/'));
      const merged = [...files, ...valid].slice(0, maxFiles);
      onChange(merged);
    },
    [files, maxFiles, onChange]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const previews = files.map((f) => URL.createObjectURL(f));

  return (
    <div className='space-y-3'>
      {/* Drop Zone */}
      <button
        type='button'
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        aria-label='이미지 업로드 영역 — 클릭하거나 파일을 끌어다 놓으세요'
        className='w-full rounded-2xl p-8 text-center transition-all'
        style={{
          border: `2.5px dashed ${dragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
          background: dragging ? 'var(--color-primary-50)' : 'var(--color-bg)',
          cursor: 'pointer',
        }}
      >
        <Upload size={28} className='mx-auto mb-2' style={{ color: 'var(--color-primary-dark)' }} />
        <p className='text-sm font-bold' style={{ color: 'var(--color-text-body)' }}>
          이미지를 끌어다 놓거나 클릭하세요
        </p>
        <p className='text-xs mt-1' style={{ color: 'var(--color-text-muted)' }}>
          최대 {maxFiles}장 · JPG, PNG, GIF, WEBP 지원
        </p>
      </button>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {/* Previews */}
      {previews.length > 0 && (
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2'>
          {previews.map((src, i) => (
            <div key={src} className='relative group rounded-xl overflow-hidden aspect-square'
              style={{ border: '2px solid var(--color-border)' }}>
              <img src={src} alt={`미리보기 ${i + 1}`} className='h-full w-full object-cover' />
              <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1'>
                <GripVertical size={14} className='text-white cursor-grab' />
                <button
                  type='button'
                  onClick={() => removeFile(i)}
                  aria-label={`${i + 1}번 이미지 삭제`}
                  className='rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                >
                  <X size={12} />
                </button>
              </div>
              {i === 0 && (
                <span
                  className='absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold'
                  style={{ background: 'var(--color-primary)', color: 'var(--color-text-body)' }}
                >
                  대표
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
