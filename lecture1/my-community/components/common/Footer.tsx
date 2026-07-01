export function Footer() {
  return (
    <footer
      className='mt-auto w-full py-8 text-center text-sm'
      style={{
        background: 'var(--color-text-body)',
        color: 'var(--color-text-muted)',
        borderTop: '2.5px solid var(--color-text-body)',
      }}
    >
      <p className='font-handwriting text-base' style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-handwriting)' }}>
        자유롭게 공유하고, 가볍게 소통하며, 즐겁게 머무르는 커뮤니티
      </p>
      <p className='mt-1 text-xs opacity-50' style={{ color: '#fff' }}>
        © {new Date().getFullYear()} PLAYFULL Community. All rights reserved.
      </p>
    </footer>
  );
}
