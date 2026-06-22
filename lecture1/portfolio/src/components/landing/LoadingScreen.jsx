import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * LoadingScreen 컴포넌트
 *
 * Props:
 * @param {function} onFinish - 로딩 완료 시 호출되는 콜백 [Required]
 *
 * Example usage:
 * <LoadingScreen onFinish={() => setLoading(false)} />
 */
function LoadingScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 2200);
    const finishTimer = setTimeout(() => onFinish(), 2700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          animation: 'fadeInUp 0.8s ease forwards',
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid #E2E8F0',
            borderTopColor: '#2563EB',
            animation: 'spin 0.9s linear infinite',
            '@keyframes spin': {
              to: { transform: 'rotate(360deg)' },
            },
          }}
        />
        <Typography
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#94A3B8',
            letterSpacing: '0.08em',
          }}
        >
          PORTFOLIO
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;
