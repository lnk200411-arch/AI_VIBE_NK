export function PostCardSkeleton() {
  return (
    <div
      className='overflow-hidden rounded-2xl'
      style={{
        background: 'var(--color-surface)',
        border: '2.5px solid var(--color-border)',
        boxShadow: '4px 5px 0 var(--color-border)',
      }}
    >
      <div className='skeleton aspect-[4/3] w-full' />
      <div className='p-4 space-y-2'>
        <div className='skeleton h-4 w-4/5 rounded' />
        <div className='skeleton h-3 w-full rounded' />
        <div className='skeleton h-3 w-3/4 rounded' />
        <div className='flex justify-between mt-3'>
          <div className='flex items-center gap-2'>
            <div className='skeleton h-6 w-6 rounded-full' />
            <div className='skeleton h-3 w-16 rounded' />
          </div>
          <div className='skeleton h-3 w-12 rounded' />
        </div>
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className='max-w-2xl mx-auto px-4 py-8 space-y-6'>
      <div className='skeleton aspect-video w-full rounded-2xl' />
      <div className='space-y-3'>
        <div className='skeleton h-8 w-3/4 rounded' />
        <div className='flex items-center gap-3'>
          <div className='skeleton h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <div className='skeleton h-4 w-24 rounded' />
            <div className='skeleton h-3 w-16 rounded' />
          </div>
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='skeleton h-4 rounded' style={{ width: `${80 + Math.random() * 20}%` }} />
      ))}
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className='flex gap-3 py-4'>
      <div className='skeleton h-8 w-8 rounded-full shrink-0' />
      <div className='flex-1 space-y-2'>
        <div className='skeleton h-3 w-24 rounded' />
        <div className='skeleton h-4 w-full rounded' />
      </div>
    </div>
  );
}
